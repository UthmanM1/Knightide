import { createAdminClient } from "@/lib/supabase/admin";

// Simple database-backed limiter (table rate_limit_hits). Returns true if allowed.
export async function rateLimit(key: string, max: number, windowSeconds: number) {
  const db = createAdminClient();
  const since = new Date(Date.now() - windowSeconds * 1000).toISOString();
  const { count } = await db
    .from("rate_limit_hits")
    .select("id", { count: "exact", head: true })
    .eq("key", key)
    .gte("created_at", since);
  if ((count ?? 0) >= max) return false;
  await db.from("rate_limit_hits").insert({ key });
  // opportunistic cleanup of old rows
  if (Math.random() < 0.05) {
    await db.from("rate_limit_hits").delete().lt("created_at", new Date(Date.now() - 86_400_000).toISOString());
  }
  return true;
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
