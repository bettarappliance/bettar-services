import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Service | Free Estimate | Bettar Services | 301-949-2500",
  description: "Request service from Bettar Services. Get a free estimate for appliance repair, plumbing, handyman services, or renovations. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD.",
  alternates: {
    canonical: "https://www.bettarservices.com/request-service",
  },
  openGraph: {
    title: "Request Service | Free Estimate | Bettar Services | 301-949-2500",
    description: "Request service from Bettar Services. Get a free estimate for appliance repair, plumbing, handyman services, or renovations.",
    url: "https://www.bettarservices.com/request-service",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function RequestServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
