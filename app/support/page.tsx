import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { FAQRow } from "@/components/Bits";
import { User, CreditCard, Bolt, Calendar, Devices, Chat, Accessibility, Search, Mail, Warning } from "@/components/icons";

const topics = [
  { icon: <User className="h-6 w-6" />, title: "Account", body: "Sign in, verification, generated keys and recovery" },
  { icon: <CreditCard className="h-6 w-6" />, title: "Subscription", body: "Plans, renewals, cancellation and entitlements" },
  { icon: <Bolt className="h-6 w-6" />, title: "Training", body: "Sessions, Human Trainer, AI Trainer and progress" },
  { icon: <Calendar className="h-6 w-6" />, title: "Events", body: "Tickets, broadcasts, replay and moderated chat" },
  { icon: <Devices className="h-6 w-6" />, title: "Devices", body: "Downloads, compatibility, permissions and sync" },
  { icon: <CreditCard className="h-6 w-6" />, title: "Payments", body: "Checkout, receipts, failed charges and refunds" },
  { icon: <Chat className="h-6 w-6" />, title: "Partnerships", body: "Eligibility, enquiries, applications and access" },
  { icon: <Accessibility className="h-6 w-6" />, title: "Accessibility", body: "Captions, adaptive formats and assistance" },
];

const quickAnswers = [
  { q: "I paid but cannot enter Dashboard", a: "Confirm the checkout email, open the verification link and use your generated key only if prompted. Then retry the member gateway." },
  { q: "Camera-assisted movement checks are unavailable", a: "Check device capability and permission, improve lighting or framing, or continue with the accessible non-camera alternative." },
  { q: "My event stream has no sound or captions", a: "Check stream controls, device audio routing and the event listing. Contact event support if a listed feature is missing." },
  { q: "My training did not synchronize", a: "Confirm the same account, connectivity and sync choice. Offline progress may upload after reconnection." },
  { q: "How do I change or cancel my plan?", a: "Sign in, open Membership, review the billing date and choose Change plan or Turn off renewal." },
  { q: "Where is my partnership application?", a: "Sign in to the protected Partnerships utility using the applicant account associated with your enquiry." },
];

const contactOptions = [
  { icon: <Chat className="h-6 w-6" />, title: "Member chat", body: "Signed-in support for account, training, event and device issues.", meta: "Usually within 5 minutes · 08:00–22:00", cta: "Sign in to chat", primary: true },
  { icon: <Mail className="h-6 w-6" />, title: "Email support", body: "For public questions, attachments and non-urgent account requests.", meta: "Usually within 1 business day", cta: "Email support" },
  { icon: <Accessibility className="h-6 w-6" />, title: "Access assistance", body: "Request a format, report a barrier or plan event and training access.", meta: "Priority route · Choose contact method", cta: "Request assistance" },
];

export default function HelpPage() {
  return (
    <>
      <section className="section pb-10 pt-12 sm:pt-16">
        <div className="section-inner">
          <span className="eyebrow">Help + Support</span>
          <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl">Find the right answer, route or person</h1>
          <p className="mt-5 max-w-xl text-base text-mist-300">
            Search public guidance or sign in for account-specific help. Never send a
            password, full generated key or unnecessary health information.
          </p>
          <div className="mt-6 flex max-w-lg items-center gap-3 rounded-sm border border-ink-600 bg-ink-900 px-4 py-3">
            <Search className="h-4 w-4 text-mist-500" />
            <input
              type="text"
              placeholder="Search help..."
              className="w-full bg-transparent text-sm text-mist-200 placeholder:text-mist-500 focus:outline-none"
              disabled
            />
          </div>
        </div>
      </section>

      <section className="border-t border-b border-ink-800 bg-ink-900">
        <div className="section-inner flex flex-col gap-2 px-6 py-3 text-xs text-mist-400 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          {/* TODO: read live status and timestamp from the system_status table */}
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime-500" /> Service status loads here
          </span>
          <span>Last updated automatically &middot; View status history</span>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Browse support"
            title="Start with the topic"
            description="Each route includes common questions, troubleshooting steps and a contact path when self-service is not enough."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((t) => (
              <Link
                key={t.title}
                href={`/support/${t.title.toLowerCase()}`}
                className="card block break-words transition-colors hover:border-lime-500/60"
              >
                <div className="text-lime-500">{t.icon}</div>
                <h3 className="mt-3 font-display text-base uppercase">{t.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{t.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Popular questions"
            title="Quick answers"
            description="Account-specific status is visible after sign in."
          />
          <div className="mt-8">
            {quickAnswers.map((f) => <FAQRow key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Contact options"
            title="Choose the support path that fits"
            description="Response times are estimates, not emergency commitments."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {contactOptions.map((c) => (
              <div key={c.title} className={`card ${c.primary ? "border-lime-500/60" : ""}`}>
                <div className="text-lime-500">{c.icon}</div>
                <h3 className="mt-3 font-display text-lg uppercase">{c.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{c.body}</p>
                <div className="mt-3 text-xs font-semibold text-amber-500">{c.meta}</div>
                <Link href="/access" className={`mt-4 inline-flex ${c.primary ? "btn-primary" : "btn-secondary"}`}>
                  {c.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-danger-border bg-danger-bg">
        <div className="section-inner flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <div className="flex gap-3">
            <Warning className="h-6 w-6 flex-shrink-0 text-danger-text" />
            <p className="text-sm text-danger-text">
              Knightide is not an emergency service. For immediate danger, a medical
              emergency or an urgent safeguarding concern, stop training and contact local
              emergency or appropriate specialist services.
            </p>
          </div>
          <Link href="/safety" className="btn-secondary whitespace-nowrap">Open safety guidance</Link>
        </div>
      </section>
    </>
  );
}
