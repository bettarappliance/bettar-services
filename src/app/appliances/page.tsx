"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import Script from "next/script";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ApplianceSidebar from "../../components/ApplianceSidebar";

import { collection, getDocs, db } from "@/lib/firebase";
import ApplianceRequestModal from "../../components/ApplianceRequestModal";
import ApplianceProductCard from "../../components/ApplianceProductCard";
import type { BettarAppliance } from "@/types/appliance";

export default function Appliances() {
  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isApplianceModalOpen, setIsApplianceModalOpen] = useState(false);
  const [selectedApplianceName, setSelectedApplianceName] = useState<string>("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Filter state
  const [selectedFilters, setSelectedFilters] = useState<{
    brand: string[];
  }>({
    brand: [],
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  // Firestore state
  const [appliances, setAppliances] = useState<BettarAppliance[]>([]);
  const [loadingAppliances, setLoadingAppliances] = useState(true);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtering happens automatically via filteredAppliances
    // Scroll to results if on mobile or if results are below the fold
    const resultsSection = document.getElementById("appliances-results");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
        
        // Sort by discount percentage (highest first)
        const sortedByDiscount = items.sort((a, b) => {
          const discountA = a.discountPercent || 0;
          const discountB = b.discountPercent || 0;
          return discountB - discountA; // Descending order
        });
        
        setAppliances(sortedByDiscount);
      } catch (error) {
        console.error("Error loading appliances from Firestore", error);
      } finally {
        setLoadingAppliances(false);
      }
    };

    fetchAppliances();
  }, []);

  const handleFilterChange = (filterType: "brand", value: string) => {
    setSelectedFilters(prev => {
      const current = prev[filterType] || [];
      if (current.includes(value)) {
        return {
          ...prev,
          [filterType]: current.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...current, value]
        };
      }
    });
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({ brand: [] });
    setPriceRange({ min: 0, max: 5000 });
  };

  const filteredAppliances: BettarAppliance[] = useMemo(() => {
    return appliances.filter((item) => {
      // Search query filter
      if (searchQuery.trim().length > 0) {
            const q = searchQuery.toLowerCase().trim();
            const name = item.name?.toLowerCase() || "";
            const brand = item.brand?.toLowerCase() || "";
            const category = item.category?.toLowerCase() || "";
            const description = item.shortDescription?.toLowerCase() || "";
            const type = item.type?.toLowerCase() || "";
            const modelNumber = item.modelNumber?.toLowerCase() || "";
            
        if (!(
              name.includes(q) ||
              brand.includes(q) ||
              category.includes(q) ||
              description.includes(q) ||
              type.includes(q) ||
              modelNumber.includes(q)
        )) {
          return false;
        }
      }

      // Brand filter
      if (selectedFilters.brand.length > 0) {
        const itemBrand = item.brand?.toLowerCase() || "";
        if (!selectedFilters.brand.some(filterBrand => 
          itemBrand.includes(filterBrand.toLowerCase())
        )) {
          return false;
        }
      }

      // Price filter
      if (item.priceFrom < priceRange.min || item.priceFrom > priceRange.max) {
        return false;
      }

      return true;
          })
          .sort((a, b) => {
            // Maintain discount sorting even after filtering
            const discountA = a.discountPercent || 0;
            const discountB = b.discountPercent || 0;
            return discountB - discountA;
          });
  }, [appliances, searchQuery, selectedFilters, priceRange]);

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What areas do you serve for appliance sales and repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bettar Appliance provides appliance sales, delivery, installation, and repair throughout Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, Maryland.",
        },
      },
      {
        "@type": "Question",
        name: "Which appliances can you install and service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We supply and install refrigerators, dishwashers, ranges, cooktops, wall ovens, washers, dryers, microwaves, and more. We can also install customer-supplied units.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer same-day or next-day appliance services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, subject to availability, we can often provide same-day or next-day appointments for urgent appliance repairs and installations.",
        },
      },
    ],
  };

  // Simple FAQ content for the accordion
  const faqs = [
    {
      question: "What areas do you serve for appliance sales and repair?",
      answer:
        "Bettar Appliance serves homeowners throughout Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown with sales, installation, and repair for most major household appliances.",
    },
    {
      question: "Which appliance brands do you install?",
      answer:
        "We work with a wide range of leading brands including Whirlpool, Maytag, GE, LG, Samsung, Frigidaire, KitchenAid, and more. If you already have a unit, we can install most customer-supplied appliances too.",
    },
    {
      question: "How soon can you come out for a repair or install?",
      answer:
        "Appointment availability varies by season, but we aim for same-day or next-day service for urgent issues. Contact us and we’ll give you the earliest available time slot.",
    },
    {
      question: "Do you remove old appliances?",
      answer:
        "Yes, we can remove and dispose of your old appliance as part of the new installation, subject to access and safety conditions.",
    },
  ];

  // Local Business Schema for SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Bettar Appliances",
    "description": "Professional appliance sales, repair, and installation serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, Maryland.",
    "telephone": "301-949-2500",
    "url": "https://bettarservices.com/appliances",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kensington",
      "addressRegion": "MD",
      "addressCountry": "US"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Upper Northwest DC"
      },
      {
        "@type": "City",
        "name": "Bethesda"
      },
      {
        "@type": "City",
        "name": "Chevy Chase"
      },
      {
        "@type": "City",
        "name": "Rockville"
      },
      {
        "@type": "City",
        "name": "Kensington"
      },
      {
        "@type": "City",
        "name": "Potomac"
      },
      {
        "@type": "City",
        "name": "Olney"
      },
      {
        "@type": "City",
        "name": "Brookville"
      },
      {
        "@type": "City",
        "name": "Gaithersburg"
      },
      {
        "@type": "City",
        "name": "Germantown"
      }
    ],
    "serviceType": [
      "Appliance Sales",
      "Appliance Repair",
      "Appliance Installation",
      "Refrigerator Repair",
      "Washer Repair",
      "Dryer Repair",
      "Dishwasher Repair"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* FAQ schema for SEO */}
      <Script
        id="appliances-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Local Business schema for SEO */}
      <Script
        id="appliances-local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Header />

      {/* Hero Section */}
      <section className="py-8 sm:py-10 md:py-14 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <p className="inline-block text-xs sm:text-sm font-semibold text-[#002D72] uppercase tracking-wider mb-3 sm:mb-4 px-3 py-1 rounded-full bg-white/80 border border-[#002D72]/20 shadow-sm">
              Best appliance store near me · Bettar Appliance Kensington
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 leading-[1.1] tracking-tight">
              <span className="text-[#002D72] block sm:inline">Your Home Deserves</span>{" "}
              <span className="bg-gradient-to-r from-[#002D72] to-[#0047AB] bg-clip-text text-transparent">Bettar.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed px-2 sm:px-0">
              Top brands. Expert repair & installation. One trusted stop for washers, dryers, fridges & more—so you can shop once and enjoy for years.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Family-owned since 1945
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Expert repair & installation
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Licensed & insured
              </span>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={() => setIsApplianceModalOpen(true)}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg rounded-full bg-[#002D72] text-white font-bold hover:bg-[#001F5C] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Shop Appliances →
              </button>
              <button
                onClick={() => {
                  const faqSection = document.getElementById("faqs");
                  if (faqSection) {
                    faqSection.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg rounded-full bg-white text-[#002D72] font-semibold hover:bg-[#E6EDFF] border-2 border-[#002D72] transition-all shadow-md hover:shadow-lg"
              >
                View FAQs
              </button>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-gray-500 px-2 sm:px-0">
              Serving Montgomery County, Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg & Germantown.
            </p>
          </div>
        </div>
      </section>

      {/* Main content with sidebar */}
      <main className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#002D72] text-white rounded-lg font-semibold hover:bg-[#001F5C] transition-colors shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {(selectedFilters.brand.length > 0 || priceRange.min > 0 || priceRange.max < 5000) && (
              <span className="bg-white text-[#002D72] px-2 py-0.5 rounded-full text-xs font-bold">
                {selectedFilters.brand.length + (priceRange.min > 0 || priceRange.max < 5000 ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <aside className="hidden lg:block w-full lg:w-64 xl:w-72 flex-shrink-0">
          <ApplianceSidebar
            selectedFilters={selectedFilters}
            priceRange={priceRange}
            onFilterChange={handleFilterChange}
            onPriceRangeChange={setPriceRange}
            onClearAll={handleClearAllFilters}
            appliances={appliances}
          />
        </aside>

        {/* Right column */}
        <div className="w-full flex-1 space-y-8 lg:space-y-16">
          {/* Search + intro */}
          <section>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  Find the right appliance for your home
                </h2>
                <p className="text-gray-600">
                  Browse our most popular appliances and current deals. Use the
                  search bar to filter by brand, category, or model.
                </p>
              </div>

              {/* Search bar */}
              <form
                onSubmit={handleSearch}
                className="w-full min-w-0 md:w-96 flex items-center bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow focus-within:border-[#002D72]"
              >
                <div className="flex items-center flex-shrink-0 pl-3 pr-1 md:px-4 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search appliances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="min-w-0 flex-1 px-2 py-3 text-sm text-black outline-none placeholder:text-gray-500 bg-transparent"
                  aria-label="Search appliances by brand, category, or model"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Clear search"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-shrink-0 px-4 md:px-6 py-3 bg-[#002D72] text-white text-sm font-semibold hover:bg-[#001a45] transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </section>

          {/* Best Deals on Appliances Section (Firestore powered) */}
          <section id="appliances-results" className="py-4">
            <div className="w-full">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {searchQuery.trim() ? (
                    <>
                      Search Results for &quot;{searchQuery}&quot;{" "}
                      <span className="text-gray-500 text-lg">
                        ({filteredAppliances.length} {filteredAppliances.length === 1 ? "result" : "results"})
                      </span>
                    </>
                  ) : (
                    <>
                  Grab the best deal on{" "}
                  <span className="text-[#002D72]">Appliances</span>
                    </>
                  )}
                </h2>
              </div>

              {loadingAppliances ? (
                <p className="text-gray-600">Loading appliances…</p>
              ) : filteredAppliances.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-2">
                    No appliances match your search for &quot;{searchQuery}&quot;
                  </p>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your search terms or browse all appliances.
                </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                  {filteredAppliances.map((item) => (
                    <ApplianceProductCard
                      key={item.id}
                      item={item}
                      onBuyNow={(name) => {
                        setSelectedApplianceName(name);
                        setIsApplianceModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Request an appliance - didn't find what you want */}
          <section className="py-8 border-t border-gray-200">
            <div className="bg-[#F4F7FF] rounded-xl p-6 md:p-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Didn&apos;t find what you&apos;re looking for?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Tell us the exact appliance you want—brand, model, or type—and we&apos;ll get back to you with availability and pricing.
              </p>
              <button
                onClick={() => setIsApplianceModalOpen(true)}
                className="px-6 py-3 rounded-lg bg-[#002D72] text-white font-semibold hover:bg-[#001F5C] transition-colors shadow-md hover:shadow-lg"
              >
                Request an appliance
              </button>
            </div>
          </section>

          {/* Why choose Bettar */}
          <section>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 md:h-80">
                <Image
                  src="/history/image.jpg"
                  alt="Bettar Appliance technicians"
                  fill
                  className="object-cover rounded-3xl shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Why homeowners in Bethesda, Chevy Chase, Rockville, and surrounding areas choose Bettar Appliance
                </h2>
                <p className="text-gray-600 mb-4">
                  We’re a local team that treats your home like our own. From
                  the first call to final cleanup, we focus on clear
                  communication, punctual arrival, and quality workmanship.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Licensed and insured appliance technicians</li>
                  <li>• Honest advice on whether to repair or replace</li>
                  <li>• Upfront, transparent pricing</li>
                  <li>• Respectful of your time, floors, and property</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faqs" className="pt-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Appliance FAQs
            </h2>
            <p className="text-gray-600 mb-6">
              Have questions about appliance installations, repairs, or
              warranties in Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, Germantown, or Upper Northwest DC? Start here.
            </p>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                >
                  <button
                    type="button"
                    className="w-full flex justify-between items-center px-4 py-3 text-left"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span className="ml-4 text-xl text-gray-500">
                      {openFAQ === index ? "−" : "+"}
                    </span>
                  </button>
                  {openFAQ === index && (
                    <div className="px-4 pb-4 text-gray-700 text-sm border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
          {/* Hero Illustration */}
          <div className="px-4 sm:px-6 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              <div className="relative h-64 sm:h-80 md:h-96 w-full">
              <Image
                src="/appliances.jpg"
                alt="Technician installing a kitchen appliance"
                fill
                  className="object-cover rounded-2xl md:rounded-3xl shadow-xl"
              />
            </div>
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Sales, Installations & Repairs – All in One Place
              </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                 Bettar Appliance is your one-stop shop for appliances throughout Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown. We help you choose the right unit, deliver it to your home, professionally install it, and keep it maintained for years.
               </p>
                <ul className="space-y-1.5 md:space-y-2 text-sm sm:text-base text-gray-700">
                <li>• New appliance sales with honest recommendations</li>
                <li>• Professional installation and removal of old units</li>
                <li>• Same-day and next-day repair options</li>
                <li>• Local team that respects your home and time</li>
              </ul>
            </div>
          </div>
          </div>

      {/* Best Appliance Stores Near Me Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Best Appliance Stores Near Me? <span className="text-[#002D72]">Bettar Appliance in Kensington, MD</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Looking for the best appliance stores near me? Bettar Appliance in Kensington, MD is your trusted local appliance store serving Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, and Germantown. Family-owned since 1945, we offer quality appliances, expert installation, and reliable repair services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#F4F7FF] p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Why Choose Bettar Appliance - Best Appliance Store Near Me
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span><strong>Local Expertise:</strong> Serving Kensington and surrounding areas since 1945</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span><strong>Top Brands:</strong> Refrigerators, washers, dryers, dishwashers, ranges, and more</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span><strong>Professional Installation:</strong> Licensed technicians install your appliances correctly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span><strong>Same-Day Service:</strong> Fast appliance repair and installation when you need it</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span><strong>Competitive Prices:</strong> Best deals on quality appliances in the area</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#F4F7FF] p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Bettar Appliance Kensington - Your Local Appliance Store
              </h3>
              <p className="text-gray-600 mb-4">
                <strong>Bettar Appliance Kensington</strong> is conveniently located to serve homeowners throughout Montgomery County, MD. Whether you&apos;re searching for &quot;bettar appliance kensington&quot; or &quot;appliance store near me,&quot; we&apos;re here to help with:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Bettar Appliance Repair:</strong> Expert repair for all major brands</li>
                <li>• <strong>Bettar Appliance Sales:</strong> New and quality appliances</li>
                <li>• <strong>Bettar Appliance Installation:</strong> Professional setup and delivery</li>
                <li>• <strong>Better Appliance Near Me:</strong> Local service you can trust</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Buy Washing Machine Near Me Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Where to Buy a Washing Machine Near Me? <span className="text-[#002D72]">Bettar Appliance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Searching for &quot;where to buy a washing machine near me&quot;? Bettar Appliance offers top-quality washers from leading brands like GE, Whirlpool, Maytag, Samsung, and LG. We provide expert guidance, professional installation, and ongoing support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Top-Loading Washers
              </h3>
              <p className="text-gray-600 mb-4">
                Energy-efficient top-loading washers perfect for families. Available in various capacities to suit your needs.
              </p>
              <Link href="/appliances/washers" className="text-[#002D72] font-semibold hover:underline">
                Shop Top-Loading Washers →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Front-Loading Washers
              </h3>
              <p className="text-gray-600 mb-4">
                Space-saving front-loading washers with advanced features. Great for modern homes and apartments.
              </p>
              <Link href="/appliances/washers" className="text-[#002D72] font-semibold hover:underline">
                Shop Front-Loading Washers →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Washer-Dryer Combos
              </h3>
              <p className="text-gray-600 mb-4">
                All-in-one washer-dryer units perfect for small spaces. Wash and dry in one convenient machine.
              </p>
              <Link href="/appliances" className="text-[#002D72] font-semibold hover:underline">
                Shop Washer-Dryer Combos →
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              <strong>Better Appliance Near Me?</strong> Yes! Bettar Appliance provides better appliance repair, better appliance sales, and better appliance service. Visit our showroom or call <a href="tel:301-949-2500" className="font-semibold text-[#002D72] hover:underline"><strong>301-949-2500</strong></a> to speak with our appliance experts.
            </p>
            <button
              onClick={() => setIsApplianceModalOpen(true)}
              className="px-8 py-3 rounded-full bg-[#002D72] text-white font-semibold hover:bg-[#001F5C] transition"
            >
              Find Your Perfect Washing Machine
            </button>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#002D72] text-white py-10 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Ready to book your appliance service?
            </h2>
            <p className="text-sm md:text-base text-[#E0E7FF] max-w-xl">
              Tell us about your appliance issue or installation and our team
              will get back to you with the next available time slot.
            </p>
          </div>
          <button
            onClick={() => setIsApplianceModalOpen(true)}
            className="px-8 py-3 rounded-full bg-white text-[#002D72] font-semibold hover:bg-[#E6EDFF] transition"
          >
            Request Service
          </button>
        </div>
      </section>

      <Footer />

      {/* Appliance Request Modal */}
      <ApplianceRequestModal
        isOpen={isApplianceModalOpen}
        onClose={() => {
          setIsApplianceModalOpen(false);
          setSelectedApplianceName("");
        }}
        applianceName={selectedApplianceName}
      />

      {/* Mobile Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsFilterModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close filters"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <ApplianceSidebar
                selectedFilters={selectedFilters}
                priceRange={priceRange}
                onFilterChange={handleFilterChange}
                onPriceRangeChange={setPriceRange}
                onClearAll={handleClearAllFilters}
                appliances={appliances}
              />
            </div>
            
            {/* Apply Button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="w-full bg-[#002D72] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001F5C] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
