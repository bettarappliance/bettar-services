import { tryLeadingUpperDocId } from "@/lib/appliance-doc-id";
import type { BettarAppliance } from "@/types/appliance";
import { SITE_URL } from "@/lib/site";

type FirestoreRawValue = Record<string, unknown>;

function parseValue(v: FirestoreRawValue | undefined): unknown {
  if (!v || typeof v !== "object") return undefined;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return parseInt(String(v.integerValue), 10);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) return v.timestampValue;
  if ("arrayValue" in v) {
    const vals = (v.arrayValue as { values?: FirestoreRawValue[] })?.values;
    if (!vals) return [];
    return vals.map((x) => parseValue(x));
  }
  if ("mapValue" in v) {
    const fields = (v.mapValue as { fields?: Record<string, FirestoreRawValue> })?.fields;
    if (!fields) return {};
    return parseFields(fields);
  }
  return undefined;
}

function parseFields(fields: Record<string, FirestoreRawValue>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(fields)) {
    out[key] = parseValue(val);
  }
  return out;
}

function asString(v: unknown, fallback = ""): string {
  if (v === undefined || v === null) return fallback;
  return String(v);
}

function asNumber(v: unknown, fallback = 0): number {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const n = parseFloat(v);
    return Number.isNaN(n) ? fallback : n;
  }
  return fallback;
}

function asStringArray(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const s = v.filter((x) => typeof x === "string") as string[];
  return s.length ? s : undefined;
}

export function normalizeApplianceDoc(
  id: string,
  raw: Record<string, unknown>
): BettarAppliance | null {
  const name = asString(raw.name).trim();
  if (!name) return null;

  const brand = asString(raw.brand, "Unknown");
  const category = asString(raw.category, "Appliance");
  const imageUrl = asString(raw.imageUrl);
  const priceFrom = asNumber(raw.priceFrom, 0);

  return {
    id,
    name,
    brand,
    category,
    imageUrl,
    priceFrom,
    priceOld: raw.priceOld !== undefined ? asNumber(raw.priceOld) : undefined,
    discountPercent:
      raw.discountPercent !== undefined ? asNumber(raw.discountPercent) : undefined,
    shortDescription: raw.shortDescription ? asString(raw.shortDescription) : undefined,
    fullDescription: raw.fullDescription ? asString(raw.fullDescription) : undefined,
    capacityKw: raw.capacityKw !== undefined ? asNumber(raw.capacityKw) : undefined,
    inStock: typeof raw.inStock === "boolean" ? raw.inStock : undefined,
    roomSize: raw.roomSize ? asString(raw.roomSize) : undefined,
    supplyType: raw.supplyType ? asString(raw.supplyType) : undefined,
    type: raw.type ? asString(raw.type) : undefined,
    modelNumber: raw.modelNumber ? asString(raw.modelNumber) : undefined,
    color: raw.color ? asString(raw.color) : undefined,
    energyRating: raw.energyRating ? asString(raw.energyRating) : undefined,
    warranty: raw.warranty ? asString(raw.warranty) : undefined,
    features: asStringArray(raw.features),
    images: asStringArray(raw.images),
    categorySlug: raw.categorySlug ? asString(raw.categorySlug) : undefined,
  };
}

/**
 * Read one appliance document via Firestore REST (same rules as the web SDK).
 * Used for SSR metadata and JSON-LD on product pages.
 */
export async function getApplianceById(id: string): Promise<BettarAppliance | null> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey || !id) return null;

  const encodedId = encodeURIComponent(id);
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/appliances/${encodedId}?key=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 120 } });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    const json = (await res.json()) as { fields?: Record<string, FirestoreRawValue> };
    if (!json.fields) return null;
    const raw = parseFields(json.fields);
    return normalizeApplianceDoc(id, raw);
  } catch {
    return null;
  }
}

function applianceDocIdFromFirestoreName(name: string): string {
  const marker = "/documents/appliances/";
  const i = name.indexOf(marker);
  if (i === -1) return "";
  return decodeURIComponent(name.slice(i + marker.length));
}

/**
 * When the URL segment is lowercased (Next.js), resolve via `idLower` (set in admin).
 */
