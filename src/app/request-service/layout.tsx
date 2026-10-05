import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Appliance Repair | Bettar Appliance Master | 301-949-2500",
  description: "Request appliance repair from Bettar Appliance Master. The $179 diagnostic fee is credited toward your repair. Our team will contact you to confirm your appointment. Serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, MD.",
  alternates: {
    canonical: "https://www.bettarservices.com/request-service",
  },
  openGraph: {
    title: "Request Appliance Repair | Bettar Appliance Master | 301-949-2500",
    description: "Request appliance repair from Bettar Appliance Master. The $179 diagnostic fee is credited toward your repair. Our team will contact you to confirm your appointment.",
    url: "https://www.bettarservices.com/request-service",
    siteName: "Bettar Appliance Master",
    locale: "en_US",
    type: "website",
  },
};

export default function RequestServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


