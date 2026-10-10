export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-md border border-ink-600 bg-ink-800 p-6 ${className}`}>
      {children}
    </div>
  );
}
