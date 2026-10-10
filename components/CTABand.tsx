import Link from "next/link";

type CTA = { label: string; href: string; variant?: "amber" | "dark" };

export default function CTABand({
  eyebrow,
  title,
  description,
  ctas,
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctas: CTA[];
}) {
  return (
    <section className="section pt-0">
      <div className="section-inner">
        <div className="flex flex-col items-start gap-6 rounded-md bg-lime-500 p-8 text-ink-950 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest2 text-ink-950/70">
              {eyebrow}
            </span>
            <h2 className="mt-3 max-w-xl text-3xl sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-sm text-ink-950/80">{description}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto">
            {ctas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className={
                  cta.variant === "dark"
                    ? "btn bg-ink-950 text-mist-100 hover:bg-ink-800"
                    : "btn bg-amber-500 text-ink-950 hover:bg-amber-400"
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
