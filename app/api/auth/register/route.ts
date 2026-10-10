import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createEmailLink } from "@/lib/auth-links";
import { sendEmail } from "@/lib/email/send";
import { verifyEmail } from "@/lib/email/templates";
import { isEmail } from "@/lib/site";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Explorer (free) account: no checkout, no protected sessions.
export async function POST(request: Request) {
  const { email, password } = await request.json().catch(() => ({}));
  if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  if (typeof password !== "string" || password.length < 12) {
    return NextResponse.json({ error: "Password must be at least 12 characters" }, { status: 400 });
  }
  if (!(await rateLimit(`register:${clientIp(request)}`, 8, 3600)) || !(await rateLimit(`register-email:${email.toLowerCase()}`, 3, 3600))) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const db = createAdminClient();
  const created = await db.auth.admin.createUser({ email, password, email_confirm: true });
  if (created.error || !created.data.user) {
    const exists = /already|registered|exists/i.test(created.error?.message ?? "");
    return NextResponse.json(
      { error: exists ? "An account with this email already exists. Try signing in." : "Could not create your account." },
      { status: exists ? 409 : 400 }
    );
  }
  const id = created.data.user.id;
  await db.from("profiles").upsert({ id });
  await db.from("entitlements").upsert({ user_id: id, active: false, verified: false });

  try {
    const url = await createEmailLink(email, "magiclink", "/membership");
    const mail = verifyEmail(url);
    await sendEmail(email, mail.subject, mail.html, mail.text);
  } catch (e) {
    console.error("Verification email failed:", e);
  }

  await createClient().auth.signInWithPassword({ email, password });
  return NextResponse.json({ ok: true });
}
