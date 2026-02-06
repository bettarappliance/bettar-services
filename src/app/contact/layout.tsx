import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Free Consultation | Bettar Services | 301-949-2500",
  description: "Contact Bettar Services for all your home service needs. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD. Free estimates. Call 301-949-2500 or fill out our contact form.",
  alternates: {
    canonical: "https://www.bettarservices.com/contact",
  },
  openGraph: {
    title: "Contact Us | Free Consultation | Bettar Services | 301-949-2500",
    description: "Contact Bettar Services for all your home service needs. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD. Free estimates.",
    url: "https://www.bettarservices.com/contact",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


