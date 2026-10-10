import PageTitle from "@/components/app/PageTitle";
import ToggleList from "@/components/app/ToggleList";
import { getMember } from "@/lib/member";

export const metadata = { title: "Accessibility — Knightide" };
const ROWS = [
  { col: "reduced_motion", label: "Reduced motion", desc: "Turns off animations and transitions across the member area" },
  { col: "high_contrast", label: "High contrast", desc: "Brighter text and stronger borders across the member area" },
  { col: "captions_default", label: "Captions on by default", desc: "Applies to live and replay video" },
  { col: "seated", label: "Seated mode by default", desc: "Suggests seated alternatives for every session" },
  { col: "low_impact", label: "Low impact by default", desc: "Prefers low-impact formats" },
  { col: "audio_led", label: "Audio-led guidance", desc: "Prefers spoken cues over visual ones" },
];

export default async function AccessibilityPrefs() {
  const { supabase, user } = await getMember();
  const { data } = await supabase.from("accessibility_prefs").select("*").eq("user_id", user.id).maybeSingle();
  const initial = Object.fromEntries(ROWS.map((r) => [r.col, !!data?.[r.col]]));
  return (<><PageTitle title="Accessibility" description="Your saved preferences. Reduced motion and high contrast apply straight away." /><ToggleList table="accessibility_prefs" userId={user.id} rows={ROWS} initial={initial} refresh /></>);
}
