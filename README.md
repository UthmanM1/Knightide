# Knightide — Public Marketing Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS implementation of the 15-page
Knightide public site, built from the provided design mockups (dark theme, lime-green +
amber accent palette, condensed display headings).

## Pages built (all 15)

| Route                    | Design source                                    |
|---------------------------|---------------------------------------------------|
| `/`                        | Knightide full marketing website.png (home)       |
| `/training`                | 03 · Public Training page                          |
| `/human-ai`                 | 04 · Public Human and AI page                       |
| `/events`                   | 05 · Public Events page                             |
| `/membership`               | 06 · Public Membership page                         |
| `/devices`                  | 07 · Public Devices and Downloads page              |
| `/partnerships`             | 08 · Public Partnership Opportunities page          |
| `/about`                    | 09 · About Knightide page                           |
| `/safety`                   | 10 · Safety and Precautions page                    |
| `/accessibility`            | 11 · Accessibility page                             |
| `/help`                     | 12 · Help and Support page                          |
| `/privacy`                  | 13 · Privacy page                                   |
| `/terms`                    | 14 · Terms page                                     |
| `/sign-in`                  | 15 · Sign in and Subscribe page                     |
| `/subscribe/success`        | 02 · Subscription success and member gateway page   |

Everything through the protected member area (Dashboard, Training routes, live sessions,
device pairing, etc.) is intentionally **out of scope** here — that's the "after
subscription" flow you mentioned you'll send more designs for.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (verified passing)
npm run start    # serve the production build
```

## Structure

```
app/                    one folder per route, App Router
components/
  Header.tsx / Footer.tsx      global chrome
  PageHero.tsx                  the eyebrow/title/description/CTA/media hero used on every subpage
  SectionHeading.tsx            the repeated eyebrow/title/description block used mid-page
  FeatureCard.tsx, CTABand.tsx  reusable content blocks
  Bits.tsx                      small shared pieces: Checklist, Stat, Step, FAQRow, Pill, TopicChip
  Media.tsx                     placeholder image block (see "Images" below)
  icons.tsx                     lightweight inline SVG icon set (no icon library dependency)
tailwind.config.ts       design tokens: ink/lime/amber/mist palette, font vars
app/globals.css          base styles, .btn/.card/.section/.eyebrow utility classes
```

## Fonts

To keep this buildable with zero external network calls, the project currently ships
with system-font fallback stacks (`--font-display` / `--font-sans` in `globals.css`).
To match the original mockups more closely, swap in real webfonts — e.g. in
`app/layout.tsx`:

```tsx
import { Anton, Inter } from "next/font/google";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

// then: <html className={`${display.variable} ${sans.variable}`}>
```

(This was actually how the project was originally wired — it was reverted only because
this sandbox can't reach fonts.googleapis.com. It'll work fine in your own environment.)

## Images

There was no real photography in the design export (only mockup screenshots), so every
photo slot is a styled placeholder (`<Media label="..." />`) showing what should go
there. Swap these for real assets — either drop files into `public/` and use
`next/image`, or point at a CDN/DAM.

## Design tokens

Defined in `tailwind.config.ts`:
- `ink-950…600` — background/surface scale (near-black → card borders)
- `lime` — primary accent (buttons, highlights, active states)
- `amber` — secondary accent ("Subscribe"-style CTAs, warning-adjacent emphasis)
- `mist` — text scale (white-ish headings down to muted body/labels)
- `danger` — the safety/emergency banners (Safety, Terms, Help pages)

## Known gaps / next steps

- **Forms are static markup** (sign-in, subscribe, partnership enquiry, help search) —
  no client-side state, validation or submission handler yet. Wire these up once you
  have an auth/payments/backend target.
- **Navigation is route-based only** — no mobile hamburger menu yet (header nav collapses
  at `lg`; add a mobile drawer when you're ready).
- **No CMS** — all copy is hardcoded from the mockups. Consider extracting to a content
  layer if marketing will edit this independently of engineering.
- **Member area** — Dashboard, Training sessions, live Human Trainer video, AI Trainer
  demos, Events checkout, Devices pairing, Communication, Account/Settings — all pending
  your next batch of designs.
