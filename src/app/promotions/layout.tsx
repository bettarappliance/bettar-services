import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appliance Promotions & Deals | Current Rebates & Sales | Bettar Appliance Master",
  description:
    "See current appliance promotions, deals and manufacturer rebates at Bettar Appliance Master in Kensington, MD. Save on Whirlpool, Café, GE Profile, Maytag, KitchenAid, Amana & Speed Queen — serving Bethesda, Chevy Chase, Rockville & the DMV.",
  keywords:
    "appliance promotions, appliance deals, appliance sales, appliance discounts, appliance special offers, appliance rebates, current appliance promotions, appliance deals kensington md, appliance deals bethesda, appliance deals rockville, appliance rebates chevy chase, appliance sales potomac, appliance promotions gaithersburg, bettar appliance promotions, bettar appliance deals, manufacturer appliance rebates, labor day appliance sale",
  alternates: {
    canonical: "https://www.bettarservices.com/promotions",
  },
  robots: "index, follow",
  openGraph: {
    title: "Appliance Promotions & Deals | Bettar Appliance Master",
    description:
      "Current appliance promotions, manufacturer rebates and seasonal sales on top brands at Bettar Appliance Master — Kensington, MD.",
    url: "https://www.bettarservices.com/promotions",
    siteName: "Bettar Appliance Master",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.bettarservices.com/appliancehero.png",
        alt: "Current appliance promotions and deals at Bettar Appliance Master",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appliance Promotions & Deals | Bettar Appliance Master",
    description:
      "Current appliance promotions, manufacturer rebates and seasonal sales on top brands at Bettar Appliance Master.",
    images: ["https://www.bettarservices.com/appliancehero.png"],
  },
};

export default function PromotionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
