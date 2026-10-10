import PageTitle from "@/components/app/PageTitle";
import { BillingButton } from "@/components/app/Actions";
import { stripe } from "@/lib/stripe";
import { fmtDate, fmtMoney, getMember, PLAN_NAMES } from "@/lib/member";

export const metadata = { title: "Membership — Knightide" };

export default async function MembershipPage() {
  const { supabase } = await getMember();
  const { data: sub } = await supabase.from("subscriptions").select("plan_id, status, current_period_end, cancel_at_period_end, stripe_customer_id").order("created_at", { ascending: false }).limit(1).maybeSingle();

  let invoices: { id: string; created: number; amount_paid: number; currency: string; status: string | null; number: string | null; hosted_invoice_url?: string | null }[] = [];
  let historyError = false;
  if (sub?.stripe_customer_id) {
    try { invoices = (await stripe.invoices.list({ customer: sub.stripe_customer_id, limit: 12 })).data; } catch { historyError = true; }
  }
  const status = sub?.status === "past_due" ? "Payment overdue" : sub?.cancel_at_period_end ? "Ending" : sub?.status === "active" ? "Active" : sub?.status ?? "No plan";

  return (
    <>
      <PageTitle title="Membership" description="Your plan, billing date and payment history." />
      <div className="card border-amber-500/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><div className="eyebrow">Current plan</div><h2 className="mt-1 font-display text-2xl">{PLAN_NAMES[sub?.plan_id ?? ""] ?? "—"} monthly</h2></div>
          <span className="rounded-full border border-ink-500 px-3 py-1 text-xs font-semibold uppercase text-mist-100">{status}</span>
        </div>
        <p className="mt-4 text-sm text-mist-300">
          {sub?.cancel_at_period_end ? "Renewal is turned off. You keep access until " : "Next billing date: "}<strong className="text-mist-100">{fmtDate(sub?.current_period_end)}</strong>.
        </p>
        <div className="mt-5 flex flex-wrap gap-3"><BillingButton label="Change plan or turn off renewal" /></div>
        <p className="mt-3 text-xs text-mist-500">Opens Stripe's secure billing portal. Access continues to the end of the period you've paid for.</p>
      </div>
      <h2 className="mt-10 font-display text-2xl">Payment history</h2>
      <div className="mt-4 overflow-x-auto rounded-md border border-ink-600">
        {historyError ? <p className="p-5 text-sm text-mist-400">We couldn't load your payment history right now. Try again shortly.</p> : invoices.length === 0 ? <p className="p-5 text-sm text-mist-400">No payments yet.</p> : (
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-mist-500"><tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Receipt</th></tr></thead>
            <tbody className="divide-y divide-ink-700">
              {invoices.map((i) => (
                <tr key={i.id}>
                  <td className="px-4 py-3 text-mist-300">{fmtDate(new Date(i.created * 1000).toISOString())}</td>
                  <td className="px-4 py-3 text-mist-100">{fmtMoney(i.amount_paid, i.currency)}</td>
                  <td className="px-4 py-3 capitalize text-mist-300">{i.status}</td>
                  <td className="px-4 py-3">{i.hosted_invoice_url ? <a className="text-lime-500 hover:text-lime-400" href={i.hosted_invoice_url} target="_blank" rel="noopener noreferrer">{i.number ?? "View"}</a> : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
