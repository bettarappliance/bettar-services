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
  color?: string;
  energyRating?: string;
  warranty?: string;
  features?: string[];
  images?: string[];
  categorySlug?: string;
};
