import Link from "next/link";
import Media from "./Media";

type CTA = { label: string; href: string; variant?: "primary" | "secondary" | "amber" };

export default function PageHero({
  eyebrow,
  title,
  description,
  meta,
  ctas,
  mediaLabel,
  badge,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  ctas: CTA[];
  mediaLabel: string;
  badge?: string;
}) {
  return (
    <section className="section pb-16 pt-12 sm:pt-16">
      <div className="section-inner grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-lg text-base text-mist-300">{description}</p>
          {meta && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest2 text-amber-500">
              {meta}
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            {ctas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className={
                  cta.variant === "amber"
                    ? "btn-amber"
                    : cta.variant === "secondary"
                      ? "btn-secondary"
                      : "btn-primary"
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative">
          <Media label={mediaLabel} ratio="aspect-[16/11]" />
          {badge && (
            <span className="absolute bottom-4 right-4 rounded-full border border-ink-600 bg-ink-950/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-lime-500">
              &bull; {badge}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
