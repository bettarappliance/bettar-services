import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plumbing Company Kensington MD | Water Heater Service | Heating Services",
  description: "Professional plumbing company in Kensington, MD. Expert water heater service, heating services, plumbing repair, and emergency plumbing. Licensed plumbers serving Kensington and Bethesda. Same-day service. Call 301-949-2500.",
  keywords: "plumbing company kensington md, plumbing kensington md, water heater service kensington md, heating services kensington md, plumbing repair kensington md, plumbing services kensington md, water heater repair, heating system maintenance, boiler repair kensington md, plumber kensington md, Kensington Maryland, Bethesda Maryland",
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

