import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Family-Owned Since 1945 | Bettar Services",
  description: "Learn about Bettar Services - a family-owned business serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, and Germantown, MD since 1945. Trusted home services and appliance experts.",
  alternates: {
    canonical: "https://www.bettarservices.com/about",
  },
  openGraph: {
    title: "About Us | Family-Owned Since 1945 | Bettar Services",
    description: "Learn about Bettar Services - a family-owned business serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, and Germantown, MD since 1945.",
    url: "https://www.bettarservices.com/about",
    siteName: "Bettar Services",
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
