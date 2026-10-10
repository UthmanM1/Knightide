import Image from "next/image";
import { mediaMap } from "@/lib/media";

export default function Media({
  label,
  className = "",
  ratio = "aspect-[4/3]",
  priority = false,
}: {
  label: string;
  className?: string;
  ratio?: string;
  priority?: boolean;
}) {
  const file = mediaMap[label];

  if (!file) {
    return (
      <div className={`placeholder-media ${ratio} ${className}`}>
        <span className="px-6">{label}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-md border border-ink-600 bg-ink-800 ${ratio} ${className}`}>
      <Image
        src={`/images/${file}.webp`}
        alt={label}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
