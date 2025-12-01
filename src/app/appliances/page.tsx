"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Script from "next/script";
import RequestServiceModal from "../../components/RequestServiceModal";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ApplianceSidebar from "../../components/ApplianceSidebar";

export default function Appliances() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you provide appliance sales and repair services in Kensington, MD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we are a trusted appliance store in Kensington, MD. We provide comprehensive appliance services including appliance sales, appliance repair, appliance installation, and maintenance for all major brands including refrigerators, washers, dryers, dishwashers, ranges, and more throughout Kensington and surrounding areas."
        }
      },
      {
        "@type": "Question",
        "name": "What types of appliances do you service in Kensington, MD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We service all major appliance brands and types in Kensington, MD including refrigerators, washers, dryers, dishwashers, ranges, cooktops, microwaves, garbage disposers, trash compactors, and more. Our certified technicians are experts in diagnosing and repairing a wide range of appliance issues."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer same-day appliance repair service in Kensington, MD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer same-day appliance repair service in Kensington, MD for most appliance repairs. We understand the urgency of appliance breakdowns and strive to provide fast and efficient service to get your appliances running again quickly. Call 301-949-2500 to schedule same-day service."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do your appliance services cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our appliance sales and repair services cover Kensington, MD, Bethesda, Chevy Chase, Silver Spring, and throughout Montgomery County. We also serve Northwest Washington DC and surrounding communities in the greater DC metropolitan area."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide appliance installation services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide professional appliance installation services in Kensington, MD. When you purchase appliances from Bettar Appliances, we offer expert installation to ensure your new appliances are properly set up and functioning correctly. We also provide installation for appliances purchased elsewhere."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="appliances-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Appliances Services
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              <span className="text-[#002D72]">Appliance Repair Kensington MD</span> | Same-Day Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Appliance repair in Kensington, MD. Same-day appliance repair service for refrigerators, washers, dryers, dishwashers, and ranges. Professional appliance store with sales, installation & repair. Licensed technicians. Call 301-949-2500 for immediate service.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for appliances, brands, or models..."
                className="w-full px-6 py-4 pl-14 pr-32 text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#002D72] transition-colors text-lg"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#002D72] text-white px-6 py-2 rounded-lg hover:bg-[#001f4d] transition-colors font-semibold"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <ApplianceSidebar />
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-3">
              {/* Shop From Top Categories Section */}
              <div className="py-16 bg-white">
                <div className="w-full">
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
              <Link href="/appliances#refrigerators" className="flex flex-col items-center group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <img
                    src="/appliances-images/ref/fri2.jpg"
                    alt="Refrigerators"
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-sm">Refrigerators</span>
              </Link>

              {/* Dishwasher */}
              <Link href="/appliances#dishwasher" className="flex flex-col items-center group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <img
                    src="/appliances-images/dishwasher/kitchenaid1.jpg"
                    alt="Dishwasher"
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-sm">Dishwasher</span>
              </Link>

              {/* Range */}
              <Link href="/appliances#range" className="flex flex-col items-center group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <img
                    src="/appliances-images/range/kitchenaid1.jpg"
                    alt="Range"
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-sm">Range</span>
              </Link>

              {/* Cooktops */}
              <Link href="/appliances#cooktops" className="flex flex-col items-center group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <img
                    src="/appliances-images/cooktop/maytag1.jpg"
                    alt="Cooktops"
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-sm">Cooktops</span>
              </Link>

              {/* Microwave */}
              <Link href="/appliances#microwave" className="flex flex-col items-center group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <img
                    src="/appliances-images/microwave/ge1.jpg"
                    alt="Microwave"
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-sm">Microwave</span>
              </Link>

              {/* Washers */}
              <Link href="/appliances#washers" className="flex flex-col items-center group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <img
                    src="/appliances-images/washers/ge1.jpg"
                    alt="Washers"
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-sm">Washers</span>
              </Link>

              {/* Clothes Dryer */}
              <Link href="/appliances#clothes-dryer" className="flex flex-col items-center group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-white-100 border-2 border-gray-300 group-hover:border-[#002D72] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <img
                    src="/appliances-images/dryer/maytag1.jpg"
                    alt="Clothes Dryer"
                    className="w-3/4 h-3/4 object-contain object-center"
                  />
                </div>
                <span className="text-gray-800 font-medium text-center text-sm">Clothes Dryer</span>
              </Link>
          </div>
                </div>
              </div>

              {/* Best Deals on Appliances Section */}
              <section className="py-16">
                <div className="w-full">
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
          
          {/* Deals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Deal 1 - Refrigerator */}
            <Link href="/appliances#refrigerators" className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <div className="absolute top-2 right-2 z-10 bg-[#002D72] text-white px-3 py-1 rounded-lg text-sm font-bold">
                  10% OFF
                </div>
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src="/appliances-images/ref/fri2.jpg"
                    alt="Refrigerator Deal"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-semibold mb-2">Frigidaire® Garage Ready Top Freezer Refrigerator-18 cu.ft </h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-[#002D72]">$809</span>
                  <span className="text-gray-500 line-through text-sm">$899</span>
                </div>
                <p className="text-green-600 font-medium text-sm">Save - $90</p>
              </div>
            </Link>

            {/* Deal 2 - Dishwasher */}
            <Link href="/appliances#dishwasher" className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <div className="absolute top-2 right-2 z-10 bg-[#002D72] text-white px-3 py-1 rounded-lg text-sm font-bold">
                  13% OFF
                </div>
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src="/appliances-images/dishwasher/kitchenaid1.jpg"
                    alt="Dishwasher Deal"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-semibold mb-2">KitchenAid® Third Level Utensil Rack Dishwasher with 30+ Total Wash Jets in PrintShield™ Finish, 47 dBA</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-[#002D72]">$912</span>
                  <span className="text-gray-500 line-through text-sm">$1,049</span>
                </div>
                <p className="text-green-600 font-medium text-sm">Save - $137</p>
              </div>
            </Link>

            {/* Deal 3 - Range */}
            <Link href="/appliances#range" className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <div className="absolute top-2 right-2 z-10 bg-[#002D72] text-white px-3 py-1 rounded-lg text-sm font-bold">
                  26% OFF
                </div>
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src="/appliances-images/range/kitchenaid1.jpg"
                    alt="Range Deal"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-semibold mb-2">KitchenAid® Smart Slide-in Gas Range with Convection Cooking Modes and 2-in-1 Burner- 5.0 Cu. Ft. </h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-[#002D72]">$2,105</span>
                  <span className="text-gray-500 line-through text-sm">$2,849</span>
                </div>
                <p className="text-green-600 font-medium text-sm">Save - $744</p>
              </div>
            </Link>

            {/* Deal 4 - Washer */}
            <Link href="/appliances#washers" className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <div className="absolute top-2 right-2 z-10 bg-[#002D72] text-white px-3 py-1 rounded-lg text-sm font-bold">
                  15% OFF
                </div>
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src="/appliances-images/washers/GTW385ASWWS-1.png"
                    alt="Washer Deal"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-semibold mb-2">GE® ENERGY STAR 4.8 cu. ft. Capacity Smart Front Load ® Washer with UltraFresh Vent System with OdorBlock™ and Sanitize w/Oxi</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-[#002D72]">$639</span>
                  <span className="text-gray-500 line-through text-sm">$749</span>
                </div>
                <p className="text-green-600 font-medium text-sm">Save - $110</p>
              </div>
            </Link>

            {/* Deal 5 - Dryer */}
            <Link href="/appliances#clothes-dryer" className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <div className="absolute top-2 right-2 z-10 bg-[#002D72] text-white px-3 py-1 rounded-lg text-sm font-bold">
                  24% OFF
                </div>
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src="/appliances-images/dryer/maytag1.png"
                    alt="Dryer Deal"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-semibold mb-2">Maytag® Smart Top Load Electric Dryer with Extra Power - 7.4 cu. ft.</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-[#002D72]">$874</span>
                  <span className="text-gray-500 line-through text-sm">$1,149</span>
                </div>
                <p className="text-green-600 font-medium text-sm">Save - $275</p>
              </div>
            </Link>
          </div>
                </div>
              </section>
            </div>
          </div>
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
                        From refrigerators to washing machines, we provide expert repair services for all major appliance brands. Our certified technicians ensure your appliances run efficiently.
                      </p>
                      <p className="text-white text-lg leading-relaxed">
                        We also offer quality appliance sales with professional installation and warranty coverage. Trust Bettar for all your appliance needs.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end md:justify-end">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-[#D32F2F] text-white px-8 py-3 rounded-lg hover:bg-[#b91c1c] transition-colors font-bold text-lg"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location-Specific Services Section - Minimalist Design */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight whitespace-nowrap">
              Appliance Store & Appliance Services in Kensington, MD
            </h2>
            <p className="text-lg text-gray-500 mx-auto font-light leading-relaxed whitespace-nowrap">
              Trusted appliance store serving Kensington, MD with expert appliance sales, appliance repair, and appliance installation services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="border-l-2 border-[#002D72] pl-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Appliance Store in Kensington, MD
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed ">
                As a leading appliance store in Kensington, MD, we provide quality appliances from top brands including Whirlpool, KitchenAid, GE, Maytag, Samsung, and more. Our appliance store offers professional appliance sales with installation and warranty coverage.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#002D72] rounded-full mr-3"></span>
                  Appliance sales Kensington, MD
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#002D72] rounded-full mr-3"></span>
                  Appliance store Kensington, MD
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#002D72] rounded-full mr-3"></span>
                  Refrigerator sales and installation
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#002D72] rounded-full mr-3"></span>
                  Washer and dryer sales
                </li>
              </ul>
            </div>
            
            <div className="border-l-2 border-[#002D72] pl-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Appliance Repair in Kensington, MD
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Professional appliance repair in Kensington, MD including refrigerator repair, washer repair, dryer repair, dishwasher repair, and range repair. Our certified technicians provide same-day service for most appliance repairs.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#002D72] rounded-full mr-3"></span>
                  Appliance repair Kensington, MD
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#002D72] rounded-full mr-3"></span>
                  Refrigerator repair Kensington, MD
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#002D72] rounded-full mr-3"></span>
                  Washer repair Kensington, MD
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#002D72] rounded-full mr-3"></span>
                  Same-day appliance service
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Appliance Services in Kensington Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Appliance Services in Kensington, MD
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                From appliance sales to emergency repairs, our certified technicians provide reliable appliance services throughout Kensington, MD, Bethesda, and the surrounding areas.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We service all major appliance brands and offer same-day service for most appliance repairs. Whether you need refrigerator repair, washer repair, or dishwasher installation, our team is ready to help.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Appliance repair and maintenance</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Appliance sales and installation</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Same-day appliance service</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Emergency appliance repair</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/appliances.jpg"
                alt="Appliance Services in Kensington MD"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our <span className="text-[#002D72]">Appliance Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive appliance solutions for your home in Kensington, MD
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Repair Services</h3>
              <p className="text-gray-600">
                Expert repair for all major appliance brands. Same-day service available for most repairs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Appliance Sales</h3>
              <p className="text-gray-600">
                Quality appliances from top brands with professional installation and warranty coverage.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Maintenance</h3>
              <p className="text-gray-600">
                Regular maintenance services to keep your appliances running efficiently and extend their lifespan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-[#002D72] pr-4">
                    {item.name}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-[#002D72] flex-shrink-0 transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {item.acceptedAnswer.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#002D72]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need Appliance Service in Kensington, MD?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Don&apos;t let appliance problems disrupt your day. Our expert technicians are ready to help with fast, reliable appliance repair and service in Kensington, MD.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/request-service"
              className="bg-[#D32F2F] text-white px-8 py-4 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold text-lg"
            >
              Schedule Service
            </a>
            <a 
              href="tel:301-949-2500"
              className="bg-white text-[#002D72] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Call 301-949-2500
            </a>
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
