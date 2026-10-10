import { NextResponse } from "next/server";
import { createEmailLink } from "@/lib/auth-links";
import { sendEmail } from "@/lib/email/send";
import { recoveryEmail } from "@/lib/email/templates";
import { isEmail } from "@/lib/site";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Always answers the same way so it cannot be used to discover which emails exist.
export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({}));
  if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  if (!(await rateLimit(`recover:${clientIp(request)}`, 10, 3600)) || !(await rateLimit(`recover-email:${email.toLowerCase()}`, 3, 3600))) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }
  try {
    const url = await createEmailLink(email, "recovery", "/access?tab=reset");
    const mail = recoveryEmail(url);
    await sendEmail(email, mail.subject, mail.html, mail.text);
  } catch {
    // unknown email: say nothing
  }
  return NextResponse.json({ ok: true });
}
