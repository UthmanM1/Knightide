import PageTitle from "@/components/app/PageTitle";
import { ChangePasswordForm, DeleteAccountForm, SignOutButton } from "@/components/app/Actions";
import { fmtDate, getMember } from "@/lib/member";

export const metadata = { title: "Account — Knightide" };

export default async function Account() {
  const { supabase, user } = await getMember();
  const { data: ent } = await supabase.from("entitlements").select("verified").eq("user_id", user.id).maybeSingle();
  return (
    <>
      <PageTitle title="Account" description="Your sign-in details, sessions and data." />
      <div className="space-y-6">
        <div className="card">
          <h2 className="font-display text-xl">Sign-in details</h2>
          <dl className="mt-3 space-y-1 text-sm"><div className="flex gap-3"><dt className="w-28 text-mist-500">Email</dt><dd className="text-mist-100">{user.email}</dd></div><div className="flex gap-3"><dt className="w-28 text-mist-500">Member since</dt><dd className="text-mist-100">{fmtDate(user.created_at)}</dd></div><div className="flex gap-3"><dt className="w-28 text-mist-500">Verification</dt><dd className="text-mist-100">{ent?.verified ? "Verified. Your one-time key has been used." : "Not verified yet"}</dd></div></dl>
        </div>
        <div className="card"><h2 className="font-display text-xl">Change password</h2><div className="mt-3"><ChangePasswordForm /></div></div>
        <div className="card"><h2 className="font-display text-xl">Sessions</h2><p className="mt-2 text-sm text-mist-400">Signed in somewhere you don't recognise? End every session, then sign back in here.</p><div className="mt-4 flex gap-3"><SignOutButton /><SignOutButton everywhere /></div></div>
        <div className="card"><h2 className="font-display text-xl">Your data</h2><p className="mt-2 text-sm text-mist-400">Download a copy of everything we hold about you.</p><a href="/api/account/export" className="btn-secondary mt-4 inline-flex">Download my data (JSON)</a></div>
        <div id="delete" className="card scroll-mt-28 border-danger-text/40"><h2 className="font-display text-xl">Delete account</h2><div className="mt-3"><DeleteAccountForm /></div></div>
      </div>
    </>
  );
}
