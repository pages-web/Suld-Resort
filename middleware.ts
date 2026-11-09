import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "./lib/i18n";

/** Sends visitors without a language prefix to /mn (or /en for English browsers). */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const accept = req.headers.get("accept-language") ?? "";
  const preferred = /^mn\b/i.test(accept) || !/^en\b/i.test(accept) ? defaultLocale : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|assets|favicon|.*\\..*).*)"],
};
