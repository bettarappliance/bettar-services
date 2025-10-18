"use client";

import Image from "next/image";
import { useState } from "react";
import RequestServiceModal from "../../components/RequestServiceModal";

export default function Services() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
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
              Our Services
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Services That Fit <span className="text-[#002D72]">Your Needs</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From appliance repair to complete home renovations, we provide comprehensive solutions for all your home service needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Renovations and Remodeling */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="h-48 relative">
                <Image
                  src="/renovations.jpg"
                  alt="Renovations and Remodeling"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[rgba(0,45,114,0.3)]"></div>
                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Renovations and Remodeling</h3>
                <p className="text-gray-600 mb-4">
                  Transform your space with our expert renovation and remodeling services. From kitchen makeovers to complete home transformations.
                </p>
                <a href="/services/renovations" className="text-[#002D72] font-bold hover:underline inline-block">Learn More →</a>
              </div>
            </div>

            {/* Plumbing and Heating */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="h-48 relative">
                <Image
                  src="/plumbing.jpeg"
                  alt="Plumbing and Heating"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[rgba(0,45,114,0.3)]"></div>
                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path fill="#ffffff" d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Plumbing and Heating</h3>
                <p className="text-gray-600 mb-4">
                  Professional plumbing and heating services to keep your home comfortable and your systems running efficiently.
                </p>
                <a href="/services/plumbing" className="text-[#002D72] font-bold hover:underline inline-block">Learn More →</a>
              </div>
            </div>

            {/* Handyman Services */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="h-48 relative">
                <Image
                  src="/handyman.jpg"
                  alt="Handyman Repair and Services"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[rgba(0,45,114,0.3)]"></div>
                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path fill="#ffffff" d="M102.8 57.3C108.2 51.9 116.6 51.1 123 55.3L241.9 134.5C250.8 140.4 256.1 150.4 256.1 161.1L256.1 210.7L346.9 301.5C380.2 286.5 420.8 292.6 448.1 320L574.2 446.1C592.9 464.8 592.9 495.2 574.2 514L514.1 574.1C495.4 592.8 465 592.8 446.2 574.1L320.1 448C292.7 420.6 286.6 380.1 301.6 346.8L210.8 256L161.2 256C150.5 256 140.5 250.7 134.6 241.8L55.4 122.9C51.2 116.6 52 108.1 57.4 102.7L102.8 57.3zM247.8 360.8C241.5 397.7 250.1 436.7 274 468L179.1 563C151 591.1 105.4 591.1 77.3 563C49.2 534.9 49.2 489.3 77.3 461.2L212.7 325.7L247.9 360.8zM416.1 64C436.2 64 455.5 67.7 473.2 74.5C483.2 78.3 485 91 477.5 98.6L420.8 155.3C417.8 158.3 416.1 162.4 416.1 166.6L416.1 208C416.1 216.8 423.3 224 432.1 224L473.5 224C477.7 224 481.8 222.3 484.8 219.3L541.5 162.6C549.1 155.1 561.8 156.9 565.6 166.9C572.4 184.6 576.1 203.9 576.1 224C576.1 267.2 558.9 306.3 531.1 335.1L482 286C448.9 253 403.5 240.3 360.9 247.6L304.1 190.8L304.1 161.1L303.9 156.1C303.1 143.7 299.5 131.8 293.4 121.2C322.8 86.2 366.8 64 416.1 63.9z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Handyman Repair and Services</h3>
                <p className="text-gray-600 mb-4">
                  Complete handyman services for all your home repair and maintenance needs. No job too big or too small.
                </p>
                <a href="/services/handyman" className="text-[#002D72] font-bold hover:underline inline-block">Learn More →</a>
              </div>
            </div>

            {/* Appliances Services */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="h-48 relative">
                <Image
                  src="/appliances.jpg"
                  alt="Appliances Services"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[rgba(0,45,114,0.3)]"></div>
                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Appliances Services</h3>
                <p className="text-gray-600 mb-4">
                  Expert appliance repair, sales, and maintenance services. We service all major brands and offer same-day service.
                </p>
                <a href="/appliances" className="text-[#002D72] font-bold hover:underline inline-block">Learn More →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Why Choose <span className="text-[#002D72]">Bettar</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four specialized divisions, one trusted name serving the community since 1945.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">80 Years Experience</h3>
              <p className="text-gray-600">
                Nearly eight decades of trusted service in the Kensington community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Family-Owned</h3>
              <p className="text-gray-600">
                Personalized service you won't find with larger corporations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Fully insured services with a satisfaction guarantee on all work.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#002D72] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Value-Driven</h3>
              <p className="text-gray-600">
                Top-tier services at prices that fit your budget without compromising quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#002D72]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Contact us today for a free consultation and let us help you with all your home service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/request-service"
              className="bg-[#D32F2F] text-white px-8 py-4 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold text-lg"
            >
              Request Service
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
