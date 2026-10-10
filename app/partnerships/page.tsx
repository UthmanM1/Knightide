import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Media from "@/components/Media";
import CTABand from "@/components/CTABand";
import { Checklist, Step } from "@/components/Bits";
import { Grid, Calendar, Devices, User, Bolt, Shield } from "@/components/icons";

const sectors = [
  "Fitness brands + gyms", "Equipment + apparel", "Nutrition + wellbeing",
  "Sports federations", "Event organizers", "Technology",
  "Education", "Healthcare-adjacent services", "Other industries",
];

const models = [
  { icon: <Grid className="h-6 w-6" />, title: "Build · Training Content", body: "Co-developed plans, demonstrations or education with clear authorship, scope and review." },
  { icon: <Bolt className="h-6 w-6" />, title: "Activate · Events + Broadcasts", body: "Accessible physical-training events, production, ticketing or replay experiences." },
  { icon: <Devices className="h-6 w-6" />, title: "Connect · Equipment Integration", body: "Compatibility, setup guidance and member education — without unsupported claims." },
  { icon: <User className="h-6 w-6" />, title: "Test · Pilot Program", body: "Time-bound learning with documented safeguards, consent and success measures." },
  { icon: <Calendar className="h-6 w-6" />, title: "Learn · Education", body: "Coach, member or workforce learning with accessible delivery and measured outcomes." },
  { icon: <Shield className="h-6 w-6" />, title: "Imagine · New Opportunity", body: "Propose another lawful, safety-conscious model that creates credible member value." },
];

const notFit = [
  "Unverified performance or health claims",
  "Covert collection or unclear participant consent",
  "Products or events without credible safety controls",
  "Exclusive design that ignores reasonable access",
  "Requests to imply an existing relationship before agreement",
];

const process = [
  { number: "01", title: "Enquiry", body: "Share the need, audience, organization and proposed outcome." },
  { number: "02", title: "Eligibility review", body: "We assess fit, lawful purpose and baseline readiness." },
  { number: "03", title: "Application", body: "Add scope, evidence, team, data and accessibility details." },
  { number: "04", title: "Discovery", body: "Explore responsibilities, risks, measures and commercials." },
  { number: "05", title: "Decision", body: "Agree a written pathway, pilot or respectful close." },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Open partnership opportunities"
        title="Build training people can trust"
        description="Knightide welcomes thoughtful collaboration proposals across fitness, sport, wellbeing, technology, education and other industries — with lawful purpose, safety, access and member value at the centre."
        meta="Open invitation · No implied endorsement · No existing-client claims"
        ctas={[
          { label: "Explore opportunities", href: "#models" },
          { label: "Start an enquiry", href: "#enquiry", variant: "secondary" },
        ]}
        mediaLabel="Strategy and partnership meeting"
        badge="Built for real movement"
      />

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Who can enquire"
            title="An open door, with clear standards"
            description="We assess the proposed work rather than the size or profile of the organization. These sectors are examples, not a closed list."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s) => (
              <div key={s} className="flex items-center gap-3 rounded-md border border-ink-600 bg-ink-800 px-5 py-4 text-sm text-mist-200">
                <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-amber-500 font-display text-sm text-amber-500">K</span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="models" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Collaboration models"
            title="Start with the problem worth solving"
            description="A model can evolve after review. Initial proposals should be specific about audience, evidence, responsibilities, data, safety and success measures."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((m) => (
              <div key={m.title} className="card">
                <div className="text-lime-500">{m.icon}</div>
                <h3 className="mt-3 font-display text-base uppercase">{m.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Media label="Accessible tech innovation lab" ratio="aspect-[4/3]" />
          <div>
            <span className="eyebrow">Eligibility</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">What a credible proposal includes</h2>
            <p className="mt-4 text-sm text-mist-300">
              You do not need a finished specification. You do need enough detail for a
              responsible first review.
            </p>
            <Checklist
              items={[
                { title: "Clear purpose", body: "A specific audience need and the value the collaboration aims to create." },
                { title: "Rights and responsibility", body: "Lawful operations, ownership or permission for the content and assets proposed." },
                { title: "Responsible design", body: "Safety, accessibility, privacy and evidence and inclusive participation considered early." },
                { title: "Delivery readiness", body: "Practical people, timeline, decision-making and evaluation approach." },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Responsible boundaries</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Some proposals are not a fit</h2>
            <p className="mt-4 text-sm text-mist-300">
              Knightide will not pursue work that depends on hidden recording, biometric
              identification, medical diagnosis, deceptive endorsements, unsafe training,
              inaccessible core experiences or unlawful data use.
            </p>
          </div>
          <div className="card border-danger-border bg-danger-bg/40">
            <ul className="space-y-3 text-sm text-danger-text">
              {notFit.map((n) => (
                <li key={n} className="flex gap-3">
                  <span>&times;</span>{n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="How it works"
            title="From enquiry to accountable delivery"
            description="Submitting an enquiry does not create a partnership. Each stage has a clear decision and handoff."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p) => <Step key={p.number} {...p} />)}
          </div>
        </div>
      </section>

      <section id="enquiry" className="section border-t border-ink-800">
        <div className="section-inner grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="eyebrow">Begin with an enquiry</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Tell us what you want to build</h2>
            <p className="mt-4 max-w-md text-sm text-mist-300">
              A short enquiry should name your organization, sector, audience, opportunity,
              location, timeline and best contact. Sensitive documents are requested only
              later through protected application routes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/access" className="btn-primary">Start an enquiry</Link>
              <Link href="/support" className="btn-secondary">View application guide</Link>
            </div>
          </div>
          <div className="card">
            <h3 className="font-display text-lg uppercase">Opportunity snapshot</h3>
            <div className="mt-4 space-y-4 text-sm">
              {["Organization or group", "Sector", "What would you like to build?", "Who would benefit?", "Location and target timing"].map((label) => (
                <div key={label}>
                  <div className="mb-1 text-xs text-mist-400">{label}</div>
                  <div className="h-10 rounded-sm border border-ink-600 bg-ink-900" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-mist-500">
              Do not include confidential, medical or unnecessary personal information.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Open invitation"
        title="Bring a useful opportunity into focus"
        description="Explore collaboration models, check eligibility and start a responsible enquiry. No existing relationship is implied until a written agreement is in place."
        ctas={[
          { label: "Start an enquiry", href: "/access", variant: "amber" },
          { label: "Apply now", href: "/access", variant: "dark" },
        ]}
      />
    </>
  );
}
