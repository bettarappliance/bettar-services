import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appliance Store Kensington MD | Appliance Sales & Repair | Bettar Appliances",
  description: "Professional appliance store in Kensington, MD. Expert appliance sales, repair, and installation services. Bettar Appliances offers same-day service for refrigerators, washers, dryers, dishwashers, and more. Serving Kensington, Bethesda, and Chevy Chase. Family-owned since 1945. Call 301-949-2500.",
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

