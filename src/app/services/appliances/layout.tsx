import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appliance Repair Services | Same-Day Service | 301-949-2500",
  description: "⚡ Fast Same-Day Appliance Repair! Expert repair for refrigerators, washers, dryers, dishwashers & more. Licensed & insured. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown. All major brands. Call now!",
  keywords: "appliance repair bethesda, appliance repair chevy chase, appliance repair rockville, appliance repair kensington, appliance repair potomac, appliance repair olney, appliance repair gaithersburg, appliance repair germantown, refrigerator repair, washer repair, dryer repair, dishwasher repair, oven repair, range repair, microwave repair, same-day appliance repair, appliance maintenance, appliance installation",
  alternates: {
    canonical: "https://www.bettarservices.com/services/appliances",
  },
  openGraph: {
    title: "Appliance Repair Services | Same-Day Service | 301-949-2500",
    description: "⚡ Fast Same-Day Appliance Repair! Expert repair for refrigerators, washers, dryers, dishwashers & more. Licensed & insured. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown. All major brands. Call now!",
    url: "https://www.bettarservices.com/services/appliances",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function ApplianceServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
