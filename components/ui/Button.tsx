import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Common = { variant?: Variant; children: ReactNode; className?: string };

const styles: Record<Variant, string> = {
  primary: "bg-lime-500 text-ink-950 hover:bg-lime-400",
  secondary: "bg-amber-500 text-ink-950 hover:bg-amber-400",
  ghost: "border border-ink-500 text-mist-100 hover:border-mist-400 bg-transparent",
};

const base =
  "btn inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 disabled:opacity-50 disabled:pointer-events-none";

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: Common & { href: string }) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
