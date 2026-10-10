import Link from "next/link";
import Media from "@/components/Media";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import CTABand from "@/components/CTABand";
import { Checklist, Stat, Step, Pill } from "@/components/Bits";
import { Shield, Bolt, Target, User, Chat, Calendar, Accessibility, Heart } from "@/components/icons";

const numberedFeatures = [
  { n: "01", title: "Qualified people", body: "Human Trainer profiles show relevant qualifications and session format." },
  { n: "02", title: "Clear consent", body: "Camera and sensor access is optional, explained and revocable." },
  { n: "03", title: "Adaptive formats", body: "Low-impact, seated, captioned and reduced-motion choices." },
  { n: "04", title: "One connected plan", body: "Progress synchronizes across supported devices you choose." },
];

const disciplines = [
  { icon: <Bolt className="h-6 w-6" />, title: "Gym Strength", body: "Progressive sessions, clear effort cues and adaptive formats for home or gym." },
  { icon: <Shield className="h-6 w-6" />, title: "MMA Movement", body: "Footwork, conditioning and non-contact skill practice built around safe space checks." },
  { icon: <Target className="h-6 w-6" />, title: "Boxing Craft", body: "Foundations, combinations and paced rounds with Human Trainer or AI Trainer guidance." },
  { icon: <Target className="h-6 w-6" />, title: "Taekwondo Control", body: "Balance, forms and mobility with seated and low-impact alternatives where appropriate." },
];

const devicePoints = [
  { icon: <Shield className="h-6 w-6" />, title: "Control · Privacy you can see", body: "Camera, microphone and motion/spatial sensor permissions are requested in context, can be revoked, and never imply biometric identification." },
  { icon: <Accessibility className="h-6 w-6" />, title: "Access · Accessible by design", body: "Captions, keyboard and screen-reader support, strong contrast, reduced motion, seated modes and sensory controls." },
  { icon: <Heart className="h-6 w-6" />, title: "Safety · Safety before intensity", body: "Readiness prompts, environment checks, pause/stop guidance, incident reporting and emergency redirection." },
];

const handoffSteps = [
  { number: "01", title: "Success", body: "Confirm payment, plan and entitlements." },
  { number: "02", title: "Verification", body: "Verify the email used at checkout." },
  { number: "03", title: "Generated key", body: "Store or enter your one-time member key." },
  { number: "04", title: "Onboarding", body: "Choose goals, access needs and devices." },
  { number: "05", title: "Dashboard", body: "Continue to Training, Events and more." },
];

