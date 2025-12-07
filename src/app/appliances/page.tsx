"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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

  // Firestore state
  const [appliances, setAppliances] = useState<BettarAppliance[]>([]);
  const [loadingAppliances, setLoadingAppliances] = useState(true);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // nothing extra needed – grid below already reacts to searchQuery
    console.log("Searching for:", searchQuery);
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

  const filteredAppliances =
    searchQuery.trim().length === 0
      ? appliances
      : appliances
          .filter((item) => {
            const q = searchQuery.toLowerCase().trim();
            const name = item.name?.toLowerCase() || "";
            const brand = item.brand?.toLowerCase() || "";
            const category = item.category?.toLowerCase() || "";
            const description = item.shortDescription?.toLowerCase() || "";
            const type = item.type?.toLowerCase() || "";
            
            return (
              name.includes(q) ||
              brand.includes(q) ||
              category.includes(q) ||
              description.includes(q) ||
              type.includes(q)
            );
          })
          .sort((a, b) => {
            // Maintain discount sorting even after filtering
            const discountA = a.discountPercent || 0;
            const discountB = b.discountPercent || 0;
            return discountB - discountA;
          });

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
          <ApplianceSidebar />
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
                  className="flex-grow px-2 py-3 text-sm outline-none placeholder:text-gray-500"
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

          {/* Top Categories (static – link anchors) */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Shop by Appliance Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Refrigerators",
                  href: "/appliances#refrigerators",
                  image: "/appliances-images/ref/fri2.jpg",
                },
                {
                  label: "Dishwashers",
                  href: "/appliances#dishwasher",
                  image: "/appliances-images/dishwasher/kitchenaid1.jpg",
                },
                {
                  label: "Ranges",
                  href: "/appliances#range",
                  image: "/appliances-images/range/kitchenaid1.jpg",
                },
                {
                  label: "Washers",
                  href: "/appliances#clothes-washer",
                  image: "/appliances-images/washers/GTW385ASWWS-1.png",
                },
                {
                  label: "Dryers",
                  href: "/appliances#clothes-dryer",
                  image: "/appliances-images/dryer/maytag1.png",
                },
                {
                  label: "Microwaves",
                  href: "/appliances#microwave",
                  image: "/appliances-images/microwave/ge1.jpg",
                },
                {
                  label: "Cooktops",
                  href: "/appliances#cooktop",
                  image: "/appliances-images/cooktop/maytag1.jpg",
                },
                {
                  label: "Wall Ovens",
                  href: "/appliances#wall-oven",
                  image: "/appliances-images/microwave/ge1.jpg",
                },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="group bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-center gap-3 hover:shadow-md transition"
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-[#002D72] text-center">
                    {cat.label}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Best Deals on Appliances Section (Firestore powered) */}
          <section className="py-4">
            <div className="w-full">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Grab the best deal on{" "}
                  <span className="text-[#002D72]">Appliances</span>
                </h2>
              </div>

              {loadingAppliances ? (
                <p className="text-gray-600">Loading appliances…</p>
              ) : filteredAppliances.length === 0 ? (
                <p className="text-gray-600">
                  No appliances match your search right now.
                </p>
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
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={220}
                            height={192}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
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
