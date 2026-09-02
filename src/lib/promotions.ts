// Shared promotions data — single source of truth for both the Promotions
// page (src/app/promotions/page.tsx) and any homepage teaser. Update dates,
// amounts and eligibility here; every page that imports this stays in sync
// and hides expired offers automatically.

export type ManufacturerRebate = {
  id: string;
  brand: string;
  brandColor: string;
  title: string;
  amount: string;
  blurb: string;
  eligibility: string;
  footnote: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
};

// Manufacturer-run rebate programs — amounts, dates and eligible models are
// set by the manufacturer, not Bettar. Update or remove entries here as
// promotions change; cards outside their date window are hidden automatically.
export const MANUFACTURER_REBATES: ManufacturerRebate[] = [
  {
    id: "ge-profile-innovation",
    brand: "GE Profile™",
    brandColor: "bg-gray-900",
    title: "The Innovation Rebate",
    amount: "Up to $2,000",
    blurb:
      "Buy 4 or more eligible GE Profile® appliances and get a prepaid Mastercard® rebate — from $400 for 4 appliances up to $2,000 for 8.",
    eligibility: "Refrigerators, ranges, cooktops, wall ovens, dishwashers, ventilation & more",
    footnote: "Claims must be submitted by January 31, 2027.",
    startDate: "2026-07-01",
    endDate: "2026-12-31",
  },
  {
    id: "cafe-express-yourself",
    brand: "Café™",
    brandColor: "bg-[#0B3D2E]",
    title: "Express Yourself Rebate",
    amount: "Up to $3,000",
    blurb:
      "Buy 2 to 8 eligible Café™ appliances for a tiered prepaid Mastercard® rebate, plus bonus rebates for a wall oven & cooktop or a Commercial-Style Range.",
    eligibility: "Refrigeration, ranges, wall ovens, cooktops, dishwashers, ventilation & more",
    footnote: "Claims must be submitted by March 31, 2027.",
    startDate: "2026-07-01",
    endDate: "2026-12-31",
  },
  {
    id: "ge-profile-riser-pedestal",
    brand: "GE Profile™",
    brandColor: "bg-gray-900",
    title: "Free Riser or Pedestal",
    amount: "$200–$300 Value",
    blurb:
      "Buy a GE Profile® UltraFast Combo or front-load washer & dryer pair, and get a matching riser or pedestal free via mail-in rebate.",
    eligibility: "Select GE Profile front-load laundry pairs & UltraFast Combos",
    footnote: "Claims must be submitted by October 30, 2026.",
    startDate: "2026-07-09",
    endDate: "2026-09-30",
  },
  {
    id: "speed-queen-dryer",
    brand: "Speed Queen®",
    brandColor: "bg-[#D32F2F]",
    title: "Consumer Dryer Rebate",
    amount: "$50–$200",
    blurb:
      "Buy a select Speed Queen® dryer and get a prepaid Mastercard® rebate — commercial-grade durability, home ready.",
    eligibility: "Speed Queen DR3, DR5 & DR7 dryers (White & Matte Black)",
    footnote: "Ends September 20, 2026 — claims due October 20, 2026.",
    startDate: "2026-08-10",
    endDate: "2026-09-20",
  },
];

export function getRebateStatus(rebate: ManufacturerRebate, today: Date): "upcoming" | "active" | "ended" {
  const start = new Date(`${rebate.startDate}T00:00:00`);
  const end = new Date(`${rebate.endDate}T23:59:59`);
  if (today < start) return "upcoming";
  if (today > end) return "ended";
  return "active";
}

export function getActiveRebates(today: Date = new Date()): ManufacturerRebate[] {
  return MANUFACTURER_REBATES.filter((r) => getRebateStatus(r, today) === "active");
}

export function formatDateRange(startDate: string, endDate: string): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  const start = new Date(`${startDate}T00:00:00`).toLocaleDateString("en-US", opts);
  const end = new Date(`${endDate}T00:00:00`).toLocaleDateString("en-US", opts);
  return `${start} – ${end}`;
}

export type LaborDaySaleItem = {
  id: string;
  brand: string;
  category: string;
  image: string;
};

// 2026 Labor Day Sale — store-wide savings across Whirlpool, Maytag,
// KitchenAid and Amana kitchen and laundry suites. Runs through the end
// date below, then the whole section hides itself automatically.
export const LABOR_DAY_SALE_END = "2026-09-16";

export const LABOR_DAY_SALE_ITEMS: LaborDaySaleItem[] = [
  { id: "whirlpool-kitchen", brand: "Whirlpool®", category: "Kitchen Suite", image: "/promotions/labor-day-whirlpool-kitchen.jpg" },
  { id: "whirlpool-laundry", brand: "Whirlpool®", category: "Laundry Pair", image: "/promotions/labor-day-whirlpool-laundry.jpg" },
  { id: "maytag-kitchen", brand: "Maytag®", category: "Kitchen Suite", image: "/promotions/labor-day-maytag-kitchen.jpg" },
  { id: "maytag-laundry", brand: "Maytag®", category: "Laundry Pair", image: "/promotions/labor-day-maytag-laundry.jpg" },
  { id: "kitchenaid-kitchen", brand: "KitchenAid®", category: "Kitchen Suite", image: "/promotions/labor-day-kitchenaid-kitchen.jpg" },
  { id: "amana-kitchen", brand: "Amana®", category: "Kitchen Suite", image: "/promotions/labor-day-amana-kitchen.jpg" },
];

export function isLaborDaySaleActive(today: Date = new Date()): boolean {
  const end = new Date(`${LABOR_DAY_SALE_END}T23:59:59`);
  return today <= end;
}
