import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isEmail } from "@/lib/site";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const SOURCES = ["desktop_download", "xr_download", "ai_trainer", "home"];

// POST { email, source, os? } — public waitlist capture.
export async function POST(request: Request) {
  const { email, source, os, website } = await request.json().catch(() => ({}));
  if (website) return NextResponse.json({ ok: true }); // honeypot: bots fill this in
  if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  if (!SOURCES.includes(source)) return NextResponse.json({ error: "Unknown source" }, { status: 400 });
  if (!(await rateLimit(`waitlist:${clientIp(request)}`, 10, 3600))) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  const { error } = await createAdminClient().from("waitlist").insert({ email: email.toLowerCase(), source, os: typeof os === "string" ? os.slice(0, 30) : null });
  if (error) return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
