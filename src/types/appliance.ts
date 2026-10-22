/** One label/value row, e.g. { label: "Width", value: "27 in" }. */
export type SpecItem = { label: string; value: string };

/** A titled group of spec rows, e.g. "Size & Fit". */
export type SpecGroup = { title: string; items: SpecItem[] };

/** A named feature with a one-sentence plain-language explanation. */
export type FeatureDetail = { title: string; text: string };

/** Firestore `appliances` collection — shared across catalog, PDP, and admin. */
export type BettarAppliance = {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceFrom: number;
  priceOld?: number;
  discountPercent?: number;
  shortDescription?: string;
  fullDescription?: string;
  capacityKw?: number;
  inStock?: boolean;
  roomSize?: string;
  supplyType?: string;
  type?: string;
  modelNumber?: string;
  matchingModel?: string;
  color?: string;
  energyRating?: string;
  warranty?: string;
  features?: string[];
  images?: string[];
  categorySlug?: string;
  /** 3–4 plain-language reasons a homeowner would pick this model. */
  highlights?: string[];
  /** Up to 4 at-a-glance facts shown near the price (capacity, width, fuel, warranty). */
  quickFacts?: SpecItem[];
  /** Full specifications grouped by topic. */
  specGroups?: SpecGroup[];
  /** Named features with short explanations (shown instead of the plain features list). */
  featureDetails?: FeatureDetail[];
  /** Where the specs came from and when they were checked. */
  specsSource?: string;
};
