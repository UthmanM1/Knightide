import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Check = (p: IconProps) => (
  <svg {...base} {...p}><polyline points="20 6 9 17 4 12" /></svg>
);
export const Shield = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" /></svg>
);
export const Eye = (p: IconProps) => (
  <svg {...base} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const Camera = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 8h3l1.5-2h7L17 8h3v11H4Z" /><circle cx="12" cy="13" r="3.2" /></svg>
);
export const Lock = (p: IconProps) => (
  <svg {...base} {...p}><rect x="5" y="11" width="14" height="9" rx="1.5" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const Sliders = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 6h10M18 6h2M4 12h2M8 12h12M4 18h14M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></svg>
);
export const Accessibility = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="12" cy="4" r="1.6" /><path d="M5 8h14M12 8v5m0 0-4 7m4-7 4 7M8 12h8" /></svg>
);
export const Chat = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 5h16v11H9l-4 4V5Z" /></svg>
);
export const Calendar = (p: IconProps) => (
  <svg {...base} {...p}><rect x="4" y="5" width="16" height="15" rx="1.5" /><path d="M4 10h16M8 3v4M16 3v4" /></svg>
);
export const Devices = (p: IconProps) => (
  <svg {...base} {...p}><rect x="3" y="4" width="13" height="9" rx="1" /><rect x="17" y="8" width="4" height="9" rx="1" /><path d="M3 17h13" /></svg>
);
export const Heart = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z" /></svg>
);
export const Bolt = (p: IconProps) => (
  <svg {...base} {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>
);
export const Target = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" /></svg>
);
export const Grid = (p: IconProps) => (
  <svg {...base} {...p}><rect x="4" y="4" width="7" height="7" /><rect x="13" y="4" width="7" height="7" /><rect x="4" y="13" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /></svg>
);
export const Route = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="M6 8v3a4 4 0 0 0 4 4h4" /></svg>
);
export const User = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="3.4" /><path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" /></svg>
);
export const CreditCard = (p: IconProps) => (
  <svg {...base} {...p}><rect x="3" y="6" width="18" height="12" rx="1.5" /><path d="M3 10h18" /></svg>
);
export const Mic = (p: IconProps) => (
  <svg {...base} {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
);
export const Storage = (p: IconProps) => (
  <svg {...base} {...p}><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" /></svg>
);
export const Warning = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4M12 17h.01" /></svg>
);
export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Search = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
export const Mail = (p: IconProps) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m4 6 8 7 8-7" /></svg>
);
export const Refresh = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" /><path d="M18 4v4h-4M6 20v-4h4" /></svg>
);
export const Key = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="8" cy="14" r="4" /><path d="M11 11 20 2m-4 4 2 2m-6-1 2 2" /></svg>
);
export const Ban = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" /></svg>
);
