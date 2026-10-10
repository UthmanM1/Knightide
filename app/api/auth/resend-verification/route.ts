import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createEmailLink } from "@/lib/auth-links";
import { decryptKey } from "@/lib/keys";
import { sendEmail } from "@/lib/email/send";
import { verifyEmail, welcomeEmail } from "@/lib/email/templates";
import { rateLimit } from "@/lib/rate-limit";

// POST { session_id? } — resend the verification email (with the member key if one is pending).
export async function POST(request: Request) {
  const { session_id } = await request.json().catch(() => ({}));
  const db = createAdminClient();

  let userId: string | null = (await createClient().auth.getUser()).data.user?.id ?? null;
  if (!userId && typeof session_id === "string") {
    try {
      const s = await stripe.checkout.sessions.retrieve(session_id);
      if (s.payment_status === "paid") userId = s.metadata?.user_id ?? null;
    } catch {}
  }
  if (!userId) return NextResponse.json({ error: "Sign in first" }, { status: 401 });

  if (!(await rateLimit(`resend:${userId}`, 3, 3600))) {
    return NextResponse.json({ error: "You've requested this a few times already. Please wait an hour or check your spam folder." }, { status: 429 });
  }

  const { data: u } = await db.auth.admin.getUserById(userId);
  const email = u?.user?.email;
  if (!email) return NextResponse.json({ error: "Account not found" }, { status: 404 });

  const url = await createEmailLink(email, "magiclink", "/onboarding");
  const { data: row } = await db.from("member_keys").select("key_encrypted").eq("user_id", userId).eq("used", false).not("key_encrypted", "is", null).limit(1).maybeSingle();
  const mail = row?.key_encrypted
    ? welcomeEmail({ planName: "member", key: decryptKey(row.key_encrypted), verifyUrl: url })
    : verifyEmail(url);
  const sent = await sendEmail(email, mail.subject, mail.html, mail.text);
  if (!sent.ok) return NextResponse.json({ error: "We couldn't send the email right now. Please try again shortly." }, { status: 502 });
  return NextResponse.json({ sent: true });
}
