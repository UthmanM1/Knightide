"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

export function ResendVerificationButton() {
  const { push } = useToast();
  const [resending, setResending] = useState(false);

  async function resend() {
    setResending(true);
    try {
      const res = await fetch("/api/auth/resend-verification", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not resend");
      push("Verification email sent");
    } catch (e) {
      push((e as Error).message);
    } finally {
      setResending(false);
    }
  }

  return (
    <button type="button" onClick={resend} disabled={resending} className="btn-primary mt-4">
      {resending ? "Sending…" : "Resend verification email"}
    </button>
  );
}

export function VerifyKeyForm() {
  const { push } = useToast();
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  async function verifyKey() {
    setVerifying(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/verify-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not verify");
      push("Verified — continuing to onboarding");
      window.location.href = "/onboarding";
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setVerifying(false);
    }
  }

  return (
    <>
      <div className="mt-4 flex items-center gap-2 rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="KND-____-____"
          aria-label="Generated key"
          className="w-full bg-transparent text-sm text-mist-300 placeholder:text-mist-500 focus:outline-none"
        />
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-danger-text">
          {error}
        </p>
      )}
      <button type="button" onClick={verifyKey} disabled={verifying || !key} className="btn-secondary mt-4">
        {verifying ? "Verifying…" : "Verify with key"}
      </button>
    </>
  );
}
