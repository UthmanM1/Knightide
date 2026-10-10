"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const main = [
  ["Dashboard", "/app/dashboard"], ["Training", "/app/training"], ["Events", "/app/events"],
  ["Membership", "/app/membership"], ["Communication", "/app/communication"],
];
const utility = [
  ["Devices", "/app/devices"], ["Downloads", "/app/downloads"], ["Partnerships", "/app/partnerships"], ["Account", "/app/account"],
  ["Notifications", "/app/notifications"], ["Privacy", "/app/privacy"], ["Accessibility", "/app/accessibility"],
  ["Help / Safety", "/app/help-safety"], ["Settings", "/app/settings"],
];

export default function Sidebar() {
  const path = usePathname();
  const link = (label: string, href: string, big: boolean) => {
    const active = path === href || path.startsWith(href + "/");
    return (
      <li key={href}>
        <Link href={href} aria-current={active ? "page" : undefined}
          className={big
            ? `block rounded-sm px-3 py-2 text-sm font-semibold ${active ? "bg-lime-500 text-ink-950" : "text-mist-300 hover:bg-ink-800 hover:text-mist-100"}`
            : `block px-3 py-1 text-xs ${active ? "text-lime-400" : "text-mist-500 hover:text-mist-100"}`}>
          {label}
        </Link>
      </li>
    );
  };
  return (
    <nav aria-label="Member area" className="lg:sticky lg:top-28 lg:self-start">
      <div className="text-[10px] font-semibold uppercase tracking-widest2 text-mist-500">Member workspace</div>
      <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">{main.map(([l, h]) => link(l, h, true))}</ul>
      <ul className="mt-4 flex flex-wrap gap-x-1 gap-y-0.5 border-t border-ink-700 pt-4 lg:flex-col">{utility.map(([l, h]) => link(l, h, false))}</ul>
    </nav>
  );
}
