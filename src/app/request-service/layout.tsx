import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Service | Free Estimate | Bettar Appliance Master | 301-949-2500",
  description: "Request service from Bettar Appliance Master. Shop appliances, schedule repair, or get a free estimate for plumbing, handyman services, or renovations. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD.",
  alternates: {
    canonical: "https://www.bettarservices.com/request-service",
  },
  openGraph: {
    title: "Request Service | Free Estimate | Bettar Appliance Master | 301-949-2500",
    description: "Request service from Bettar Appliance Master. Shop appliances, schedule repair, or get a free estimate for plumbing, handyman services, or renovations.",
    url: "https://www.bettarservices.com/request-service",
    siteName: "Bettar Appliance Master",
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


