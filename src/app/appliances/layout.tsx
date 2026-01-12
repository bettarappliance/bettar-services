import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bettar Appliance | Appliance Store & Repair Near Me | Kensington, Bethesda, Rockville MD | Bettar Appliances",
  description: "Bettar Appliance - Your local appliance store in Kensington, MD. Best appliance stores near me. Bettar appliance repair, sales, and installation. Where to buy washing machine near me. Better appliance near me. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown. Same-day service. Call 301-949-2500.",
  keywords: "bettar appliance, bettar appliances, bettar appliance kensington, bettar appliance repair, better appliance near me, better appliance repair, best appliance stores near me, appliance store near me, where to buy washing machine near me, appliance store kensington md, appliance repair kensington, bettar appliances, appliance store bethesda md, appliance repair bethesda, appliance store chevy chase, appliance repair rockville, appliance store kensington, appliance repair potomac, appliance store olney, appliance repair gaithersburg, appliance store germantown, appliance repair upper northwest dc, appliance sales bethesda, appliance installation chevy chase, refrigerator repair rockville, washer repair kensington, dishwasher repair potomac, appliance service olney, appliance store maryland, appliance repair washington dc",
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

