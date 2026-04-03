/** Request header set by middleware from the raw URL (Next may lowercase `params.id`). */
export const APPLIANCE_DOC_ID_HEADER = "x-bettar-appliance-id";

/** Second segment under `/appliances/*` that is a route page, not a Firestore document id. */
export const STATIC_APPLIANCES_ROUTE_SEGMENTS = new Set([
  "refrigerators",
  "microwave",
  "dishwasher",
  "dryer",
  "washers",
  "range",
  "wall-oven",
  "cooktops",
  "admin",
]);

export function resolveApplianceDocId(paramId: string, headerValue: string | null): string {
  const v = headerValue?.trim();
  if (v) return v;
  return paramId;
}

/** When the URL segment is lowercased, try capitalizing the first ASCII letter (cheap partial fix before `idLower` query). */
export function tryLeadingUpperDocId(urlId: string): string | null {
  if (urlId.length === 0) return null;
  const c0 = urlId[0];
  if (c0 >= "a" && c0 <= "z") return c0.toUpperCase() + urlId.slice(1);
  return null;
}

/** Case-sensitive id segment from the browser URL (source of truth for Firestore doc ids). */
export function parseApplianceDocIdFromPathname(pathname: string): string | null {
  const base = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const parts = base.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  if (parts[0].toLowerCase() !== "appliances") return null;
  let seg = parts[1];
  try {
    seg = decodeURIComponent(seg);
  } catch {
    /* keep raw */
  }
  if (STATIC_APPLIANCES_ROUTE_SEGMENTS.has(seg.toLowerCase())) return null;
  return seg;
}
