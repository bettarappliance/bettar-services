import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Services | Appliance Repair, Plumbing, Renovations | Bettar Services",
  description: "Comprehensive home services including appliance repair, plumbing, handyman services, and renovations. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD. Licensed & insured. Call 301-949-2500.",
  alternates: {
    canonical: "https://www.bettarservices.com/services",
  },
  openGraph: {
    title: "Home Services | Appliance Repair, Plumbing, Renovations | Bettar Services",
    description: "Comprehensive home services including appliance repair, plumbing, handyman services, and renovations. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD.",
    url: "https://www.bettarservices.com/services",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
