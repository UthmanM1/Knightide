import { createAdminClient } from "@/lib/supabase/admin";
import { siteUrl } from "@/lib/site";

// Builds a one-time sign-in link we send ourselves via Resend (so we are not
// limited by Supabase's built-in email sender). The link lands on /auth/confirm,
// which exchanges the token for a session.
export async function createEmailLink(email: string, type: "magiclink" | "recovery", next: string) {
  const db = createAdminClient();
  const { data, error } = await db.auth.admin.generateLink({ type, email });
  if (error || !data?.properties?.hashed_token) throw new Error(error?.message ?? "Could not create link");
  const params = new URLSearchParams({ token_hash: data.properties.hashed_token, type, next });
  return `${siteUrl()}/auth/confirm?${params.toString()}`;
}
