"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import RequestServiceModal from "../../components/RequestServiceModal";
import JobberRequestEmbed from "../../components/JobberRequestEmbed";

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const historyImages = [
    "/history/2025-05-07 (1).jpg",
    "/history/2025-05-07 (2).jpg",
    "/history/2025-05-07 (3).jpg",
    "/history/2025-05-07 (4).jpg",
    "/history/05-07 (5).jpg",
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
    }, 3000);

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
      {/* Header */}
      <header className="bg-[#1e3a8a] w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/bettarlogo.png"
              alt="Bettar Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-white font-semibold text-2xl">BETTAR SERVICES</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="/about" className="text-white hover:text-gray-300 transition-colors">About Us</a>
            <div className="relative group">
              <a href="/services" className="text-white hover:text-gray-300 transition-colors flex items-center">
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <a href="/services/renovations" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                    Renovations and Remodeling
                  </a>
                  <a href="/services/plumbing" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                    Plumbing and Heating
                  </a>
                  <a href="/services/handyman" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                    Handyman Repair and Services
                  </a>
                  <a href="/appliances" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                    Appliances Services
                  </a>
                </div>
              </div>
            </div>
            <a href="/appliances" className="text-white hover:text-gray-300 transition-colors">Appliances</a>
            <a href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact Us</a>
          </nav>
          
          {/* CTA Button */}
          <a 
            href="/request-service"
            className="bg-[#dc2626] text-white px-6 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors font-medium"
          >
            Request Service
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              About Us
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              We work for you since <span className="text-[#D32F2F]">1945</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For nearly 80 years, Bettar has been the trusted name in home services across Kensington, Maryland, and the surrounding communities.
            </p>
          </div>
        </div>
      </section>

      {/* Company History Section */}
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
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Our Story
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
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Quality Workmanship</h3>
              <p className="text-gray-600">
                We stand behind our work with full insurance coverage and a satisfaction guarantee. Every job is completed to the highest standards.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Family-Owned</h3>
              <p className="text-gray-600">
                Experience the personalized, one-on-one service you won't find with larger corporations. We're your neighbors, deeply invested in our community.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Value-Driven</h3>
              <p className="text-gray-600">
                We understand the importance of value. We strive to provide top-tier services and products at prices that fit your budget, without compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#002D72]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience the Bettar Difference?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust Bettar for all their home service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/request-service"
              className="bg-[#D32F2F] text-white px-8 py-4 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold text-lg"
            >
              Get Started Today
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

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Section - Logo */}
          <div className="flex items-center mb-12 justify-center">
            <Image
              src="/bettarlogo.png"
              alt="Bettar Logo"
              width={40}
              height={40}
              className="w-10 h-10 mr-3"
            />
            <span className="text-2xl font-bold text-center">BETTAR SERVICES</span>
          </div>
          
          {/* Bottom Section - Links and Newsletter */}
          <div className="grid md:grid-cols-5 gap-8">
            {/* Reach Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Reach us</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>301-949-2500</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Info@bettarappliance.com</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>10503 Wheatley St, Kensington, MD 20895, United States</span>
                </div>
              </div>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="/about" className="block hover:text-gray-300 transition-colors">About</a>
                <a href="/contact" className="block hover:text-gray-300 transition-colors">Contact</a>
                <a href="/services" className="block hover:text-gray-300 transition-colors">Services</a>
              </div>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-gray-300 transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-gray-300 transition-colors">Terms & Services</a>
                <a href="#" className="block hover:text-gray-300 transition-colors">Terms of Use</a>
                <a href="#" className="block hover:text-gray-300 transition-colors">Refund Policy</a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/" className="block hover:text-gray-300 transition-colors">Home</a>
                <a href="/services" className="block hover:text-gray-300 transition-colors">Services</a>
                <a href="/appliances" className="block hover:text-gray-300 transition-colors">Appliances</a>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-[#D32F2F] p-2 rounded-lg max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-6 text-white text-center">Join Our Newsletter</h3>
              <div className="flex flex-col sm:flex-row gap-1 mb-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-lg text-gray-700 placeholder-gray-500 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-300 text-center">
                * Will send you weekly updates for your better tool management.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Request Service Modal */}
      <RequestServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
