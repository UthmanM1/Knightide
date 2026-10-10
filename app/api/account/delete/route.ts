import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// POST { confirm: "DELETE" } — cancels any live subscription, then deletes the account and its data.
export async function POST(request: Request) {
  const { confirm } = await request.json().catch(() => ({}));
  if (confirm !== "DELETE") return NextResponse.json({ error: 'Type DELETE to confirm' }, { status: 400 });

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });

  const db = createAdminClient();
  const { data: subs } = await db.from("subscriptions").select("stripe_subscription_id, status").eq("user_id", user.id);
  for (const s of subs ?? []) {
    if (s.stripe_subscription_id && s.status !== "canceled") {
      try { await stripe.subscriptions.cancel(s.stripe_subscription_id); } catch (e) { console.error("Cancel failed", e); }
    }
  }
  const { error } = await db.auth.admin.deleteUser(user.id);
  if (error) return NextResponse.json({ error: "Could not delete the account. Contact support." }, { status: 500 });
  await db.from("audit_log").insert({ action: "account_deleted", target_table: "auth.users" });
  await supabase.auth.signOut();
  return NextResponse.json({ deleted: true });
}
