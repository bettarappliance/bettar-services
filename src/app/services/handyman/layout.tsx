import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handyman Services Kensington MD | Bethesda Handyman | Local Handyman Near Me",
  description: "Expert handyman services in Kensington, MD and Bethesda. Local handyman for home repairs, furniture assembly, painting, and maintenance. Commercial handyman services available. Same-day service. Call 301-949-2500.",
  keywords: "handyman kensington md, bethesda handyman services, local handyman bethesda, handyman bethesda, local handyman near me, commercial handyman bethesda, handyman services bethesda, home repair services, furniture assembly, painting services, general repairs, Kensington Maryland, Bethesda Maryland",
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

