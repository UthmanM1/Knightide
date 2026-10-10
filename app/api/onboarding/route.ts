import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ACCESS_MAP: Record<string, string> = {
  Seated: "seated",
  "Low impact": "low_impact",
  Captions: "captions_default",
  "Reduced motion": "reduced_motion",
  "Audio led": "audio_led",
};
const strings = (v: unknown, max = 12) =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, max).map((x) => x.slice(0, 60)) : [];

export async function GET() {
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  const db = createAdminClient();
  const [{ data: profile }, { data: prefs }] = await Promise.all([
    db.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    db.from("accessibility_prefs").select("*").eq("user_id", user.id).maybeSingle(),
  ]);
  const accessNeeds = Object.entries(ACCESS_MAP).filter(([, col]) => prefs?.[col]).map(([label]) => label);
  return NextResponse.json({
    step: profile?.onboarding_step ?? 0,
    completed: !!profile?.onboarding_completed_at,
    disciplines: profile?.disciplines ?? [],
    experience: profile?.experience_level ?? null,
    schedule: profile?.weekly_schedule ?? { days: [], time: null },
    devices: profile?.device_types ?? [],
    accessNeeds,
  });
}

// POST { step, disciplines?, experience?, schedule?, accessNeeds?, devices?, complete? }
export async function POST(request: Request) {
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  const b = await request.json().catch(() => ({}));
  const db = createAdminClient();

  const update: Record<string, unknown> = { id: user.id, updated_at: new Date().toISOString() };
  if (typeof b.step === "number") update.onboarding_step = Math.max(0, Math.min(6, Math.floor(b.step)));
  if (b.disciplines) update.disciplines = strings(b.disciplines);
  if (typeof b.experience === "string") update.experience_level = b.experience.slice(0, 40);
  if (b.schedule && typeof b.schedule === "object") {
    update.weekly_schedule = { days: strings(b.schedule.days, 7), time: typeof b.schedule.time === "string" ? b.schedule.time.slice(0, 20) : null };
  }
  if (b.devices) update.device_types = strings(b.devices);
  if (b.complete === true) update.onboarding_completed_at = new Date().toISOString();

  const { error } = await db.from("profiles").upsert(update);
  if (error) return NextResponse.json({ error: "Could not save" }, { status: 500 });

  if (b.accessNeeds) {
    const needs = strings(b.accessNeeds);
    const prefs: Record<string, unknown> = { user_id: user.id, updated_at: new Date().toISOString() };
    for (const [label, col] of Object.entries(ACCESS_MAP)) prefs[col] = needs.includes(label);
    const { error: pe } = await db.from("accessibility_prefs").upsert(prefs);
    if (pe) return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
