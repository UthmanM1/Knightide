export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-ink-700 motion-reduce:animate-none ${className}`}
      aria-hidden="true"
    />
  );
}
