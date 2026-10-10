import Link from "next/link";
import PageTitle from "@/components/app/PageTitle";
import EmptyState from "@/components/ui/EmptyState";
import { WaitlistForm } from "@/components/app/Actions";
import { getMember } from "@/lib/member";

export const metadata = { title: "Training — Knightide" };

export default async function Training() {
  const { supabase } = await getMember();
  const [plans, trainers] = await Promise.all([
    supabase.from("training_plans").select("id, slug, title, level, duration_minutes, impact, safety_notes").eq("is_active", true).order("title"),
    supabase.from("trainers").select("id, full_name, disciplines, languages, qualifications, is_verified").eq("is_active", true).order("full_name"),
  ]);
  return (
    <>
      <PageTitle title="Training" description="Your plan library, Human Trainers and AI Trainer in one place." />
      <h2 className="font-display text-2xl">Plan library</h2>
      <div className="mt-4">
        {plans.data?.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {plans.data.map((p) => (
              <div key={p.id} className="card">
                <h3 className="font-display text-lg uppercase">{p.title}</h3>
                <p className="mt-1 text-xs text-mist-400">{[p.level, p.duration_minutes && `${p.duration_minutes} min`, p.impact && `${p.impact} impact`].filter(Boolean).join(" · ")}</p>
                {p.safety_notes && <p className="mt-3 text-xs text-mist-500">{p.safety_notes}</p>}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="Plans are being added" description="Your training library will appear here as soon as plans are published. We'll email you when new plans arrive." />
        )}
      </div>

      <h2 className="mt-10 font-display text-2xl">Human Trainers</h2>
      <div className="mt-4">
        {trainers.data?.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {trainers.data.map((t) => (
              <div key={t.id} className="card">
                <h3 className="font-display text-lg uppercase">{t.full_name}</h3>
                <p className="mt-1 text-xs text-mist-400">{(t.disciplines ?? []).join(", ")}{t.languages?.length ? ` · ${t.languages.join(", ")}` : ""}</p>
                <p className="mt-2 text-xs text-mist-500">{t.is_verified ? "Qualifications verified" : "Qualifications pending verification"}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="Trainer profiles are coming" description="Only trainers with verified qualifications are listed. Check back soon." action={<Link href="/human-ai#human-trainer" className="btn-secondary">How qualification works</Link>} />
        )}
      </div>

      <h2 className="mt-10 font-display text-2xl">AI Trainer</h2>
      <div className="card mt-4">
        <p className="text-sm text-mist-300">The AI Trainer isn't open yet. Join the waitlist and we'll tell you when you can launch it. Camera access will always be your choice.</p>
        <div className="mt-4"><WaitlistForm source="ai_trainer" /></div>
        <p className="mt-4 text-xs text-mist-500">Simulated demonstration. May be inaccurate. Not medical advice. No identity matching.</p>
      </div>
    </>
  );
}
