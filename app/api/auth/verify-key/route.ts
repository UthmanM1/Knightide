import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashKey } from "@/lib/keys";
import { rateLimit } from "@/lib/rate-limit";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function POST(request: Request) {
  const { key } = await request.json().catch(() => ({}));
  if (!key || typeof key !== "string") return NextResponse.json({ error: "Enter your key" }, { status: 400 });

  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in first, then enter your key." }, { status: 401 });
  if (!(await rateLimit(`vk:${user.id}`, 30, 3600))) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const db = createAdminClient();
  const { data: ent } = await db.from("entitlements").select("verified").eq("user_id", user.id).maybeSingle();
  if (ent?.verified) return NextResponse.json({ verified: true, already: true });

  const { data: row } = await db
    .from("member_keys").select("*").eq("user_id", user.id).eq("used", false)
    .order("created_at", { ascending: false }).limit(1).maybeSingle();
  if (!row) return NextResponse.json({ error: "There is no pending key for this account." }, { status: 404 });

  const lockedNow = row.locked_until && new Date(row.locked_until) > new Date();
  if (lockedNow) {
    return NextResponse.json({ error: `Too many wrong attempts. Try again after ${new Date(row.locked_until).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}.` }, { status: 429 });
  }

  const given = Buffer.from(hashKey(key), "hex");
  const stored = Buffer.from(row.key_hash, "hex");
  const ok = given.length === stored.length && timingSafeEqual(given, stored);

  if (!ok) {
    const base = row.locked_until ? 0 : row.failed_attempts; // lockout expired: start again
    const attempts = base + 1;
    const lock = attempts >= MAX_ATTEMPTS;
    await db.from("member_keys").update({
      failed_attempts: lock ? 0 : attempts,
      locked_until: lock ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000).toISOString() : null,
    }).eq("id", row.id);
    return NextResponse.json(
      { error: lock ? `Too many wrong attempts. This is locked for ${LOCKOUT_MINUTES} minutes.` : `That key isn't right. ${MAX_ATTEMPTS - attempts} attempt${MAX_ATTEMPTS - attempts === 1 ? "" : "s"} left.` },
      { status: 400 }
    );
  }

  await db.from("member_keys").update({ used: true, key_encrypted: null, failed_attempts: 0, locked_until: null }).eq("id", row.id);
  await db.from("entitlements").upsert({ user_id: user.id, verified: true, updated_at: new Date().toISOString() });
  return NextResponse.json({ verified: true });
}
