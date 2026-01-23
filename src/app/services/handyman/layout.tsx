import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Same-Day Handyman Near Me | Licensed & Insured | 301-949-2500",
  description: "Fast Same-Day Handyman Service! Home repairs, furniture assembly, painting & more. Licensed & insured. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown. Free estimates. Call now for immediate service!",
  keywords: "handyman bethesda, handyman chevy chase, handyman rockville, handyman kensington, handyman potomac, handyman olney, handyman gaithersburg, handyman germantown, bethesda handyman services, chevy chase handyman, rockville handyman services, kensington handyman, potomac handyman, olney handyman, gaithersburg handyman, germantown handyman, upper northwest dc handyman, local handyman bethesda, local handyman near me, commercial handyman bethesda, home repair services, furniture assembly, painting services, general repairs",
  alternates: {
    canonical: "https://www.bettarservices.com/services/handyman",
  },
  openGraph: {
    title: "Same-Day Handyman Near Me | Licensed & Insured | 301-949-2500",
    description: "⚡ Fast Same-Day Handyman Service! Home repairs, furniture assembly, painting & more. Licensed & insured. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown. Free estimates. Call now for immediate service!",
    url: "https://www.bettarservices.com/services/handyman",
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

