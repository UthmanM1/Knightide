import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="section-inner grid gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-16">
        <div>
          <div className="flex items-center gap-2.5">
<Image src="/logo-128.png" alt="" width={40} height={40} className="h-10 w-10" />
            <div>
              <div className="font-display text-lg tracking-wide">Knightide</div>
              <div className="text-[10px] font-semibold uppercase tracking-widest2 text-mist-500">
                Train &middot; Connect &middot; Advance
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-mist-400">
            Qualified Human Trainer support, assistive AI Trainer guidance, accessible
            events and connected training — with transparent controls at every step.
          </p>
          <Link
            href="mailto:support@knightide.com"
            className="mt-4 inline-block text-sm text-lime-500 hover:text-lime-400"
          >
            support@knightide.com
          </Link>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest2 text-mist-500">
            Explore
          </div>
          <ul className="mt-4 space-y-2 text-sm text-mist-300">
            <li><Link href="/" className="hover:text-mist-100">Home</Link></li>
            <li><Link href="/training" className="hover:text-mist-100">Training</Link></li>
            <li><Link href="/human-ai" className="hover:text-mist-100">Human + AI</Link></li>
            <li><Link href="/events" className="hover:text-mist-100">Events</Link></li>
            <li><Link href="/membership" className="hover:text-mist-100">Membership</Link></li>
            <li><Link href="/devices" className="hover:text-mist-100">Devices/Downloads</Link></li>
            <li><Link href="/partnerships" className="hover:text-mist-100">Partnerships</Link></li>
            <li><Link href="/about" className="hover:text-mist-100">About</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest2 text-mist-500">
            Standards + member routes
          </div>
          <ul className="mt-4 space-y-2 text-sm text-mist-300">
            <li><Link href="/safety" className="hover:text-mist-100">Safety</Link></li>
            <li><Link href="/accessibility" className="hover:text-mist-100">Accessibility</Link></li>
            <li><Link href="/privacy" className="hover:text-mist-100">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-mist-100">Terms</Link></li>
            <li><Link href="/support" className="hover:text-mist-100">Help &amp; Support</Link></li>
            <li><Link href="/access" className="hover:text-mist-100">Sign in</Link></li>
            <li><Link href="/success" className="hover:text-mist-100">Member gateway</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-800">
        <div className="section-inner flex flex-col gap-3 px-6 py-6 text-xs text-mist-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <span>&copy; 2026 Knightide. Training guidance is not medical diagnosis or emergency support.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-amber-500 hover:text-amber-400">Privacy controls</Link>
            <Link href="/accessibility" className="text-amber-500 hover:text-amber-400">Accessible by design</Link>
            <Link href="/safety" className="text-amber-500 hover:text-amber-400">Safety-first</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
