import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Media from "@/components/Media";
import CTABand from "@/components/CTABand";
import { Checklist, Pill } from "@/components/Bits";
import { Check, Shield, Sliders } from "@/components/icons";

const plans = [
  { tag: "Gym", title: "Strength foundations", meta: "38 min · Beginner", body: "Progressive resistance, clear rest and equipment alternatives." },
  { tag: "MMA", title: "Movement + conditioning", meta: "32 min · All levels", body: "Non-contact footwork, balance and controlled conditioning." },
  { tag: "Boxing", title: "Boxing foundations", meta: "34 min · Level 2", body: "Defensive steps, combinations and paced rounds." },
  { tag: "Taekwondo", title: "Control + mobility", meta: "29 min · Beginner", body: "Stance, balance, forms and low-impact alternatives." },
];

const schedule = [
  { time: "Mon 18:30", session: "Boxing foundations · L2", guidance: "AI Trainer", access: "Captioned · Low impact option" },
  { time: "Tue 12:00", session: "Gym strength essentials", guidance: "Human Trainer", access: "Live remote · Seated option" },
  { time: "Thu 19:00", session: "MMA movement + conditioning", guidance: "Human Trainer", access: "Live studio · Step-free" },
  { time: "Sat 10:30", session: "Taekwondo control + mobility", guidance: "AI Trainer", access: "Audio cues · Reduced motion" },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training"
        title="Train for your next milestone"
        description="Choose structured gym, MMA, boxing and Taekwondo plans. Adapt each session, work with a qualified Human Trainer or follow a clearly labeled AI Trainer demonstration."
        meta="Readiness check before every session · Pause or stop anytime"
        ctas={[
          { label: "Explore sessions", href: "#plans" },
          { label: "View weekly schedule", href: "#schedule", variant: "secondary" },
        ]}
        mediaLabel="Group training session"
        badge="Built for real movement"
      />

      <section id="plans" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Four ways to move"
            title="Focused plans, no guesswork"
            description="Every plan states the intended level, equipment, space, impact, duration and available accessible alternatives before you begin."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => (
              <div key={p.title} className="card">
                <Media label={p.title} ratio="aspect-[4/3]" className="mb-4" />
                <Pill>{p.tag}</Pill>
                <h3 className="mt-3 font-display text-lg uppercase">{p.title}</h3>
                <div className="mt-1 text-xs font-semibold text-amber-500">{p.meta}</div>
                <p className="mt-2 text-sm text-mist-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <div className="section">
            <span className="eyebrow">Adaptive training</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Change the session, not the goal</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Choose seated, low-impact, reduced-range, slower-pace, audio-led or
              caption-led formats where available. Your access preferences can be
              saved and changed.
            </p>
            <Checklist
              items={[
                { title: "Know what is coming", body: "Preview movement, impact and equipment before committing." },
                { title: "Stay in control", body: "Pause, skip or replace a movement without losing the plan." },
              ]}
            />
            <Link href="/accessibility" className="btn-primary mt-6 inline-flex">See adaptive options</Link>
          </div>
          <Media label="Trainer assisting seated session" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="rounded-none border-0" />
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Choose your guidance"
            title="Human Trainer or AI Trainer"
            description="Switch by session. Human Trainer means live qualified coaching; AI Trainer means simulated demonstrations and optional assistive checks with visible permission controls."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card border-amber-500/60">
              <Pill>Human Trainer</Pill>
              <h3 className="mt-3 font-display text-2xl">Live coaching and direct feedback</h3>
              <Checklist
                items={[
                  { title: "Visible discipline-relevant qualifications" },
                  { title: "Remote or in-person format where offered" },
                  { title: "Messaging, booking and progress review" },
                  { title: "Accessible format and language filters" },
                ]}
              />
              <Link href="/human-ai" className="btn-amber mt-6 inline-flex">Find a Human Trainer</Link>
            </div>
            <div className="card border-lime-500/60">
              <Pill>AI Trainer</Pill>
              <h3 className="mt-3 font-display text-2xl">Simulated robot demonstrations</h3>
              <Checklist
                items={[
                  { title: "Clear synthetic labeling throughout" },
                  { title: "Camera-assisted movement checks only with consent" },
                  { title: "No biometric identification or diagnosis" },
                  { title: "Manual and audio-only alternatives" },
                ]}
              />
              <Link href="/human-ai" className="btn-primary mt-6 inline-flex">Understand AI Trainer</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-6 sm:grid-cols-3">
          <div className="card">
            <Check className="h-6 w-6 text-lime-500" />
            <h3 className="mt-3 font-display text-base uppercase">Qualifications · Know who is guiding you</h3>
            <p className="mt-2 text-sm text-mist-400">
              Human Trainer profiles describe relevant qualifications, experience, languages,
              session types and scope. They do not imply medical credentials unless expressly
              and lawfully stated.
            </p>
          </div>
          <div className="card">
            <Shield className="h-6 w-6 text-lime-500" />
            <h3 className="mt-3 font-display text-base uppercase">Safety · Readiness before intensity</h3>
            <p className="mt-2 text-sm text-mist-400">
              Review environment, equipment and wellbeing prompts. Stop for pain, dizziness,
              unusual breathlessness or equipment failure and seek appropriate help.
            </p>
          </div>
          <div className="card">
            <Sliders className="h-6 w-6 text-lime-500" />
            <h3 className="mt-3 font-display text-base uppercase">Control · Permissions stay visible</h3>
            <p className="mt-2 text-sm text-mist-400">
              Camera-assisted movement checks and motion/spatial sensor guidance are optional,
              assistive and revocable from the session or Settings.
            </p>
          </div>
        </div>
      </section>

      <section id="schedule" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Weekly schedule"
            title="Choose when and where"
            description="Live Human Trainer availability, guided plan releases and community sessions — filtered by format, impact, language and access needs."
          />
          <div className="mt-8 overflow-hidden rounded-md border border-ink-600">
            <table className="w-full text-left text-sm">
              <thead className="bg-lime-500 text-ink-950">
                <tr>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wide">Time</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wide">Session</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wide">Guidance</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wide">Format / Access</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={row.time} className={i % 2 === 0 ? "bg-ink-900" : "bg-ink-950"}>
                    <td className="px-5 py-4 font-semibold text-amber-500">{row.time}</td>
                    <td className="px-5 py-4 text-mist-100">{row.session}</td>
                    <td className="px-5 py-4 text-mist-300">{row.guidance}</td>
                    <td className="px-5 py-4 text-mist-400">{row.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Membership unlocks the plan"
        title="Start with a clear training setup"
        description="Subscribe, choose your disciplines and access preferences, then continue to the protected Dashboard and Training destinations."
        ctas={[
          { label: "Subscribe for training", href: "/access#subscribe", variant: "amber" },
          { label: "Compare plans", href: "/membership", variant: "dark" },
        ]}
      />
    </>
  );
}
