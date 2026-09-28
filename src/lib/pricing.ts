/**
 * Service pricing shown on the public site.
 * Source: Mernielyn (CSR onboarding pricing), Sep 2026.
 * Update here and every page that shows these prices stays in sync.
 */
export const DIAGNOSTIC_FEE = 179;
export const DIAGNOSTIC_FEE_LABEL = `$${DIAGNOSTIC_FEE}`;

/** Diagnosing each additional appliance on the same visit. */
export const ADDITIONAL_APPLIANCE_FEE = 40;
export const ADDITIONAL_APPLIANCE_FEE_LABEL = `$${ADDITIONAL_APPLIANCE_FEE}`;

/**
 * Service call (diagnostic) is valid for this many days from the initial visit,
 * for the diagnosed issue only. Repair quotes are valid for the same period.
 */
export const QUOTE_VALID_DAYS = 30;

/** Completed repairs: parts and labor warranty, under normal use. */
export const REPAIR_WARRANTY_DAYS = 30;

/** Handyman labor rates (materials not included). */
export const HANDYMAN_RATES = [
  { crew: "1 handyman", firstHour: 95, additionalHour: 65 },
  { crew: "Handyman + helper", firstHour: 160, additionalHour: 110 },
];

/** Minimum installation / haul-away fees for appliances purchased from Bettar. */
export const INSTALLATION_MINIMUMS = [
  { item: "Refrigerator", price: "$130" },
  { item: "Dishwasher", price: "$175" },
  { item: "Range", price: "$120" },
  { item: "Range hood", price: "$200" },
  { item: "Cooktop", price: "$250" },
  { item: "Wall oven", price: "$200" },
  { item: "Ice maker", price: "$200" },
  { item: "Garbage disposer", price: "$248" },
  { item: "Trash compactor", price: "$400" },
  { item: "Laundry (washer or dryer)", price: "$130" },
];

export const INSTALLATION_ADD_ONS = [
  { item: "Gas hook-up", price: "$120–$295" },
  { item: "Additional helper", price: "$75" },
];
