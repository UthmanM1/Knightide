import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/app/Sidebar";

export const dynamic = "force-dynamic";
export const metadata = { title: "Member area — Knightide", robots: { index: false, follow: false } };

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const [{ data: prefs }, { data: sub }] = await Promise.all([
    supabase.from("accessibility_prefs").select("reduced_motion, high_contrast").eq("user_id", user?.id ?? "").maybeSingle(),
    supabase.from("subscriptions").select("status").order("created_at", { ascending: false }).limit(1).maybeSingle(),
  ]);

  return (
    <div data-reduced-motion={prefs?.reduced_motion ? "true" : "false"} data-high-contrast={prefs?.high_contrast ? "true" : "false"}>
      {sub?.status === "past_due" && (
        <div role="alert" className="border-b border-amber-500/50 bg-amber-500/10 px-6 py-3 text-center text-sm text-mist-100">
          Your latest payment didn't go through. <Link href="/app/membership" className="font-semibold text-amber-400 underline">Update your payment method</Link> to keep your access.
        </div>
      )}
      <div className="section-inner grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[220px_1fr] lg:px-16">
        <Sidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
