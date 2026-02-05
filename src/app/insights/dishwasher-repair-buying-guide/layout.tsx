import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dishwasher Repair & Buying Guide | Local Appliance Technician | Bettar Services",
  description: "Expert dishwasher repair in Bethesda, Gaithersburg & Rockville, MD. Troubleshoot common problems or find the perfect new dishwasher. Local appliance experts since 1945.",
  alternates: {
    canonical: "https://www.bettarservices.com/insights/dishwasher-repair-buying-guide",
  },
  authors: [{ name: "Bettar Services" }],
  openGraph: {
    title: "Dishwasher Repair & Buying Guide | Local Appliance Technician | Bettar Services",
    description: "Expert dishwasher repair and buying advice from local appliance technicians serving Maryland since 1945.",
    url: "https://www.bettarservices.com/insights/dishwasher-repair-buying-guide",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-02-05T10:00:00.000Z",
    modifiedTime: "2026-02-05T10:00:00.000Z",
    authors: ["Bettar Services"],
  },
};

export default function DishwasherGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
