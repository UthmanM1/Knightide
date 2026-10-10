import PageTitle from "@/components/app/PageTitle";
import { WaitlistForm } from "@/components/app/Actions";
import { getMember } from "@/lib/member";

export const metadata = { title: "Downloads — Knightide" };

export default async function Downloads() {
  await getMember();
  return (
    <>
      <PageTitle title="Downloads" description="Desktop and offline content." />
      <div className="card">
        <h2 className="font-display text-xl">Desktop app</h2>
        <p className="mt-2 text-sm text-mist-400">Desktop builds aren't published yet. Join the waitlist and we'll email you the moment your system is ready.</p>
        <div className="mt-4"><WaitlistForm source="desktop_download" withOs /></div>
      </div>
      <div className="card mt-4">
        <h2 className="font-display text-xl">Offline content</h2>
        <p className="mt-2 text-sm text-mist-400">Nothing is stored on your device yet. When offline content is available you'll be able to clear it from here, and you can always remove it by clearing Knightide's site data in your browser settings.</p>
      </div>
    </>
  );
}
