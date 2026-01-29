"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
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
    <div className="min-h-screen bg-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-6 pb-20 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #EFEFEF, #DBE7FA)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-4xl font-bold text-black leading-tight">
                From Appliances to Repairs<br />
                Better call <span className="text-[#1e3a8a]">Bettar</span>!
              </h1> 
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-black text-xl font-semibold">301-949-2500</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-black text-xl font-medium">Kensington, MD</span>
                </div>
              </div>
              
              <a 
                href="/request-service"
                className="inline-block bg-[#dc2626] text-white px-8 py-3 rounded-lg hover:bg-[#b91c1c] transition-colors font-semibold text-lg"
              >
                Request Service
              </a>
            </div>
            
            {/* Right Image */}
            <div className="relative w-full h-[350px] lg:h-[450px]">
              <Image
                src="/bettar car.png"
                alt="Bettar Service Van"
                fill
                className="object-contain scale-140"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative -mt-20 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Stat 1 */}
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-bold text-[#1e3a8a] mb-2">80</div>
                <div className="text-gray-700 font-medium">YEARS EXPERIENCE</div>
              </div>
              
              {/* Stat 2 */}
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-bold text-[#1e3a8a] mb-2">30K+</div>
                <div className="text-gray-700 font-medium">HAPPY CLIENTS</div>
              </div>
              
              {/* Stat 3 */}
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-bold text-[#1e3a8a] mb-2">70K+</div>
                <div className="text-gray-700 font-medium">PROJECTS FINISHED</div>
                <Link href="/gallery" className="text-[#1e3a8a] text-sm mt-2 cursor-pointer hover:underline">View Projects →</Link>
              </div>
              
              {/* Stat 4 */}
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-bold text-[#1e3a8a] mb-2">100%</div>
                <div className="text-gray-700 font-medium">GUARANTEED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Carousel Section */}
      <section className="py-10 bg-white overflow-hidden">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Shop From <span className="text-[#002D72]">Top Categories</span>
              </h2>
              <div className="h-1 w-32 bg-[#002D72] mt-2"></div>
            </div>
            <Link href="/appliances" className="text-[#002D72] hover:text-[#1e3a8a] font-semibold text-lg mt-4 md:mt-0 flex items-center group">
              View All
              <svg className="w-5 h-5 ml-2 text-[#002D72] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Grab the best deal on <span className="text-[#002D72]">Appliances</span>
            </h2>
            <Link href="/appliances" className="text-[#002D72] hover:text-[#1e3a8a] font-semibold text-lg mt-4 md:mt-0 flex items-center group">
              View All
              <svg className="w-5 h-5 ml-2 text-[#002D72] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <span className="text-[#E0E0E0] text-1xl font-medium tracking-[2px] uppercase">BETTAR APPLIANCE</span>
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
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black">
              Services That Fit
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold text-[#1e3a8a]">
              Your Needs
            </h1>
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
          <div className="text-center mb-16">
            {/* Capsule Label */}
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Everything For Your Home
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              How <span className="text-[#002D72]">BETTAR</span> works?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="text-6xl md:text-7xl font-bold text-transparent mb-6" style={{WebkitTextStroke: '2px black'}}>
                01
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#002D72]">Request service and consultation</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                Tell us what you need — You can fill out our <a href="/request-service" className="text-[#002D72] font-semibold hover:text-[#1e3a8a] transition-colors">request service form</a> or give us a quick call at <span className="text-[#002D72] font-bold">301-949-2500</span>, and we&apos;ll take care of the rest.
              </p>
              
              {/* Connecting line to next step */}
              <div className="hidden md:block absolute top-8 right-0 w-3/4 h-px bg-[#CFCFCF] transform translate-x-1/2"></div>
            </div>
            
            {/* Step 2 */}
            <div className="text-center relative">
              <div className="text-6xl md:text-7xl font-bold text-transparent mb-6" style={{WebkitTextStroke: '2px black'}}>
                02
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#002D72]">We Schedule & Assess</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                Our team will get in touch to confirm your request and schedule a convenient time for a site visit. We&apos;ll assess the work, discuss your needs, and provide a clear and transparent quote.
              </p>
              
              {/* Connecting line to next step */}
              <div className="hidden md:block absolute top-8 right-0 w-3/4 h-px bg-[#CFCFCF] transform translate-x-1/2"></div>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-transparent mb-6" style={{WebkitTextStroke: '2px black'}}>
                03
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#002D72]">We Get the Job Done the Bettar Way</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                Our skilled team completes the job safely, efficiently, and the Bettar way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
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
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
            <div>
              <div className="inline-block bg-[#E6EDFF] text-[#002D72] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Gallery
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                Explore Our Recent Projects
              </h2>
            </div>
            <Link href="/gallery" className="text-[#002D72] hover:underline text-lg font-semibold mt-4 md:mt-0">
              View More →
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
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
              Looking for <span className="text-[#1e3a8a]">Better Services</span>? You Found <span className="text-[#1e3a8a]">Bettar</span>
            </h2>
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
      <section className="py-24 bg-gradient-to-b from-[#F8FAFF] to-[#EEF3FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Awards & <span className="text-[#002D72]">Recognition</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders and our valued customers
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Angi Award Badge */}
            <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-[#002D72]/10 max-w-lg relative overflow-hidden">
              <div className="flex flex-col items-center">
                <div className="mb-6 relative">
                  <div className="absolute -inset-6 bg-gradient-to-r from-[#002D72]/20 to-[#1e3a8a]/20 rounded-full blur-2xl"></div>
                  <Image
                    src="/angi.png"
                    alt="Angi Super Service Award 2025"
                    width={260}
                    height={260}
                    className="object-contain relative z-10"
                  />
                </div>
                <h3 className="text-3xl font-bold text-[#002D72] mb-4">
                  2025 Super Service Award
                </h3>
                <p className="text-center text-gray-600 text-lg leading-relaxed">
                  Recognized by Angi for outstanding customer service and quality workmanship
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 gap-6 w-full lg:w-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 min-w-[280px]">
                <div className="text-5xl font-bold bg-gradient-to-r from-[#002D72] to-[#1e3a8a] bg-clip-text text-transparent mb-3">80+</div>
                <p className="text-gray-800 font-semibold text-lg mb-1">Years of Excellence</p>
                <p className="text-gray-500">Family-owned since 1945</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 min-w-[280px]">
                <div className="text-5xl font-bold bg-gradient-to-r from-[#002D72] to-[#1e3a8a] bg-clip-text text-transparent mb-3">30K+</div>
                <p className="text-gray-800 font-semibold text-lg mb-1">Satisfied Customers</p>
                <p className="text-gray-500">Trusted by the community</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 min-w-[280px]">
                <div className="text-5xl font-bold bg-gradient-to-r from-[#002D72] to-[#1e3a8a] bg-clip-text text-transparent mb-3">100%</div>
                <p className="text-gray-800 font-semibold text-lg mb-1">Fully Insured</p>
                <p className="text-gray-500">Licensed & bonded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say Section */}
      <section className="bg-[#F0F5FF]">
        <div className="max-w-7xl mx-auto px-6">
          <GoogleReviews />
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#D32F2F] mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - FAQ Accordion */}
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200 group">
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
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200 group">
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
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200 group">
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
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200 group">
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
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200 group">
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
                <div className="flex items-center mb-8">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-xl font-bold">Call 301-949-2500</span>
                </div>

                {/* Contact Button */}
                <button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  Contact Us
                </button>
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
            <div className="bg-[#dc2626] text-white p-8 rounded-lg shadow-lg flex flex-col justify-between">
              <h3 className="text-5xl font-bold mb-8">Latest insights & tips</h3>
              <button className="bg-[#1e3a8a] text-white font-bold py-3 px-6 rounded-full hover:bg-[#152a63] transition-colors self-start">
                View All
              </button>
            </div>

            {/* Article Card 1 */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
              <div className="h-48 relative overflow-hidden">
          <Image
                  src="/blogs/Dishwasher-does-not-start.jpg"
                  alt="Dishwasher Service"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">Appliance Service</p>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Dishwasher Does Not Start?</h4>
                <p className="text-gray-600 text-sm mb-4">Troubleshoot common dishwasher startup issues and learn when to call a professional.</p>
                <p className="text-gray-500 text-xs">20 Jan 2022</p>
              </div>
            </div>

            {/* Article Card 2 */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/blogs/What-to-Do-If-Water-Is-Not-Dispensing-From-Your-Refrigerator.jpeg"
                  alt="Refrigerator Water Dispenser"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">Appliance Service</p>
                <h4 className="text-xl font-bold text-gray-800 mb-3">What to Do If Water Is Not Dispensing From Your Refrigerator</h4>
                <p className="text-gray-600 text-sm mb-4">Learn how to troubleshoot and fix common refrigerator water dispenser issues.</p>
                <p className="text-gray-500 text-xs">19 Jan 2023</p>
              </div>
            </div>

            {/* Article Card 3 */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/blogs/most-common-appliance-problems.jpg"
                  alt="Common Appliance Problems"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">Appliance Service</p>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Most Common Appliance Problems and How to Fix Them</h4>
                <p className="text-gray-600 text-sm mb-4">Discover the most frequent appliance issues and learn simple troubleshooting steps.</p>
                <p className="text-gray-500 text-xs">15 Feb 2023</p>
              </div>
            </div>
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
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-lg font-bold">301-949-2500</span>
                  </div>
                  
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
