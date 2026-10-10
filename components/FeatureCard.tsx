import { ReactNode } from "react";

export default function FeatureCard({
  icon,
  title,
  description,
  tag,
  highlight = false,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  tag?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`card h-full ${highlight ? "border-lime-500/60" : ""}`}
    >
      {icon && <div className="mb-3 text-lime-500">{icon}</div>}
      {tag && (
        <span className="mb-2 inline-block rounded-full border border-ink-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest2 text-mist-400">
          {tag}
        </span>
      )}
      <h3 className="font-display text-lg uppercase leading-tight">{title}</h3>
      <p className="mt-2 text-sm text-mist-400">{description}</p>
    </div>
  );
}
