import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

const protectedRoutes = [
  "/dashboard",
  "/customers",
  "/subscriptions",
  "/transactions",
  "/analytics",
  "/team",
  "/settings",
  "/onboarding",
  "/reset-password",
];

export async function proxy(request: NextRequest) {
  // ?lang=en|pt|es picks the interface language and remembers it in a cookie.
  const langParam = request.nextUrl.searchParams.get("lang");
  if (langParam && ["en", "pt", "es"].includes(langParam)) {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete("lang");
    const redirect = NextResponse.redirect(clean);
    redirect.cookies.set("nexus-lang", langParam, { path: "/", maxAge: 31536000, sameSite: "lax" });
    return redirect;
  }
  let response = NextResponse.next({ request });
  let pendingCookies: Parameters<
    NonNullable<Parameters<typeof createServerClient>[2]["cookies"]["setAll"]>
  >[0] = [];
  let pendingHeaders: Record<string, string> = {};
  const env = getSupabaseEnv();
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (!env) {
    if (!isProtected) return response;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "configuration");
    loginUrl.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(loginUrl);
  }

  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookies, headers) {
        pendingCookies = cookies;
        pendingHeaders = headers;
        cookies.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookies.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([key, value]) =>
          response.headers.set(key, value),
        );
      },
    },
  });

  // Supabase requires identity verification immediately after client creation
  // so refresh rotation and cookie propagation remain deterministic.
  const { data, error } = await supabase.auth.getClaims();
  if (isProtected && (error || !data?.claims?.sub)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    const redirect = NextResponse.redirect(loginUrl);
    pendingCookies.forEach(({ name, value, options }) =>
      redirect.cookies.set(name, value, options),
    );
    Object.entries(pendingHeaders).forEach(([key, value]) =>
      redirect.headers.set(key, value),
    );
    return redirect;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
