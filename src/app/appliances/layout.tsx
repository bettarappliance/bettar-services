import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appliance Sales & Store Near Me | Sales, Installation & Repair | 301-949-2500",
  description: "Shop appliances first at Bettar Appliance Master in Kensington, MD! Top brands, competitive prices, delivery & installation on refrigerators, washers, dishwashers & more. Expert repair when you need it. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown. Call now!",
  keywords: "bettar appliance, bettar appliances, bettar appliance kensington, bettar appliance repair, better appliance near me, better appliance repair, best appliance stores near me, appliance store near me, where to buy washing machine near me, appliance store kensington md, appliance repair kensington, bettar appliances, appliance store bethesda md, appliance repair bethesda, appliance store chevy chase, appliance repair rockville, appliance store kensington, appliance repair potomac, appliance store olney, appliance repair gaithersburg, appliance store germantown, appliance repair upper northwest dc, appliance sales bethesda, appliance installation chevy chase, refrigerator repair rockville, washer repair kensington, dishwasher repair potomac, appliance service olney, appliance store maryland, appliance repair washington dc",
  alternates: {
    canonical: "https://www.bettarservices.com/appliances",
  },
  openGraph: {
    title: "Appliance Sales & Store Near Me | Sales, Installation & Repair | 301-949-2500",
    description: "Shop appliances first at Bettar Appliance Master in Kensington, MD! Top brands, competitive prices, delivery & installation on refrigerators, washers, dishwashers & more. Expert repair when you need it. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown. Call now!",
    url: "https://www.bettarservices.com/appliances",
    siteName: "Bettar Appliance Master",
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

