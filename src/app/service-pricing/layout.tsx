import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Pricing | Appliance Repair Diagnostic Fee | Bettar Appliance Master",
  description:
    "Appliance repair diagnostic visit: $179, credited toward your repair if you approve it. Handyman rates, appliance installation fees, and how our flat-rate repair pricing works. Serving Kensington, Bethesda, Chevy Chase, Rockville & the DMV. Call 301-949-2500.",
  alternates: {
    canonical: "https://www.bettarservices.com/service-pricing",
  },
  robots: "index, follow",
  openGraph: {
    title: "Service Pricing | Bettar Appliance Master",
    description:
      "Appliance repair diagnostic visit: $179, credited toward your repair if you approve it.",
    url: "https://www.bettarservices.com/service-pricing",
    siteName: "Bettar Appliance Master",
    locale: "en_US",
    type: "website",
  },
};

export default function ServicePricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
