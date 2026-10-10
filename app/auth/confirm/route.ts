import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { safeNext } from "@/lib/site";

// Landing point for emailed one-time links (verify email / password recovery).
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const tokenHash = params.get("token_hash");
  const type = params.get("type") as EmailOtpType | null;
  const next = safeNext(params.get("next"), "/app/dashboard");
  const fail = NextResponse.redirect(new URL("/access?error=link", request.url));

  if (!tokenHash || (type !== "magiclink" && type !== "recovery")) return fail;

  const supabase = createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
  if (error) return fail;

  if (type === "magiclink") {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const db = createAdminClient();
      await db.from("entitlements").upsert({ user_id: user.id, verified: true, updated_at: new Date().toISOString() });
      await db.from("member_keys").update({ used: true, key_encrypted: null }).eq("user_id", user.id).eq("used", false);
    }
  }
  return NextResponse.redirect(new URL(next, request.url));
}
