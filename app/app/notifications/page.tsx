import PageTitle from "@/components/app/PageTitle";
import ToggleList from "@/components/app/ToggleList";
import { getMember } from "@/lib/member";

export const metadata = { title: "Notifications — Knightide" };
const ROWS = [
  { col: "training_email", label: "Training: email", desc: "Plan updates and trainer messages" },
  { col: "training_push", label: "Training: push", desc: "Reminders on your devices" },
  { col: "events_email", label: "Events: email", desc: "Tickets, schedule changes and replays" },
  { col: "events_push", label: "Events: push", desc: "Going live alerts" },
  { col: "service_email", label: "Service: email", desc: "Billing, security and status notices" },
  { col: "service_push", label: "Service: push", desc: "Urgent service notices" },
];

export default async function Notifications() {
  const { supabase, user } = await getMember();
  const { data } = await supabase.from("notifications").select("*").eq("user_id", user.id).maybeSingle();
  const initial = Object.fromEntries(ROWS.map((r) => [r.col, data ? !!data[r.col] : r.col !== "service_push"]));
  return (<><PageTitle title="Notifications" description="Choose how we contact you. Changes save instantly." /><ToggleList table="notifications" userId={user.id} rows={ROWS} initial={initial} /></>);
}
