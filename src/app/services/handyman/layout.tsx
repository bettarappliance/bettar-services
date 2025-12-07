import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handyman Services | Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown MD | Same-Day Service",
  description: "Professional handyman services serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD. Same-day handyman service for home repairs, furniture assembly, painting, and maintenance. Licensed & insured. Call 301-949-2500 for immediate service.",
  keywords: "handyman bethesda, handyman chevy chase, handyman rockville, handyman kensington, handyman potomac, handyman olney, handyman gaithersburg, handyman germantown, bethesda handyman services, chevy chase handyman, rockville handyman services, kensington handyman, potomac handyman, olney handyman, gaithersburg handyman, germantown handyman, upper northwest dc handyman, local handyman bethesda, local handyman near me, commercial handyman bethesda, home repair services, furniture assembly, painting services, general repairs",
  alternates: {
    canonical: "https://bettarservices.com/services/handyman",
  },
  openGraph: {
    title: "Handyman Services | Bethesda, Chevy Chase, Rockville, Kensington MD | Bettar Services",
    description: "Expert handyman services serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD. Professional home repairs, furniture assembly, painting, and general maintenance.",
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

