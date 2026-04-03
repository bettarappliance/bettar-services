// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  APPLIANCE_DOC_ID_HEADER,
  STATIC_APPLIANCES_ROUTE_SEGMENTS,
} from "@/lib/appliance-doc-id";

/**
 * Lowercase URL segments for consistency, but keep Firestore document ids exact under `/appliances/[id]`.
 */
function toCanonicalPathname(pathname: string): string {
  const endsWithSlash = pathname.endsWith("/") && pathname !== "/";
  const base = endsWithSlash ? pathname.slice(0, -1) : pathname;
  const segments = base.split("/").filter(Boolean);
  if (segments.length === 0) return "/";

  const mapped = segments.map((seg, i) => {
    if (i === 0) return seg.toLowerCase();
    if (
      segments[0].toLowerCase() === "appliances" &&
      i === 1 &&
      !STATIC_APPLIANCES_ROUTE_SEGMENTS.has(seg.toLowerCase())
    ) {
      return seg;
    }
    return seg.toLowerCase();
  });

  let out = "/" + mapped.join("/");
  if (endsWithSlash && out !== "/") out += "/";
  return out;
}

function extractRawAppliancesDocId(pathname: string): string | null {
  const base = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const parts = base.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  if (parts[0].toLowerCase() !== "appliances") return null;
  const seg = parts[1];
  if (STATIC_APPLIANCES_ROUTE_SEGMENTS.has(seg.toLowerCase())) return null;
  return seg;
}

/** Preserves case-sensitive Firestore id for downstream RSC (params may be lowercased on some platforms). */
function nextWithForwardedApplianceId(req: NextRequest): NextResponse {
  const raw = extractRawAppliancesDocId(req.nextUrl.pathname);
  const requestHeaders = new Headers(req.headers);
  if (raw) {
    requestHeaders.set(APPLIANCE_DOC_ID_HEADER, raw);
  }
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const searchParams = url.searchParams;

  // 1) CRITICAL: Allow admin route immediately (before any redirect/cleanup)
  const lowerPath = pathname.toLowerCase();
  if (lowerPath === "/appliances/admin" || lowerPath.startsWith("/appliances/admin/")) {
    return nextWithForwardedApplianceId(req);
  }

  // 1b) Lowercase normalization without mangling Firestore ids (e.g. IbA8xeSGmoS1n94DZ830)
  const canonicalPath = toCanonicalPathname(pathname);
  if (canonicalPath !== pathname) {
    url.pathname = canonicalPath;
    return NextResponse.redirect(url, 301);
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

  // 4) /Appliances/* is handled by toCanonicalPathname() above

  // 5) Mark truly legacy junk as noindex (don’t redirect if you don’t know the target)
  if (pathname.startsWith("/UserAccount/") || pathname.startsWith("/Maintenance/Service/")) {
    const res = nextWithForwardedApplianceId(req);
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  return nextWithForwardedApplianceId(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
