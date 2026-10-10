"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import Media from "@/components/Media";
import CTABand from "@/components/CTABand";
import { Checklist, Pill } from "@/components/Bits";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { getEventBySlug } from "@/lib/events";

export default function EventDetailPage() {
  const params = useParams<{ slug: string }>();
  const event = getEventBySlug(params.slug);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [assistOpen, setAssistOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <section className="section pb-10 pt-12 sm:pt-16">
        <div className="section-inner grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
              {event.featured && <Pill>Featured</Pill>}
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl">{event.title}</h1>
            <p className="mt-5 max-w-lg text-base text-mist-300">{event.body}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest2 text-amber-500">
              {event.date} &middot; {event.venue}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => setTicketOpen(true)} className="btn-primary">
                Choose tickets
              </button>
              <Link href="#accessibility" className="btn-secondary">
                Accessibility guide
              </Link>
            </div>
          </div>
          <Media label={event.featured ? "Boxer ring walk under lights" : event.title} ratio="aspect-[16/11]" />
        </div>
      </section>

      <section className="section border-t border-ink-800">
        <div className="section-inner grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card">
            <h3 className="font-display text-base uppercase">Formats</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {event.formats.map((f) => (
                <Pill key={f}>{f}</Pill>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="font-display text-base uppercase">Ticket types</h3>
            <ul className="mt-3 space-y-1 text-sm text-mist-300">
              {event.ticketTypes.map((t) => (
                <li key={t.name} className="flex justify-between">
                  <span>{t.name}</span>
                  <span className="text-amber-500">{t.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="font-display text-base uppercase">Replay window</h3>
            <p className="mt-3 text-sm text-mist-400">{event.replayWindow}</p>
          </div>
        </div>
      </section>

      <section id="accessibility" className="section border-t border-ink-800 scroll-mt-24">
        <div className="section-inner grid gap-6 lg:grid-cols-2">
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
            <button type="button" onClick={() => setAssistOpen(true)} className="btn-secondary mt-5 inline-flex">
              Request assistance
            </button>
          </div>
          <div className="card">
            <h3 className="font-display text-xl">Event conduct</h3>
            <p className="mt-3 text-sm text-mist-400">
              Ticket terms, refund policy and code of conduct for this event are covered in
              our Terms.
            </p>
            <Link href="/terms#event-conduct" className="btn-secondary mt-5 inline-flex">
              Read event conduct
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Live, replay or in the room"
        title={`Get your ${event.title} tickets`}
        description="Subscribe for eligible member access, or buy a single ticket for this event."
        ctas={[
          { label: "Subscribe for access", href: "/access#subscribe", variant: "amber" },
          { label: "Browse all events", href: "/events", variant: "dark" },
        ]}
      />

      <Modal open={ticketOpen} onClose={() => setTicketOpen(false)} title={`Tickets · ${event.title}`}>
        {/* TODO: wire to Stripe Checkout for one-off ticket purchase, quantities from ticket_types table */}
        <div className="space-y-4">
          {event.ticketTypes.map((t) => (
            <div key={t.name} className="flex items-center justify-between rounded-sm border border-ink-600 bg-ink-900 px-4 py-3">
              <span className="text-sm text-mist-100">{t.name}</span>
              <span className="text-sm text-amber-500">{t.price}</span>
            </div>
          ))}
          <button type="button" className="btn-primary w-full">
            Continue to secure checkout
          </button>
        </div>
      </Modal>

      <Modal open={assistOpen} onClose={() => setAssistOpen(false)} title="Request assistance">
        {submitted ? (
          <p className="text-sm text-mist-300">
            Thanks — your request has been sent to our events team. We&apos;ll reply by email.
          </p>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: POST to assistance_requests, email support@knightide.com
              setSubmitted(true);
            }}
          >
            <FormField id="assist-name" label="Name">
              <input id="assist-name" required className="w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100" />
            </FormField>
            <FormField id="assist-email" label="Email">
              <input id="assist-email" type="email" required className="w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100" />
            </FormField>
            <FormField id="assist-need" label="What do you need?">
              <textarea id="assist-need" required rows={3} className="w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100" />
            </FormField>
            <FormField id="assist-contact" label="Preferred contact method">
              <select id="assist-contact" className="w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100">
                <option>Email</option>
                <option>Phone</option>
              </select>
            </FormField>
            <button type="submit" className="btn-primary w-full">
              Send request
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
