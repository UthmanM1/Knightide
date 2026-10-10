import { ReactNode } from "react";
import { Check } from "./icons";

export function Checklist({ items }: { items: { title: string; body?: string }[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item.title} className="flex gap-3">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime-500" />
          <div>
            <div className="text-sm font-semibold text-mist-100">{item.title}</div>
            {item.body && <div className="text-sm text-mist-400">{item.body}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div>
      <div className="font-display text-4xl text-lime-500">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-widest2 text-mist-300">
        {label}
      </div>
      {note && <div className="mt-1 text-xs text-mist-500">{note}</div>}
    </div>
  );
}

export function Step({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="card">
      <div className="font-display text-2xl text-lime-500">{number}</div>
      <h3 className="mt-2 font-display text-base uppercase">{title}</h3>
      <p className="mt-2 text-sm text-mist-400">{body}</p>
    </div>
  );
}

export function FAQRow({ q, a }: { q: string; a: string }) {
  return (
    <div className="grid gap-2 border-b border-ink-700 py-5 sm:grid-cols-[1fr_1.3fr] sm:gap-8">
      <div className="text-sm font-semibold text-mist-100">{q}</div>
      <div className="text-sm text-mist-400">{a}</div>
    </div>
  );
}

export function TopicChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-amber-500/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-amber-500">
      {children}
    </span>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-ink-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-mist-400">
      {children}
    </span>
  );
}
