import Link from "next/link";
import PageTitle from "@/components/app/PageTitle";
import EmptyState from "@/components/ui/EmptyState";
import { fmtDate, getMember } from "@/lib/member";

export const metadata = { title: "Communication — Knightide" };
const KINDS: Record<string, string> = { trainer: "Human Trainer", event: "Event notices", support: "Support" };

export default async function Communication() {
  const { supabase } = await getMember();
  const { data: threads } = await supabase.from("threads").select("id, kind, created_at").order("created_at", { ascending: false });
  return (
    <>
      <PageTitle title="Communication" description="Conversations with Human Trainers, event notices and support." />
      {threads?.length ? (
        <ul className="space-y-3">
          {threads.map((t) => (
            <li key={t.id} className="card"><div className="font-display text-lg uppercase">{KINDS[t.kind] ?? t.kind}</div><div className="text-xs text-mist-500">Started {fmtDate(t.created_at)}</div></li>
          ))}
        </ul>
      ) : (
        <EmptyState title="No conversations yet" description="When you book a Human Trainer or an event sends a notice, the conversation will appear here." action={<Link href="/support" className="btn-secondary">Contact support</Link>} />
      )}
    </>
  );
}
