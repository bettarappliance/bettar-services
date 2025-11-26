import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bettar Appliance | Bettar Services - Appliance Sales & Repair | Kensington MD",
  description: "Bettar Appliance - Your trusted source for appliance sales, repair, and installation in Kensington, MD. Bettar Services provides professional home improvement, plumbing, handyman, and renovation services. Family-owned since 1945. Serving Bethesda, Chevy Chase, and Northwest DC. Call 301-949-2500.",
  keywords: "bettar appliance, bettar appliances, bettar inc, bettar services, appliance sales, appliance repair, appliance installation, home improvement, renovation, plumbing, heating, handyman, kitchen remodeling, bathroom renovation, Kensington MD, Bethesda, Chevy Chase, Washington DC",
  authors: [{ name: "Bettar Services" }],
  creator: "Bettar Services",
  publisher: "Bettar Services",
  robots: "index, follow",
  alternates: {
    canonical: "https://bettarservices.com",
  },
  openGraph: {
    title: "Bettar Services - Home Improvement & Appliance Services",
    description: "Professional home improvement, renovation, plumbing, handyman, and appliance services in Kensington, MD. Family-owned since 1945.",
    url: "https://bettarservices.com",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bettar Services - Home Improvement & Appliance Services",
    description: "Professional home improvement, renovation, plumbing, handyman, and appliance services in Kensington, MD. Family-owned since 1945.",
  },
  icons: {
    icon: '/bettarlogo.ico',
    shortcut: '/bettarlogo.ico',
    apple: '/bettarlogo.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TMB62XRVQJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TMB62XRVQJ');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
