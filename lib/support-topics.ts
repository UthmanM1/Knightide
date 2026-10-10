// TODO: replace with a query against a `support_topics` table plus FAQ content once the backend exists.

export type SupportTopic = {
  slug: string;
  title: string;
  body: string;
  faqs: { question: string; answer: string }[];
};

const base: Omit<SupportTopic, "slug" | "faqs">[] = [
  { title: "Account", body: "Sign in, verification, generated keys and recovery" },
  { title: "Subscription", body: "Plans, renewals, cancellation and entitlements" },
  { title: "Training", body: "Sessions, Human Trainer, AI Trainer and progress" },
  { title: "Events", body: "Tickets, broadcasts, replay and moderated chat" },
  { title: "Devices", body: "Downloads, compatibility, permissions and sync" },
  { title: "Payments", body: "Checkout, receipts, failed charges and refunds" },
  { title: "Partnerships", body: "Eligibility, enquiries, applications and access" },
  { title: "Accessibility", body: "Captions, adaptive formats and assistance" },
];

export const supportTopics: SupportTopic[] = base.map((t) => ({
  ...t,
  slug: t.title.toLowerCase(),
  faqs: [
    {
      question: `How do I get help with ${t.title.toLowerCase()}?`,
      answer: `Use the contact form below and our team will reply. This is placeholder FAQ content — real questions and answers load from the support_topics table.`,
    },
  ],
}));

export function getSupportTopic(slug: string) {
  return supportTopics.find((t) => t.slug === slug);
}
