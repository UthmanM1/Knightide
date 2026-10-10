import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM ?? "Knightide <onboarding@resend.dev>";
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? "support@knightide.com";

export async function sendEmail(to: string, subject: string, html: string, text: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set; email not sent:", subject);
    return { ok: false as const, error: "Email is not configured" };
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({ from: FROM, to, subject, html, text, replyTo: SUPPORT_EMAIL });
  if (error) {
    console.error("Resend error:", error);
    return { ok: false as const, error: error.message };
  }
  return { ok: true as const };
}
