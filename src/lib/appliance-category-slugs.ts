/**
 * Map Firestore `category` labels to existing `/appliances/*` category routes.
 * Prefer `categorySlug` on the document when set.
 */
const CATEGORY_TO_SLUG: Record<string, string> = {
  Refrigerator: "refrigerators",
  Refrigerators: "refrigerators",
  Microwave: "microwave",
  Microwaves: "microwave",
  Dishwasher: "dishwasher",
  Dishwashers: "dishwasher",
  Dryer: "dryer",
  Dryers: "dryer",
  Washer: "washers",
  Washers: "washers",
  Range: "range",
  Ranges: "range",
  "Wall Oven": "wall-oven",
  "Wall Ovens": "wall-oven",
  Cooktop: "cooktops",
  Cooktops: "cooktops",
  "Garbage Disposer": "garbage-disposers",
  "Garbage Disposers": "garbage-disposers",
  "Ice Maker": "ice-makers",
  "Ice Makers": "ice-makers",
  Compactor: "trash-compactors",
  "Trash Compactor": "trash-compactors",
  "Trash Compactors": "trash-compactors",
};

export function resolveCategoryListingPath(
  category: string | undefined | null,
  categorySlug?: string
): string {
  const slug = (categorySlug || "").trim();
  if (slug) return `/appliances/${slug}`;
  const key = (category ?? "").trim();
  if (!key) return "/appliances";
  const mapped = CATEGORY_TO_SLUG[key];
  if (mapped) return `/appliances/${mapped}`;
  return `/appliances/${key.toLowerCase().replace(/\s+/g, "-")}`;
}
