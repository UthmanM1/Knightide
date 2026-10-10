import Link from "next/link";
import PageTitle from "@/components/app/PageTitle";
import { getMember } from "@/lib/member";

export const metadata = { title: "Help and safety — Knightide" };

export default async function HelpSafety() {
  await getMember();
  return (
    <>
      <PageTitle title="Help and safety" />
      <div role="note" className="rounded-md border border-danger-text/50 bg-danger-text/10 p-5 text-sm text-mist-100">
        <strong>In an emergency, stop and contact your local emergency services.</strong> Knightide is not a medical service and nothing here is medical advice.
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="card"><h2 className="font-display text-lg uppercase">Get help</h2><p className="mt-2 text-sm text-mist-400">Questions about your account, billing, training or devices.</p><Link href="/support" className="btn-primary mt-4 inline-flex">Open Support</Link></div>
        <div className="card"><h2 className="font-display text-lg uppercase">Safety guidance</h2><p className="mt-2 text-sm text-mist-400">Warm-ups, pausing, adaptive formats and when to stop.</p><Link href="/safety" className="btn-secondary mt-4 inline-flex">Read safety guidance</Link></div>
      </div>
      <p className="mt-6 text-sm text-mist-400">To report a safety concern, email <a className="text-lime-500" href="mailto:support@knightide.com">support@knightide.com</a>.</p>
    </>
  );
}
