// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const searchParams = url.searchParams;

  // 1) CRITICAL: Allow admin route immediately (before any redirect/cleanup)
  const lowerPath = pathname.toLowerCase();
  if (lowerPath === "/appliances/admin" || lowerPath.startsWith("/appliances/admin/")) {
    return NextResponse.next();
  }

  // 2) Strip old tracking / locale query params (keep this tight)
  const removableParams = [
    "CountryISONumericCode",
    "LanguageISOAlpha2Code",
    "LanguageCultureCode",
    "CountryISOAlpha3Code",
    "RecipientUserName",
    "TopicDescription",
    "E",
    "T",
    "page_id",
  ];

  let changed = false;
  for (const p of removableParams) {
    if (searchParams.has(p)) {
      searchParams.delete(p);
      changed = true;
    }
  }

  if (changed) {
    url.search = searchParams.toString();
    // 301 is fine here — it consolidates signals to the clean URL
    return NextResponse.redirect(url, 301);
  }

  // 3) Exact legacy root paths → new paths (case-sensitive matches)
  const legacyRootRedirects: Record<string, string> = {
    "/Services": "/services",
    "/Appliances": "/appliances",
    "/Contact": "/contact",
    "/About": "/about",
    "/Kitchen": "/services/renovations",
    "/Plumbing": "/services/plumbing",
    "/Maintenance": "/services/handyman",
  };

  // Normalize optional trailing slash for matching (but keep "/" intact)
  const normalized =
    pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;

  if (legacyRootRedirects[normalized]) {
    const dest = new URL(legacyRootRedirects[normalized], req.url);
    return NextResponse.redirect(dest, 301);
  }

  // 4) Legacy capitalized /Appliances/* → lowercase equivalent
  // Better than collapsing everything to "/appliances"
  if (pathname.startsWith("/Appliances/")) {
    const newPath = "/appliances/" + pathname.slice("/Appliances/".length);
    const dest = new URL(newPath, req.url);
    return NextResponse.redirect(dest, 301);
  }

  // 5) Mark truly legacy junk as noindex (don’t redirect if you don’t know the target)
  if (pathname.startsWith("/UserAccount/") || pathname.startsWith("/Maintenance/Service/")) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
