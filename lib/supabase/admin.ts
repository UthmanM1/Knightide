// Service-role Supabase client — bypasses RLS. Server-only. Never import this
// from a "use client" file or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
// Used by: Stripe webhook handler, admin API routes, key hashing/verification.
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
