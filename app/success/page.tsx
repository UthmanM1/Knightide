import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { Pill } from "@/components/Bits";
import { Check, Grid, Bolt, Calendar, Shield, Chat, Devices } from "@/components/icons";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { decryptKey } from "@/lib/keys";
import { AutoRefresh, CopyKeyButton, ResendLinkButton } from "@/components/SuccessActions";

export const metadata = { title: "Subscription confirmed — Knightide", referrer: "no-referrer" as const };
export const dynamic = "force-dynamic";

const PLAN_NAMES: Record<string, string> = { complete: "Complete", flex: "Flex" };
const gateway = [
  { icon: <Grid className="h-6 w-6" />, title: "Dashboard", body: "Your connected overview and next steps", href: "/app/dashboard" },
  { icon: <Bolt className="h-6 w-6" />, title: "Training", body: "Plans, sessions, Human Trainer and AI Trainer", href: "/app/training" },
  { icon: <Calendar className="h-6 w-6" />, title: "Events", body: "Tickets, live broadcasts, replay and chat", href: "/app/events" },
  { icon: <Shield className="h-6 w-6" />, title: "Membership", body: "Plan, entitlements and payment history", href: "/app/membership" },
  { icon: <Chat className="h-6 w-6" />, title: "Communication", body: "Trainer, event and support conversations", href: "/app/communication" },
  { icon: <Devices className="h-6 w-6" />, title: "Devices", body: "Downloads, compatibility and permissions", href: "/app/devices" },
];

function Notice({ title, body, cta }: { title: string; body: string; cta?: React.ReactNode }) {
  return (
    <section className="section pb-20 pt-12 sm:pt-16">
      <div className="section-inner max-w-2xl">
        <h1 className="text-4xl">{title}</h1>
        <p className="mt-4 text-base text-mist-300">{body}</p>
        {cta}
      </div>
    </section>
  );
}

