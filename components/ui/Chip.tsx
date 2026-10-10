export default function Chip({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      onClick={onClick}
      type={onClick ? "button" : undefined}
      aria-pressed={onClick ? active : undefined}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
        active
          ? "border-lime-500 bg-lime-500/10 text-lime-400"
          : "border-ink-500 text-mist-400 hover:border-mist-400 hover:text-mist-100"
      }`}
    >
      {children}
    </Tag>
  );
}
