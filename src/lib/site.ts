/** Canonical site origin for metadata, JSON-LD, and Open Graph. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.bettarservices.com";
