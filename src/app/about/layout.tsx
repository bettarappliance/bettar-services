import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Family-Owned Since 1945 | Bettar Appliance Master",
  description: "Learn about Bettar Appliance Master — a family-owned appliance store and home services company serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, and Germantown, MD since 1945. Shop appliances first, with expert repair and trusted home services.",
  alternates: {
    canonical: "https://www.bettarservices.com/about",
  },
  openGraph: {
    title: "About Us | Family-Owned Since 1945 | Bettar Appliance Master",
    description: "Learn about Bettar Appliance Master — a family-owned appliance store and home services company serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, and Germantown, MD since 1945.",
    url: "https://www.bettarservices.com/about",
    siteName: "Bettar Appliance Master",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


