import PageTitle from "@/components/app/PageTitle";
import { RevokeConsentButton } from "@/components/app/Actions";
import { fmtDate, getMember } from "@/lib/member";
import Link from "next/link";

export const metadata = { title: "Privacy — Knightide" };
const TYPES = [["camera", "Camera"], ["microphone", "Microphone"], ["motion", "Motion sensors"], ["spatial", "Spatial / XR sensors"]];

export default async function PrivacyControls() {
  const { supabase, user } = await getMember();
  const { data } = await supabase.from("consents").select("type, granted, created_at").order("created_at", { ascending: false });
  const latest = new Map<string, { granted: boolean; created_at: string }>();
  for (const c of data ?? []) if (!latest.has(c.type)) latest.set(c.type, c);
  return (
    <>
      <PageTitle title="Privacy" description="Everything is off until you say otherwise. Here's what you've allowed and how to take it back." />
      <ul className="divide-y divide-ink-700 rounded-md border border-ink-600">
        {TYPES.map(([type, label]) => {
          const c = latest.get(type);
          return (
            <li key={type} className="flex items-center justify-between gap-4 px-5 py-4">
              <div><div className="text-sm font-semibold text-mist-100">{label}</div><div className="text-xs text-mist-500">{c?.granted ? `Allowed ${fmtDate(c.created_at)}` : c ? `Revoked ${fmtDate(c.created_at)}` : "Never allowed"}</div></div>
              {c?.granted ? <RevokeConsentButton userId={user.id} type={type} /> : <span className="text-xs text-mist-500">Off</span>}
            </li>
          );
        })}
      </ul>
      <div className="card mt-6"><h2 className="font-display text-xl">Your data</h2><p className="mt-2 text-sm text-mist-400">Download a copy of your data, or delete your account and everything with it.</p><div className="mt-4 flex flex-wrap gap-3"><a href="/api/account/export" className="btn-secondary">Download my data (JSON)</a><Link href="/app/account#delete" className="btn-secondary">Delete my account</Link></div></div>
      <p className="mt-4 text-xs text-mist-500">Read the full <Link href="/privacy" className="text-lime-500">Privacy notice</Link>.</p>
    </>
  );
}
