# Knightide setup and first test

## 1. Database
- New Supabase project: paste all of `supabase/schema.sql` into SQL Editor and run it.
- If you already ran an older `schema.sql`: run `supabase/migration-002.sql` instead.

## 2. Environment (`.env.local`, see `.env.example`)
Required for the subscribe flow: the three Supabase values, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
`STRIPE_PRICE_COMPLETE`, `STRIPE_PRICE_FLEX`, `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `MEMBER_KEY_SECRET`.

Generate `MEMBER_KEY_SECRET`:
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Keep it safe. If it changes, pending (unused) member keys can no longer be verified or shown.

## 3. Resend (email)
- Create an account at resend.com and an API key.
- Until you verify your own domain, Resend only delivers to the email address you signed up with, sent from
  `onboarding@resend.dev`. For testing, use that same address when you subscribe.
- For other people to receive email: Resend -> Domains -> add knightide.com, add the DNS records it shows
  (SPF, DKIM), then set `EMAIL_FROM=Knightide <hello@knightide.com>`.

## 4. Stripe
- Activate the Customer Portal (Settings -> Billing -> Customer portal).
- Keep `stripe listen --events checkout.session.completed,invoice.paid,invoice.payment_failed,customer.subscription.created,customer.subscription.updated,customer.subscription.deleted --forward-to localhost:3000/api/stripe/webhook` running.
  (Note: `customer.subscription.created` is now handled too; add it to your listen command and to your live webhook.)

## 5. First test
1. `npm install` then `npm run dev`.
2. Open http://localhost:3000/access#subscribe, enter your Resend account email and a 12+ character password.
3. Pay with card 4242 4242 4242 4242 (any future date, any CVC).
4. Expected: redirect to /success showing your plan, renewal date, receipt and a KND-XXXX-XXXX key; an email arrives with a
   "Verify and continue" button and the same key.
5. Click the button (or enter the key at /verify) -> onboarding -> Finish -> /app/dashboard.
