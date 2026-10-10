import Stripe from "stripe";

// Server-only. Never import from a "use client" file.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-06-20",
});
