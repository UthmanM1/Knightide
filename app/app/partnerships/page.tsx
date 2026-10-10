import Link from "next/link";
import PageTitle from "@/components/app/PageTitle";
import EmptyState from "@/components/ui/EmptyState";
import { fmtDate, getMember } from "@/lib/member";

export const metadata = { title: "Partnerships — Knightide" };

export default async function MemberPartnerships() {
  const { supabase } = await getMember();
  const { data: apps } = await supabase.from("partnership_applications").select("id, status, created_at").order("created_at", { ascending: false });
  return (
    <>
      <PageTitle title="Partnerships" description="Your partnership applications and their status." />
      {apps?.length ? (
        <ul className="space-y-3">
          {apps.map((a) => (
            <li key={a.id} className="card flex items-center justify-between"><div><div className="font-display text-lg uppercase">Application</div><div className="text-xs text-mist-500">Started {fmtDate(a.created_at)}</div></div><span className="rounded-full border border-ink-500 px-3 py-1 text-xs font-semibold uppercase text-mist-100">{a.status.replace("_", " ")}</span></li>
          ))}
        </ul>
      ) : (
        <EmptyState title="No applications yet" description="Applications open after an enquiry has been reviewed. Start with a short enquiry and our team will be in touch." action={<Link href="/partnerships#enquiry" className="btn-primary">Start an enquiry</Link>} />
      )}
    </>
  );
}
