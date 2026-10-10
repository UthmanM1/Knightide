import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Route protection (build spec section 4):
//   logged out                -> /access?next=<path>
//   no active entitlement     -> /membership
//   not verified              -> /verify
//   not onboarded             -> /onboarding
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => list.forEach(({ name, value, options }) => response.cookies.set(name, value, options)),
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  // Keep any refreshed session cookies when we redirect.
  const withCookies = (r: NextResponse) => {
    response.cookies.getAll().forEach((c) => r.cookies.set(c));
    return r;
  };
  const redirect = (to: string) => withCookies(NextResponse.redirect(new URL(to, request.url)));

  if (!user) {
    const url = new URL("/access", request.url);
    url.searchParams.set("next", pathname);
    return withCookies(NextResponse.redirect(url));
  }

  const [{ data: ent }, { data: profile }] = await Promise.all([
    supabase.from("entitlements").select("active, verified").eq("user_id", user.id).maybeSingle(),
    supabase.from("profiles").select("onboarding_completed_at").eq("id", user.id).maybeSingle(),
  ]);
  const verified = !!ent?.verified;
  const onboarded = !!profile?.onboarding_completed_at;

  if (pathname.startsWith("/verify")) return verified ? redirect(onboarded ? "/app/dashboard" : "/onboarding") : response;
  if (pathname.startsWith("/onboarding")) {
    if (!ent?.active) return redirect("/membership");
    if (!verified) return redirect("/verify");
    return onboarded ? redirect("/app/dashboard") : response;
  }
  // /app/*
  if (!ent?.active) return redirect("/membership");
  if (!verified) return redirect("/verify");
  if (!onboarded) return redirect("/onboarding");
  return response;
}

export const config = { matcher: ["/app/:path*", "/onboarding", "/verify"] };
