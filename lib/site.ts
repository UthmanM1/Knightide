export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

// Only allow same-site relative paths, to prevent open redirects via ?next=
export function safeNext(next: string | null | undefined, fallback = "/app/dashboard") {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return fallback;
  return next;
}

export function isEmail(v: unknown): v is string {
  return typeof v === "string" && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
