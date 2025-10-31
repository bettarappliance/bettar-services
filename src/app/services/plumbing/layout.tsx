import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Water Heater Service Kensington MD | Heating Services | Plumbing Repair",
  description: "Professional water heater service and heating services in Kensington, MD. Expert plumbing repairs, water heater installation, heating system maintenance. Licensed plumbers serving Kensington and Bethesda. Call 301-949-2500.",
  keywords: "water heater service kensington md, heating services kensington md, water heater repair, heating system maintenance, plumbing kensington, water heater installation, heating repair, Kensington Maryland, Bethesda Maryland",
  alternates: {
    canonical: "https://bettarservices.com/services/plumbing",
  },
  openGraph: {
    title: "Water Heater Service Kensington MD | Heating Services | Plumbing Repair",
    description: "Professional water heater service and heating services in Kensington, MD. Expert plumbing repairs, water heater installation, heating system maintenance.",
    url: "https://bettarservices.com/services/plumbing",
    siteName: "Bettar Services",
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

