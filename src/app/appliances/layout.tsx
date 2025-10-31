import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bettar Appliance | Bettar Appliances | Appliance Sales & Repair",
  description: "Bettar Appliance - Your trusted source for quality appliances in Kensington, MD. Bettar Appliances offers professional appliance sales, installation, and repair services. Family-owned since 1945. Visit Bettar Inc for all your appliance needs. Call 301-949-2500.",
  keywords: "bettar appliance, bettar appliances, bettar inc, appliance sales, appliance repair, appliance installation, Kensington MD, Bethesda, appliance store",
  alternates: {
    canonical: "https://bettarservices.com/appliances",
  },
  openGraph: {
    title: "Bettar Appliance | Bettar Appliances | Appliance Sales & Repair",
    description: "Bettar Appliance - Your trusted source for quality appliances in Kensington, MD. Bettar Appliances offers professional appliance sales, installation, and repair services.",
    url: "https://bettarservices.com/appliances",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
};

export default function AppliancesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

