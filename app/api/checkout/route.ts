import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isEmail, siteUrl } from "@/lib/site";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// POST { planId, email?, password? }
// Signed-in users just pick a plan. New visitors send email + password: we create
// the account, sign them in, then open Stripe Checkout (hosted). Card details are
// only ever entered on Stripe's page.
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { planId, email, password } = body as { planId?: string; email?: string; password?: string };

  const priceId =
    planId === "complete" ? process.env.STRIPE_PRICE_COMPLETE : planId === "flex" ? process.env.STRIPE_PRICE_FLEX : null;
  if (!priceId) return NextResponse.json({ error: "Choose a plan" }, { status: 400 });

  if (!(await rateLimit(`checkout:${clientIp(request)}`, 15, 3600))) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const supabase = createClient();
  const db = createAdminClient();
  let { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    if (typeof password !== "string" || password.length < 12) {
      return NextResponse.json({ error: "Password must be at least 12 characters" }, { status: 400 });
    }
    const created = await db.auth.admin.createUser({ email, password, email_confirm: true });
    if (created.error || !created.data.user) {
      const exists = /already|registered|exists/i.test(created.error?.message ?? "");
      return NextResponse.json(
        {
          error: exists
            ? "An account with this email already exists. Sign in, then choose a plan on the Membership page."
            : "Could not create your account. Please try again.",
        },
        { status: exists ? 409 : 400 }
      );
    }
    await db.from("profiles").upsert({ id: created.data.user.id });
    await db.from("entitlements").upsert({ user_id: created.data.user.id, active: false, verified: false });
    // Sign in so the browser has a session when it comes back from Stripe.
    const signedIn = await supabase.auth.signInWithPassword({ email, password });
    user = signedIn.data.user ?? created.data.user;
  }

  const { data: ent } = await db.from("entitlements").select("active").eq("user_id", user.id).maybeSingle();
  if (ent?.active) {
    return NextResponse.json({ error: "You already have an active membership. Manage it from your Membership page." }, { status: 409 });
  }

  const { data: prior } = await db
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    ...(prior?.stripe_customer_id ? { customer: prior.stripe_customer_id } : { customer_email: user.email! }),
    client_reference_id: user.id,
    metadata: { user_id: user.id, plan_id: planId! },
    subscription_data: { metadata: { user_id: user.id, plan_id: planId! } },
    success_url: `${siteUrl()}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/access#subscribe`,
  });

  return NextResponse.json({ url: session.url });
}
