import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appliance Store & Repair | Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown MD | Bettar Appliances",
  description: "Professional appliance sales, repair, and installation serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown. Same-day appliance repair service for refrigerators, washers, dryers, dishwashers. Licensed technicians. Call 301-949-2500.",
  keywords: "appliance store bethesda md, appliance repair bethesda, appliance store chevy chase, appliance repair rockville, appliance store kensington, appliance repair potomac, appliance store olney, appliance repair gaithersburg, appliance store germantown, appliance repair upper northwest dc, appliance sales bethesda, appliance installation chevy chase, refrigerator repair rockville, washer repair kensington, dishwasher repair potomac, appliance service olney, bettar appliances, appliance store maryland, appliance repair washington dc",
  alternates: {
    canonical: "https://bettarservices.com/appliances",
  },
  openGraph: {
    title: "Appliance Store & Repair | Bethesda, Chevy Chase, Rockville, Kensington MD | Bettar Appliances",
    description: "Professional appliance sales, repair, and installation serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, and Germantown. Same-day service available.",
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

