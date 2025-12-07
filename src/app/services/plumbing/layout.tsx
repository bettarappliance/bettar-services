import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plumbing Company | Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown MD | Water Heater Service",
  description: "Professional plumbing company serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD. Expert water heater service, heating services, plumbing repair, and emergency plumbing. Licensed plumbers. Same-day service. Call 301-949-2500.",
  keywords: "plumbing company bethesda md, plumbing company chevy chase, plumbing company rockville, plumbing company kensington, plumbing company potomac, plumbing company olney, plumbing company gaithersburg, plumbing company germantown, water heater service bethesda, heating services rockville, plumbing repair kensington, emergency plumbing potomac, plumber bethesda, plumber chevy chase, plumber rockville, plumber kensington, plumber potomac, plumber olney, plumber gaithersburg, plumber germantown, upper northwest dc plumbing",
  alternates: {
    canonical: "https://bettarservices.com/services/plumbing",
  },
  openGraph: {
    title: "Water Heater Service | Bethesda, Chevy Chase, Rockville, Kensington MD | Plumbing Repair",
    description: "Professional water heater service and heating services serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD. Expert plumbing repairs, water heater installation, heating system maintenance.",
    url: "https://bettarservices.com/services/plumbing",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function PlumbingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

