import PageTitle from "@/components/app/PageTitle";
import { DevicesManager } from "@/components/app/Actions";
import { getMember } from "@/lib/member";

export const metadata = { title: "Devices — Knightide" };

export default async function MemberDevices() {
  const { supabase, user } = await getMember();
  const { data: devices } = await supabase.from("devices").select("id, label, last_seen_at, sync_progress, sync_plan_position, sync_trainer_notes, sync_access_prefs").order("created_at");
  return (
    <>
      <PageTitle title="Devices" description="See the devices you've linked and remove any you don't recognise." />
      <DevicesManager userId={user.id} devices={devices ?? []} />
      <p className="mt-4 text-xs text-mist-500">To end every active session, use “Sign out on all devices” in Account.</p>
    </>
  );
}
