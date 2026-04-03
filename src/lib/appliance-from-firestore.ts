import type { BettarAppliance } from "@/types/appliance";

function num(v: unknown, fallback = 0): number {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const n = parseFloat(v);
    return Number.isNaN(n) ? fallback : n;
  }
  return fallback;
}

function str(v: unknown, fallback = ""): string {
  if (v === undefined || v === null) return fallback;
  return String(v);
}

function strArr(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const a = v.filter((x) => typeof x === "string") as string[];
  return a.length ? a : undefined;
}

/**
 * Maps raw Firestore fields to BettarAppliance. Fills defaults so PDP never crashes when
 * optional fields (brand, category, imageUrl) are missing in the console.
 */
export function applianceFromFirestoreDoc(id: string, data: Record<string, unknown>): BettarAppliance {
  const name = str(data.name).trim();
  return {
    id,
    name: name || "Untitled appliance",
    brand: str(data.brand).trim() || "See store for brand",
    category: str(data.category).trim() || "Appliance",
    imageUrl: str(data.imageUrl).trim(),
    priceFrom: num(data.priceFrom, 0),
    priceOld: data.priceOld !== undefined ? num(data.priceOld) : undefined,
    discountPercent: data.discountPercent !== undefined ? num(data.discountPercent) : undefined,
    shortDescription: data.shortDescription ? str(data.shortDescription) : undefined,
    fullDescription: data.fullDescription ? str(data.fullDescription) : undefined,
    capacityKw: data.capacityKw !== undefined ? num(data.capacityKw) : undefined,
    inStock: typeof data.inStock === "boolean" ? data.inStock : undefined,
    roomSize: data.roomSize ? str(data.roomSize) : undefined,
    supplyType: data.supplyType ? str(data.supplyType) : undefined,
    type: data.type ? str(data.type) : undefined,
    modelNumber: data.modelNumber ? str(data.modelNumber) : undefined,
    color: data.color ? str(data.color) : undefined,
    energyRating: data.energyRating ? str(data.energyRating) : undefined,
    warranty: data.warranty ? str(data.warranty) : undefined,
    features: strArr(data.features),
    images: strArr(data.images),
    categorySlug: data.categorySlug ? str(data.categorySlug) : undefined,
  };
}
