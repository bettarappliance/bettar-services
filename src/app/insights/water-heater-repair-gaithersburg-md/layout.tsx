import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Water Heater Repair Gaithersburg MD | Same-Day Service | Bettar Services",
  description: "Expert water heater repair and replacement in Gaithersburg, MD. Tankless & conventional water heater service. Same-day emergency repairs. Call 301-949-2500 for immediate help.",
  alternates: {
    canonical: "https://www.bettarservices.com/insights/water-heater-repair-gaithersburg-md",
  },
  authors: [{ name: "Bettar Services" }],
  openGraph: {
    title: "Water Heater Repair Gaithersburg MD | Same-Day Service | Bettar Services",
    description: "Expert water heater repair and replacement in Gaithersburg, MD. Tankless & conventional water heater service. Same-day emergency repairs.",
    url: "https://www.bettarservices.com/insights/water-heater-repair-gaithersburg-md",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-02-05T10:00:00.000Z",
    modifiedTime: "2026-02-05T10:00:00.000Z",
    authors: ["Bettar Services"],
  },
};

export default function WaterHeaterRepairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
