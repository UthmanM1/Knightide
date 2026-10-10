import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Media from "@/components/Media";
import CTABand from "@/components/CTABand";
import { User, Bolt, Devices, Shield, Grid, Chat } from "@/components/icons";

const values = [
  { icon: <User className="h-6 w-6" />, title: "Human Accountability", body: "Qualified Human Trainer coaching is labeled, scoped and connected to direct communication." },
  { icon: <Bolt className="h-6 w-6" />, title: "Visible Technology", body: "AI Trainer, camera-assisted movement checks and motion/spatial sensor guidance are explained in context." },
  { icon: <Devices className="h-6 w-6" />, title: "Practical Access", body: "Adaptive formats, captions, screen-reader support, controls and assistance are core work." },
  { icon: <Shield className="h-6 w-6" />, title: "Safety Over Spectacle", body: "Readiness, environment, equipment and stop guidance take priority over intensity or novelty." },
  { icon: <Grid className="h-6 w-6" />, title: "Lawful Purpose", body: "We minimize data, reject deceptive practices and evaluate partnerships against clear responsibilities." },
  { icon: <Chat className="h-6 w-6" />, title: "Plain Communication", body: "Pricing, permissions, limits, support and route handoffs use direct, readable language." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Knightide"
        title="Technology should strengthen human agency"
        description="Knightide exists to make credible training, qualified support and thoughtful athletic technology easier to access — without hiding how guidance, permissions or limitations work."
        meta="Independent purpose · Safety-first practice · Access by design"
        ctas={[
          { label: "Explore training", href: "/training" },
          { label: "Our principles", href: "#values", variant: "secondary" },
        ]}
        mediaLabel="Team celebrating after training"
        badge="Built for real movement"
      />

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <div className="section">
            <span className="eyebrow">Our mission</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Make progress feel possible, legible and yours</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              We connect training plans, Human Trainer coaching, AI Trainer demonstrations,
              events and devices in one member experience. The aim is not to automate
              judgment; it is to give people better choices and clearer support.
            </p>
            <p className="mt-5 max-w-lg border-l-2 border-amber-500 pl-4 text-sm italic text-amber-400">
              &ldquo;Strong guidance earns trust by showing its source, purpose and limits.&rdquo;
            </p>
          </div>
          <Media label="Athlete wrapping hands before training" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="rounded-none border-0" />
        </div>
      </section>

      <section id="values" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Values"
            title="The standards behind the experience"
            description="These principles apply to public pages, protected member features and partnership decisions."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="card">
                <div className="text-lime-500">{v.icon}</div>
                <h3 className="mt-3 font-display text-base uppercase">{v.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-6 lg:grid-cols-2">
          <div className="card border-amber-500/60">
            <span className="eyebrow">Qualified training</span>
            <h3 className="mt-3 font-display text-2xl">Know the person and their scope</h3>
            <p className="mt-2 text-sm text-mist-400">
              Human Trainer profiles make discipline, relevant qualifications, experience,
              language, availability and accessible format visible. Knightide does not
              present general fitness coaching as medical diagnosis or treatment.
            </p>
            <Link href="/human-ai" className="btn-amber mt-5 inline-flex">Explore Human Trainers</Link>
          </div>
          <div className="card border-lime-500/60">
            <span className="eyebrow">Technology principles</span>
            <h3 className="mt-3 font-display text-2xl">Assistive, explicit and revocable</h3>
            <p className="mt-2 text-sm text-mist-400">
              Camera and motion/spatial sensor access is requested only for a stated
              feature. Alternatives remain available. We avoid biometric identification,
              hidden recording, medical diagnosis and perfect-accuracy claims.
            </p>
            <Link href="/privacy" className="btn-primary mt-5 inline-flex">Read privacy principles</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800 bg-amber-500 px-6 py-12 text-ink-950 sm:px-10 lg:px-16">
        <div className="section-inner flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <span className="font-display text-4xl">K</span>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest2 text-ink-950/70">
              In acknowledgment
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl">
              For those whose courage shaped the people who kept moving
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-950/80">
              Knightide carries a quiet memorial acknowledgment for lives remembered by our
              founding community. It is a commitment to build with care, dignity and a
              sense of responsibility beyond performance.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Contact"
            title="Talk to the right Knightide team"
            description="For membership or technical help, use Support. For access assistance, contact Accessibility. For media, governance or general enquiries, use the form below."
          />
        </div>
      </section>

      <CTABand
        eyebrow="A clear next step"
        title="Explore Knightide or ask a question"
        description="See training, compare membership, review our safety standards or contact the team through a route designed for the purpose."
        ctas={[
          { label: "Explore Knightide", href: "/training", variant: "amber" },
          { label: "Contact us", href: "/support", variant: "dark" },
        ]}
      />
    </>
  );
}
