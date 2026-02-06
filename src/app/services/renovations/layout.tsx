import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renovations & Remodeling | Kitchen & Bathroom Remodels | Bettar Services",
  description: "Expert home renovations and remodeling services. Kitchen remodels, bathroom renovations, deck construction, and complete home transformations. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD. Licensed & insured. Call 301-949-2500.",
  alternates: {
    canonical: "https://www.bettarservices.com/services/renovations",
  },
  openGraph: {
    title: "Renovations & Remodeling | Kitchen & Bathroom Remodels | Bettar Services",
    description: "Expert home renovations and remodeling services. Kitchen remodels, bathroom renovations, deck construction, and complete home transformations. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD.",
    url: "https://www.bettarservices.com/services/renovations",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function RenovationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


