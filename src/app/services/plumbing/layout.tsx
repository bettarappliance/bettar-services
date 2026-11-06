import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plumbing & Water Heater Repair in Kensington, MD",
  description: "Water heater repair and replacement, plumbing repairs and heating service in Kensington, Bethesda, Rockville and Gaithersburg, MD. Family-owned since 1945. Call 301-949-2500.",
  keywords: "water heater repair gaithersburg md, water heater replacement gaithersburg md, water heater service gaithersburg, plumbing company gaithersburg, plumber gaithersburg, water heater repair bethesda, water heater replacement kensington, plumbing company bethesda md, plumbing company chevy chase, plumbing company rockville, plumbing company kensington, plumbing company potomac, plumbing company olney, plumbing company germantown, water heater service bethesda, heating services rockville, plumbing repair kensington, emergency plumbing potomac, plumber bethesda, plumber chevy chase, plumber rockville, plumber kensington, plumber potomac, plumber olney, plumber germantown, upper northwest dc plumbing",
  alternates: {
    canonical: "https://www.bettarservices.com/services/plumbing",
  },
  openGraph: {
    title: "Plumbing & Water Heater Repair in Kensington, MD | Bettar Appliance Master",
    description: "Water heater repair and replacement, plumbing repairs and heating service in Kensington, Bethesda, Rockville and Gaithersburg, MD. Family-owned since 1945. Call 301-949-2500.",
    url: "https://www.bettarservices.com/services/plumbing",
    siteName: "Bettar Appliance Master",
    locale: "en_US",
    type: "website",
  },
};

export default function PlumbingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