async function getApplianceByIdLower(lowerKey: string): Promise<BettarAppliance | null> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey || !lowerKey) return null;

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`;
  const body = {
    structuredQuery: {
      from: [{ collectionId: "appliances" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "idLower" },
          op: "EQUAL",
          value: { stringValue: lowerKey },
        },
      },
      limit: 1,
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      next: { revalidate: 120 },
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as unknown;
    if (!Array.isArray(rows)) return null;
    for (const row of rows) {
      if (!row || typeof row !== "object" || !("document" in row)) continue;
      const doc = (row as { document?: { name?: string; fields?: Record<string, FirestoreRawValue> } })
        .document;
      if (!doc?.name || !doc.fields) continue;
      const docId = applianceDocIdFromFirestoreName(doc.name);
      if (!docId) continue;
      const raw = parseFields(doc.fields);
      return normalizeApplianceDoc(docId, raw);
    }
    return null;
  } catch {
    return null;
  }
}

const LIST_PAGE_SIZE = 300;
const LIST_MAX_PAGES = 40;

/**
 * When `idLower` is missing or wrong, find the doc by comparing lowercase document ids (lists the collection; paginated).
 */
async function getApplianceByListIdCaseScan(lowerKey: string): Promise<BettarAppliance | null> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey || !lowerKey) return null;

  let pageToken: string | undefined;
  for (let page = 0; page < LIST_MAX_PAGES; page++) {
    const qs = new URLSearchParams({
      key: apiKey,
      pageSize: String(LIST_PAGE_SIZE),
    });
    if (pageToken) qs.set("pageToken", pageToken);

    const listUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/appliances?${qs}`;

    try {
      const res = await fetch(listUrl, { next: { revalidate: 120 } });
      if (!res.ok) return null;
      const json = (await res.json()) as {
        documents?: { name?: string; fields?: Record<string, FirestoreRawValue> }[];
        nextPageToken?: string;
      };
      const docs = json.documents;
      if (docs?.length) {
        for (const d of docs) {
          if (!d.name || !d.fields) continue;
          const docId = applianceDocIdFromFirestoreName(d.name);
          if (!docId || docId.toLowerCase() !== lowerKey) continue;
          const raw = parseFields(d.fields);
          return normalizeApplianceDoc(docId, raw);
        }
      }
      pageToken = json.nextPageToken;
      if (!pageToken) break;
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Same as {@link getApplianceById} but tolerates lowercased URL segments: exact id, first-letter upper, then `idLower`,
 * then a paginated list scan matching `doc.id.toLowerCase()`.
 */
export async function getApplianceByUrlId(urlId: string): Promise<BettarAppliance | null> {
  const trimmed = urlId.trim();
  if (!trimmed) return null;

  let found = await getApplianceById(trimmed);
  if (found) return found;

  const alt = tryLeadingUpperDocId(trimmed);
  if (alt && alt !== trimmed) {
    found = await getApplianceById(alt);
    if (found) return found;
  }

  const lowerKey = trimmed.toLowerCase();
  found = await getApplianceByIdLower(lowerKey);
  if (found) return found;

  return getApplianceByListIdCaseScan(lowerKey);
}

export function buildProductJsonLd(appliance: BettarAppliance, id: string) {
  const pageUrl = `${SITE_URL}/appliances/${id}`;
  const images = (
    appliance.images?.length ? [appliance.imageUrl, ...appliance.images] : [appliance.imageUrl]
  ).filter(Boolean);

  const availability =
    appliance.inStock === false
      ? "https://schema.org/OutOfStock"
      : "https://schema.org/InStock";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: appliance.name,
    description:
      appliance.shortDescription ||
      appliance.fullDescription ||
      `${appliance.brand} ${appliance.category}. Sold and installed in Greater DC & Maryland by Bettar Services.`,
    image: images.length ? images : undefined,
    sku: appliance.modelNumber || undefined,
    brand: {
      "@type": "Brand",
      name: appliance.brand,
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "USD",
      price: appliance.priceFrom,
      availability,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "LocalBusiness",
        name: "Bettar Services",
        telephone: "+1-301-949-2500",
        url: SITE_URL,
      },
      priceValidUntil: new Date(Date.now() + 90 * 864e5).toISOString().slice(0, 10),
    },
  };
}
