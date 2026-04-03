"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs, db } from "@/lib/firebase";
import RequestServiceModal from "../components/RequestServiceModal";
import GoogleReviews from "../components/GoogleReviews";
import ContactForm from "../components/ContactForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

type BettarAppliance = {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceFrom: number;
  priceOld?: number;
  discountPercent?: number;
  shortDescription?: string;
  modelNumber?: string;
  inStock?: boolean;
  images?: string[];
};

export default function Home() {
  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Firestore state for appliances
  const [appliances, setAppliances] = useState<BettarAppliance[]>([]);
  const [loadingAppliances, setLoadingAppliances] = useState(true);

  // Fetch appliances from Firestore
  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const ref = collection(db, "appliances");
        const snap = await getDocs(ref);
        const items: BettarAppliance[] = snap.docs.map((doc) => {
          const data = doc.data() as Omit<BettarAppliance, "id">;
          return { id: doc.id, ...data };
        });
        
        // Sort by discount percentage (highest first), then limit to 5 items
        const sortedByDiscount = items.sort((a, b) => {
          const discountA = a.discountPercent || 0;
          const discountB = b.discountPercent || 0;
          return discountB - discountA; // Descending order
        });
        
        setAppliances(sortedByDiscount.slice(0, 5));
      } catch (error) {
        console.error("Error loading appliances from Firestore", error);
      } finally {
        setLoadingAppliances(false);
      }
    };

    fetchAppliances();
  }, []);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Bettar Services",
    "description": "Professional home improvement, renovation, plumbing, handyman, and appliance services serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD. Family-owned since 1945.",
    "url": "https://bettarservices.com",
    "telephone": "301-949-2500",
    "email": "Info@bettarappliance.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "10503 Wheatley St",
      "addressLocality": "Kensington",
      "addressRegion": "MD",
      "postalCode": "20895",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.0254",
      "longitude": "-77.0744"
    },
    "openingHours": "Mo-Fr 08:00-17:00",
    "foundingDate": "1945",
    "areaServed": [
      {
        "@type": "City",
        "name": "Upper Northwest DC"
      },
      {
        "@type": "City",
        "name": "Bethesda",
        "containedIn": {
          "@type": "State",
          "name": "Maryland"
        }
      },
      {
        "@type": "City",
        "name": "Chevy Chase",
        "containedIn": {
          "@type": "State",
          "name": "Maryland"
        }
      },
      {
        "@type": "City",
        "name": "Rockville",
        "containedIn": {
          "@type": "State",
          "name": "Maryland"
        }
      },
      {
        "@type": "City",
        "name": "Kensington",
        "containedIn": {
          "@type": "State",
          "name": "Maryland"
        }
      },
      {
        "@type": "City",
        "name": "Potomac",
        "containedIn": {
          "@type": "State",
          "name": "Maryland"
        }
      },
      {
        "@type": "City",
        "name": "Olney",
        "containedIn": {
          "@type": "State",
          "name": "Maryland"
        }
      },
      {
        "@type": "City",
        "name": "Brookville",
        "containedIn": {
          "@type": "State",
          "name": "Maryland"
        }
      },
      {
        "@type": "City",
        "name": "Gaithersburg",
        "containedIn": {
          "@type": "State",
          "name": "Maryland"
        }
      },
      {
        "@type": "City",
        "name": "Germantown",
        "containedIn": {
          "@type": "State",
          "name": "Maryland"
        }
      }
    ],
    "alternateName": "Bettar Appliance",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "39.0254",
        "longitude": "-77.0744"
      },
      "geoRadius": "25000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Home Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Renovations and Remodeling",
            "description": "Transform your home with our expert renovation and remodeling services. From kitchen makeovers to bathroom upgrades, we bring your vision to life with quality craftsmanship and attention to detail."
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Plumbing and Heating",
            "description": "Keep your home comfortable year-round with our professional plumbing and heating services. From emergency repairs to system installations, we ensure your home's comfort and safety."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Handyman Repair and Services",
            "description": "From small repairs to major installations, our skilled handyman services handle all your home maintenance needs. Trust our experienced team to get the job done right the first time."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Handyman Services",
            "description": "Professional commercial handyman services for businesses in Bethesda, Kensington, and surrounding areas. Commercial maintenance, repairs, and installations."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Appliance Sales and Services", 
            "description": "Discover our wide selection of quality appliances for your home. From refrigerators and washers to ovens and dishwashers, we offer top brands at competitive prices with professional installation and warranty coverage."
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1448"
    }
  };
  const historyImages = [
    "/history/image.jpg",
    "/history/2025-05-07 (1).jpg",
    "/history/2025-05-07 (2).jpg",
    "/history/2025-05-07 (3).jpg",
    "/history/2025-05-07 (4).jpg",
    "/history/2025-05-07 (5).jpg",
    "/history/2025-05-07 (6).jpg",
    "/history/2025-05-07 (7).jpg",
    "/history/2025-05-07 (8).jpg",
    "/history/2025-05-07 (9).jpg",
    "/history/2025-05-07 (10).jpg",
    "/history/2025-05-07 (11).webp",
    "/history/2025-05-07 (1).webp",
    "/history/2025-05-07.webp"
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === historyImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [historyImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? historyImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === historyImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  return (
    <div className="min-h-screen bg-white w-full">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-white">
        {/* Subtle light-blue gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EEF4FF] via-white to-white" />
        {/* Soft radial glow — top right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#002D72] opacity-[0.07] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e3a8a] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />
        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #002D72 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 sm:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            {/* ── Left: copy ── */}
            <div className="space-y-7">

              {/* Overline pill */}
              <div className="inline-flex items-center gap-2 bg-[#EEF4FF] border border-[#002D72]/15 text-[#002D72] text-sm font-semibold px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Serving Greater DC &amp; Montgomery County since 1945
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                From Appliances<br />
                to Repairs —<br />
                <span className="relative inline-block">
                  Better call{" "}
                  <span className="text-[#002D72]">Bettar</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#002D72] rounded-full opacity-60" />
                </span>
              </h1>

              {/* Tagline */}
              <p className="text-gray-500 text-base sm:text-lg max-w-md leading-relaxed">
                Your trusted, family-owned home services team — appliance sales, repairs, renovations, plumbing &amp; more.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full text-sm">
                  <span className="text-amber-500 tracking-tight">★★★★★</span>
                  <span className="font-semibold text-gray-800">4.9</span>
                  <span className="text-gray-500">on Angi</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#EEF4FF] border border-[#002D72]/15 px-3 py-1.5 rounded-full text-sm text-[#002D72] font-medium">
                  🏆 2025 Super Service Award
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/request-service"
                  className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5"
                >
                  Request Service
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a
                  href="tel:301-949-2500"
                  className="inline-flex items-center gap-2 border-2 border-[#002D72] text-[#002D72] hover:bg-[#002D72] hover:text-white font-semibold px-6 py-4 rounded-xl text-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  301-949-2500
                </a>
              </div>

              {/* Location + hours */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-400 text-sm">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Kensington, MD
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Mon–Fri: 8 AM – 5 PM
                </span>
              </div>
            </div>

            {/* ── Right: hero appliances + floating elements ── */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Soft blue glow behind hero image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#002D72]/8 to-transparent rounded-3xl blur-2xl pointer-events-none" />

              {/* Appliance hero image — taller box = larger object-contain render */}
              <div className="relative w-full max-w-2xl lg:max-w-full h-[420px] sm:h-[460px] lg:h-[580px]">
                <Image
                  src="/appliancehero.png"
                  alt="Stainless steel refrigerators, ranges, washers, and microwaves"
                  fill
                  className="object-contain object-center lg:object-right drop-shadow-xl"
                  priority
                />
              </div>

              {/* ── Floating: Rating badges (top right) ── */}
              <div className="absolute top-4 right-0 sm:right-2 flex flex-col gap-2">
                {/* Google */}
                <div className="bg-[#002D72] border border-gray-200 rounded-2xl px-8 py-3 shadow-md">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-amber-500 text-sm font-bold tracking-tight">★★★★★</span>
                  </div>
                  <div className="text-white text-xs font-semibold">4.1 / 5 on Google</div>
                  <div className="text-white text-[10px] mt-0.5">75 Google reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll nudge */}
          <div className="flex justify-center mt-12">
            <a
              href="#stats"
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#002D72] transition-colors"
              aria-label="Scroll down"
            >
              <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="relative -mt-12 sm:-mt-16 md:-mt-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Gradient accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#002D72] via-[#1e3a8a] to-[#dc2626]" />
            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                {/* Stat 1 */}
                <div className="text-center px-3 sm:px-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#002D72] mb-1">81</div>
                  <div className="text-gray-500 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Years Experience</div>
                </div>
                {/* Stat 2 */}
                <div className="text-center px-3 sm:px-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#002D72] mb-1">30K+</div>
                  <div className="text-gray-500 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Happy Clients</div>
                </div>
                {/* Stat 3 */}
                <div className="text-center px-3 sm:px-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#002D72] mb-1">70K+</div>
                  <div className="text-gray-500 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Projects Finished</div>
                  <Link href="/gallery" className="text-[#dc2626] text-[10px] sm:text-xs mt-1 hover:underline inline-block font-semibold">View Projects →</Link>
                </div>
                {/* Stat 4 */}
                <div className="text-center px-3 sm:px-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#002D72] mb-1">100%</div>
                  <div className="text-gray-500 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Carousel Section */}
      <section className="py-12 bg-[#F8FAFF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400">Brands We Carry &amp; Service</p>
        </div>
        <div className="relative">
          {/* Two-row carousel container */}
          <div className="flex flex-col space-y-6">
            {/* Top Row */}
            <div className="flex animate-scroll space-x-10 hover:pause-animation">
              {/* First set of logos - Top Row */}
              <div className="flex space-x-10 items-center flex-shrink-0">
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Bosch_logo.png"
                    alt="Bosch"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Frigidaire-Logo.png"
                    alt="Frigidaire"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Haier_logo.svg.png"
                    alt="Haier"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/jennair.png"
                    alt="JennAir"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/LG_logo_(2014).svg.png"
                    alt="LG"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Maytag-Logo.png"
                    alt="Maytag"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/hotpoint.svg"
                    alt="Hotpoint"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Electrolux-Logo.png"
                    alt="Electrolux"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Duplicate set for seamless loop - Top Row */}
              <div className="flex space-x-10 items-center flex-shrink-0">
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/GE_Appliances_logo.svg.png"
                    alt="GE Appliances"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/samsung.jpg"
                    alt="Samsung"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Kitchenaid_logo.svg.png"
                    alt="KitchenAid"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/png-transparent-kenmore-hd-logo-thumbnail-removebg-preview.png"
                    alt="Kenmore"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Whirlpool_Corporation_Logo.png"
                    alt="Whirlpool"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/wolf.png"
                    alt="Wolf"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/viking.png"
                    alt="Viking"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/thermador-logo.webp"
                    alt="Thermador"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex animate-scroll-reverse space-x-10 hover:pause-animation">
              {/* First set of logos - Bottom Row */}
              <div className="flex space-x-10 items-center flex-shrink-0">
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/GE_Appliances_logo.svg.png"
                    alt="GE Appliances"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/samsung.jpg"
                    alt="Samsung"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Kitchenaid_logo.svg.png"
                    alt="KitchenAid"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/png-transparent-kenmore-hd-logo-thumbnail-removebg-preview.png"
                    alt="Kenmore"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Whirlpool_Corporation_Logo.png"
                    alt="Whirlpool"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/wolf.png"
                    alt="Wolf"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/viking.png"
                    alt="Viking"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/thermador-logo.webp"
                    alt="Thermador"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Duplicate set for seamless loop - Bottom Row */}
              <div className="flex space-x-10 items-center flex-shrink-0">
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Bosch_logo.png"
                    alt="Bosch"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Frigidaire-Logo.png"
                    alt="Frigidaire"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Haier_logo.svg.png"
                    alt="Haier"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/jennair.png"
                    alt="JennAir"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/LG_logo_(2014).svg.png"
                    alt="LG"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Maytag-Logo.png"
                    alt="Maytag"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/hotpoint.svg"
                    alt="Hotpoint"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-32 bg-white flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity p-2">
                  <Image
                    src="/appliance-logos/Electrolux-Logo.png"
                    alt="Electrolux"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop From Top Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <span className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Appliances</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Shop From <span className="text-[#002D72]">Top Categories</span>
              </h2>
              <div className="h-1 w-16 bg-[#002D72] mt-3 rounded-full" />
            </div>
            <Link href="/appliances" className="text-[#002D72] hover:text-[#1e3a8a] font-semibold text-base mt-5 md:mt-0 flex items-center gap-1 group">
              View All
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Categories Grid - Responsive Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
              {/* Refrigerators */}
              <Link href="/appliances/refrigerators" className="flex flex-col items-center group cursor-pointer">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Image
                    src="/appliances-images/ref/fri2.jpg"
                    alt="Refrigerators"
                    width={96}
                    height={96}
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-xs sm:text-sm">Refrigerators</span>
              </Link>

              {/* Dishwasher */}
              <Link href="/appliances/dishwasher" className="flex flex-col items-center group cursor-pointer">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Image
                    src="/appliances-images/dishwasher/kitchenaid1.jpg"
                    alt="Dishwasher"
                    width={96}
                    height={96}
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-xs sm:text-sm">Dishwasher</span>
              </Link>

              {/* Range */}
              <Link href="/appliances/range" className="flex flex-col items-center group cursor-pointer">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Image
                    src="/appliances-images/range/kitchenaid1.jpg"
                    alt="Range"
                    width={96}
                    height={96}
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-xs sm:text-sm">Range</span>
              </Link>

              {/* Cooktops */}
              <Link href="/appliances/cooktops" className="flex flex-col items-center group cursor-pointer">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Image
                    src="/appliances-images/cooktop/maytag1.jpg"
                    alt="Cooktops"
                    width={96}
                    height={96}
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-xs sm:text-sm">Cooktops</span>
              </Link>

              {/* Microwave */}
              <Link href="/appliances/microwave" className="flex flex-col items-center group cursor-pointer">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Image
                    src="/appliances-images/microwave/ge1.jpg"
                    alt="Microwave"
                    width={96}
                    height={96}
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-xs sm:text-sm">Microwave</span>
              </Link>

              {/* Washers */}
              <Link href="/appliances/washers" className="flex flex-col items-center group cursor-pointer">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Image
                    src="/appliances-images/washers/ge1.jpg"
                    alt="Washers"
                    width={96}
                    height={96}
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-xs sm:text-sm">Washers</span>
              </Link>

              {/* Clothes Dryer */}
              <Link href="/appliances/dryer" className="flex flex-col items-center group cursor-pointer">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Image
                    src="/appliances-images/dryer/maytag1.png"
                    alt="Clothes Dryer"
                    width={96}
                    height={96}
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-xs sm:text-sm">Clothes Dryer</span>
              </Link>
          </div>
        </div>
      </section>

      {/* Best Deals on Appliances Section - Firebase Powered */}
      <section className="py-16 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <span className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Featured Deals</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Grab the Best Deal on <span className="text-[#002D72]">Appliances</span>
              </h2>
              <div className="h-1 w-16 bg-[#002D72] mt-3 rounded-full" />
            </div>
            <Link href="/appliances" className="text-[#002D72] hover:text-[#1e3a8a] font-semibold text-base mt-5 md:mt-0 flex items-center gap-1 group">
              View All
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Deals Grid - Firebase Powered */}
          {loadingAppliances ? (
            <p className="text-gray-600 text-center py-8">Loading appliances…</p>
          ) : appliances.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No appliances available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {appliances.map((item) => (
                <Link 
                  key={item.id}
                  href={`/appliances/${item.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    {item.discountPercent && (
                      <div className="absolute top-2 right-2 z-10 bg-[#002D72] text-white px-3 py-1 rounded-lg text-xs font-semibold">
                        {item.discountPercent}% OFF
                      </div>
                    )}
                    <div className="h-48 bg-gray-100 flex items-center justify-center p-4 relative">
                      {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={220}
                        height={192}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.placeholder-icon')) {
                              const placeholder = document.createElement('div');
                              placeholder.className = 'placeholder-icon text-gray-400 text-center';
                              placeholder.innerHTML = '<div class="text-4xl mb-2">📦</div><div class="text-sm">No Image Available</div>';
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <div className="text-4xl mb-2">📦</div>
                          <div className="text-sm">No Image Available</div>
                        </div>
                      )}
                      {item.images && item.images.length > 0 && (
                        <div className="absolute bottom-2 right-2 bg-[#002D72] text-white text-xs px-2 py-1 rounded-full font-semibold">
                          +{item.images.length} more
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    {item.modelNumber && (
                      <p className="text-xs text-gray-400 mb-1">
                        {item.modelNumber}
                      </p>
                    )}
                    <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">
                      {item.brand} • {item.category}
                    </p>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold text-[#002D72]">
                        ${item.priceFrom.toLocaleString()}
                      </span>
                      {item.priceOld && (
                        <span className="text-gray-500 line-through text-sm">
                          ${item.priceOld.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {item.discountPercent && (
                      <p className="text-green-600 font-medium text-xs">
                        Save {item.discountPercent}% on this model
                      </p>
                    )}
                    {item.shortDescription && (
                      <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                        {item.shortDescription}
                      </p>
                    )}
                    {item.inStock === false && (
                      <p className="text-red-600 font-medium text-xs mt-1">
                        Out of Stock
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Appliance Sales Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="grid md:grid-cols-2">
              {/* Left Side - Appliances Image */}
              <div className="h-96 md:h-auto relative">
                <Image
                  src="/appliances.jpg"
                  alt="Bettar Appliance Sales and Services"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Right Side - Content Card */}
              <div className="bg-[#002D72] p-10 md:p-16 text-white">
                <div className="h-full flex flex-col justify-between">
                  <div>
                      <div className="flex items-center space-x-3 mb-4">
            <Image
                          src="/bettarlogo.png"
                          alt="Bettar Logo"
                          width={40}
                          height={40}
                          className="w-10 h-10"
                        />
                        <span className="text-[#E0E0E0] text-1xl font-medium tracking-[2px] uppercase">BETTAR APPLIANCE MASTER</span>
                      </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                      Sales and Services
                    </h2>
                    <div className="space-y-4 mb-8">
                      <p className="text-white text-lg leading-relaxed">
                        Discover our wide selection of quality appliances for your home. From refrigerators and washers to ovens and dishwashers, we offer top brands at competitive prices with professional installation and warranty coverage. Bettar appliance sales and service since 1945.
                      </p>
                      <p className="text-white text-lg leading-relaxed">
                        Our experienced technicians provide expert installation, maintenance, and repair services for all major appliance brands. We&apos;re committed to keeping your appliances running efficiently for years to come. Trust Bettar for all your appliance needs in Kensington, MD.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end md:justify-end">
                    <Link href="/appliances" className="bg-[#D32F2F] text-white px-8 py-3 rounded-lg hover:bg-[#b91c1c] transition-colors font-bold text-lg">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">What We Do</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Services That Fit<br />
              <span className="text-[#002D72]">Your Needs</span>
            </h2>
            <div className="h-1 w-16 bg-[#002D72] mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="h-48 relative">
                <Image
                  src="/renovations.jpg"
                  alt="Professional kitchen renovation and remodeling services in Kensington MD - modern kitchen design with island and stainless steel appliances"
                  fill
                  className="object-cover"
                />
                {/* Blue overlay */}
                <div className="absolute inset-0 bg-[rgba(0,45,114,0.3)]"></div>
                {/* Overlapping icon circle */}
                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div className="p-6 pt-10 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-[#002D72] mb-3">Renovations and Remodeling</h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  Transform your home with our expert renovation and remodeling services. From kitchen makeovers to bathroom upgrades, we bring your vision to life with quality craftsmanship and attention to detail.
                </p>
                <Link href="/services/renovations" className="text-[#002D72] font-bold hover:underline inline-block mt-auto">View Service →</Link>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="h-48 relative">
                <Image
                  src="/plumbing.jpeg"
                  alt="Professional plumbing and heating repair services in Kensington MD - skilled technician working on pipe installation and maintenance"
                  fill
                  className="object-cover"
                />
                {/* Blue overlay */}
                <div className="absolute inset-0 bg-[rgba(0,45,114,0.3)]"></div>
                {/* Overlapping icon circle */}
                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="#ffffff" d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"/></svg>
                </div>
              </div>
              <div className="p-6 pt-10 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-[#002D72] mb-3">Plumbing and Heating</h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  Keep your home comfortable year-round with our professional plumbing and heating services. From emergency repairs to system installations, we ensure your home&apos;s comfort and safety. Expert heating maintenance in Kensington, MD and surrounding areas. Professional plumbing company in Kensington, MD providing water heater service and heating services.
                </p>
                <Link href="/services/plumbing" className="text-[#002D72] font-bold hover:underline inline-block mt-auto">Plumbing Company Kensington MD →</Link>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="h-48 relative">
                <Image
                  src="/handyman.jpg"
                  alt="Professional handyman repair and maintenance services in Kensington MD - skilled craftsman with tools and safety equipment"
                  fill
                  className="object-cover"
                />
                {/* Blue overlay */}
                <div className="absolute inset-0 bg-[rgba(0,45,114,0.3)]"></div>
                {/* Overlapping icon circle */}
                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="#ffffff" d="M102.8 57.3C108.2 51.9 116.6 51.1 123 55.3L241.9 134.5C250.8 140.4 256.1 150.4 256.1 161.1L256.1 210.7L346.9 301.5C380.2 286.5 420.8 292.6 448.1 320L574.2 446.1C592.9 464.8 592.9 495.2 574.2 514L514.1 574.1C495.4 592.8 465 592.8 446.2 574.1L320.1 448C292.7 420.6 286.6 380.1 301.6 346.8L210.8 256L161.2 256C150.5 256 140.5 250.7 134.6 241.8L55.4 122.9C51.2 116.6 52 108.1 57.4 102.7L102.8 57.3zM247.8 360.8C241.5 397.7 250.1 436.7 274 468L179.1 563C151 591.1 105.4 591.1 77.3 563C49.2 534.9 49.2 489.3 77.3 461.2L212.7 325.7L247.9 360.8zM416.1 64C436.2 64 455.5 67.7 473.2 74.5C483.2 78.3 485 91 477.5 98.6L420.8 155.3C417.8 158.3 416.1 162.4 416.1 166.6L416.1 208C416.1 216.8 423.3 224 432.1 224L473.5 224C477.7 224 481.8 222.3 484.8 219.3L541.5 162.6C549.1 155.1 561.8 156.9 565.6 166.9C572.4 184.6 576.1 203.9 576.1 224C576.1 267.2 558.9 306.3 531.1 335.1L482 286C448.9 253 403.5 240.3 360.9 247.6L304.1 190.8L304.1 161.1L303.9 156.1C303.1 143.7 299.5 131.8 293.4 121.2C322.8 86.2 366.8 64 416.1 63.9z"/></svg>
                </div>
              </div>
              <div className="p-6 pt-10 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-[#002D72] mb-3">Handyman Repair and Services</h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  From small repairs to major installations, our skilled handyman services handle all your home maintenance needs. Trust our experienced team to get the job done right the first time. Serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown with professional and commercial handyman services.
                </p>
                <Link href="/services/handyman" className="text-[#002D72] font-bold hover:underline inline-block mt-auto">Handyman Services Kensington MD →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How BETTAR Works Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              Everything For Your Home
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              How <span className="text-[#002D72]">BETTAR</span> Works
            </h2>
            <div className="h-1 w-16 bg-[#002D72] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Dashed connector line — desktop only */}
            <div className="hidden md:block absolute top-10 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px border-t-2 border-dashed border-[#002D72]/20" />

            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center relative">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#002D72]/20">
                <span className="text-xl font-extrabold text-white">01</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Request Service &amp; Consultation</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Fill out our <a href="/request-service" className="text-[#002D72] font-semibold hover:underline">request service form</a> or call us at <a href="tel:301-949-2500" className="text-[#002D72] font-semibold hover:underline">301-949-2500</a>, and we&apos;ll take care of the rest.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center relative">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#002D72]/20">
                <span className="text-xl font-extrabold text-white">02</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">We Schedule &amp; Assess</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Our team confirms your request, schedules a convenient visit, assesses the work, and provides a clear, transparent quote.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
              <div className="w-16 h-16 bg-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-700/20">
                <span className="text-xl font-extrabold text-white">03</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">We Get the Job Done the Bettar Way</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Our skilled team completes the job safely, efficiently, and to the highest standard — the Bettar way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image Carousel */}
            <div className="relative">
              <div className="h-96 bg-gray-200 rounded-[20px] overflow-hidden relative">
                {/* Current Image */}
                <div className="absolute inset-0 transition-opacity duration-500">
                  <Image
                    src={historyImages[currentImageIndex]}
                    alt={`Bettar History ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {historyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-[#002D72] scale-125' 
                        : 'bg-gray-400 hover:bg-gray-600'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <div className="inline-block bg-[#E6EDFF] text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                About Us
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                We have worked for you since <span className="text-[#D32F2F]">1945.</span>
              </h2>
              
              <div className="w-16 h-px bg-gray-300 mb-6"></div>
              
              <p className="text-[#333] text-lg leading-relaxed mb-8">
                At Bettar, our story is woven into the fabric of the Maryland and DC communities. Since our humble beginnings in 1945, our family has dedicated itself to providing the highest quality home services for our neighbors across Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown. What started as a commitment to honest appliance repair has blossomed into a comprehensive suite of solutions designed to make your home life easier and more comfortable.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Treat every home as if it were our own</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Built our reputation on trust</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Transparent communication</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Genuine Care</span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <a href="/about" className="bg-white border border-black text-black px-8 py-3 rounded-full hover:bg-[#002D72] hover:text-white hover:border-[#002D72] transition-all duration-300 font-semibold flex items-center">
                  Know More
                  <div className="w-6 h-6 bg-[#D32F2F] rounded-full flex items-center justify-center ml-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section id="projects" className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
            <div>
              <span className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                Gallery
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Explore Our Recent Projects
              </h2>
              <div className="h-1 w-16 bg-[#002D72] mt-3 rounded-full" />
            </div>
            <Link href="/gallery" className="text-[#002D72] hover:text-[#1e3a8a] font-semibold text-base mt-5 md:mt-0 flex items-center gap-1 group">
              View More
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Project 1 - Windows & Doors */}
            <Link href="/gallery" className="group cursor-pointer block">
              <div className="relative h-70 rounded-2xl overflow-hidden">
          <Image
                  src="/projects/Windows & Doors 1.jpg"
                  alt="Windows & Doors Project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[rgba(0,45,114,0.2)]"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Windows & Doors
                </div>
              </div>
            </Link>
            
            {/* Project 2 - Windows & Doors */}
            <Link href="/gallery" className="group cursor-pointer block">
              <div className="relative h-70 rounded-2xl overflow-hidden">
          <Image
                  src="/projects/Windows & Doors 6.jpg"
                  alt="Windows & Doors Project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[rgba(0,45,114,0.2)]"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Windows & Doors
                </div>
              </div>
            </Link>
            
            {/* Project 3 - Kitchen Remodeling */}
            <Link href="/gallery" className="group cursor-pointer block">
              <div className="relative h-70 rounded-2xl overflow-hidden">
          <Image
                  src="/projects/Kitchen remodelling 3.jpg"
                  alt="Kitchen Remodeling Project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[rgba(0,45,114,0.2)]"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Kitchen Remodeling
                </div>
              </div>
            </Link>
            
            {/* Project 4 - Landscaping & Lawn */}
            <Link href="/gallery" className="group cursor-pointer block">
              <div className="relative h-70 rounded-2xl overflow-hidden">
                <Image
                  src="/projects/Landscaping & Lawn Maint 1.jpg"
                  alt="Landscaping & Lawn Project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[rgba(0,45,114,0.2)]"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Landscaping & Lawn
                </div>
              </div>
            </Link>
            
            {/* Project 5 - Cabinet Installation */}
            <Link href="/gallery" className="group cursor-pointer block">
              <div className="relative h-70 rounded-2xl overflow-hidden">
                <Image
                  src="/projects/Cabinet installation 2.jpg"
                  alt="Cabinet Installation Project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[rgba(0,45,114,0.2)]"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Cabinet Installation
                </div>
              </div>
            </Link>
            
            {/* Project 6 - Concrete Work */}
            <Link href="/gallery" className="group cursor-pointer block">
              <div className="relative h-70 rounded-2xl overflow-hidden">
                <Image
                  src="/projects/Concrete work 3.jpg"
                  alt="Concrete Work Project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[rgba(0,45,114,0.2)]"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Concrete Work
                </div>
              </div>
            </Link>
            
            {/* Project 7 - Deck */}
            <Link href="/gallery" className="group cursor-pointer block">
              <div className="relative h-70 rounded-2xl overflow-hidden">
                <Image
                  src="/projects/Deck 7.jpg"
                  alt="Deck Project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[rgba(0,45,114,0.2)]"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Deck
                </div>
              </div>
            </Link>
            
            {/* Project 8 - Windows */}
            <Link href="/gallery" className="group cursor-pointer block">
              <div className="relative h-70 rounded-2xl overflow-hidden">
                <Image
                  src="/projects/Windows & Doors 7.jpg"
                  alt="Windows Project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[rgba(0,45,114,0.2)]"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Windows
                </div>
              </div>
            </Link>
            
            {/* Project 9 - Sub-Zero Refrigerator Repair */}
            <Link href="/gallery" className="group cursor-pointer block">
              <div className="relative h-70 rounded-2xl overflow-hidden">
                <Image
                  src="/projects/subzero.jpg"
                  alt="Sub-Zero Refrigerator Repair"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[rgba(0,45,114,0.2)]"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Sub-Zero Repair
            </div>
              </div>
            </Link>

            {/* Project 10 - Over-the-Range Microwave Installation */}
            <Link href="/gallery" className="group cursor-pointer block">
              <div className="relative h-70 rounded-2xl overflow-hidden">
                <Image
                  src="/projects/microwave.jpg"
                  alt="Over-the-Range Microwave Installation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[rgba(0,45,114,0.2)]"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Microwave Installation
                </div>
              </div>
            </Link>
          </div>

          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Better Services & Better Appliances Section - Targeting Typo Queries */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">Why Bettar</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Looking for <span className="text-[#002D72]">Better Services</span>?<br className="hidden sm:block" /> You Found <span className="text-[#dc2626]">Bettar</span>
            </h2>
            <div className="h-1 w-16 bg-[#002D72] mx-auto rounded-full mb-8" />
            <div className="max-w-5xl mx-auto space-y-6">
              {/* <p className="text-lg text-[#333] leading-relaxed">
                When you search for &quot;better services&quot; or &quot;better appliances,&quot; you&apos;re looking for quality, reliability, and expertise. That&apos;s exactly what Bettar Services delivers.
              </p> */}
              <p className="text-xl font-semibold text-gray-800">
                <span className="text-[#1e3a8a]">Better services</span> for your home, <span className="text-[#1e3a8a]">better appliances</span> for your family, and <span className="text-[#1e3a8a]">better results</span> you can trust.
                <br />
                Better services, better appliances, better results — that&apos;s the <span className="text-[#dc2626]">Bettar difference</span>.
              </p>
              <p className="text-lg text-[#333] leading-relaxed">
                Serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD since 1945.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1e3a8a]">
                  Better Services - Professional Home Solutions
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Family-owned since 1945, Bettar Services delivers professional home improvement, renovation, plumbing, handyman, and appliance repair services. With decades of experience serving the DC and Maryland area, we provide quality workmanship and reliable service you can trust.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></div>
                  <span className="font-semibold">Better home repair services</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></div>
                  <span className="font-semibold">Better plumbing and heating services</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></div>
                  <span className="font-semibold">Better handyman services</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></div>
                  <span className="font-semibold">Better renovation and remodeling</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1e3a8a]">
                  Better Appliances - Quality & Service
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Bettar Appliances offers quality products from top brands with professional installation, repair, and maintenance. As your local appliance store since 1945, we provide expert service and trusted solutions for all your home appliance needs.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></div>
                  <span className="font-semibold">Better appliance sales and selection</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></div>
                  <span className="font-semibold">Better appliance repair service</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></div>
                  <span className="font-semibold">Better appliance installation</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></div>
                  <span className="font-semibold">Better appliance near me - local service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose BETTAR Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              Why Choose <span className="text-[#002D72]">BETTAR</span>?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-0 items-stretch">
            {/* Left Side - Google Maps */}
            <div className="relative">
              <div className="h-full bg-white rounded-l-[20px] overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3099.474143684913!2d-77.07329152458799!3d39.0273075390294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7cec489ef279d%3A0xb948d82f2aeb2eb0!2sBettar%20Appliance%20Service!5e0!3m2!1sen!2sph!4v1760628835724!5m2!1sen!2sph" 
                  width="100%" 
                  height="100%" 
                  style={{border: 0}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-l-[20px]"
                ></iframe>
              </div>
            </div>

            {/* Right Side - Benefits Card */}
            <div className="bg-[#002D72] rounded-r-[20px] p-10 text-white">
              <div className="space-y-6">
                {/* Benefit 1 */}
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2">A Rich History</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Our longevity is a testament to our reliability and consistent customer satisfaction. We&apos;ve adapted and grown with the times, but our core values remain unchanged.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Family-Owned & Operated</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Experience the personalized, one-on-one service you won&apos;t find with larger corporations. We&apos;re your neighbors, deeply invested in our community.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Quality Workmanship, Always Insured</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      We stand behind our work across all divisions. For your complete peace of mind, all our services are fully insured.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Value-driven solutions for every customer</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      We understand the importance of value. We strive to provide top-tier services and products at prices that fit your budget, without compromising on quality.
                    </p>
                  </div>
                </div>

                {/* Benefit 5 */}
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Four Specialized Divisions, One Trusted Name</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Representing our continued commitment to excellence across all services.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <a 
                  href="/request-service"
                  className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-3 rounded-[10px] font-bold transition-colors"
                >
                  Request Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-[#001233] relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-[#002D72] opacity-25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#1e3a8a] opacity-20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#FFB800] mb-3 sm:mb-4">
              Industry Recognition
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Awards &amp; <span className="text-[#FFB800]">Recognition</span>
            </h2>
            <p className="text-blue-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders and our valued customers
            </p>
          </div>

          {/* Award Badge — centered hero card */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="relative">
              <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-[#FFB800]/20 to-[#002D72]/30 rounded-full blur-3xl" />
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 sm:p-10 md:p-12 text-center w-72 sm:w-80 md:w-96 shadow-2xl">
                <div className="w-16 h-1 bg-gradient-to-r from-[#FFB800] to-[#FFF0A0] rounded-full mx-auto mb-6" />
                <Image
                  src="/angi.png"
                  alt="Angi Super Service Award 2025"
                  width={220}
                  height={220}
                  className="object-contain mx-auto w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-6 mb-2">
                  2025 Super Service Award
                </h3>
                <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
                  Recognized by Angi for outstanding customer service and quality workmanship
                </p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <div className="text-center border-t-2 border-[#FFB800] pt-5 px-4">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-1">81</div>
              <p className="text-white font-semibold text-sm sm:text-base mb-1">Years of Excellence</p>
              <p className="text-blue-300 text-xs sm:text-sm">Family-owned since 1945</p>
            </div>
            <div className="text-center border-t-2 border-[#FFB800] pt-5 px-4">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-1">30K+</div>
              <p className="text-white font-semibold text-sm sm:text-base mb-1">Satisfied Customers</p>
              <p className="text-blue-300 text-xs sm:text-sm">Trusted by the community</p>
            </div>
            <div className="text-center border-t-2 border-[#FFB800] pt-5 px-4">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-1">100%</div>
              <p className="text-white font-semibold text-sm sm:text-base mb-1">Fully Insured</p>
              <p className="text-blue-300 text-xs sm:text-sm">Licensed &amp; bonded</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say Section */}
      <section className="bg-[#F0F5FF] overflow-x-hidden overflow-y-hidden">
        <div className="max-w-7xl mx-auto px-6 overflow-x-hidden">
          <GoogleReviews />
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">FAQs</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Frequently Asked <span className="text-[#002D72]">Questions</span>
            </h2>
            <div className="h-1 w-16 bg-[#002D72] mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - FAQ Accordion */}
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-l-4 hover:border-l-[#002D72] transition-all duration-200 group">
                <div className="flex justify-between items-center w-full text-left font-bold text-lg text-[#111827] group-hover:text-[#002D72] transition-colors duration-200 mb-3">
                  What type of appliances do you service?
                  <svg 
                    className="w-5 h-5 text-[#002D72] transition-transform duration-200 group-hover:rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="text-[#6B7280] leading-relaxed transition-all duration-300 overflow-hidden max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100">
                  We handle all major home appliances — refrigerators, ovens, dishwashers, washers, dryers, and more. Our licensed technicians are trained for most major brands.
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-l-4 hover:border-l-[#002D72] transition-all duration-200 group">
                <div className="flex justify-between items-center w-full text-left font-bold text-lg text-[#111827] group-hover:text-[#002D72] transition-colors duration-200">
                  What areas do you cover?
                  <svg 
                    className="w-5 h-5 text-[#002D72] transition-transform duration-200 group-hover:rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="text-[#6B7280] leading-relaxed transition-all duration-300 overflow-hidden max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100">
                  We proudly serve Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, Germantown, and surrounding Maryland areas.
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-l-4 hover:border-l-[#002D72] transition-all duration-200 group">
                <div className="flex justify-between items-center w-full text-left font-bold text-lg text-[#111827] group-hover:text-[#002D72] transition-colors duration-200">
                  Why should I choose Bettar Services?
                  <svg 
                    className="w-5 h-5 text-[#002D72] transition-transform duration-200 group-hover:rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="text-[#6B7280] leading-relaxed transition-all duration-300 overflow-hidden max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100">
                  We&apos;re family-owned, fully insured, and have been serving the community since 1945 with quality workmanship and trustworthy service.
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-l-4 hover:border-l-[#002D72] transition-all duration-200 group">
                <div className="flex justify-between items-center w-full text-left font-bold text-lg text-[#111827] group-hover:text-[#002D72] transition-colors duration-200">
                  Do you offer same-day appointments?
                  <svg 
                    className="w-5 h-5 text-[#002D72] transition-transform duration-200 group-hover:rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="text-[#6B7280] leading-relaxed transition-all duration-300 overflow-hidden max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100">
                  Yes, same-day service is available for most appliance repairs depending on availability.
                </div>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-l-4 hover:border-l-[#002D72] transition-all duration-200 group">
                <div className="flex justify-between items-center w-full text-left font-bold text-lg text-[#111827] group-hover:text-[#002D72] transition-colors duration-200">
                  Are your services insured and guaranteed?
                  <svg 
                    className="w-5 h-5 text-[#002D72] transition-transform duration-200 group-hover:rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="text-[#6B7280] leading-relaxed transition-all duration-300 overflow-hidden max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100">
                  Absolutely. All our services come with full insurance coverage and a satisfaction guarantee.
                </div>
              </div>
            </div>

            {/* Right Column - Contact Card */}
            <div className="bg-[#002D72] rounded-[20px] p-10 text-white shadow-lg" style={{boxShadow: '0 8px 25px rgba(0,45,114,0.25)'}}>
              <div className="flex flex-col items-center text-center h-full justify-center">
                {/* Speech Bubble Icon */}
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
          <Image
                    src="/comments-question (1).svg"
                    alt="Question Icon"
                    width={32}
                    height={32}
                    className="text-white"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-4">You have different questions?</h3>
                
                <p className="text-[#E5E7EB] mb-8 leading-relaxed">
                  Our team will answer all your questions.<br />
                  We ensure a quick response.
                </p>

                {/* Phone Number */}
                <a href="tel:301-949-2500" className="flex items-center mb-8 hover:opacity-90 transition-opacity">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-xl font-bold">Call 301-949-2500</span>
                </a>

                {/* Contact Button */}
                <Link href="/contact" className="inline-block bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights & Tips Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Call to Action Card */}
            <div className="bg-[#002D72] text-white p-8 rounded-lg shadow-lg flex flex-col justify-between">
              <h3 className="text-5xl font-bold mb-8">Latest insights & tips</h3>
              <Link href="/insights" className="bg-white text-[#002D72] font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors self-start text-center">
                View All
              </Link>
            </div>

            {/* Article Card 1 */}
            <Link 
              href="/insights/water-heater-repair-gaithersburg-md"
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group cursor-pointer block"
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/insights/water-heater.jpg"
                  alt="Water Heater Repair"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">Plumbing Services</p>
                <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#002D72] transition-colors">Water Heater Repair Gaithersburg MD</h4>
                <p className="text-gray-600 text-sm mb-4">Expert water heater repair and replacement services in Gaithersburg. Same-day service available.</p>
                <p className="text-gray-500 text-xs">05 Feb 2026</p>
              </div>
            </Link>

            {/* Article Card 2 */}
            <Link 
              href="/insights/dishwasher-repair-buying-guide"
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group cursor-pointer block"
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/insights/dishwasher.jpg"
                  alt="Dishwasher Repair Guide"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">Appliance Service</p>
                <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#002D72] transition-colors">Dishwasher Repair & Buying Guide</h4>
                <p className="text-gray-600 text-sm mb-4">Complete guide to dishwasher problems, repairs, and buying advice from local experts.</p>
                <p className="text-gray-500 text-xs">05 Feb 2026</p>
              </div>
            </Link>

            {/* Article Card 3 */}
            <Link 
              href="/insights/handyman-services-gaithersburg-bethesda"
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group cursor-pointer block"
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/insights/handyman.jpg"
                  alt="Handyman Services"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">Home Improvement</p>
                <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#002D72] transition-colors">Professional Handyman Services</h4>
                <p className="text-gray-600 text-sm mb-4">Expert home repair and improvement services throughout Montgomery County.</p>
                <p className="text-gray-500 text-xs">07 Mar 2026</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-12">
            Get In Touch
          </h2>
          
          {/* Main Container with Shadow */}
          <div className="bg-white rounded-[20px] shadow-lg overflow-hidden" style={{boxShadow: '0px 8px 25px rgba(0,0,0,0.05)'}}>
            <div className="grid md:grid-cols-2">
              {/* Left Column - Contact Info Card */}
              <div className="bg-[#002D72] text-white p-12 rounded-l-[20px]">
                <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
                <p className="text-[#E5E7EB] mb-8 leading-relaxed">
                  We are committed to processing the information in order to contact you and talk.
                </p>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <a href="tel:301-949-2500" className="flex items-center hover:opacity-90 transition-opacity">
                    <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-lg font-bold">301-949-2500</span>
                  </a>
                  
                  {/* Email */}
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:Info@bettarservices.com" className="text-lg hover:underline">Info@bettarservices.com</a>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=10503+Wheatley+St,+Kensington,+MD+20895" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline">
                      10503 Wheatley St, Kensington, MD 20895, United States
                    </a>
                  </div>

                  {/* Store Hours */}
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-lg">Mon–Fri: 8:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-white p-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Request Service Modal */}
      <RequestServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
