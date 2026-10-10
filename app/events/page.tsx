import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Media from "@/components/Media";
import CTABand from "@/components/CTABand";
import { Checklist, Pill } from "@/components/Bits";
import { events } from "@/lib/events";

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Feel the energy, your way"
        description="Discover boxing, MMA, Taekwondo and wider physical-training events. Join in person, watch live, catch the replay and participate through moderated member chat."
        meta="Tickets · Broadcast · Replay · Captions · Accessibility"
        ctas={[
          { label: "Browse events", href: "#calendar" },
          { label: "Member event access", href: "/access", variant: "secondary" },
        ]}
        mediaLabel="Arena crowd and boxing ring"
        badge="Built for real movement"
      />

      <section id="calendar" className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Upcoming"
            title="Four disciplines. One accessible calendar."
            description="Every listing states venue, broadcast format, ticket terms, accessibility, replay window and member entitlement."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {events.map((e) => (
              <div key={e.slug} className="card">
                <Media label={e.title} ratio="aspect-[16/9]" className="mb-4" />
                <div className="flex flex-wrap gap-2">
                  {e.tags.map((t) => <Pill key={t}>{t}</Pill>)}
                </div>
                <h3 className="mt-3 font-display text-xl uppercase">{e.title}</h3>
                <div className="mt-1 text-xs font-semibold text-amber-500">{e.date}</div>
                <p className="mt-2 text-sm text-mist-400">{e.body}</p>
                <Link href={`/events/${e.slug}`} className="mt-3 inline-block text-sm font-semibold text-lime-500 hover:text-lime-400">View event &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Media label="Boxer ring walk under lights" ratio="aspect-[4/3]" />
          <div className="card border-amber-500/60">
            <Pill>Featured &middot; Precision Night</Pill>
            <h2 className="mt-3 font-display text-3xl">Technical boxing, live and in detail</h2>
            <p className="mt-3 text-sm text-mist-400">
              Saturday 18 October &middot; 19:30. Join at the venue or watch the captioned
              broadcast. Replay available to eligible members for 30 days.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>Arena &middot; 224</Pill>
              <Pill>Broadcast &middot; 18</Pill>
              <Pill>Member replay included</Pill>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/events/precision-night" className="btn-primary">View event</Link>
              <Link href="/events/precision-night#accessibility" className="btn-secondary">Accessibility guide</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Watch and participate"
            title="Access is part of the event"
            description="Details are published before checkout so you can choose the format that works for you."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "In person · Tickets", body: "Clear seating, venue access, refund and transfer terms before payment." },
              { title: "Watch live · Live broadcast", body: "Adaptive stream quality, captions and audio controls on supported devices." },
              { title: "On demand · Replay", body: "Visible availability window, captions and chapter markers where provided." },
              { title: "Participate · Moderated chat", body: "Member-only discussion with visible rules, reporting, mute and block controls." },
            ].map((c) => (
              <div key={c.title} className="card">
                <h3 className="font-display text-base uppercase">{c.title}</h3>
                <p className="mt-2 text-sm text-mist-400">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="card">
              <h3 className="font-display text-xl">Accessibility details</h3>
              <Checklist
                items={[
                  { title: "Live and replay captions where listed" },
                  { title: "Step-free route and accessible seating information" },
                  { title: "Sensory notes, lighting warnings and quiet-space details" },
                  { title: "Assistance contact before and during the event" },
                ]}
              />
              <Link href="/support" className="btn-secondary mt-5 inline-flex">Request assistance</Link>
            </div>
            <div className="card">
              <h3 className="font-display text-xl">Moderated member chat</h3>
              <Checklist
                items={[
                  { title: "Display-name controls and private profile" },
                  { title: "Report, mute, block and leave at any time" },
                  { title: "No harassment, impersonation or unsafe training advice" },
                ]}
              />
              <Link href="/terms#event-conduct" className="btn-secondary mt-5 inline-flex">Read event conduct</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner">
          <SectionHeading
            eyebrow="After sign in"
            title="Your event access stays together"
            description="The signed-in Events destination holds tickets, joining links, calendar actions, broadcast state, replay windows and support. Notifications can be adjusted separately."
          />
        </div>
      </section>

      <CTABand
        eyebrow="Live, replay or in the room"
        title="Choose your next Knightide event"
        description="Subscribe for eligible member access, then continue through Success, Verification and Onboarding to the signed-in Events destination."
        ctas={[
          { label: "Subscribe for access", href: "/access#subscribe", variant: "amber" },
          { label: "Browse tickets", href: "#calendar", variant: "dark" },
        ]}
      />
    </>
  );
}
