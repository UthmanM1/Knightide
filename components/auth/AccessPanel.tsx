"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { safeNext } from "@/lib/site";

type Tab = "signin" | "create" | "reset";
const input =
  "w-full rounded-sm border border-ink-600 bg-ink-900 px-3 py-2.5 text-sm text-mist-100 placeholder:text-mist-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-mist-400">{label}</label>
      {children}
    </div>
  );
}
const Err = ({ msg }: { msg: string | null }) =>
  msg ? <p role="alert" className="text-xs text-danger-text">{msg}</p> : null;

function SignIn({ next, goReset }: { next: string; goReset: () => void }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) { setError("Email or password is incorrect."); setBusy(false); return; }
    router.push(next); router.refresh();
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <Field id="si-email" label="Email"><input id="si-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} /></Field>
      <Field id="si-pass" label="Password"><input id="si-pass" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} /></Field>
      <Err msg={error} />
      <button type="submit" disabled={busy} className="btn-primary w-full">{busy ? "Signing in…" : "Sign in"}</button>
      <button type="button" onClick={goReset} className="text-xs text-lime-500 hover:text-lime-400">Forgot your password?</button>
    </form>
  );
}

function Create() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(data.error ?? "Could not create your account.");
    setDone(true);
  }
  if (done) {
    return (
      <div className="space-y-3 text-sm text-mist-300">
        <p className="font-semibold text-mist-100">Account created.</p>
        <p>We emailed you a link to verify your address. Explorer accounts have no protected sessions. Choose a plan any time to unlock training.</p>
        <button type="button" onClick={() => router.push("/membership")} className="btn-primary">View plans</button>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <Field id="ca-email" label="Email"><input id="ca-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} /></Field>
      <Field id="ca-pass" label="Password"><input id="ca-pass" type="password" autoComplete="new-password" minLength={12} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 12 characters" className={input} /></Field>
      <Err msg={error} />
      <button type="submit" disabled={busy} className="btn-primary w-full">{busy ? "Creating…" : "Create free Explorer account"}</button>
    </form>
  );
}

function Reset() {
  const router = useRouter();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { createClient().auth.getUser().then(({ data }) => setSignedIn(!!data.user)).catch(() => setSignedIn(false)); }, []);

  async function request(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError(null);
    const res = await fetch("/api/auth/recover", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(data.error ?? "Something went wrong.");
    setSent(true);
  }
  async function setNew(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError(null);
    const { error } = await createClient().auth.updateUser({ password });
    setBusy(false);
    if (error) return setError(error.message);
    router.push("/app/dashboard"); router.refresh();
  }

  if (signedIn) {
    return (
      <form onSubmit={setNew} className="space-y-4">
        <p className="text-sm text-mist-300">Choose a new password for your account.</p>
        <Field id="rs-pass" label="New password"><input id="rs-pass" type="password" autoComplete="new-password" minLength={12} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 12 characters" className={input} /></Field>
        <Err msg={error} />
        <button type="submit" disabled={busy} className="btn-primary w-full">{busy ? "Saving…" : "Save new password"}</button>
      </form>
    );
  }
  if (sent) return <p className="text-sm text-mist-300">If an account exists for that email, a reset link is on its way. It works once and expires soon.</p>;
  return (
    <form onSubmit={request} className="space-y-4">
      <Field id="rq-email" label="Email"><input id="rq-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} /></Field>
      <Err msg={error} />
      <button type="submit" disabled={busy} className="btn-primary w-full">{busy ? "Sending…" : "Email me a reset link"}</button>
    </form>
  );
}

export default function AccessPanel() {
  const params = useSearchParams();
  const initial = (["signin", "create", "reset"].includes(params.get("tab") ?? "") ? params.get("tab") : "signin") as Tab;
  const [tab, setTab] = useState<Tab>(initial);
  const next = safeNext(params.get("next"));
  const tabs: [Tab, string][] = [["signin", "Sign in"], ["create", "Create account"], ["reset", "Reset password"]];

  return (
    <div className="card">
      {params.get("error") === "link" && (
        <p role="alert" className="mb-4 rounded-sm border border-danger-text/40 px-3 py-2 text-xs text-danger-text">
          That link has expired or was already used. Request a new one from your email options below.
        </p>
      )}
      <div role="tablist" aria-label="Account options" className="mb-5 flex gap-1 border-b border-ink-600">
        {tabs.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
            className={`border-b-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500 ${tab === id ? "border-lime-500 text-lime-400" : "border-transparent text-mist-400 hover:text-mist-100"}`}>
            {label}
          </button>
        ))}
      </div>
      {tab === "signin" && <SignIn next={next} goReset={() => setTab("reset")} />}
      {tab === "create" && <Create />}
      {tab === "reset" && <Reset />}
    </div>
  );
}
