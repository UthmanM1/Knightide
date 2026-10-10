import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { Pill, TopicChip } from "@/components/Bits";
import { Warning } from "@/components/icons";

const sections = [
  { n: "01", title: "Membership", body: "You must provide accurate account information, protect access credentials and use the member gateway only for your account. Plan entitlements, renewal date and additional charges are shown before purchase." },
  { n: "02", title: "Training participation", body: "Choose sessions appropriate to your readiness, space and equipment. Follow stop guidance and seek appropriate professional advice where needed. Training guidance is not medical diagnosis or emergency monitoring." },
  { n: "03", title: "Human Trainer services", body: "Profiles describe relevant qualifications and service scope. Appointment terms, price, format, cancellation and communication expectations are shown before booking. A trainer cannot know everything about your situation." },
  { n: "04", title: "AI Trainer and assistive checks", body: "AI Trainer demonstrations and camera-assisted movement checks may be incomplete or inaccurate. They do not identify you, diagnose conditions or guarantee form, safety or outcomes." },
  { n: "05", title: "Events and broadcasts", body: "Tickets, venue terms, access features, broadcast rights, replay window and refund terms vary by event. Do not record or redistribute protected content unless permission is stated." },
  { n: "06", title: "Payments and renewal", body: "Checkout shows the total, recurring status and payment timing. You can manage or turn off renewal from Membership. Access continues through the paid period unless law or serious misuse requires otherwise." },
  { n: "07", title: "Devices and downloads", body: "You are responsible for compatible devices, updates, connectivity, safe setup and manufacturer instructions. Downloads are for authorized use and may expire with rights or membership." },
  { n: "08", title: "Acceptable conduct", body: "Do not harass, impersonate, exploit, disrupt, share unsafe advice, evade access controls or use Knightide for unlawful activity. Use report, mute and block tools where relevant." },
  { n: "09", title: "Partnership opportunities", body: "An enquiry or application does not create approval, endorsement, exclusivity or an existing relationship. Collaboration requires separate written agreement, rights, responsibilities and lawful use." },
  { n: "10", title: "Safety limitations", body: "Knightide cannot make your body, space, equipment or network risk-free. Camera and motion/spatial sensor guidance can lose context or tracking. Stop and contact appropriate emergency services for immediate danger." },
];

const chips = ["Membership", "Training participation", "Human Trainer services", "AI Trainer and assistive checks", "Events and broadcasts", "Payments and renewal", "Devices and downloads", "Acceptable conduct", "Partnership opportunities", "Safety limitations"];

export default function TermsPage() {
  return (
    <>
      <section className="section pb-10 pt-12 sm:pt-16">
        <div className="section-inner max-w-3xl">
          {/* TODO: read the real effective date from the content file */}
          <Pill>Terms &middot; Effective date loads here</Pill>
          <h1 className="mt-4 text-4xl sm:text-5xl">Readable terms for training, events and membership</h1>
          <p className="mt-5 text-base text-mist-300">
            These summaries help you understand the agreement. They do not replace the full
            legal terms, event-specific terms, checkout information or notices shown when a
            feature is used.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#summaries" className="btn-primary">Download full terms</Link>
            <Link href="/support" className="btn-secondary">Contact support</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-b border-ink-800 bg-ink-900">
        <div className="section-inner flex flex-wrap gap-2 px-6 py-4 sm:px-10 lg:px-16">
          {chips.map((c, i) => (
            <TopicChip key={c}>{String(i + 1).padStart(2, "0")} {c}</TopicChip>
          ))}
        </div>
      </section>

      <section id="summaries" className="section">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Key summaries"
            title="What you agree to"
            description="Open the full section for definitions, exceptions, legal rights and region-specific information."
          />
          <div className="mt-8 divide-y divide-ink-700 rounded-md border border-ink-600 bg-ink-900">
            {sections.map((s) => (
              <div key={s.n} className="grid gap-3 p-6 sm:grid-cols-[60px_1fr_auto] sm:items-center">
                <div className="font-display text-2xl text-lime-500">{s.n}</div>
                <div>
                  <h3 className="font-display text-lg uppercase">{s.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-mist-400">{s.body}</p>
                </div>
                <Link href="/support" className="text-sm font-semibold text-lime-500 hover:text-lime-400 whitespace-nowrap">
                  Full section &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-amber-500 bg-amber-500 px-6 py-6 text-ink-950 sm:px-10 lg:px-16">
        <div className="section-inner flex gap-3">
          <Warning className="h-6 w-6 flex-shrink-0" />
          <div>
            <div className="font-display text-lg uppercase">Stop when training feels unsafe</div>
            <p className="mt-1 text-sm text-ink-950/80">
              No feature, Human Trainer, AI Trainer, camera-assisted movement check or
              motion/spatial sensor guidance can guarantee safety or perfect accuracy. For
              immediate danger or a medical emergency, contact local emergency services.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Questions about the agreement"
            title="Ask before you commit"
            description="Contact legal@knightide.com for terms questions or Support for account, payment, training and device help. Accessibility assistance is available in your chosen contact format."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="mailto:legal@knightide.com" className="btn-primary">Ask about terms</Link>
            <Link href="/support" className="btn-secondary">Open support</Link>
          </div>
        </div>
      </section>
    </>
  );
}
