import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Media from "@/components/Media";
import CTABand from "@/components/CTABand";
import { Checklist, Pill } from "@/components/Bits";
import { Eye, Camera, Accessibility } from "@/components/icons";

export default function HumanAiPage() {
  return (
    <>
      <PageHero
        eyebrow="Human + AI"
        title="Guidance with a clear source"
        description="Choose qualified Human Trainer coaching or a clearly simulated AI Trainer demonstration. Every camera or sensor feature explains what it does before you decide."
        meta="Human coaching is always labeled · AI output may be incomplete or inaccurate"
        ctas={[
          { label: "Compare guidance", href: "#compare" },
          { label: "Review privacy controls", href: "/privacy", variant: "secondary" },
        ]}
        mediaLabel="Boxer and simulated AI Trainer robot"
        badge="Built for real movement"
      />

      <section id="compare" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Choose deliberately"
            title="Two modes. Different strengths."
            description="Knightide does not blur human judgment with generated guidance. The trainer source, available controls and limitations stay visible throughout."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card border-amber-500/60">
              <Pill>Human Trainer</Pill>
              <h3 className="mt-3 font-display text-2xl">Qualified live coaching</h3>
              <p className="mt-2 text-sm text-mist-400">
                Conversation, observation, personal context and accountable follow-up.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest2 text-amber-500">
                Qualifications &middot; Booking &middot; Messaging
              </p>
              <Link href="/access" className="btn-amber mt-6 inline-flex">Find a Human Trainer</Link>
            </div>
            <div className="card border-lime-500/60">
              <Pill>AI Trainer</Pill>
              <h3 className="mt-3 font-display text-2xl">Simulated robot demonstration</h3>
              <p className="mt-2 text-sm text-mist-400">
                Repeatable demonstrations, timing prompts and optional assistive movement checks.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest2 text-lime-500">
                Synthetic &middot; On demand &middot; Limited
              </p>
              <Link href="/access" className="btn-primary mt-6 inline-flex">Try a demonstration</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <Media label="Human Trainer coaching, laptop reviewing form" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="rounded-none border-0" />
          <div className="section">
            <span className="eyebrow">Human Trainer</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Live coaching, qualified and visible</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Filter by discipline, relevant qualifications, language, availability, location
              and accessible format. Profiles explain scope before you book.
            </p>
            <Checklist
              items={[
                { title: "Relevant qualification information", body: "See awarding body or provider, discipline and renewal details where relevant." },
                { title: "Live-session controls", body: "Prepare in a private lobby, test audio and choose camera on or off." },
                { title: "Accountable follow-up", body: "Message, report, reschedule or review notes from Communication." },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <div className="section order-2 lg:order-1">
            <span className="eyebrow">AI Trainer</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">A simulated robot, not a person</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              AI Trainer demonstrations show movement sequences, timing and general cues.
              They can be repeated, slowed down or replaced with text and audio instructions.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>May be inaccurate</Pill>
              <Pill>Not medical advice</Pill>
              <Pill>No identity matching</Pill>
            </div>
            <p className="mt-4 max-w-lg text-sm text-mist-400">
              Stop when something feels unsafe. Use a Human Trainer for nuanced observation
              or context the system cannot know.
            </p>
          </div>
          <Media label="AI Trainer robot demonstration" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="order-1 rounded-none border-0 lg:order-2" />
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Explicit camera permission"
            title="Nothing activates until you choose"
            description="Camera-assisted movement checks are optional. The request appears only when a compatible session can use them, and permission can be denied, paused or revoked without losing the core session."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="card border-lime-500/60">
              <div className="flex items-center gap-2 text-lime-500">
                <Camera className="h-5 w-5" />
                <span className="text-sm font-semibold">Allow camera-assisted movement checks?</span>
              </div>
              <p className="mt-3 text-sm text-mist-400">
                If enabled, Knightide analyzes visible movement landmarks during this session
                to offer general pace, range and alignment cues. This is not biometric
                identification, hidden recording, medical diagnosis or a guarantee of accuracy.
              </p>
              <Checklist
                items={[
                  { title: "Camera is used only while the check is visibly active" },
                  { title: "Raw video is not saved by default" },
                  { title: "Revoke from session controls or Settings" },
                ]}
              />
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/access" className="btn-primary">Allow this session</Link>
                <Link href="/access" className="btn-secondary">Continue without camera</Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="card">
                <Eye className="h-5 w-5 text-lime-500" />
                <h3 className="mt-2 font-display text-base uppercase">Transparency · Visible when active</h3>
                <p className="mt-2 text-sm text-mist-400">An on-screen indicator remains present while camera-assisted movement checks are running.</p>
              </div>
              <div className="card">
                <Eye className="h-5 w-5 text-lime-500" />
                <h3 className="mt-2 font-display text-base uppercase">Control · Revocable by default</h3>
                <p className="mt-2 text-sm text-mist-400">Pause for a movement, stop for the session, or remove permission at operating-system level.</p>
              </div>
              <div className="card">
                <Accessibility className="h-5 w-5 text-lime-500" />
                <h3 className="mt-2 font-display text-base uppercase">Access · Accessible alternatives</h3>
                <p className="mt-2 text-sm text-mist-400">Use text steps, audio pacing, keyboard controls, a Human Trainer or the demonstration without checks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Calibration"
            title="Check the space before the movement"
            description="Calibration helps frame the visible training area. It checks light, distance and clearance; it does not identify you or certify the space as risk-free."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Frame", body: "Place the device so your training area is visible." },
              { title: "Light", body: "Use even light and avoid strong backlighting." },
              { title: "Space", body: "Clear floor, overhead area, people, pets and equipment." },
              { title: "Test", body: "Complete one slow reference movement and review confidence." },
            ].map((s) => (
              <div key={s.title} className="card">
                <h3 className="font-display text-base uppercase">{s.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="card mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <Media label="Posture analysis overlay" ratio="aspect-[4/3]" />
            <div>
              <Pill>Camera-assisted movement check &middot; Active</Pill>
              <h3 className="mt-3 font-display text-xl">General cue: reduce depth slightly</h3>
              <p className="mt-2 text-sm text-mist-400">
                The visible movement appears less stable near the bottom. Try a smaller
                range, use support, or continue without the check. The cue may be wrong if
                framing, clothing, lighting or mobility differs.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/access" className="btn-primary">Try smaller range</Link>
                <Link href="/access" className="btn-secondary">Turn camera off</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <Media label="XR headset with room-aware overlay" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="rounded-none border-0" />
          <div className="section">
            <span className="eyebrow">Motion/spatial sensor guidance</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Room-aware prompts, when you opt in</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Supported XR devices may use headset or controller motion and spatial mapping
              for direction, pacing and boundary reminders. Requirements and device processing
              vary.
            </p>
            <Checklist
              items={[
                { title: "Review device permissions and sensor availability" },
                { title: "Pause after tracking interruption or drift" },
                { title: "Use seated, screen or non-sensor alternatives" },
              ]}
            />
            <Link href="/devices" className="btn-secondary mt-6 inline-flex">Review compatible devices</Link>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Guidance without ambiguity"
        title="Choose who — or what — guides each session"
        description="Subscribe to compare Human Trainer options, explore AI Trainer demonstrations and set camera, sensor and accessibility preferences before training begins."
        ctas={[
          { label: "Subscribe now", href: "/access#subscribe", variant: "amber" },
          { label: "Read privacy", href: "/privacy", variant: "dark" },
        ]}
      />
    </>
  );
}
