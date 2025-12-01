import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appliance Repair Kensington MD | Appliance Store | Same-Day Service | Bettar Appliances",
  description: "Appliance repair in Kensington, MD. Same-day appliance repair service for refrigerators, washers, dryers, dishwashers. Professional appliance store with sales, installation & repair. Licensed technicians. Call 301-949-2500 for immediate service.",
  keywords: "appliance store kensington md, appliance sales kensington md, appliance repair kensington md, appliance installation kensington md, bettar appliance, bettar appliances, appliance store bethesda, appliance repair bethesda, refrigerator repair kensington md, washer repair kensington md, dishwasher repair kensington md, appliance service kensington md, Kensington Maryland, Bethesda Maryland, Chevy Chase",
  alternates: {
    canonical: "https://bettarservices.com/appliances",
  },
  openGraph: {
    title: "Appliance Store Kensington MD | Appliance Sales & Repair | Bettar Appliances",
    description: "Professional appliance store in Kensington, MD. Expert appliance sales, repair, and installation services. Same-day service available.",
    url: "https://bettarservices.com/appliances",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function AppliancesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

