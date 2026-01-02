"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import Script from "next/script";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ApplianceSidebar from "../../components/ApplianceSidebar";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import ApplianceRequestModal from "../../components/ApplianceRequestModal";

type BettarAppliance = {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceFrom: number; // Current price
  priceOld?: number;
  discountPercent?: number;
  shortDescription?: string;
  // Additional fields from your Firestore
  capacityKw?: number;
  inStock?: boolean;
  roomSize?: string;
  supplyType?: string; // e.g., "Gas", "Electric"
  type?: string; // Subcategory or appliance type
  // Optional recommended fields
  modelNumber?: string;
  color?: string;
  energyRating?: string;
  warranty?: string;
  features?: string[];
  fullDescription?: string;
  images?: string[]; // Multiple images
  categorySlug?: string;
};

export default function Appliances() {
  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isApplianceModalOpen, setIsApplianceModalOpen] = useState(false);

  // Filter state
  const [selectedFilters, setSelectedFilters] = useState<{
    brand: string[];
    energy: string[];
    features: string[];
  }>({
    brand: [],
    energy: [],
    features: [],
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

  const handleFilterChange = (filterType: "brand" | "energy" | "features", value: string) => {
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
    setSelectedFilters({ brand: [], energy: [], features: [] });
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
            
        if (!(
              name.includes(q) ||
              brand.includes(q) ||
              category.includes(q) ||
              description.includes(q) ||
              type.includes(q)
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

      // Energy rating filter
      if (selectedFilters.energy.length > 0) {
        const itemEnergy = item.energyRating?.toLowerCase() || "";
        const energyMatches = selectedFilters.energy.some(filterEnergy => {
          if (filterEnergy === "energy-star") {
            return itemEnergy.includes("energy star") || itemEnergy.includes("energystar");
          }
          return itemEnergy.includes(filterEnergy.toLowerCase());
        });
        if (!energyMatches) {
          return false;
        }
      }

      // Features filter
      if (selectedFilters.features.length > 0) {
        const itemFeatures = item.features || [];
        const itemFeaturesLower = itemFeatures.map(f => f.toLowerCase());
        const itemName = item.name?.toLowerCase() || "";
        const itemDesc = item.shortDescription?.toLowerCase() || "";
        
        const featureMatches = selectedFilters.features.some(filterFeature => {
          // Check if feature is in features array
          if (itemFeaturesLower.some(f => f.includes(filterFeature.toLowerCase()))) {
            return true;
          }
          // Also check name and description for common feature keywords
          const combinedText = `${itemName} ${itemDesc}`;
          if (filterFeature === "smart" && combinedText.includes("smart")) return true;
          if (filterFeature === "wifi" && (combinedText.includes("wifi") || combinedText.includes("wi-fi"))) return true;
          if (filterFeature === "stainless" && combinedText.includes("stainless")) return true;
          if (filterFeature === "quiet" && combinedText.includes("quiet")) return true;
          return false;
        });
        
        if (!featureMatches) {
          return false;
        }
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
      <section className="py-12 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              <span className="text-[#002D72]">
                Appliance Sales, Repair & Installation
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reliable appliance sales, installation, and repair serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown. From fridges and dishwashers to washers and dryers, Bettar Appliance keeps your home running smoothly.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsApplianceModalOpen(true)}
                className="px-8 py-3 rounded-full bg-[#002D72] text-white font-semibold hover:bg-[#001F5C] transition shadow-lg hover:shadow-xl"
              >
                Buy Now
              </button>
              <button
                onClick={() => {
                  const faqSection = document.getElementById("faqs");
                  if (faqSection) {
                    faqSection.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="px-8 py-3 rounded-full bg-white text-[#002D72] font-semibold hover:bg-[#E6EDFF] border-2 border-[#002D72] transition shadow-lg hover:shadow-xl"
              >
                View FAQs
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown. Licensed and insured.
            </p>


          </div>
        </div>
      </section>

      {/* Main content with sidebar */}
      <main className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
          <ApplianceSidebar
            selectedFilters={selectedFilters}
            priceRange={priceRange}
            onFilterChange={handleFilterChange}
            onPriceRangeChange={setPriceRange}
            onClearAll={handleClearAllFilters}
          />
        </aside>

        {/* Right column */}
        <div className="w-full flex-1 space-y-16">
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
                className="w-full md:w-96 flex items-center bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow focus-within:border-[#002D72]"
              >
                <div className="flex items-center px-4 text-gray-400">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search appliances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow px-2 py-3 text-sm text-black outline-none placeholder:text-gray-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-3 text-gray-400 hover:text-gray-600 transition"
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
                  className="px-6 py-3 bg-[#002D72] text-white text-sm font-semibold hover:bg-[#001a45] transition-colors"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {filteredAppliances.map((item) => (
                    <article
                      key={item.id}
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
                    </article>
                  ))}
                </div>
              )}
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
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-80 md:h-96">
              <Image
                src="/appliances.jpg"
                alt="Technician installing a kitchen appliance"
                fill
                className="object-cover rounded-3xl shadow-xl"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Sales, Installations & Repairs – All in One Place
              </h2>
               <p className="text-gray-600">
                 Bettar Appliance is your one-stop shop for appliances throughout Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown. We help you choose the right unit, deliver it to your home, professionally install it, and keep it maintained for years.
               </p>
              <ul className="space-y-2 text-gray-700">
                <li>• New appliance sales with honest recommendations</li>
                <li>• Professional installation and removal of old units</li>
                <li>• Same-day and next-day repair options</li>
                <li>• Local team that respects your home and time</li>
              </ul>
            </div>
          </div>
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
        onClose={() => setIsApplianceModalOpen(false)}
      />
    </div>
  );
}
