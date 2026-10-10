import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Media from "@/components/Media";
import { Checklist } from "@/components/Bits";
import { Warning, Devices, Camera, User } from "@/components/icons";

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Read before training"
        title="Prepare the person, space and equipment"
        description="Knightide offers training guidance, not medical diagnosis or emergency monitoring. Your judgment, environment and equipment remain essential. Stop whenever something feels unsafe."
        ctas={[{ label: "Open safety checklist", href: "#readiness" }]}
        mediaLabel="Trainer checking equipment with athlete"
        badge="Built for real movement"
      />

      <section className="border-t border-danger-border bg-danger-bg">
        <div className="section-inner flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <div className="flex gap-3">
            <Warning className="h-6 w-6 flex-shrink-0 text-danger-text" />
            <p className="text-sm text-danger-text">
              If there is immediate danger or a medical emergency, stop and contact local
              emergency services. Knightide Support, Human Trainers, AI Trainer and sensor
              guidance are not emergency responders.
            </p>
          </div>
          <Link href="/access" className="btn-secondary whitespace-nowrap">Leave training</Link>
        </div>
      </section>

      <section id="readiness" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Before every session"
            title="Readiness first"
            description="Use these prompts as practical checks, not as a diagnosis or guarantee that exercise is safe for you."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Personal readiness", body: "Consider pain, illness, fatigue, recent injury, medication guidance and whether you should seek appropriate professional advice." },
              { title: "Environment", body: "Clear floor and overhead space, check lighting, ventilation, people, pets and escape routes." },
              { title: "Equipment", body: "Inspect stability, fasteners, wear, load and footwear and manufacturer instructions before use." },
              { title: "Session settings", body: "Choose level, impact, pace, adaptive format and camera or sensor mode intentionally." },
            ].map((c) => (
              <div key={c.title} className="card">
                <h3 className="font-display text-base uppercase">{c.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-6 lg:grid-cols-2">
          <div className="card">
            <span className="eyebrow">Environment check</span>
            <h3 className="mt-3 font-display text-xl">Make room for the movement</h3>
            <Checklist
              items={[
                { title: "Stable, dry, uncluttered surface" },
                { title: "Enough reach, step and overhead clearance" },
                { title: "Safe distance from walls, glass and sharp edges" },
                { title: "People and pets aware of the training area" },
                { title: "VR/AR/XR boundary calibrated and still accurate" },
              ]}
            />
          </div>
          <div className="card border-amber-500/60">
            <span className="eyebrow">Equipment control</span>
            <h3 className="mt-3 font-display text-xl">Inspect before loading</h3>
            <Checklist
              items={[
                { title: "Follow manufacturer setup and load limits" },
                { title: "Replace worn wraps, bands, fasteners or cables" },
                { title: "Secure benches, bags, mats and attachments" },
                { title: "Keep device cables and stands outside movement paths" },
                { title: "Do not improvise with unsuitable household objects" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <Media label="Athlete pausing to hydrate" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="rounded-none border-0" />
          <div className="section">
            <span className="eyebrow">Stop or pause</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Intensity is never an instruction to ignore warning signs</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Pause for pain, dizziness, faintness, unusual breathlessness, loss of
              coordination, equipment failure, sensor drift, unsafe surroundings or any
              concern.
            </p>
            <Checklist
              items={[
                { title: "Stabilize first", body: "Use on-screen pause, remove equipment safely and move out of traffic." },
                { title: "Escalate appropriately", body: "Seek appropriate medical advice or emergency help based on the situation." },
              ]}
            />
            <Link href="/support" className="btn-secondary mt-6 inline-flex">Open Help / Safety</Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Responsible limits"
            title="AI and sensors do not make the space safe"
            description="Assistive features can miss context, lose tracking or produce an unsuitable cue. Human judgment and physical precautions come first."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card"><Devices className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">AI Trainer</h3><p className="mt-2 text-sm text-mist-400">Simulated guidance may be incomplete or inaccurate and does not diagnose, supervise emergencies or replace qualified context.</p></div>
            <div className="card"><Camera className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Camera checks</h3><p className="mt-2 text-sm text-mist-400">Framing, clothing, lighting, mobility and occlusion can affect camera-assisted movement checks.</p></div>
            <div className="card"><Devices className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Spatial guidance</h3><p className="mt-2 text-sm text-mist-400">Boundaries can drift; sensors may not detect every person, pet, object, surface or hazard.</p></div>
            <div className="card"><User className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Human Trainer</h3><p className="mt-2 text-sm text-mist-400">Remote trainers cannot see, hear or know everything happening around you. Describe concerns directly.</p></div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h3 className="font-display text-xl">Report an incident</h3>
            <p className="mt-2 text-sm text-mist-400">
              After immediate needs are addressed, report safety concerns, equipment
              issues, venue incidents, harmful content or unexpected system behavior from
              Help/Safety.
            </p>
            <Link href="/support" className="btn-primary mt-5 inline-flex">Start incident report</Link>
          </div>
          <div className="card">
            <h3 className="font-display text-xl">Protect the wider rhythm</h3>
            <p className="mt-2 text-sm text-mist-400">
              Rest, nutrition, sleep, recovery and mental wellbeing affect training.
              Knightide does not reward unsafe persistence or promise a result from a
              specific volume.
            </p>
            <Link href="/training" className="btn-secondary mt-5 inline-flex">Adjust training plan</Link>
          </div>
        </div>
      </section>
    </>
  );
}
