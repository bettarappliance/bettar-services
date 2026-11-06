import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handyman Services in Bethesda & Kensington, MD",
  description: "Home repairs, furniture assembly, painting and more in Bethesda, Kensington, Rockville and Gaithersburg, MD. Licensed & insured, family-owned since 1945. Call 301-949-2500.",
  keywords: "handyman bethesda, handyman chevy chase, handyman rockville, handyman kensington, handyman potomac, handyman olney, handyman gaithersburg, handyman germantown, bethesda handyman services, chevy chase handyman, rockville handyman services, kensington handyman, potomac handyman, olney handyman, gaithersburg handyman, germantown handyman, upper northwest dc handyman, local handyman bethesda, local handyman near me, commercial handyman bethesda, home repair services, furniture assembly, painting services, general repairs",
  alternates: {
    canonical: "https://www.bettarservices.com/services/handyman",
  },
  openGraph: {
    title: "Handyman Services in Bethesda & Kensington, MD | Bettar Appliance Master",
    description: "Home repairs, furniture assembly, painting and more in Bethesda, Kensington, Rockville and Gaithersburg, MD. Licensed & insured, family-owned since 1945. Call 301-949-2500.",
    url: "https://www.bettarservices.com/services/handyman",
    siteName: "Bettar Appliance Master",
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

