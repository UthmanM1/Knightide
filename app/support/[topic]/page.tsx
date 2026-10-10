"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import FAQAccordion from "@/components/ui/FAQAccordion";
import FormField from "@/components/ui/FormField";
import { getSupportTopic } from "@/lib/support-topics";
import { useToast } from "@/components/ui/Toast";

export default function SupportTopicPage() {
  const params = useParams<{ topic: string }>();
  const topic = getSupportTopic(params.topic);
  const { push } = useToast();
  const [submitted, setSubmitted] = useState(false);

  if (!topic) {
    notFound();
  }

  return (
    <div>
      <section className="section pb-10 pt-12 sm:pt-16">
        <div className="section-inner max-w-2xl">
          <span className="eyebrow">Support</span>
          <h1 className="mt-4 text-4xl sm:text-5xl">{topic.title}</h1>
          <p className="mt-5 text-base text-mist-300">{topic.body}</p>
          <Link href="/support" className="mt-4 inline-block text-sm font-semibold text-lime-500 hover:text-lime-400">
            &larr; All support topics
          </Link>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-inner grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl">Frequently asked</h2>
            <div className="mt-5">
              <FAQAccordion items={topic.faqs} />
            </div>
          </div>

          <div className="card">
            <h2 className="font-display text-xl">Still need help?</h2>
            <p className="mt-2 text-sm text-mist-400">
              Don&apos;t include passwords, your full generated key or health information.
            </p>
            {submitted ? (
              <p className="mt-4 text-sm text-lime-400">
                Thanks — we&apos;ve received your message and sent a confirmation email.
              </p>
            ) : (
              <form
                className="mt-4 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: POST to support_tickets, email support@knightide.com, send confirmation
                  setSubmitted(true);
                  push("Message sent to support@knightide.com");
                }}
              >
                <FormField id="topic-name" label="Name">
                  <input id="topic-name" required className="w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100" />
                </FormField>
                <FormField id="topic-email" label="Email">
                  <input id="topic-email" type="email" required className="w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100" />
                </FormField>
                <FormField id="topic-order" label="Order reference (optional)">
                  <input id="topic-order" className="w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100" />
                </FormField>
                <FormField id="topic-message" label="Message">
                  <textarea id="topic-message" required rows={4} className="w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100" />
                </FormField>
                <button type="submit" className="btn-primary w-full">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
