import Link from "next/link";
import Image from "next/image";
import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu";

const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Training", href: "/training" },
  { label: "Human + AI", href: "/human-ai" },
  { label: "Events", href: "/events" },
  { label: "Membership", href: "/membership" },
  { label: "Devices/Downloads", href: "/devices" },
  { label: "Partnerships", href: "/partnerships" },
];

const utilityNav = [
  { label: "About", href: "/about" },
  { label: "Safety", href: "/safety" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Support", href: "/support" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Header() {
  return (
    <div className="sticky top-0 z-50 border-b border-ink-600 bg-ink-950/95 backdrop-blur">
      <div className="hidden items-center justify-between border-b border-ink-700 px-6 py-1.5 text-[11px] font-semibold uppercase tracking-widest2 sm:flex sm:px-10 lg:px-16">
        <span className="text-amber-500">Premium training, on your terms</span>
        <nav className="flex items-center gap-4 text-mist-500">
          {utilityNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-mist-100">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-2.5">
<Image src="/logo-128.png" alt="" width={40} height={40} className="h-10 w-10" />
          <span className="font-display text-lg tracking-wide">Knightide</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-mist-300 lg:flex">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-mist-100">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <AccountMenu />
        </div>
        <MobileMenu primary={primaryNav} utility={utilityNav} />
      </div>
    </div>
  );
}
