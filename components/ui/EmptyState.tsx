import type { ReactNode } from "react";

export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-ink-500 bg-ink-900 px-6 py-14 text-center">
      <h3 className="text-lg text-mist-100">{title}</h3>
      <p className="max-w-sm text-sm text-mist-400">{description}</p>
      {action}
    </div>
  );
}
