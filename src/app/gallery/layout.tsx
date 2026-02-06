import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Gallery | Home Renovations & Remodeling | Bettar Services",
  description: "View our portfolio of completed home renovation and remodeling projects. Kitchen remodels, bathroom renovations, deck construction, and more. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD.",
  alternates: {
    canonical: "https://www.bettarservices.com/gallery",
  },
  openGraph: {
    title: "Project Gallery | Home Renovations & Remodeling | Bettar Services",
    description: "View our portfolio of completed home renovation and remodeling projects. Kitchen remodels, bathroom renovations, deck construction, and more.",
    url: "https://www.bettarservices.com/gallery",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


