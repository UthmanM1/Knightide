import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Downloads everything we hold about the signed-in user (RLS limits every query to their own rows).
export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });

  const tables = ["profiles", "accessibility_prefs", "subscriptions", "entitlements", "training_sessions", "bookings", "tickets", "threads", "devices", "consents", "notifications", "partnership_applications"];
  const results = await Promise.all(tables.map((t) => supabase.from(t).select("*")));
  const data: Record<string, unknown> = { exported_at: new Date().toISOString(), account: { id: user.id, email: user.email, created_at: user.created_at } };
  tables.forEach((t, i) => (data[t] = results[i].data ?? []));

  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json", "Content-Disposition": 'attachment; filename="knightide-data-export.json"' },
  });
}
