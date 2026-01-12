import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
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
  title: "Bettar Appliance | Better Services & Better Appliances | Kensington, Bethesda, Rockville MD",
  description: "Bettar Services - Better services, better appliances. Bettar appliance repair, sales, and installation. Better appliance near me. Best appliance stores near me. Bettar appliance Kensington. Where to buy washing machine near me. Professional appliance services serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD. Family-owned since 1945. Call 301-949-2500.",
  keywords: "bettar appliance, bettar appliances, bettar appliance kensington, bettar appliance repair, better services, better appliances, better appliance, better appliance near me, better appliance repair, best appliance stores near me, appliance store near me, where to buy washing machine near me, bettar, bettar inc, bettar services, appliance sales, appliance repair, appliance installation, home improvement, renovation, plumbing, heating, handyman, kitchen remodeling, bathroom renovation, Bethesda MD, Chevy Chase MD, Rockville MD, Kensington MD, Potomac MD, Olney MD, Brookville MD, Gaithersburg MD, Germantown MD, Upper Northwest DC, Washington DC",
  authors: [{ name: "Bettar Services" }],
  creator: "Bettar Services",
  publisher: "Bettar Services",
  robots: "index, follow",
  alternates: {
    canonical: "https://bettarservices.com",
  },
  openGraph: {
    title: "Bettar Services - Home Improvement & Appliance Services",
    description: "Professional home improvement, renovation, plumbing, handyman, and appliance services serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD. Family-owned since 1945.",
    url: "https://bettarservices.com",
    siteName: "Bettar Services",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bettar Services - Home Improvement & Appliance Services",
    description: "Professional home improvement, renovation, plumbing, handyman, and appliance services serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD. Family-owned since 1945.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <BackToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
