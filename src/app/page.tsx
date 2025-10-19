"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import RequestServiceModal from "../components/RequestServiceModal";
import GoogleReviews from "../components/GoogleReviews";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const historyImages = [
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
      <Header />

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
        <Image
            src="/bettarlandingpage.JPG"
            alt="Bettar Service Van"
            fill
            className="object-cover"
          priority
        />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/100 via-white/90 to-transparent z-10"></div>
        
        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 leading-tight">
                Need <span className="text-[#dc2626]">appliance repair</span> or <span className="text-[#dc2626]">handyman services</span>? <span className="text-[#1e3a8a]">Bettar</span> is here for you!
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-[#1e3a8a] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-[#1e3a8a] text-xl font-semibold">Call 301-949-2500</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#1e3a8a] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[#1e3a8a] text-lg font-medium">Kensington, MD</span>
                </div>
                
                <a 
                  href="/request-service"
                  className="bg-[#dc2626] text-white px-8 py-3 rounded-lg hover:bg-[#b91c1c] transition-colors font-semibold text-lg"
                >
                  Request Service
                </a>
              </div>
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
                <div className="text-6xl md:text-7xl font-bold text-[#1e3a8a] mb-2">30k+</div>
                <div className="text-gray-700 font-medium">HAPPY CLIENTS</div>
              </div>
              
              {/* Stat 3 */}
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-bold text-[#1e3a8a] mb-2">70K+</div>
                <div className="text-gray-700 font-medium">PROJECTS FINISHED</div>
                <div className="text-[#1e3a8a] text-sm mt-2 cursor-pointer hover:underline">View Projects →</div>
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

      {/* Services Section */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-black">
              Services That Fit
            </h2>
            <h2 className="text-5xl md:text-6xl font-bold text-[#1e3a8a]">
              Your Needs
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 relative">
            <Image
                  src="/renovations.jpg"
                  alt="Renovations and Remodeling"
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
              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Renovations and Remodeling</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus massa eget dolor auctor, euismod hendrerit tellus placerat.
                </p>
                <a href="/services/renovations" className="text-[#002D72] font-bold hover:underline inline-block">View Service →</a>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 relative">
                <Image
                  src="/plumbing.jpeg"
                  alt="Plumbing and Heating"
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
              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Plumbing and Heating</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus massa eget dolor auctor, euismod hendrerit tellus placerat.
                </p>
                <a href="/services/plumbing" className="text-[#002D72] font-bold hover:underline inline-block">View Service →</a>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 relative">
                <Image
                  src="/handyman.jpg"
                  alt="Handyman Repair and Services"
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
              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Handyman Repair and Services</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus massa eget dolor auctor, euismod hendrerit tellus placerat.
                </p>
                <a href="/services/handyman" className="text-[#002D72] font-bold hover:underline inline-block">View Service →</a>
              </div>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                      </p>
                      <p className="text-white text-lg leading-relaxed">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end md:justify-end">
                    <a href="/appliances" className="bg-[#D32F2F] text-white px-8 py-3 rounded-lg hover:bg-[#b91c1c] transition-colors font-bold text-lg">
                      Shop Now
                    </a>
                  </div>
                </div>
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
                Tell us what you need — You can fill out our <a href="#contact" className="text-[#002D72] font-semibold hover:text-[#1e3a8a] transition-colors">request service form</a> or give us a quick call at <span className="text-[#002D72] font-bold">301-949-2500</span>, and we&apos;ll take care of the rest.
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
                We work for you since <span className="text-[#D32F2F]">1945.</span>
              </h2>
              
              <div className="w-16 h-px bg-gray-300 mb-6"></div>
              
              <p className="text-[#333] text-lg leading-relaxed mb-8">
                At Bettar, our story is woven into the fabric of the Kensington, Maryland, community. Since our humble beginnings in 1945, our family has dedicated itself to providing the highest quality home services for our neighbors across Bethesda, Chevy Chase, and Northwest D.C. What started as a commitment to honest appliance repair has blossomed into a comprehensive suite of solutions designed to make your home life easier and more comfortable.
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
      <section className="py-20 bg-white">
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
            <a href="#" className="text-[#002D72] hover:underline text-lg font-semibold mt-4 md:mt-0">
              View More →
          </a>
        </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Project 1 - Windows & Doors */}
            <div className="group cursor-pointer">
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
            </div>
            
            {/* Project 2 - Windows & Doors */}
            <div className="group cursor-pointer">
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
            </div>
            
            {/* Project 3 - Kitchen Remodeling */}
            <div className="group cursor-pointer">
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
            </div>
            
            {/* Project 4 - Landscaping & Lawn */}
            <div className="group cursor-pointer">
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
            </div>
            
            {/* Project 5 - Cabinet Installation */}
            <div className="group cursor-pointer">
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
            </div>
            
            {/* Project 6 - Concrete Work */}
            <div className="group cursor-pointer">
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
            </div>
            
            {/* Project 7 - Deck */}
            <div className="group cursor-pointer">
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
            </div>
            
            {/* Project 8 - Windows */}
            <div className="group cursor-pointer">
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
            </div>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
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
                  We proudly serve Kensington, Bethesda, Chevy Chase, and the surrounding Maryland areas.
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
                    <a href="mailto:Info@bettarappliance.com" className="text-lg hover:underline">Info@bettarappliance.com</a>
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
                <form className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">First Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your first name"
                        className="w-full px-0 py-3 border-0 border-b border-[#D1D5DB] focus:ring-0 focus:border-[#002D72] focus:outline-none text-[#111827]" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your last name"
                        className="w-full px-0 py-3 border-0 border-b border-[#D1D5DB] focus:ring-0 focus:border-[#002D72] focus:outline-none text-[#111827]" 
                      />
                    </div>
                  </div>
                  
                  {/* Email and Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">Email</label>
                      <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full px-0 py-3 border-0 border-b border-[#D1D5DB] focus:ring-0 focus:border-[#002D72] focus:outline-none text-[#111827]" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="Enter your phone number"
                        className="w-full px-0 py-3 border-0 border-b border-[#D1D5DB] focus:ring-0 focus:border-[#002D72] focus:outline-none text-[#111827]" 
                      />
                    </div>
                  </div>
                  
                  {/* Subject Selection */}
                  <div>
                    <h4 className="text-lg font-semibold text-[#111827] mb-4">Select Subject?</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="renovations" defaultChecked className="w-4 h-4 text-[#002D72] border-gray-300 focus:ring-[#002D72]" />
                        <span className="ml-3 text-[#111827]">Renovations & Remodeling</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="plumbing" className="w-4 h-4 text-[#002D72] border-gray-300 focus:ring-[#002D72]" />
                        <span className="ml-3 text-[#111827]">Plumbing & Heating</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="handyman" className="w-4 h-4 text-[#002D72] border-gray-300 focus:ring-[#002D72]" />
                        <span className="ml-3 text-[#111827]">Handyman Services</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="appliance" className="w-4 h-4 text-[#002D72] border-gray-300 focus:ring-[#002D72]" />
                        <span className="ml-3 text-[#111827]">Appliance Sale and Service</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">Message</label>
                    <textarea 
                      rows={4} 
                      placeholder="Write your message..."
                      className="w-full px-0 py-3 border-0 border-b border-[#D1D5DB] focus:ring-0 focus:border-[#002D72] focus:outline-none text-[#111827] resize-none"
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <button type="submit" className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-3 px-8 rounded-[10px] transition-colors">
                    Send Message
                  </button>
                </form>
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
