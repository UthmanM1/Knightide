import Link from "next/link";
import { Mail, Key, Shield } from "@/components/icons";
import { ResendVerificationButton, VerifyKeyForm } from "@/components/VerifyActions";

export const metadata = { title: "Verify your account — Knightide" };

export default function VerifyPage() {
  return (
    <div>
      <section className="section pb-10 pt-12 sm:pt-16">
        <div className="section-inner max-w-xl">
          <span className="eyebrow">Verify</span>
          <h1 className="mt-4 text-4xl sm:text-5xl">Confirm it&apos;s you</h1>
          <p className="mt-5 text-base text-mist-300">
            We sent a verification link to the email you subscribed with. Open it on this
            device to finish verification, or use one of the options below.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-inner grid gap-6 sm:grid-cols-2">
          <div className="card">
            <Mail className="h-5 w-5 text-lime-500" />
            <h3 className="mt-3 font-display text-lg">Resend the link</h3>
            <p className="mt-2 text-sm text-mist-400">
              Link not arrived? Resend it. Rate limited to protect your account.
            </p>
            {/* TODO: rate limit server-side beyond Supabase's own resend limit */}
            <ResendVerificationButton />
          </div>
          <div className="card">
            <Key className="h-5 w-5 text-lime-500" />
            <h3 className="mt-3 font-display text-lg">Enter your generated key</h3>
            <p className="mt-2 text-sm text-mist-400">
              Found on your Success page. Format KND-XXXX-XXXX. Five wrong attempts locks
              this for a short time.
            </p>
            <VerifyKeyForm />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-inner">
          <div className="card flex items-start gap-3 border-amber-500/40">
            <Shield className="mt-0.5 h-5 w-5 text-amber-500" />
            <p className="text-sm text-mist-300">
              Support never asks for your generated key. If someone asks you for it, do not
              share it and contact{" "}
              <Link href="/support" className="text-lime-500 hover:text-lime-400">
                Support
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
