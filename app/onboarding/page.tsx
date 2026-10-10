"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Chip from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

const steps = ["Disciplines", "Experience level", "Weekly schedule", "Access needs", "Devices", "Permissions review"];
const DISCIPLINES = ["Boxing", "MMA", "Taekwondo", "Strength & mobility"];
const LEVELS = ["New to training", "Some experience", "Experienced"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["Morning", "Afternoon", "Evening"];
const ACCESS = ["Seated", "Low impact", "Captions", "Reduced motion", "Audio led"];
const DEVICES = ["Phone", "Tablet", "Laptop or desktop", "VR/AR/XR headset"];

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export default function OnboardingPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [step, setStep] = useState(0);
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [experience, setExperience] = useState<string | null>(null);
  const [days, setDays] = useState<string[]>([]);
  const [time, setTime] = useState<string | null>(null);
  const [access, setAccess] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resume where the member left off.
  useEffect(() => {
    fetch("/api/onboarding").then((r) => (r.ok ? r.json() : null)).then((d) => {
      if (d) {
        setStep(Math.min(d.step ?? 0, steps.length - 1));
        setDisciplines(d.disciplines ?? []);
        setExperience(d.experience ?? null);
        setDays(d.schedule?.days ?? []);
        setTime(d.schedule?.time ?? null);
        setAccess(d.accessNeeds ?? []);
        setDevices(d.devices ?? []);
      }
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  const isLast = step === steps.length - 1;

  async function save(nextStep: number, complete = false) {
    setBusy(true); setError(null);
    const res = await fetch("/api/onboarding", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: nextStep, disciplines, experience, schedule: { days, time }, accessNeeds: access, devices, complete }),
    });
    setBusy(false);
    if (!res.ok) { setError("We couldn't save that. Please try again."); return false; }
    return true;
  }

  async function next() {
    if (isLast) {
      if (await save(step, true)) { router.push("/app/dashboard"); router.refresh(); }
    } else if (await save(step + 1)) setStep(step + 1);
  }
  async function back() { if (step > 0 && (await save(step - 1))) setStep(step - 1); }

  if (!loaded) return <div className="section pt-16"><div className="section-inner max-w-2xl text-sm text-mist-400">Loading your progress…</div></div>;

  return (
    <div className="section pb-16 pt-12 sm:pt-16">
      <div className="section-inner max-w-2xl">
        <span className="eyebrow">Onboarding</span>
        <h1 className="mt-4 text-3xl sm:text-4xl">{steps[step]}</h1>
        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {steps.map((s, i) => <div key={s} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-lime-500" : "bg-ink-700"}`} />)}
        </div>
        <p className="mt-2 text-xs text-mist-500">Step {step + 1} of {steps.length}. Progress is saved as you go. Leave and resume any time.</p>

        <div className="card mt-8">
          {step === 0 && (<><p className="mb-3 text-sm text-mist-400">Pick any that interest you.</p><div className="flex flex-wrap gap-2">{DISCIPLINES.map((d) => <Chip key={d} active={disciplines.includes(d)} onClick={() => setDisciplines(toggle(disciplines, d))}>{d}</Chip>)}</div></>)}
          {step === 1 && (<div className="flex flex-wrap gap-2">{LEVELS.map((l) => <Chip key={l} active={experience === l} onClick={() => setExperience(l)}>{l}</Chip>)}</div>)}
          {step === 2 && (
            <div className="space-y-5">
              <div><p className="mb-3 text-sm text-mist-400">Which days suit you?</p><div className="flex flex-wrap gap-2">{DAYS.map((d) => <Chip key={d} active={days.includes(d)} onClick={() => setDays(toggle(days, d))}>{d}</Chip>)}</div></div>
              <div><p className="mb-3 text-sm text-mist-400">Preferred time of day</p><div className="flex flex-wrap gap-2">{TIMES.map((t) => <Chip key={t} active={time === t} onClick={() => setTime(t)}>{t}</Chip>)}</div></div>
            </div>
          )}
          {step === 3 && (<><p className="mb-3 text-sm text-mist-400">We'll use these to suggest adaptive formats. Change them any time in Accessibility.</p><div className="flex flex-wrap gap-2">{ACCESS.map((a) => <Chip key={a} active={access.includes(a)} onClick={() => setAccess(toggle(access, a))}>{a}</Chip>)}</div></>)}
          {step === 4 && (<><p className="mb-3 text-sm text-mist-400">Which devices will you train on?</p><div className="flex flex-wrap gap-2">{DEVICES.map((d) => <Chip key={d} active={devices.includes(d)} onClick={() => setDevices(toggle(devices, d))}>{d}</Chip>)}</div></>)}
          {step === 5 && (
            <div className="space-y-3 text-sm text-mist-300">
              <p>Review your choices before you finish.</p>
              <p><span className="text-mist-500">Disciplines:</span> {disciplines.length ? disciplines.join(", ") : "None selected"}</p>
              <p><span className="text-mist-500">Experience:</span> {experience ?? "Not set"}</p>
              <p><span className="text-mist-500">Schedule:</span> {days.length ? days.join(", ") : "No days chosen"}{time ? `, ${time.toLowerCase()}` : ""}</p>
              <p><span className="text-mist-500">Access needs:</span> {access.length ? access.join(", ") : "None selected"}</p>
              <p><span className="text-mist-500">Devices:</span> {devices.length ? devices.join(", ") : "None selected"}</p>
              <p className="border-t border-ink-700 pt-3 text-mist-400">Camera, microphone and motion/spatial sensors stay off. Knightide only asks when a feature needs them, and you can review or revoke each one in Privacy.</p>
            </div>
          )}
        </div>
        {error && <p role="alert" className="mt-4 text-sm text-danger-text">{error}</p>}
        <div className="mt-6 flex items-center justify-between">
          <Button variant="ghost" disabled={step === 0 || busy} onClick={back}>Back</Button>
          <Button disabled={busy} onClick={next}>{busy ? "Saving…" : isLast ? "Finish" : "Continue"}</Button>
        </div>
      </div>
    </div>
  );
}
