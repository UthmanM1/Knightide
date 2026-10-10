// TODO: replace this static list with a query against the `events` table (see build spec section 9).
// Keeping the shape here means the list and detail pages don't need to change when that happens.

export type EventItem = {
  slug: string;
  tags: string[];
  title: string;
  date: string;
  body: string;
  venue: string;
  formats: string[];
  ticketTypes: { name: string; price: string }[];
  replayWindow: string;
  featured?: boolean;
};

export const events: EventItem[] = [
  {
    slug: "precision-night",
    tags: ["Boxing", "Live arena + broadcast"],
    title: "Precision Night",
    date: "18 Oct · 19:30",
    body: "Two technical exhibitions, trainer commentary and captioned coverage.",
    venue: "Knightide Arena, London",
    formats: ["Arena", "Broadcast", "Replay"],
    ticketTypes: [
      { name: "Arena", price: "£24" },
      { name: "Broadcast", price: "£8" },
    ],
    replayWindow: "Available for 14 days after the event",
    featured: true,
  },
  {
    slug: "movement-lab-live",
    tags: ["MMA", "Broadcast"],
    title: "Movement Lab Live",
    date: "02 Nov · 18:00",
    body: "Non-contact skill demonstrations, conditioning and live Q&A.",
    venue: "Broadcast only",
    formats: ["Broadcast", "Replay"],
    ticketTypes: [{ name: "Broadcast", price: "£8" }],
    replayWindow: "Available for 7 days after the event",
  },
  {
    slug: "forms-in-focus",
    tags: ["Taekwondo", "Studio + broadcast"],
    title: "Forms In Focus",
    date: "16 Nov · 14:00",
    body: "Poomsae demonstrations with slow-motion breakdown and captions.",
    venue: "Knightide Studio, Manchester",
    formats: ["Studio", "Broadcast", "Replay"],
    ticketTypes: [
      { name: "Studio", price: "£18" },
      { name: "Broadcast", price: "£8" },
    ],
    replayWindow: "Available for 14 days after the event",
  },
  {
    slug: "adaptive-strength-forum",
    tags: ["Training", "Online"],
    title: "Adaptive Strength Forum",
    date: "23 Nov · 11:00",
    body: "Coaches and athletes explore practical adaptive training formats.",
    venue: "Online only",
    formats: ["Broadcast", "Replay"],
    ticketTypes: [{ name: "Broadcast", price: "£8" }],
    replayWindow: "Available for 30 days after the event",
  },
];

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}
