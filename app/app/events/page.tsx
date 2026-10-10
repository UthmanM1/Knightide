import Link from "next/link";
import PageTitle from "@/components/app/PageTitle";
import EmptyState from "@/components/ui/EmptyState";
import { fmtDate, getMember } from "@/lib/member";

export const metadata = { title: "Events — Knightide" };

export default async function MemberEvents() {
  const { supabase } = await getMember();
  const { data: tickets } = await supabase.from("tickets").select("id, created_at, ticket_types(name, events(title, slug, starts_at))").order("created_at", { ascending: false });
  type T = { name: string; events: { title: string; slug: string; starts_at: string | null } | null };
  return (
    <>
      <PageTitle title="Events" description="Your tickets, live broadcasts and replays." />
      <h2 className="font-display text-2xl">My tickets</h2>
      <div className="mt-4">
        {tickets?.length ? (
          <ul className="space-y-3">
            {tickets.map((t) => {
              const tt = t.ticket_types as unknown as T | null;
              return (
                <li key={t.id} className="card flex items-center justify-between gap-4">
                  <div><div className="font-display text-lg uppercase">{tt?.events?.title ?? "Event"}</div><div className="text-xs text-mist-400">{tt?.name} · {fmtDate(tt?.events?.starts_at, true)}</div></div>
                  {tt?.events?.slug && <Link href={`/events/${tt.events.slug}`} className="btn-secondary">View event</Link>}
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState title="No tickets yet" description="Tickets you buy will appear here, with replay access while your window is open." action={<Link href="/events" className="btn-primary">Browse events</Link>} />
        )}
      </div>
    </>
  );
}
