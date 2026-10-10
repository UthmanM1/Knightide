"use client";

import { useState } from "react";
import { Lock } from "@/components/icons";

const plans = [
  {
    id: "complete",
    name: "Complete",
    price: "£29 / month",
    description:
      "Dashboard, full training, AI Trainer, Human Trainer discovery, selected events and connected devices",
  },
  {
    id: "flex",
    name: "Flex",
    price: "£12 / month",
    description: "Dashboard, two active plans, core AI Trainer and web/mobile access",
  },
];

export default function CheckoutForm({ defaultPlan = "complete" }: { defaultPlan?: string }) {
  const [planId, setPlanId] = useState(defaultPlan);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = plans.find((p) => p.id === planId) ?? plans[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start checkout");
      window.location.href = data.url;
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        {plans.map((p) => (
          <label
            key={p.id}
            className={`card flex cursor-pointer items-center justify-between ${
              planId === p.id ? "border-lime-500/60" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="plan"
                checked={planId === p.id}
                onChange={() => setPlanId(p.id)}
                className="h-4 w-4"
              />
              <div>
                <div className="font-display text-xl">{p.name}</div>
                <div className="text-sm text-mist-400">{p.description}</div>
              </div>
            </div>
            <div className="whitespace-nowrap font-display text-xl text-amber-500">{p.price}</div>
          </label>
        ))}
        <ul className="space-y-2 pt-2 text-sm text-mist-400">
          <li>✓ Clear recurring status and next billing date</li>
          <li>✓ Manage or turn off renewal from Membership</li>
          <li>✓ Human Trainer appointments and some events priced separately</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="card border-amber-500/60">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl">Order summary</h3>
          <Lock className="h-5 w-5 text-amber-500" />
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="checkout-email" className="mb-1 block text-xs font-semibold text-mist-400">
              Email
            </label>
            <input
              id="checkout-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100 placeholder:text-mist-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500"
            />
          </div>
          <div>
            <label htmlFor="checkout-password" className="mb-1 block text-xs font-semibold text-mist-400">
              Password
            </label>
            <input
              id="checkout-password"
              type="password"
              required
              minLength={12}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 12 characters"
              className="w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100 placeholder:text-mist-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500"
            />
          </div>
          <div className="flex items-center justify-between border-t border-ink-700 pt-4 text-sm text-mist-300">
            <span>Plan</span>
            <span className="font-semibold text-mist-100">{selected.name}, monthly</span>
          </div>
          <div className="flex items-center justify-between text-sm text-mist-300">
            <span>Renews</span>
            <span className="font-semibold text-mist-100">Monthly until canceled</span>
          </div>
          <div className="flex items-center justify-between border-t border-ink-700 pt-4">
            <span className="text-sm font-semibold text-mist-300">Due today</span>
            <span className="font-display text-2xl text-amber-500">{selected.price.replace(" / month", "")}</span>
          </div>
          {error && (
            <p role="alert" className="text-xs text-danger-text">
              {error}
            </p>
          )}
          <button type="submit" disabled={loading} className="btn-primary flex w-full items-center justify-center gap-2">
            <Lock className="h-4 w-4" /> {loading ? "Redirecting to Stripe…" : "Continue to secure checkout"}
          </button>
          <p className="text-xs text-mist-500">
            You will pay on Stripe&apos;s secure checkout page, not here. By confirming, you
            agree to the Membership, payment and safety terms and acknowledge the Privacy
            notice. Renews monthly until canceled.
          </p>
        </div>
      </form>
    </div>
  );
}
