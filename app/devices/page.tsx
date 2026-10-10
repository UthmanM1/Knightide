import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Media from "@/components/Media";
import CTABand from "@/components/CTABand";
import { Checklist, Pill } from "@/components/Bits";
import { Devices as DevicesIcon, Camera, Mic, Storage } from "@/components/icons";

const platforms = [
  { title: "Desktop", meta: "Windows 11 · macOS 14+", body: "Best for full-screen sessions, downloads and device management.", cta: "Download", primary: true },
  { title: "Mobile", meta: "iOS 17+ · Android 13+", body: "Training, event access, notifications and QR handoff.", cta: "Open QR" },
  { title: "Tablet", meta: "Recent iPadOS · Android", body: "Larger demonstrations, split captions and portable plans.", cta: "Open QR" },
  { title: "VR / AR / XR", meta: "Selected supported devices", body: "Immersive sessions with optional motion/spatial sensor guidance.", cta: "View devices" },
];

const recovery = [
  "Check connection, storage and operating-system version",
  "Restart the Knightide app, not the whole session if avoidable",
  "Re-run camera framing or XR boundary calibration",
  "Switch to screen, text, audio or non-sensor mode",
  "Contact Support with device and app version — never your password or full key",
];

export default function DevicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Devices + Downloads"
        title="Train anywhere. Download once."
        description="Move between desktop, mobile, tablet and supported VR/AR/XR devices while keeping your chosen progress, privacy controls and access preferences connected."
        meta="Synchronized progress is configurable · Offline availability varies by content"
        ctas={[
          { label: "Download desktop", href: "#platforms" },
          { label: "Check compatibility", href: "#compatibility", variant: "secondary" },
        ]}
        mediaLabel="Desktop, tablet, phone and headset on a desk"
        badge="Built for real movement"
      />

      <section id="platforms" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Supported platforms"
            title="One membership, the screens you choose"
            description="Compatibility depends on operating-system version, available storage and session features. Review requirements before downloading."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p) => (
              <div key={p.title} className="card">
                <DevicesIcon className="h-6 w-6 text-lime-500" />
                <h3 className="mt-3 font-display text-lg uppercase">{p.title}</h3>
                <div className="mt-1 text-xs font-semibold text-amber-500">{p.meta}</div>
                <p className="mt-2 text-sm text-mist-400">{p.body}</p>
                <Link href="/access" className={`mt-4 inline-flex ${p.primary ? "btn-primary" : "btn-secondary"}`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="eyebrow">QR handoff</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Continue on mobile or tablet</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Scan with your device camera to open a protected handoff. Sign in, confirm the
              device and choose whether current plan progress should synchronize.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Expires in 10 minutes</Pill>
              <Pill>Single use</Pill>
              <Pill>Device confirmation</Pill>
            </div>
          </div>
          <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-md bg-mist-100 text-center text-[10px] font-semibold uppercase tracking-widest2 text-ink-950">
            Knightide secure handoff
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="grid lg:grid-cols-2">
          <Media label="Training synced across devices" ratio="aspect-[4/3] lg:aspect-auto lg:h-full" className="rounded-none border-0" />
          <div className="section">
            <span className="eyebrow">Synchronized progress</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Pick up where you left off</h2>
            <p className="mt-4 max-w-lg text-sm text-mist-300">
              Choose whether completed sessions, plan position, Human Trainer notes, event
              access and accessibility preferences synchronize across signed-in devices.
            </p>
            <Checklist
              items={[
                { title: "Review every connected device from Account" },
                { title: "Remove a device or end its protected sessions" },
                { title: "Keep downloaded content local where supported" },
              ]}
            />
            <Link href="/access" className="btn-secondary mt-6 inline-flex">Manage sync choices</Link>
          </div>
        </div>
      </section>

      <section id="compatibility" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Compatibility"
            title="Check capability before the session"
            description="Knightide detects available features only after permission. Missing sensors never imply a broken device; a non-sensor alternative is offered where possible."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card">
              <h3 className="font-display text-xl">This device</h3>
              <Checklist
                items={[
                  { title: "Camera", body: "Available · Permission not granted" },
                  { title: "Microphone", body: "Available · Permission not granted" },
                  { title: "Motion sensors", body: "Available · Device processing varies" },
                  { title: "Spatial mapping", body: "Not available · Screen alternative offered" },
                ]}
              />
              <Link href="/access" className="btn-primary mt-5 inline-flex">Run capability check</Link>
            </div>
            <div className="card border-lime-500/60">
              <h3 className="font-display text-xl">Motion/spatial sensor guidance</h3>
              <p className="mt-2 text-sm text-mist-400">
                XR guidance can use headset and controller motion, room boundaries and
                device-provided spatial mapping. It is assistive, not perfectly accurate,
                and cannot guarantee collision avoidance.
              </p>
              <Checklist
                items={[
                  { title: "Clear at least the stated floor and overhead area" },
                  { title: "Recalibrate after moving furniture or the device" },
                  { title: "Pause immediately after tracking loss or drift" },
                ]}
              />
              <Link href="/human-ai" className="btn-secondary mt-5 inline-flex">Read XR setup</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Privacy controls"
            title="Permissions belong to the device and to you"
            description="Review Knightide settings and operating-system controls. Camera, microphone and motion/spatial sensor access can be changed without deleting your account."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card"><Camera className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Camera</h3><p className="mt-2 text-sm text-mist-400">Off until a compatible feature requests explicit permission. No hidden recording or biometric identification.</p></div>
            <div className="card"><Mic className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Microphone</h3><p className="mt-2 text-sm text-mist-400">Used for live sessions or voice controls only when you enable the relevant feature.</p></div>
            <div className="card"><DevicesIcon className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Motion + spatial</h3><p className="mt-2 text-sm text-mist-400">Device guidance varies and remains revocable from the session or system settings.</p></div>
            <div className="card"><Storage className="h-6 w-6 text-lime-500" /><h3 className="mt-3 font-display text-base uppercase">Storage</h3><p className="mt-2 text-sm text-mist-400">See downloads, cached content and account data; clear local files independently.</p></div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="eyebrow">Troubleshooting</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Recover without losing control</h2>
            <p className="mt-4 text-sm text-mist-300">
              Start with the least disruptive step. Session progress is saved where
              possible, but offline or interrupted sensor data may not synchronize
              immediately.
            </p>
            <Link href="/support" className="btn-primary mt-5 inline-flex">Open device help</Link>
          </div>
          <div className="card">
            <ol className="space-y-4">
              {recovery.map((r, i) => (
                <li key={r} className="flex gap-4 text-sm text-mist-300">
                  <span className="font-display text-lime-500">{String(i + 1).padStart(2, "0")}</span>
                  {r}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Ready to connect"
        title="Download Knightide and choose what synchronizes"
        description="Subscribe, verify your account and continue to the signed-in Devices and Downloads utilities for protected setup."
        ctas={[
          { label: "Download desktop", href: "/access", variant: "dark" },
          { label: "Subscribe", href: "/access#subscribe", variant: "amber" },
        ]}
      />
    </>
  );
}
