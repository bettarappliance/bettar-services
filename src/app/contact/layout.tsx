import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Free Consultation | Bettar Appliance Master | 301-949-2500",
  description: "Contact Bettar Appliance Master — shop appliances, schedule repair, or request plumbing, handyman, and renovation services. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD. Free estimates. Call 301-949-2500 or fill out our contact form.",
  alternates: {
    canonical: "https://www.bettarservices.com/contact",
  },
  openGraph: {
    title: "Contact Us | Free Consultation | Bettar Appliance Master | 301-949-2500",
    description: "Contact Bettar Appliance Master — shop appliances, schedule repair, or request plumbing, handyman, and renovation services. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD. Free estimates.",
    url: "https://www.bettarservices.com/contact",
    siteName: "Bettar Appliance Master",
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


