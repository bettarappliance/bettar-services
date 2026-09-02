import type { BettarAppliance } from "@/types/appliance";

/**
 * Matching-Pair recommendation logic (see MatchingPairAppliance.tsx for the UI).
 *
 * Two tiers, in priority order:
 *  1. Explicit: the appliance's own `matchingModel` field (admin-entered, e.g. from
 *     manufacturer literature) is resolved to a live catalog item by exact model number.
 *  2. Heuristic: for category pairs we understand (currently washer <-> dryer), score
 *     same-brand candidates in the complementary category by how much of their model
 *     number they share with the current appliance's model number. Only ever returns a
 *     match when it's the single best-scoring, unambiguous candidate above a minimum
 *     confidence bar — real-world model numbers (e.g. GE GTW585BSVWS / GTX52EASPWB) often
 *     don't share a recognizable pattern at all, and in that case this deliberately finds
 *     nothing rather than guessing. The admin `matchingModel` field is the reliable path
 *     for those; this heuristic is a convenience for the pairs that do follow a pattern
 *     (e.g. Whirlpool WFW5720RW / WED5720RW, Electrolux ELFW7437AW / ELFE7437AW).
 */

// Category pairs the heuristic is allowed to reason about. Keyed on the normalized
// (lowercased, singular) category name. Extend this map if the catalog gains other
// well-defined coordinated pairs (e.g. cooktop <-> wall oven) with reliable model data.
const COMPLEMENTARY_CATEGORY: Record<string, string> = {
  washer: "dryer",
  dryer: "washer",
};

const MIN_SHARED_LENGTH = 4;
const MIN_SHARED_RATIO = 0.45;

export function normalizeCategory(category: string | undefined | null): string {
  const c = (category || "").trim().toLowerCase();
  return c.endsWith("s") && c.length > 1 ? c.slice(0, -1) : c;
}

/** Returns the complementary category (normalized, singular) or null if this category has no known pairing. */
export function getComplementaryCategory(category: string | undefined | null): string | null {
  const norm = normalizeCategory(category);
  return COMPLEMENTARY_CATEGORY[norm] ?? null;
}

function normalizeModelCore(model: string | undefined | null): string {
  return (model || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function normalizeColorWords(color: string | undefined | null): string[] {
  return (color || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** True when colors are unknown on either side, or share at least one word (e.g. "White" vs "White w/Black Stainless Backsplash"). */
function colorsCompatible(a: string | undefined, b: string | undefined): boolean {
  const wordsA = normalizeColorWords(a);
  const wordsB = normalizeColorWords(b);
  if (wordsA.length === 0 || wordsB.length === 0) return true;
  const setA = new Set(wordsA);
  return wordsB.some((w) => setA.has(w));
}

function longestCommonSubstringLength(a: string, b: string): number {
  if (!a || !b) return 0;
  let prev = new Array(b.length + 1).fill(0);
  let max = 0;
  for (let i = 1; i <= a.length; i++) {
    const curr = new Array(b.length + 1).fill(0);
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        curr[j] = prev[j - 1] + 1;
        if (curr[j] > max) max = curr[j];
      } else {
        curr[j] = 0;
      }
    }
    prev = curr;
  }
  return max;
}

/** Length of the longest shared substring between two model numbers, or 0 if it doesn't clear the confidence bar. */
export function modelSimilarityScore(modelA: string | undefined, modelB: string | undefined): number {
  const a = normalizeModelCore(modelA);
  const b = normalizeModelCore(modelB);
  if (!a || !b) return 0;
  const shared = longestCommonSubstringLength(a, b);
  const ratio = shared / Math.min(a.length, b.length);
  if (shared < MIN_SHARED_LENGTH || ratio < MIN_SHARED_RATIO) return 0;
  return shared;
}

/**
 * Picks the best heuristic match for `current` out of `candidates`. Candidates should
 * already be scoped to the current appliance's brand (callers query Firestore by brand
 * to keep reads cheap); this function does the rest of the filtering and scoring.
 * Returns null whenever there's no candidate, or more than one candidate ties for best —
 * an ambiguous match is treated the same as no match.
 */
export function findHeuristicMatch(
  current: BettarAppliance,
  candidates: BettarAppliance[]
): BettarAppliance | null {
  const targetCategory = getComplementaryCategory(current.category);
  if (!targetCategory || !current.modelNumber?.trim()) return null;

  const currentBrand = (current.brand || "").trim().toLowerCase();
  if (!currentBrand) return null;

  const scored = candidates
    .filter((c) => c.id !== current.id)
    .filter((c) => (c.brand || "").trim().toLowerCase() === currentBrand)
    .filter((c) => normalizeCategory(c.category) === targetCategory)
    .filter((c) => colorsCompatible(current.color, c.color))
    .map((c) => ({ appliance: c, score: modelSimilarityScore(current.modelNumber, c.modelNumber) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;
  if (scored.length > 1 && scored[0].score === scored[1].score) return null; // ambiguous — don't guess
  return scored[0].appliance;
}

function isLaundryPair(current: BettarAppliance, match: BettarAppliance): boolean {
  const a = normalizeCategory(current.category);
  const b = normalizeCategory(match.category);
  return (a === "washer" && b === "dryer") || (a === "dryer" && b === "washer");
}

export function pairSectionTitle(current: BettarAppliance, match: BettarAppliance): string {
  return isLaundryPair(current, match) ? "Complete Your Laundry Pair" : "Complete the Set";
}

export function pairSectionBlurb(current: BettarAppliance, match: BettarAppliance): string {
  return isLaundryPair(current, match)
    ? "Pair this appliance with its matching washer/dryer for a coordinated laundry set."
    : "This appliance has a matching set piece from the same brand and series.";
}
