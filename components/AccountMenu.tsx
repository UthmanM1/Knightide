"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Shows Sign in / Subscribe until we know there is a session, then an account menu.
export default function AccountMenu() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sb: ReturnType<typeof createClient>;
    try { sb = createClient(); } catch { return; }
    sb.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null)).catch(() => {});
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setEmail(s?.user?.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, []);

  if (!email) {
    return (
      <div className="flex items-center gap-5 text-sm font-semibold uppercase tracking-wide">
        <Link href="/access" className="text-lime-500 hover:text-lime-400">Sign in</Link>
        <Link href="/access#subscribe" className="text-lime-500 hover:text-lime-400">Subscribe</Link>
      </div>
    );
  }
  const item = "block px-4 py-2 text-sm text-mist-300 hover:bg-ink-700 hover:text-mist-100";
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu"
        className="rounded-sm border border-ink-500 px-3 py-1.5 text-sm font-semibold text-lime-500 hover:border-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500">
        Account
      </button>
      {open && (
        <div role="menu" className="absolute right-0 z-50 mt-2 w-60 rounded-md border border-ink-600 bg-ink-800 py-2 shadow-lg">
          <p className="truncate px-4 pb-2 text-xs text-mist-500">{email}</p>
          <Link role="menuitem" href="/app/dashboard" className={item} onClick={() => setOpen(false)}>Dashboard</Link>
          <Link role="menuitem" href="/app/membership" className={item} onClick={() => setOpen(false)}>Membership</Link>
          <Link role="menuitem" href="/app/account" className={item} onClick={() => setOpen(false)}>Account</Link>
          <button role="menuitem" className={`${item} w-full text-left`}
            onClick={async () => { await createClient().auth.signOut(); setOpen(false); router.push("/"); router.refresh(); }}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
