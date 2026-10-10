"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";

const field = "w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100 placeholder:text-mist-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500";

export function BillingButton({ label = "Manage billing" }: { label?: string }) {
  const [busy, setBusy] = useState(false);
  const { push } = useToast();
  return (
    <button className="btn-primary" disabled={busy} onClick={async () => {
      setBusy(true);
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) window.location.href = data.url;
      else { push(data.error ?? "Could not open billing"); setBusy(false); }
    }}>{busy ? "Opening…" : label}</button>
  );
}

export function SignOutButton({ everywhere = false, label }: { everywhere?: boolean; label?: string }) {
  const router = useRouter();
  return (
    <button className="btn-secondary" onClick={async () => {
      await createClient().auth.signOut({ scope: everywhere ? "global" : "local" });
      router.push("/access"); router.refresh();
    }}>{label ?? (everywhere ? "Sign out on all devices" : "Sign out")}</button>
  );
}

export function ChangePasswordForm() {
  const { push } = useToast();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <form className="space-y-3" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true); setError(null);
      const { error } = await createClient().auth.updateUser({ password });
      setBusy(false);
      if (error) return setError(error.message);
      setPassword(""); push("Password updated");
    }}>
      <label htmlFor="new-password" className="block text-xs font-semibold text-mist-400">New password</label>
      <input id="new-password" type="password" autoComplete="new-password" minLength={12} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 12 characters" className={field} />
      {error && <p role="alert" className="text-xs text-danger-text">{error}</p>}
      <button className="btn-secondary" disabled={busy}>{busy ? "Saving…" : "Update password"}</button>
    </form>
  );
}

export function DeleteAccountForm() {
  const router = useRouter();
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <form className="space-y-3" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true); setError(null);
      const res = await fetch("/api/account/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirm }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error ?? "Could not delete"); setBusy(false); return; }
      await createClient().auth.signOut();
      router.push("/"); router.refresh();
    }}>
      <p className="text-sm text-mist-400">This cancels your subscription immediately and permanently deletes your account and data. It can't be undone.</p>
      <label htmlFor="del" className="block text-xs font-semibold text-mist-400">Type DELETE to confirm</label>
      <input id="del" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={field} autoComplete="off" />
      {error && <p role="alert" className="text-xs text-danger-text">{error}</p>}
      <button disabled={busy || confirm !== "DELETE"} className="btn-secondary border-danger-text text-danger-text">{busy ? "Deleting…" : "Delete my account"}</button>
    </form>
  );
}

export function RevokeConsentButton({ userId, type }: { userId: string; type: string }) {
  const router = useRouter();
  const { push } = useToast();
  const [busy, setBusy] = useState(false);
  return (
    <button className="btn-secondary" disabled={busy} onClick={async () => {
      setBusy(true);
      const { error } = await createClient().from("consents").insert({ user_id: userId, type, granted: false });
      setBusy(false);
      if (error) return push("Could not update");
      push("Permission revoked"); router.refresh();
    }}>Revoke</button>
  );
}

export function DevicesManager({ userId, devices }: { userId: string; devices: { id: string; label: string | null; last_seen_at: string | null }[] }) {
  const router = useRouter();
  const { push } = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  async function remove(id: string) {
    setBusy(id);
    const { error } = await createClient().from("devices").delete().eq("id", id);
    setBusy(null);
    if (error) return push("Could not remove device");
    push("Device removed"); router.refresh();
  }
  async function addThis() {
    setBusy("add");
    const ua = navigator.userAgent;
    const label = /iPhone|Android.*Mobile/.test(ua) ? "Phone browser" : /iPad|Tablet/.test(ua) ? "Tablet browser" : "Computer browser";
    const { error } = await createClient().from("devices").insert({ user_id: userId, label, last_seen_at: new Date().toISOString() });
    setBusy(null);
    if (error) return push("Could not add this device");
    push("Device added"); router.refresh();
  }
  return (
    <div>
      {devices.length === 0 ? (
        <p className="rounded-md border border-dashed border-ink-500 px-5 py-8 text-center text-sm text-mist-400">No devices linked yet. Add this one to keep progress in sync.</p>
      ) : (
        <ul className="divide-y divide-ink-700 rounded-md border border-ink-600">
          {devices.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <div className="text-sm font-semibold text-mist-100">{d.label ?? "Device"}</div>
                <div className="text-xs text-mist-500">Last seen {d.last_seen_at ? new Date(d.last_seen_at).toLocaleString("en-GB") : "never"}</div>
              </div>
              <button className="btn-secondary" disabled={busy === d.id} onClick={() => remove(d.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button className="btn-primary mt-4" disabled={busy === "add"} onClick={addThis}>Add this device</button>
    </div>
  );
}

export function WaitlistForm({ source, withOs = false, button = "Join the waitlist" }: { source: "desktop_download" | "xr_download" | "ai_trainer" | "home"; withOs?: boolean; button?: string }) {
  const [email, setEmail] = useState("");
  const [os, setOs] = useState("Windows");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  if (state === "done") return <p className="text-sm text-lime-400">You're on the list. We'll email you when it's ready.</p>;
  return (
    <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={async (e) => {
      e.preventDefault(); setState("busy"); setError(null);
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, source, os: withOs ? os : undefined, website }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error ?? "Something went wrong"); setState("idle"); return; }
      setState("done");
    }}>
      <div className="flex-1">
        <label htmlFor={`wl-${source}`} className="mb-1 block text-xs font-semibold text-mist-400">Email</label>
        <input id={`wl-${source}`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
      </div>
      {withOs && (
        <div>
          <label htmlFor={`os-${source}`} className="mb-1 block text-xs font-semibold text-mist-400">System</label>
          <select id={`os-${source}`} value={os} onChange={(e) => setOs(e.target.value)} className={field}>
            <option>Windows</option><option>macOS</option><option>Linux</option><option>iOS</option><option>Android</option>
          </select>
        </div>
      )}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} className="absolute left-[-9999px] h-0 w-0 opacity-0" name="website" />
      <button className="btn-primary" disabled={state === "busy"}>{state === "busy" ? "Saving…" : button}</button>
      {error && <p role="alert" className="text-xs text-danger-text sm:basis-full">{error}</p>}
    </form>
  );
}
