import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { siteUrl } from "@/lib/site";

// Opens the Stripe Customer Portal (change plan, update card, turn off renewal, receipts).
export async function POST() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  const { data: sub } = await supabase.from("subscriptions").select("stripe_customer_id").order("created_at", { ascending: false }).limit(1).maybeSingle();
  if (!sub?.stripe_customer_id) return NextResponse.json({ error: "No billing account found" }, { status: 404 });
  const portal = await stripe.billingPortal.sessions.create({ customer: sub.stripe_customer_id, return_url: `${siteUrl()}/app/membership` });
  return NextResponse.json({ url: portal.url });
}
