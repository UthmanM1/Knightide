import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { Pill } from "@/components/Bits";
import { Sliders, Eye, Grid, Devices as DevicesIcon, Camera, Mic, User, Bolt, Shield, Chat } from "@/components/icons";

const glance = [
  { icon: <Sliders className="h-6 w-6" />, title: "Purpose first", body: "We explain why information is needed and do not silently repurpose sensitive data." },
  { icon: <Eye className="h-6 w-6" />, title: "Choice in context", body: "Camera, microphone and motion/spatial sensor guidance activate only after a clear request." },
  { icon: <Grid className="h-6 w-6" />, title: "Data minimization", body: "We limit collection, retention and sharing to what the feature reasonably requires." },
  { icon: <DevicesIcon className="h-6 w-6" />, title: "User rights", body: "Use account tools to review, export, correct or request deletion of eligible data." },
];

const sensors = [
  { icon: <Camera className="h-5 w-5" />, name: "Camera", use: "Live Human Trainer video and optional camera-assisted movement checks.", retention: "Off until requested. Raw movement video is not stored by default." },
  { icon: <Mic className="h-5 w-5" />, name: "Microphone", use: "Live session audio or voice controls you enable.", retention: "Visible controls to mute, leave and revoke access." },
  { icon: <DevicesIcon className="h-5 w-5" />, name: "Motion sensors", use: "Device orientation, controller movement or pace guidance on supported devices.", retention: "Assistive only; availability and processing vary by device." },
  { icon: <DevicesIcon className="h-5 w-5" />, name: "Spatial sensors", use: "XR room boundary, direction and spatial prompt support where available.", retention: "Cannot detect every hazard or guarantee collision avoidance." },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="section pb-10 pt-12 sm:pt-16">
        <div className="section-inner max-w-3xl">
          {/* TODO: read the real last-updated date from the content file */}
          <Pill>Privacy &middot; Last updated date loads here</Pill>
          <h1 className="mt-4 text-4xl sm:text-5xl">Understand what Knightide uses — and what it does not</h1>
          <p className="mt-5 text-base text-mist-300">
            This readable overview explains camera, microphone, motion/spatial sensors,
            account data, connected devices, analytics and partnership enquiries. Detailed
            notices appear at the point of collection.
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest2 text-amber-500">
            No biometric identification. No hidden recording. No medical diagnosis.
            Permissions are explicit and revocable.
          </p>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="At a glance"
            title="Purpose, choice and proportion"
            description="Knightide aims to collect the minimum information needed for the route or feature you choose."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {glance.map((g) => (
              <div key={g.title} className="card">
                <div className="text-lime-500">{g.icon}</div>
                <h3 className="mt-3 font-display text-base uppercase">{g.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Camera, microphone and sensors"
            title="Permission is not the same as constant use"
            description="Operating-system permission makes a feature possible; an in-product indicator shows when Knightide is actually using it."
          />
          <div className="mt-8 divide-y divide-ink-700 rounded-md border border-ink-600 bg-ink-900">
            {sensors.map((s) => (
              <div key={s.name} className="grid gap-3 p-5 sm:grid-cols-[160px_1fr_1fr] sm:items-center">
                <div className="flex items-center gap-2 font-display text-sm uppercase text-lime-500">
                  {s.icon}{s.name}
                </div>
                <div className="text-sm text-mist-200">{s.use}</div>
                <div className="text-xs text-mist-500">{s.retention}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-6 lg:grid-cols-2">
          <div className="card border-lime-500/60">
            <span className="eyebrow">Local + cloud processing</span>
            <h3 className="mt-3 font-display text-xl">Use the least exposed path available</h3>
            <p className="mt-2 text-sm text-mist-400">
              Some compatible devices can process movement landmarks locally. Live
              communications, synchronization and selected AI Trainer features may require
              cloud processing. The feature notice identifies the available path before use.
            </p>
            <div className="mt-3"><Pill>Availability varies by device and region</Pill></div>
          </div>
          <div className="card border-amber-500/60">
            <span className="eyebrow">Storage</span>
            <h3 className="mt-3 font-display text-xl">Different data, different retention</h3>
            <p className="mt-2 text-sm text-mist-400">
              Account, payment reference, training progress, messages, event access,
              support and partnership records follow documented retention periods. Local
              downloads can be removed separately from cloud account records.
            </p>
            <Link href="/support" className="btn-secondary mt-4 inline-flex">View retention table</Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Accounts and measurement"
            title="Connected devices, sessions and analytics"
            description="You can see signed-in devices and close protected sessions. Analytics are limited to operating, securing and improving Knightide, with choices where required."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card"><DevicesIcon className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Connected devices</h3><p className="mt-2 text-sm text-mist-400">See device type, approximate sign-in time and active session; remove access you do not recognize.</p></div>
            <div className="card"><Bolt className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Product analytics</h3><p className="mt-2 text-sm text-mist-400">Measure route performance and reliability using minimized or aggregated signals where possible.</p></div>
            <div className="card"><Shield className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Security records</h3><p className="mt-2 text-sm text-mist-400">Protect accounts, investigate abuse and preserve relevant logs for defined periods.</p></div>
            <div className="card"><Chat className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Notifications</h3><p className="mt-2 text-sm text-mist-400">Choose operational, training, event and marketing messages separately where available.</p></div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h3 className="font-display text-xl">Export, correct or delete</h3>
            <ul className="mt-3 space-y-2 text-sm text-mist-300">
              <li>✓ Export eligible account, progress and settings data</li>
              <li>✓ Correct profile and preference information</li>
              <li>✓ Delete local downloads without deleting the account</li>
              <li>✓ Request account deletion, subject to lawful retention</li>
            </ul>
            <Link href="/access" className="btn-primary mt-5 inline-flex">Open privacy controls</Link>
          </div>
          <div className="card">
            <h3 className="font-display text-xl">Partnership enquiry data</h3>
            <p className="mt-2 text-sm text-mist-400">
              We use organization, contact, proposal, eligibility and application
              information to assess and communicate about the opportunity. Do not submit
              confidential, medical or unnecessary personal information at enquiry stage.
            </p>
            <Link href="/partnerships" className="btn-secondary mt-5 inline-flex">Partnership privacy</Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Contact"
            title="Ask about your information"
            description="Use privacy@knightide.com for rights requests or questions. We may need to verify the request without asking for your password or full generated key."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="mailto:privacy@knightide.com" className="btn-primary">Make a privacy request</Link>
            <Link href="/support" className="btn-secondary">Download full notice</Link>
          </div>
        </div>
      </section>
    </>
  );
}
