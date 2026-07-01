import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"
import BackToTop from "../components/BackToTop";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bettarservices.com"),
  title: {
    default: "Bettar Appliance Master | Bettar Appliance Sales and Services | Kensington, Bethesda & Rockville MD",
    template: "%s | Bettar Appliance Master",
  },
  applicationName: "Bettar Appliance Master",
  description: "Bettar Appliance Master — shop appliances first at our Kensington, MD store. Refrigerators, washers, dryers, dishwashers & more with delivery and installation. Expert appliance repair when you need it. Also serving Bethesda, Chevy Chase, Rockville, Potomac, Olney, Gaithersburg, Germantown & Upper Northwest DC with plumbing, handyman & renovation services. Family-owned since 1945. Call 301-949-2500.",
  keywords: "bettar appliance, bettar appliances, bettar appliance kensington, bettar appliance repair, better services, better appliances, better appliance, better appliance near me, better appliance repair, best appliance stores near me, appliance store near me, where to buy washing machine near me, bettar, bettar inc, bettar services, appliance sales, appliance repair, appliance installation, home improvement, renovation, plumbing, heating, handyman, kitchen remodeling, bathroom renovation, Bethesda MD, Chevy Chase MD, Rockville MD, Kensington MD, Potomac MD, Olney MD, Brookville MD, Gaithersburg MD, Germantown MD, Upper Northwest DC, Washington DC",
  authors: [{ name: "Bettar Appliance Master" }],
  creator: "Bettar Appliance Master",
  publisher: "Bettar Appliance Master",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.bettarservices.com",
  },
  openGraph: {
    title: "Appliance Sales & Store | Bettar Appliance Master",
    description: "Shop appliances at Bettar Appliance Master in Kensington, MD — sales, delivery & installation on top brands. Expert appliance repair, plus plumbing, handyman & renovation services serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, Germantown & Upper Northwest DC. Family-owned since 1945.",
    url: "https://www.bettarservices.com",
    siteName: "Bettar Appliance Master",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Appliance Sales & Store | Bettar Appliance Master",
    description: "Shop appliances at Bettar Appliance Master in Kensington, MD — sales, delivery & installation on top brands. Expert appliance repair, plus plumbing, handyman & renovation services serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, Germantown & Upper Northwest DC. Family-owned since 1945.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.bettarservices.com/#organization",
                  name: "Bettar Appliance Master",
                  url: "https://www.bettarservices.com",
                  logo: "https://www.bettarservices.com/bettarlogo.png",
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.bettarservices.com/#website",
                  name: "Bettar Appliance Master",
                  url: "https://www.bettarservices.com",
                  description: "Appliance sales, delivery, installation and repair in Kensington, MD and surrounding Montgomery County.",
                  publisher: {
                    "@id": "https://www.bettarservices.com/#organization",
                  },
                },
              ],
            }),
          }}
        />
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BPNM2TFQ4C"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BPNM2TFQ4C');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "urbe3fux8r");
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <div className="pt-[60px] sm:pt-16">
          {children}
        </div>
        <BackToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
