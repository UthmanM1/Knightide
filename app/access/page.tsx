import { Suspense } from "react";
import { Pill } from "@/components/Bits";
import { Key, Shield } from "@/components/icons";
import AccessPanel from "@/components/auth/AccessPanel";
import CheckoutForm from "@/components/CheckoutForm";
import { VerifyKeyForm } from "@/components/VerifyActions";

export const metadata = { title: "Sign in or subscribe — Knightide" };

export default function AccessPage({ searchParams }: { searchParams: { plan?: string } }) {
  const plan = searchParams.plan === "flex" ? "flex" : "complete";
  return (
    <>
      <section className="section pb-10 pt-12 sm:pt-16">
        <div className="section-inner max-w-2xl">
          <Pill>Protected access</Pill>
          <h1 className="mt-4 text-4xl sm:text-5xl">Sign in, create an account or subscribe</h1>
          <p className="mt-4 text-base text-mist-300">
            Public browsing stays open. Protected member destinations require a verified account and secure session.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-inner grid gap-6 lg:grid-cols-2">
          <Suspense fallback={<div className="card h-72" />}>
            <AccessPanel />
          </Suspense>
          <div id="verify-key" className="card scroll-mt-24">
            <Key className="h-6 w-6 text-lime-500" />
            <h2 className="mt-4 font-display text-2xl">Enter a generated key</h2>
            <p className="mt-2 text-sm text-mist-400">
              Your key arrives by email after payment (format KND-XXXX-XXXX). Sign in first, then enter it here to finish verification. Five wrong attempts locks it for a short time.
            </p>
            <VerifyKeyForm />
            <div className="mt-5 flex items-start gap-2 text-xs text-mist-500">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              Knightide Support will never ask for your password or full key.
            </div>
          </div>
        </div>
      </section>

      <section id="subscribe" className="section scroll-mt-24 border-t border-ink-800">
        <div className="section-inner">
          <span className="eyebrow">Subscribe</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">Choose a plan, then check out securely</h2>
          <div className="mt-10">
            <CheckoutForm defaultPlan={plan} />
          </div>
        </div>
      </section>
    </>
  );
}
