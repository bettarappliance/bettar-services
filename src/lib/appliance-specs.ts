import type { FeatureDetail, SpecGroup, SpecItem } from "@/types/appliance";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Parses an array of { label, value } rows; drops empty or malformed rows. */
export function parseSpecItems(v: unknown): SpecItem[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const items = v
    .filter(isRecord)
    .map((r) => ({ label: String(r.label ?? "").trim(), value: String(r.value ?? "").trim() }))
    .filter((r) => r.label && r.value);
  return items.length ? items : undefined;
}

/** Parses an array of { title, items } groups; drops groups with no valid rows. */
export function parseSpecGroups(v: unknown): SpecGroup[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const groups = v
    .filter(isRecord)
    .map((g) => ({ title: String(g.title ?? "").trim(), items: parseSpecItems(g.items) ?? [] }))
    .filter((g) => g.title && g.items.length);
  return groups.length ? groups : undefined;
}

/** Parses an array of { title, text } feature explanations; drops malformed rows. */
export function parseFeatureDetails(v: unknown): FeatureDetail[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const items = v
    .filter(isRecord)
    .map((r) => ({ title: String(r.title ?? "").trim(), text: String(r.text ?? "").trim() }))
    .filter((r) => r.title && r.text);
  return items.length ? items : undefined;
}
