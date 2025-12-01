import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handyman Kensington MD | Bethesda Handyman | Local Handyman Services | Same-Day Service",
  description: "Professional handyman in Kensington, MD and Bethesda. Same-day handyman service for home repairs, furniture assembly, painting, and maintenance. Local handyman near you. Licensed & insured. Call 301-949-2500 for immediate service.",
  keywords: "handyman kensington md, handyman bethesda, bethesda handyman, bethesda handyman services, local handyman bethesda, local handyman near me, handyman services bethesda, handyman services bethesda md, commercial handyman bethesda, home repair services, furniture assembly, painting services, general repairs, Kensington Maryland, Bethesda Maryland, handyman services dc, dc home repair services",
  alternates: {
    canonical: "https://bettarservices.com/services/handyman",
  },
  openGraph: {
    title: "Handyman Services Kensington MD | Bethesda Handyman | Bettar Services",
    description: "Expert handyman services in Kensington, MD and Bethesda. Professional home repairs, furniture assembly, painting, and general maintenance.",
    url: "https://bettarservices.com/services/handyman",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function HandymanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

