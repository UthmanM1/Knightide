"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    ref.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
        className="relative z-10 h-full w-full max-w-md overflow-y-auto border-l border-ink-600 bg-ink-900 p-6 focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="drawer-title" className="text-xl text-mist-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-sm p-1 text-mist-400 hover:text-mist-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
