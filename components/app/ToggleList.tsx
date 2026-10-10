"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";

type Row = { col: string; label: string; desc?: string };

// Saves each switch straight to the user's own row (protected by Row Level Security).
export default function ToggleList({ table, userId, rows, initial, refresh = false }: {
  table: "accessibility_prefs" | "notifications"; userId: string; rows: Row[]; initial: Record<string, boolean>; refresh?: boolean;
}) {
  const router = useRouter();
  const { push } = useToast();
  const [values, setValues] = useState<Record<string, boolean>>(initial);
  const [busy, setBusy] = useState<string | null>(null);

  async function flip(col: string) {
    const next = { ...values, [col]: !values[col] };
    setValues(next); setBusy(col);
    const { error } = await createClient().from(table).upsert({ user_id: userId, ...next });
    setBusy(null);
    if (error) { setValues(values); push("Could not save that change"); return; }
    push("Saved");
    if (refresh) router.refresh();
  }

  return (
    <ul className="divide-y divide-ink-700 rounded-md border border-ink-600">
      {rows.map((r) => (
        <li key={r.col} className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <div className="text-sm font-semibold text-mist-100" id={`t-${r.col}`}>{r.label}</div>
            {r.desc && <div className="mt-0.5 text-xs text-mist-500">{r.desc}</div>}
          </div>
          <button role="switch" aria-checked={!!values[r.col]} aria-labelledby={`t-${r.col}`} disabled={busy === r.col} onClick={() => flip(r.col)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 ${values[r.col] ? "bg-lime-500" : "bg-ink-500"}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink-950 transition-all ${values[r.col] ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </li>
      ))}
    </ul>
  );
}
