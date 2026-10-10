"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type NavItem = { label: string; href: string };

export default function MobileMenu({ primary, utility }: { primary: NavItem[]; utility: NavItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    try {
      const sb = createClient();
      sb.auth.getUser().then(({ data }) => setSignedIn(!!data.user)).catch(() => {});
      const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSignedIn(!!s?.user));
      return () => sub.subscription.unsubscribe();
    } catch {}
  }, []);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}
        className="rounded-sm border border-ink-500 p-2 text-mist-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" /></svg>
      </button>
      {open && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[150] bg-ink-950/95 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Menu">
          <div ref={panel} className="flex h-full flex-col overflow-y-auto px-6 py-5">
            <div className="flex justify-end">
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-sm p-2 text-mist-300 hover:text-mist-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500">✕</button>
            </div>
            <nav aria-label="Main" className="mt-4 flex flex-col">
              {primary.map((i) => (
                <Link key={i.href} href={i.href} onClick={() => setOpen(false)} className="border-b border-ink-700 py-3 font-display text-2xl uppercase text-mist-100">{i.label}</Link>
              ))}
            </nav>
            <nav aria-label="More" className="mt-6 grid grid-cols-2 gap-3 text-sm text-mist-400">
              {utility.map((i) => (
                <Link key={i.href} href={i.href} onClick={() => setOpen(false)} className="hover:text-mist-100">{i.label}</Link>
              ))}
            </nav>
            <div className="mt-8 flex gap-3">
              {signedIn ? (
                <>
                  <Link href="/app/dashboard" onClick={() => setOpen(false)} className="btn-primary flex-1 justify-center">Dashboard</Link>
                  <button onClick={async () => { await createClient().auth.signOut(); setOpen(false); router.push("/"); router.refresh(); }} className="btn-secondary flex-1 justify-center">Sign out</button>
                </>
              ) : (
                <>
                  <Link href="/access" onClick={() => setOpen(false)} className="btn-secondary flex-1 justify-center">Sign in</Link>
                  <Link href="/access#subscribe" onClick={() => setOpen(false)} className="btn-primary flex-1 justify-center">Subscribe</Link>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