export default function HomePage() {
  return (
    <>
      <section className="section pb-16 pt-12 sm:pt-16">
        <div className="section-inner grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Athletic intelligence, human direction</span>
            <h1 className="mt-4 text-5xl sm:text-6xl">Train beyond the expected</h1>
            <p className="mt-5 max-w-lg text-base text-mist-300">
              Knightide brings qualified Human Trainer coaching, transparent AI Trainer
              assistance, immersive events and connected progress into one safety-first
              membership.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest2 text-amber-500">
              No hidden recording &middot; Permissions are explicit and revocable
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/access#subscribe" className="btn-primary">Start membership</Link>
              <Link href="/human-ai" className="btn-secondary">See how it works</Link>
            </div>
          </div>
          <div className="relative">
            <Media label="Boxer training in gym" ratio="aspect-[4/5] lg:aspect-[16/11]" priority />
            <span className="absolute bottom-4 right-4 rounded-full border border-ink-600 bg-ink-950/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-lime-500">
              &bull; Built for real movement
            </span>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800 py-14">
        <div className="section-inner grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {numberedFeatures.map((f) => (
            <div key={f.n}>
              <div className="font-display text-3xl text-lime-500">{f.n}</div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-mist-100">{f.title}</div>
              <p className="mt-1 text-sm text-mist-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Your command centre"
            title="One dashboard. Every next move."
            description="Pick up a plan, join an event, message your Human Trainer or manage devices without losing sight of your training rhythm."
          />
          <div
            aria-hidden="true"
            className="pointer-events-none mt-10 select-none overflow-hidden rounded-md border border-ink-600 bg-ink-900"
          >
            <div className="grid lg:grid-cols-[220px_1fr]">
              <div className="border-b border-ink-700 p-5 lg:border-b-0 lg:border-r">
                <div className="text-[10px] font-semibold uppercase tracking-widest2 text-mist-500">Member workspace</div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="rounded-sm bg-lime-500 px-3 py-2 font-semibold text-ink-950">Dashboard</li>
                  <li className="px-3 py-1 text-mist-400">Training</li>
                  <li className="px-3 py-1 text-mist-400">Events</li>
                  <li className="px-3 py-1 text-mist-400">Membership</li>
                  <li className="px-3 py-1 text-mist-400">Communication</li>
                </ul>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl">Good evening</h3>
                    <p className="mt-1 text-sm text-mist-400">Your next session is ready when you are.</p>
                  </div>
                  <Pill>Illustrative preview</Pill>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="card !bg-lime-500 text-ink-950">
                    <Bolt className="h-5 w-5" />
                    <div className="mt-3 font-display text-base">This week</div>
                    <div className="mt-1 text-xs">Sessions completed, at your pace</div>
                  </div>
                  <div className="card">
                    <Calendar className="h-5 w-5 text-lime-500" />
                    <div className="mt-3 font-display text-base">Next up</div>
                    <div className="mt-1 text-xs text-mist-400">Your scheduled training session</div>
                  </div>
                  <div className="card">
                    <Chat className="h-5 w-5 text-lime-500" />
                    <div className="mt-3 font-display text-base">Human Trainer</div>
                    <div className="mt-1 text-xs text-mist-400">Form notes and new drills</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-4 rounded-md border border-ink-700 bg-ink-800 p-4 sm:flex-row sm:items-center">
                  <Media label="Session preview" ratio="aspect-[16/10]" className="w-full sm:w-56" />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest2 text-amber-500">Continue your plan</span>
                    <h4 className="mt-1 font-display text-lg">Pick up where you left off</h4>
                    <p className="mt-1 text-sm text-mist-400">
                      Warm-up, movement, paced rounds and a cooldown. Camera-assisted
                      movement checks remain off unless you enable them.
                    </p>
                    <span className="btn-primary mt-3 inline-flex opacity-70">Resume session</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-mist-500">Illustrative preview of the member dashboard. Not real member data.</p>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Training, built around you"
            title="Choose a discipline. Keep your agency."
            description="Structured plans span gym, MMA, boxing and Taekwondo, with adaptive training choices and visible safety notes before every session."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((d) => (
              <FeatureCard key={d.title} icon={d.icon} title={d.title} description={d.body} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/training" className="btn-primary">Explore training</Link>
            <Link href="/training" className="btn-secondary">View schedule</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <Media label="Human Trainer coaching a boxer" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="rounded-none border-0" />
          <div className="section">
            <span className="eyebrow">Human Trainer</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Qualified coaching, live and accountable</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Discover coaches by discipline, relevant qualifications, availability, language
              and accessible session format. Book remote or in-person sessions where offered.
            </p>
            <Checklist
              items={[
                { title: "Clear qualifications", body: "See verified qualification details and coaching scope before booking." },
                { title: "Human connection", body: "Live coaching, private messages and scheduled progress reviews." },
              ]}
            />
            <Link href="/human-ai" className="btn-primary mt-6 inline-flex">Meet Human Trainers</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <div className="section order-2 lg:order-1">
            <span className="eyebrow">AI Trainer</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">A simulated robot demonstration — never a hidden observer</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Follow clearly labeled AI Trainer demonstrations. If you opt in, camera-assisted
              movement checks can compare visible movement landmarks for general form cues —
              not identity, diagnosis or perfect accuracy.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Camera off by default</Pill>
              <Pill>Revoke anytime</Pill>
              <Pill>Accessible alternative</Pill>
            </div>
            <Link href="/human-ai" className="btn-primary mt-6 inline-flex">Understand AI Trainer</Link>
          </div>
          <Media label="Simulated AI Trainer robot" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="order-1 rounded-none border-0 lg:order-2" />
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <Media label="VR/AR/XR immersive training" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="rounded-none border-0" />
          <div className="section">
            <span className="eyebrow">VR / AR / XR</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Immersion with boundaries</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Supported headsets can use motion/spatial sensor guidance for pace, direction
              and room-aware prompts. The setup explains requirements, calibration,
              interruption recovery and sensory controls first.
            </p>
            <div className="card mt-6 max-w-md">
              <h3 className="font-display text-lg">Before immersion begins</h3>
              <Checklist
                items={[
                  { title: "Environment check", body: "Review floor area, overhead clearance, people, pets and equipment." },
                  { title: "Transparent sensors", body: "Motion/spatial sensor guidance is assistive and can be paused or disabled." },
                  { title: "Sensory alternatives", body: "Choose lower visual intensity, seated mode, captions or screen mode." },
                ]}
              />
              <Link href="/devices" className="btn-secondary mt-5 inline-flex">Explore XR training</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-10 lg:grid-cols-2">
          <div>
            <Media label="Live event crowd" ratio="aspect-[4/3]" />
            <div className="mt-6">
              <span className="eyebrow">Events</span>
              <h2 className="mt-4 text-3xl sm:text-4xl">Feel the energy, your way</h2>
              <p className="mt-4 text-sm text-mist-300">
                Tickets, member access, broadcast and replay across boxing, MMA, Taekwondo and
                physical-training showcases — with captions and moderated chat.
              </p>
              <Link href="/events" className="btn-primary mt-5 inline-flex">Browse events</Link>
            </div>
          </div>
          <div className="card border-amber-500/60">
            <span className="text-[10px] font-semibold uppercase tracking-widest2 text-amber-500">Complete membership</span>
            <div className="mt-3 font-display text-4xl">
              &pound;29 <span className="text-base font-sans font-normal text-mist-400">/ month</span>
            </div>
            <Checklist
              items={[
                { title: "Training plans and member Dashboard" },
                { title: "AI Trainer demonstrations" },
                { title: "Human Trainer discovery and messaging" },
                { title: "Selected event access and replays" },
                { title: "Desktop, mobile, tablet and supported XR" },
              ]}
            />
            <Link href="/membership" className="btn-amber mt-6 inline-flex">Compare plans</Link>
            <p className="mt-4 text-xs text-mist-500">
              Human Trainer appointments and event tickets may be priced separately. Cancel
              renewal from Membership.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Communication"
            title="Every conversation, one place"
            description="Message a Human Trainer, receive event notices and control which reminders reach you. Moderation tools and reporting remain easy to find."
          />
          <div className="mt-10 grid gap-4 overflow-hidden rounded-md border border-ink-600 lg:grid-cols-[280px_1fr]">
            <div className="border-b border-ink-700 bg-ink-900 p-4 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3 rounded-sm bg-ink-800 p-3">
                <User className="h-6 w-6 rounded-full bg-amber-500 p-1 text-ink-950" />
                <div>
                  <div className="text-sm font-semibold">Amara Okafor &middot; Human Trainer</div>
                  <div className="text-xs text-mist-500">Your footwork looked more settled today&hellip;</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 p-3">
                <User className="h-6 w-6 rounded-full bg-ink-700 p-1 text-mist-400" />
                <div>
                  <div className="text-sm text-mist-300">Precision Night &middot; Event</div>
                  <div className="text-xs text-mist-500">New update available</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 p-3">
                <User className="h-6 w-6 rounded-full bg-ink-700 p-1 text-mist-400" />
                <div>
                  <div className="text-sm text-mist-300">Knightide Support</div>
                  <div className="text-xs text-mist-500">New update available</div>
                </div>
              </div>
            </div>
            <div className="bg-ink-900 p-5">
              <div className="text-sm font-semibold">Amara Okafor &middot; Human Trainer</div>
              <div className="card mt-3">
                Strong session. Keep the defensive step smaller in rounds three and four. I
                added two drills to your plan.
              </div>
              <div className="mt-3 rounded-md bg-lime-500 p-4 text-sm text-ink-950">
                Thank you &mdash; I&rsquo;ll work through them before our review.
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-md border border-ink-700 p-3 text-sm text-mist-500">
                Write a message&hellip;
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Devices + Downloads</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Move between screens, not between plans</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Download desktop and mobile apps, continue on tablet, and connect supported
              VR/AR/XR devices. You decide what synchronizes.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Desktop</Pill>
              <Pill>Mobile</Pill>
              <Pill>Tablet</Pill>
              <Pill>VR / AR / XR</Pill>
              <Pill>Offline downloads</Pill>
            </div>
            <Link href="/devices" className="btn-secondary mt-6 inline-flex">View compatibility</Link>
          </div>
          <div className="space-y-4">
            {devicePoints.map((p) => (
              <FeatureCard key={p.title} icon={p.icon} title={p.title} description={p.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <Media label="Partnership team meeting" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="rounded-none border-0" />
          <div className="section">
            <span className="eyebrow">Open partnership opportunities</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Build useful training experiences together</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              We welcome enquiries from fitness brands, gyms, equipment and apparel teams,
              nutrition and wellbeing services, sports federations, event organizers,
              technology, education, healthcare-adjacent services and other industries.
            </p>
            <p className="mt-3 max-w-lg text-xs text-mist-500">
              No implied endorsement or existing-client claim. Every opportunity is assessed
              for lawful purpose, evidence, access, safety and member value.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/partnerships" className="btn-primary">View opportunities</Link>
              <Link href="/partnerships" className="btn-secondary">Start an enquiry</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Outcomes that matter"
            title="Consistency you can understand"
            description="Knightide surfaces progress evidence without turning training into surveillance. Review completed work, effort notes, trainer feedback and the permissions used in each session."
          />
          <div className="card mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Stat value="—" label="Sessions completed" note="Shown once you have training history" />
            <Stat value="—" label="Active training" note="Tracked automatically as you train" />
            <Stat value="—" label="Trainer reviews" note="Human feedback stored in your plan" />
            <Stat value="0" label="Identity profiles" note="Camera checks do not identify you" />
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="After you subscribe"
            title="From payment to first session, clearly"
            description="A focused handoff connects your public purchase to protected member features without leaving you guessing."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {handoffSteps.map((s) => (
              <Step key={s.number} {...s} />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Ready when you are"
        title="Build a training rhythm that belongs to you"
        description="Subscribe, verify your account and enter a member workspace designed for clear choices, accountable support and connected progress."
        ctas={[
          { label: "Choose membership", href: "/membership", variant: "amber" },
          { label: "Sign in", href: "/access", variant: "dark" },
        ]}
      />
    </>
  );
}