export default async function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const sessionId = searchParams.session_id;
  const home = <Link href="/membership" className="btn-primary mt-6 inline-flex">View membership options</Link>;
  if (!sessionId) return <Notice title="Nothing to show yet" body="This page appears after a successful checkout." cta={home} />;

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return <Notice title="We couldn't find that checkout" body="The link may be incorrect or expired. If you were charged, contact support and we'll sort it out." cta={home} />;
  }
  if (session.payment_status !== "paid") {
    return <Notice title="Payment not completed" body="Your checkout wasn't completed, so you haven't been charged. You can try again any time." cta={<Link href="/access#subscribe" className="btn-primary mt-6 inline-flex">Back to checkout</Link>} />;
  }

  const userId = session.metadata?.user_id;
  const db = createAdminClient();
  const [{ data: sub }, { data: ent }, { data: keyRow }] = await Promise.all([
    db.from("subscriptions").select("plan_id, current_period_end, status").eq("user_id", userId ?? "").order("created_at", { ascending: false }).limit(1).maybeSingle(),
    db.from("entitlements").select("verified").eq("user_id", userId ?? "").maybeSingle(),
    db.from("member_keys").select("key_encrypted").eq("user_id", userId ?? "").eq("used", false).not("key_encrypted", "is", null).limit(1).maybeSingle(),
  ]);

  // The webhook may still be running: show a holding state and re-check.
  if (!sub) {
    return (
      <>
        <AutoRefresh />
        <Notice title="Payment received. Finalising your membership…" body="This usually takes a few seconds. This page will update by itself. You'll also get an email with your verification link and member key." cta={<ResendLinkButton sessionId={sessionId} label="Send me the email again" className="btn-secondary" />} />
      </>
    );
  }

  let receiptUrl: string | null = null;
  let receiptRef: string | null = null;
  try {
    if (session.invoice) {
      const inv = await stripe.invoices.retrieve(session.invoice as string);
      receiptUrl = inv.hosted_invoice_url ?? null;
      receiptRef = inv.number ?? null;
    }
  } catch {}

  const key = keyRow?.key_encrypted ? decryptKey(keyRow.key_encrypted) : null;
  const verified = !!ent?.verified;
  const planName = PLAN_NAMES[sub.plan_id ?? ""] ?? "Knightide";
  const amount = session.amount_total != null ? new Intl.NumberFormat("en-GB", { style: "currency", currency: (session.currency ?? "gbp").toUpperCase() }).format(session.amount_total / 100) : null;
  const renews = sub.current_period_end ? new Date(sub.current_period_end).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : null;
  const email = session.customer_details?.email ?? session.customer_email;

  return (
    <>
      <section className="section pb-10 pt-12 sm:pt-16">
        <div className="section-inner max-w-2xl">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-500 text-ink-950"><Check className="h-6 w-6" /></span>
          <div className="mt-4"><Pill>Payment confirmed{receiptRef ? ` · ${receiptRef}` : ""}</Pill></div>
          <h1 className="mt-4 text-4xl sm:text-5xl">Welcome to {planName} membership</h1>
          <p className="mt-4 text-base text-mist-300">
            {email ? <>Your receipt and verification link were sent to {email}. </> : null}
            Finish account verification, save your generated key and choose an onboarding path before entering protected member features.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-inner grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="card border-amber-500/60">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">{planName} monthly</h2>
              {amount && <span className="font-display text-2xl text-amber-500">{amount} / mo</span>}
            </div>
            <ul className="mt-4 space-y-2 text-sm text-mist-300">
              <li>✓ Dashboard and synchronized progress</li>
              <li>✓ Training plans and AI Trainer demonstrations</li>
              <li>✓ Human Trainer discovery and Communication</li>
              <li>✓ Selected event broadcasts and replays</li>
            </ul>
            <p className="mt-4 text-xs text-mist-500">
              {renews ? <>Renews on {renews}. </> : null}Human Trainer appointments and ticketed events may be additional. Manage renewal in Membership.
            </p>
          </div>
          <div className="card border-lime-500/60">
            <span className="eyebrow">Generated member key</span>
            {key ? (
              <>
                <div className="mt-2 font-display text-2xl tracking-wide" data-testid="member-key">{key}</div>
                <p className="mt-3 text-sm text-mist-400">Use this one-time key if you sign in on another device before verification completes. It does not replace your password.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <CopyKeyButton value={key} />
                  {receiptUrl && <a href={receiptUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">View receipt</a>}
                </div>
              </>
            ) : (
              <>
                <p className="mt-3 text-sm text-mist-400">{verified ? "Your account is verified, so your one-time key has been used and is no longer shown." : "Your key was sent to your email address."}</p>
                {receiptUrl && <a href={receiptUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-4 inline-flex">View receipt</a>}
              </>
            )}
            <p className="mt-4 text-xs text-mist-500">Keep this key private. Knightide Support will never ask you to read it aloud in full.</p>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading eyebrow="Next step" title="Verify, personalize, continue" description="These protected handoff steps connect your payment to the right account while preserving your device and accessibility choices." />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className={`card ${verified ? "" : "border-lime-500/60"}`}>
              <div className="font-display text-2xl text-lime-500">01</div>
              <h3 className="mt-2 font-display text-base uppercase">Verify account</h3>
              <p className="mt-2 text-sm text-mist-400">{verified ? "Verified. You're all set." : "Open the secure link in your email, or enter your key."}</p>
              {verified ? null : (
                <>
                  <ResendLinkButton sessionId={sessionId} />
                  <Link href="/verify" className="mt-2 block text-sm font-semibold text-lime-500 hover:text-lime-400">Enter key instead &rarr;</Link>
                </>
              )}
            </div>
            <div className={`card ${verified ? "border-lime-500/60" : ""}`}>
              <div className="font-display text-2xl text-lime-500">02</div>
              <h3 className="mt-2 font-display text-base uppercase">Set up training</h3>
              <p className="mt-2 text-sm text-mist-400">Choose disciplines, experience, schedule and adaptive formats.</p>
              <Link href="/onboarding" className={`mt-4 inline-flex ${verified ? "btn-primary" : "btn-secondary"}`}>Start onboarding</Link>
            </div>
            <div className="card">
              <div className="font-display text-2xl text-lime-500">03</div>
              <h3 className="mt-2 font-display text-base uppercase">Review permissions</h3>
              <p className="mt-2 text-sm text-mist-400">Camera, microphone and motion/spatial sensor guidance remain off until requested.</p>
              <Link href="/app/privacy" className="btn-secondary mt-4 inline-flex">Review controls</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading eyebrow="Your member gateway" title="Go directly to what you need" description="Cards unlock once your account is verified. Account, Notifications, Privacy, Accessibility, Help/Safety and Settings stay available from the member menu." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gateway.map((g) => (
              <div key={g.title} className={`card ${verified ? "" : "opacity-60"}`}>
                <div className="text-lime-500">{g.icon}</div>
                <h3 className="mt-3 font-display text-base uppercase">{g.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{g.body}</p>
                {verified ? (
                  <Link href={g.href} className="mt-3 inline-block text-sm font-semibold text-lime-500 hover:text-lime-400">Open &rarr;</Link>
                ) : (
                  <span className="mt-3 inline-block text-sm text-mist-500">Locked until verified</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800 pb-20">
        <div className="section-inner grid items-center gap-8 rounded-md border border-ink-600 bg-ink-900 p-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-2xl">Take Knightide with you</h2>
            <p className="mt-2 text-sm text-mist-400">Download desktop, continue on mobile or tablet, then review supported VR/AR/XR devices and sensor requirements from Devices.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/devices" className="btn-primary">Download desktop</Link>
            <Link href="/devices" className="btn-secondary">Open QR handoff</Link>
          </div>
        </div>
      </section>
    </>
  );
}
