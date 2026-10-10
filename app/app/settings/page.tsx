import Link from "next/link";
import PageTitle from "@/components/app/PageTitle";
import { SignOutButton } from "@/components/app/Actions";
import { getMember } from "@/lib/member";

export const metadata = { title: "Settings — Knightide" };
const items = [
  ["Account and sessions", "Password, sign out everywhere, delete account", "/app/account"],
  ["Devices and sync", "Linked devices", "/app/devices"],
  ["Notifications", "Email and push choices", "/app/notifications"],
  ["Privacy", "Permissions and your data", "/app/privacy"],
  ["Accessibility", "Motion, contrast and adaptive defaults", "/app/accessibility"],
];

export default async function Settings() {
  await getMember();
  return (
    <>
      <PageTitle title="Settings" description="Controls for your session, devices and communication." />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(([t, d, h]) => (
          <Link key={h} href={h} className="card block hover:border-lime-500/60"><h2 className="font-display text-lg uppercase">{t}</h2><p className="mt-1 text-sm text-mist-400">{d}</p></Link>
        ))}
      </div>
      <div className="mt-6"><SignOutButton /></div>
    </>
  );
}
