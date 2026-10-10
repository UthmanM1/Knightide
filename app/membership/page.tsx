import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABand from "@/components/CTABand";
import { Checklist, Pill, FAQRow } from "@/components/Bits";
import { Grid, Bolt, User, Calendar, Devices } from "@/components/icons";

const plans = [
  {
    name: "Explorer",
    price: "£0",
    body: "Preview the platform before subscribing.",
    features: [
      "Public training and event previews",
      "Safety, accessibility and device guides",
      "Create an account and save preferences",
      "No protected training sessions",
    ],
    cta: "Start Explorer",
    variant: "secondary" as const,
  },
  {
    name: "Complete",
    price: "£29 / mo",
    badge: "Best value",
    body: "The connected Knightide membership for regular training.",
    features: [
      "Dashboard and synchronized progress",
      "Training plans and AI Trainer demonstrations",
      "Human Trainer discovery and Communication",
      "Selected event broadcasts and replays",
      "Desktop, mobile, tablet and supported XR",
    ],
    cta: "Choose Complete",
    variant: "amber" as const,
    highlight: true,
  },
  {
    name: "Flex",
    price: "£12 / mo",
    body: "A lighter plan for guided fundamentals.",
    features: [
      "Dashboard and two active plans",
      "Core AI Trainer demonstrations",
      "Public event ticket purchasing",
      "Mobile, tablet and web access",
      "Upgrade or cancel at any time",
    ],
    cta: "Choose Flex",
    variant: "secondary" as const,
  },
];

const foundations = [
  { icon: <Grid className="h-6 w-6" />, title: "Connected Dashboard", body: "See your next session, weekly rhythm, Human Trainer notes and event access." },
  { icon: <Bolt className="h-6 w-6" />, title: "Structured Training", body: "Gym, MMA, boxing and Taekwondo, with adaptive training formats." },
  { icon: <User className="h-6 w-6" />, title: "AI Trainer", body: "Clearly simulated demonstrations with optional assistive checks and limitations." },
  { icon: <User className="h-6 w-6" />, title: "Human Trainer", body: "Discover qualified coaches, book sessions and communicate securely." },
  { icon: <Calendar className="h-6 w-6" />, title: "Events", body: "Ticket purchasing, eligible broadcast, replay and moderated member chat." },
  { icon: <Devices className="h-6 w-6" />, title: "Device Continuity", body: "Synchronize progress across supported devices and downloads." },
];

const faqs = [
  { q: "Can I use Knightide without camera access?", a: "Yes. Core sessions, demonstrations, text/audio guidance and Human Trainer options remain available. Camera-assisted movement checks are optional." },
  { q: "Are Human Trainer sessions included?", a: "Discovery and Communication are included in Complete. Appointments may have separate prices shown before booking." },
  { q: "Can I change or cancel?", a: "Yes. Manage renewal or plan changes from the signed-in Membership destination. Access continues through the paid period." },
  { q: "What happens after checkout?", a: "You receive confirmation, entitlements and a generated key, then verify your account, complete onboarding and enter Dashboard." },
  { q: "Does XR work on every headset?", a: "No. Compatibility, sensor requirements and accessibility controls vary. Check Devices before purchase or setup." },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Access that moves with you"
        description="Compare consumer plans for connected training, events, devices and support. Know what is included, what may cost extra and how renewal works before checkout."
        meta="Secure checkout · Clear renewal · Manage or cancel from Membership"
        ctas={[
          { label: "Compare plans", href: "#plans" },
          { label: "Membership FAQs", href: "#faqs", variant: "secondary" },
        ]}
        mediaLabel="Group training circle"
        badge="Built for real movement"
      />

      <section id="plans" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Consumer plans"
            title="Choose the access that fits"
            description="All plans include safety, accessibility, privacy and account controls. Prices shown include applicable platform charges before any location-specific tax."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`card flex flex-col ${p.highlight ? "border-lime-500 bg-lime-500 text-ink-950" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  {p.badge && (
                    <span className="rounded-full bg-ink-950 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest2 text-lime-500">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className={`mt-2 font-display text-3xl ${p.highlight ? "text-ink-950" : "text-amber-500"}`}>{p.price}</div>
                <p className={`mt-2 text-sm ${p.highlight ? "text-ink-950/80" : "text-mist-400"}`}>{p.body}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className={p.highlight ? "text-ink-950/90" : "text-mist-300"}>
                      ✓ {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/access#subscribe"
                  className={`mt-6 inline-flex justify-center ${p.variant === "amber" ? "btn-amber" : "btn-secondary"} ${p.highlight ? "!border-ink-950" : ""}`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-mist-500">
            Human Trainer appointments, in-person venue admission, some live broadcasts,
            third-party devices and connectivity may cost extra. Exact pricing is shown
            before purchase.
          </p>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Included foundations"
            title="A membership built for repeatable progress"
            description="Move from plan to session to review without losing access to the controls that keep your training understandable."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foundations.map((f) => (
              <div key={f.title} className="card">
                <div className="text-lime-500">{f.icon}</div>
                <h3 className="mt-3 font-display text-base uppercase">{f.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-6 lg:grid-cols-2">
          <div className="card border-amber-500/60">
            <Pill>Human Trainer qualifications</Pill>
            <h3 className="mt-3 font-display text-2xl">Relevant details before you book</h3>
            <p className="mt-2 text-sm text-mist-400">
              Profiles show discipline, training scope, qualification provider or awarding
              body where relevant, experience, format, language and accessibility
              information. Knightide does not imply medical expertise.
            </p>
            <Link href="/human-ai" className="btn-secondary mt-5 inline-flex">How qualification works</Link>
          </div>
          <div className="card border-lime-500/60">
            <Pill>Device access</Pill>
            <h3 className="mt-3 font-display text-2xl">Use the screen that fits the session</h3>
            <p className="mt-2 text-sm text-mist-400">
              Complete supports desktop, mobile, tablet and compatible VR/AR/XR experiences.
              Camera and motion/spatial sensor guidance depend on device capability and your
              permission.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>Desktop</Pill>
              <Pill>Mobile</Pill>
              <Pill>Tablet</Pill>
              <Pill>VR / AR / XR</Pill>
            </div>
            <Link href="/devices" className="btn-secondary mt-5 inline-flex">Check compatibility</Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Payments"
            title="Clear before, during and after checkout"
            description="No surprise handoff. Payment confirmation connects directly to verification, onboarding and protected member destinations."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Secure checkout", body: "Payment fields are protected, with clear totals and recurring status before confirmation." },
              { title: "Receipt + key", body: "Receive a payment reference, receipt and generated one-time member key." },
              { title: "Renewal control", body: "See the next billing date, payment method and plan status in Membership." },
              { title: "Cancel or change", body: "Turn off renewal or move plans without losing access through the paid period." },
            ].map((s) => (
              <div key={s.title} className="card">
                <h3 className="font-display text-base uppercase">{s.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading eyebrow="Questions" title="Membership FAQs" description="Straight answers before you subscribe." />
          <div className="mt-8">
            {faqs.map((f) => <FAQRow key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Start with confidence"
        title="Choose your Knightide membership"
        description="Review the plan, pay securely and continue through Success → Verification → Onboarding → Dashboard."
        ctas={[
          { label: "Subscribe securely", href: "/access#subscribe", variant: "amber" },
          { label: "Sign in", href: "/access", variant: "dark" },
        ]}
      />
    </>
  );
}
