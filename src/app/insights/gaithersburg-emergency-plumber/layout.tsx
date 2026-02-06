import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Plumber Gaithersburg MD | 24/7 Plumbing Service | Bettar Services",
  description: "24/7 emergency plumber in Gaithersburg, MD. Burst pipes, water heater failures, drain clogs. Fast response, licensed plumbers. Call 301-949-2500 now for immediate help.",
  alternates: {
    canonical: "https://www.bettarservices.com/insights/gaithersburg-emergency-plumber",
  },
  authors: [{ name: "Bettar Services" }],
  openGraph: {
    title: "Emergency Plumber Gaithersburg MD | 24/7 Plumbing Service | Bettar Services",
    description: "24/7 emergency plumber in Gaithersburg, MD. Burst pipes, water heater failures, drain clogs. Fast response, licensed plumbers.",
    url: "https://www.bettarservices.com/insights/gaithersburg-emergency-plumber",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-02-05T10:00:00.000Z",
    modifiedTime: "2026-02-05T10:00:00.000Z",
    authors: ["Bettar Services"],
  },
};

export default function EmergencyPlumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
