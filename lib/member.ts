import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getMember() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/access");
  return { supabase, user };
}

export const fmtDate = (d?: string | null, withTime = false) =>
  d ? new Date(d).toLocaleString("en-GB", withTime ? { dateStyle: "medium", timeStyle: "short" } : { dateStyle: "medium" }) : "—";
export const fmtMoney = (pence: number, currency = "gbp") =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: currency.toUpperCase() }).format(pence / 100);
export const PLAN_NAMES: Record<string, string> = { complete: "Complete", flex: "Flex" };
