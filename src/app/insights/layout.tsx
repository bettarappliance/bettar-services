import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Insights & Tips | Appliance Care & Home Maintenance | Bettar Services",
  description: "Expert tips and insights on appliance maintenance, troubleshooting common problems, and home care advice. Learn from Bettar Services' decades of experience serving the DC and Maryland area.",
  alternates: {
    canonical: "https://www.bettarservices.com/insights",
  },
  openGraph: {
    title: "Latest Insights & Tips | Appliance Care & Home Maintenance | Bettar Services",
    description: "Expert tips and insights on appliance maintenance, troubleshooting common problems, and home care advice from Bettar Services.",
    url: "https://www.bettarservices.com/insights",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
