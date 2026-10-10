import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { decryptKey, encryptKey, generateKey, hashKey } from "@/lib/keys";
import { createEmailLink } from "@/lib/auth-links";
import { sendEmail } from "@/lib/email/send";
import { paymentFailedEmail, welcomeEmail } from "@/lib/email/templates";
import { siteUrl } from "@/lib/site";

// Stripe webhooks are the only thing that grants or removes access.
// Signature verified; every event id is logged once (idempotent); if processing
// fails the log row is removed and we return 500 so Stripe retries.

const LIVE_STATUSES = ["active", "trialing", "past_due"];

async function syncSubscription(sub: Stripe.Subscription, userIdHint?: string | null) {
  const db = createAdminClient();
  let userId = sub.metadata?.user_id ?? userIdHint ?? null;
  if (!userId) {
    const { data } = await db.from("subscriptions").select("user_id").eq("stripe_subscription_id", sub.id).maybeSingle();
    userId = data?.user_id ?? null;
  }
  if (!userId) throw new Error(`No user for subscription ${sub.id}`);
  const planId = sub.metadata?.plan_id ?? null;

  const { error } = await db.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: sub.customer as string,
      stripe_subscription_id: sub.id,
      ...(planId ? { plan_id: planId } : {}),
      status: sub.status,
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      cancel_at_period_end: sub.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" }
  );
  if (error) throw error;

  const { error: entError } = await db.from("entitlements").upsert({
    user_id: userId,
    ...(planId ? { plan_id: planId } : {}),
    active: LIVE_STATUSES.includes(sub.status),
    updated_at: new Date().toISOString(),
  });
  if (entError) throw entError;
  return userId;
}

async function handle(event: Stripe.Event) {
  const db = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode !== "subscription" || !session.subscription) break; // tickets handled later
      const userId = session.metadata?.user_id ?? session.client_reference_id;
      if (!userId) throw new Error("Checkout session has no user");

      const sub = await stripe.subscriptions.retrieve(session.subscription as string);
      await syncSubscription(sub, userId);

      const { data: ent } = await db.from("entitlements").select("verified, plan_id").eq("user_id", userId).single();
      if (ent?.verified) break; // returning member: no new key needed

      // Reuse an existing unused key if this event is a retry.
      let key: string | null = null;
      const { data: existing } = await db
        .from("member_keys")
        .select("key_encrypted")
        .eq("user_id", userId)
        .eq("used", false)
        .not("key_encrypted", "is", null)
        .limit(1)
        .maybeSingle();
      if (existing?.key_encrypted) key = decryptKey(existing.key_encrypted);
      if (!key) {
        key = generateKey();
        const { error } = await db
          .from("member_keys")
          .insert({ user_id: userId, key_hash: hashKey(key), key_encrypted: encryptKey(key) });
        if (error) throw error;
      }

      const email = session.customer_details?.email ?? session.customer_email;
      if (email) {
        let receiptUrl: string | null = null;
        try {
          if (session.invoice) receiptUrl = (await stripe.invoices.retrieve(session.invoice as string)).hosted_invoice_url ?? null;
        } catch {}
        const verifyUrl = await createEmailLink(email, "magiclink", "/onboarding");
        const planName = ent?.plan_id === "flex" ? "Flex" : "Complete";
        const mail = welcomeEmail({ planName, key, verifyUrl, receiptUrl });
        await sendEmail(email, mail.subject, mail.html, mail.text);
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      await syncSubscription(event.data.object as Stripe.Subscription);
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        await syncSubscription(await stripe.subscriptions.retrieve(invoice.subscription as string));
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        await syncSubscription(await stripe.subscriptions.retrieve(invoice.subscription as string));
      }
      if (invoice.customer && invoice.customer_email) {
        const portal = await stripe.billingPortal.sessions.create({
          customer: invoice.customer as string,
          return_url: `${siteUrl()}/app/membership`,
        });
        const mail = paymentFailedEmail(portal.url);
        await sendEmail(invoice.customer_email, mail.subject, mail.html, mail.text);
      }
      break;
    }
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: `Signature verification failed: ${(err as Error).message}` }, { status: 400 });
  }

  const db = createAdminClient();
  const { error: logError } = await db.from("stripe_events").insert({ id: event.id, type: event.type });
  if (logError) {
    if (logError.code === "23505") return NextResponse.json({ received: true, duplicate: true });
    return NextResponse.json({ error: "Could not log event" }, { status: 500 });
  }

  try {
    await handle(event);
  } catch (err) {
    console.error(`Webhook ${event.type} failed:`, err);
    await db.from("stripe_events").delete().eq("id", event.id); // let Stripe retry
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
