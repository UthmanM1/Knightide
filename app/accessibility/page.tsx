import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Media from "@/components/Media";
import CTABand from "@/components/CTABand";
import { Checklist, Pill } from "@/components/Bits";

const ways = [
  { title: "Captions", body: "Live and replay captions, adjustable text size and readable placement." },
  { title: "Screen-reader support", body: "Semantic headings, labels, landmarks, status messages and logical focus order." },
  { title: "Contrast + type", body: "Near-black surfaces, strong contrast, scalable type and non-color status cues." },
  { title: "Reduced motion", body: "Reduce transitions, parallax, animation intensity and immersive movement effects." },
  { title: "Keyboard control", body: "Operate core web routes, media and forms without a pointer where supported." },
  { title: "Audio controls", body: "Independent volume, text alternatives and transcript support for key content." },
];

const preferences = {
  visual: [
    { label: "High contrast", value: "On" },
    { label: "Reduced motion", value: "On" },
    { label: "Larger captions", value: "On" },
    { label: "Focus highlight", value: "Strong" },
  ],
  training: [
    { label: "Seated alternatives", value: "Prefer" },
    { label: "Low impact", value: "Prefer" },
    { label: "Audio pacing", value: "Off" },
    { label: "Camera checks", value: "Ask every time" },
  ],
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Train, watch and communicate in the format you need"
        description="Knightide supports multiple ways to perceive, navigate and participate. Preferences can be saved, changed per session and discussed with a Human Trainer."
        ctas={[
          { label: "Set access preferences", href: "#preferences" },
          { label: "Request assistance", href: "#assistance", variant: "secondary" },
        ]}
        mediaLabel="Adaptive strength training session"
        badge="Built for real movement"
      />

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Digital access"
            title="More than one way through every route"
            description="Availability can vary by content and device; event and session listings identify supported features before purchase or start."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ways.map((w) => (
              <div key={w.title} className="card">
                <h3 className="font-display text-base uppercase">{w.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <Media label="Trainer assisting wheelchair user" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="rounded-none border-0" />
          <div className="section">
            <span className="eyebrow">Adaptive training</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">A different format is still real training</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Where appropriate, choose seated, supported, low-impact, reduced-range or
              slower-pace movements. Review the intended equipment, space and support
              before starting.
            </p>
            <Checklist
              items={[
                { title: "Preview alternatives before the movement begins" },
                { title: "Save seated or low-impact preferences to your profile" },
                { title: "Filter Human Trainers by accessible session format" },
              ]}
            />
            <Link href="/training" className="btn-primary mt-6 inline-flex">Explore adaptive training</Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-6 lg:grid-cols-2">
          <div className="card border-lime-500/60">
            <span className="eyebrow">Sensory controls</span>
            <h3 className="mt-3 font-display text-xl">Tune the intensity around the training</h3>
            <Checklist
              items={[
                { title: "Reduce flashing, motion and visual density" },
                { title: "Mute sound effects while keeping spoken cues" },
                { title: "Use captions, transcripts or text-only instructions" },
                { title: "Switch XR to screen or seated mode where offered" },
              ]}
            />
          </div>
          <div className="card border-amber-500/60">
            <span className="eyebrow">Language</span>
            <h3 className="mt-3 font-display text-xl">Understand the instruction and the limit</h3>
            <p className="mt-2 text-sm text-mist-400">
              Interface and caption languages vary by content. Human Trainer profiles list
              languages. Machine-generated translation, where used, is labeled and may
              contain errors.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>English</Pill>
              <Pill>French</Pill>
              <Pill>Spanish</Pill>
              <Pill>BSL listed events</Pill>
              <Pill>More planned</Pill>
            </div>
            <Link href="/support" className="btn-secondary mt-5 inline-flex">View language support</Link>
          </div>
        </div>
      </section>

      <section id="preferences" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Your preferences"
            title="Set once, change anytime"
            description="Accessibility preferences are available from onboarding and the signed-in Accessibility utility. A session can override them temporarily without changing the account default."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="card">
              <h3 className="font-display text-base uppercase text-mist-300">Visual</h3>
              <ul className="mt-4 divide-y divide-ink-700">
                {preferences.visual.map((p) => (
                  <li key={p.label} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-mist-200">{p.label} &middot; {p.value}</span>
                    <Link href="/access" className="text-xs font-semibold uppercase text-lime-500 hover:text-lime-400">Change</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="font-display text-base uppercase text-mist-300">Training</h3>
              <ul className="mt-4 divide-y divide-ink-700">
                {preferences.training.map((p) => (
                  <li key={p.label} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-mist-200">{p.label} &middot; {p.value}</span>
                    <Link href="/access" className="text-xs font-semibold uppercase text-lime-500 hover:text-lime-400">Change</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="assistance" className="section border-t border-ink-800 pb-0">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Assistance contact"
            title="Tell us where access breaks down"
            description="Request help before a session or event, report an accessibility barrier, or ask about a format not yet listed. Include the route, device and preferred contact method; avoid unnecessary health information."
          />
        </div>
      </section>

      <CTABand
        eyebrow="Access support"
        title="We will help you find a workable route"
        description="Contact accessibility@knightide.com or open signed-in Accessibility for preferences and saved assistance requests."
        ctas={[
          { label: "Request assistance", href: "/support", variant: "amber" },
          { label: "Report a barrier", href: "/support", variant: "dark" },
        ]}
      />
    </>
  );
}
