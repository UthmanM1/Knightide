"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

export function CopyKeyButton({ value }: { value: string }) {
  const { push } = useToast();
  return (
    <button type="button" className="btn-primary" onClick={async () => {
      try { await navigator.clipboard.writeText(value); push("Key copied"); } catch { push("Could not copy. Select the key and copy it manually."); }
    }}>Copy key</button>
  );
}

export function ResendLinkButton({ sessionId, label = "Send link again", className = "btn-primary" }: { sessionId?: string; label?: string; className?: string }) {
  const { push } = useToast();
  const [busy, setBusy] = useState(false);
  return (
    <button type="button" disabled={busy} className={`mt-4 inline-flex ${className}`} onClick={async () => {
      setBusy(true);
      const res = await fetch("/api/auth/resend-verification", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ session_id: sessionId }) });
      const data = await res.json().catch(() => ({}));
      push(res.ok ? "Verification email sent" : data.error ?? "Could not send the email");
      setBusy(false);
    }}>{busy ? "Sending…" : label}</button>
  );
}

// While the payment webhook is still being processed, re-check every few seconds.
export function AutoRefresh({ max = 12, everyMs = 2500 }: { max?: number; everyMs?: number }) {
  const router = useRouter();
  useEffect(() => {
    let n = 0;
    const t = setInterval(() => { if (++n > max) clearInterval(t); else router.refresh(); }, everyMs);
    return () => clearInterval(t);
  }, [router, max, everyMs]);
  return null;
}
