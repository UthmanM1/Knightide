import Link from "next/link";
import PageTitle from "@/components/app/PageTitle";
import EmptyState from "@/components/ui/EmptyState";
import { fmtDate, getMember, PLAN_NAMES } from "@/lib/member";

export const metadata = { title: "Dashboard — Knightide" };

export default async function Dashboard() {
  const { supabase, user } = await getMember();
  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();
  const [week, last, booking, message, ent, sub] = await Promise.all([
    supabase.from("training_sessions").select("duration_seconds").not("completed_at", "is", null).gte("completed_at", weekAgo),
    supabase.from("training_sessions").select("completed_at, training_plans(title)").not("completed_at", "is", null).order("completed_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("bookings").select("starts_at, trainers(full_name)").eq("status", "confirmed").gte("starts_at", new Date().toISOString()).order("starts_at").limit(1).maybeSingle(),
    supabase.from("messages").select("body, created_at").neq("sender_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("entitlements").select("plan_id").eq("user_id", user.id).maybeSingle(),
    supabase.from("subscriptions").select("current_period_end, cancel_at_period_end").order("created_at", { ascending: false }).limit(1).maybeSingle(),
  ]);
  const count = week.data?.length ?? 0;
  const minutes = Math.round((week.data ?? []).reduce((s, r) => s + (r.duration_seconds ?? 0), 0) / 60);
  const lastTitle = (last.data?.training_plans as unknown as { title: string } | null)?.title;
  const trainer = (booking.data?.trainers as unknown as { full_name: string } | null)?.full_name;

  return (
    <>
      <PageTitle title="Dashboard" description={`Your ${PLAN_NAMES[ent.data?.plan_id ?? ""] ?? "Knightide"} membership at a glance.`} />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card !bg-lime-500 text-ink-950">
          <div className="font-display text-base uppercase">This week</div>
          <div className="mt-2 font-display text-4xl">{count}</div>
          <div className="text-xs">{count === 1 ? "session" : "sessions"} · {minutes} active minutes</div>
        </div>
        <div className="card">
          <div className="font-display text-base uppercase">Next session</div>
          {booking.data ? (
            <><div className="mt-2 text-sm text-mist-100">{fmtDate(booking.data.starts_at, true)}</div><div className="text-xs text-mist-400">{trainer ? `with ${trainer}` : "Human Trainer"}</div></>
          ) : (
            <><p className="mt-2 text-sm text-mist-400">Nothing booked.</p><Link href="/app/training" className="mt-2 inline-block text-sm font-semibold text-lime-500">Browse training &rarr;</Link></>
          )}
        </div>
        <div className="card">
          <div className="font-display text-base uppercase">Latest message</div>
          {message.data ? (
            <><p className="mt-2 line-clamp-2 text-sm text-mist-100">{message.data.body}</p><div className="text-xs text-mist-500">{fmtDate(message.data.created_at, true)}</div></>
          ) : (
            <p className="mt-2 text-sm text-mist-400">No messages yet.</p>
          )}
        </div>
      </div>
      <div className="mt-6">
        {lastTitle ? (
          <div className="card flex flex-wrap items-center justify-between gap-4">
            <div><span className="eyebrow">Continue your plan</span><h2 className="mt-1 font-display text-xl">{lastTitle}</h2><p className="text-xs text-mist-500">Last completed {fmtDate(last.data?.completed_at)}</p></div>
            <Link href="/app/training" className="btn-primary">Resume</Link>
          </div>
        ) : (
          <EmptyState title="Start your first session" description="Pick a plan that suits your level and equipment. Adaptive options are on every plan." action={<Link href="/app/training" className="btn-primary">Choose a plan</Link>} />
        )}
      </div>
      {sub.data?.current_period_end && (
        <p className="mt-6 text-xs text-mist-500">
          {sub.data.cancel_at_period_end ? "Your membership ends on" : "Your membership renews on"} {fmtDate(sub.data.current_period_end)}. <Link href="/app/membership" className="text-lime-500">Manage</Link>
        </p>
      )}
    </>
  );
}
