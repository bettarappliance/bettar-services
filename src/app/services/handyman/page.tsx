"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RequestServiceModal from "../../../components/RequestServiceModal";

export default function Handyman() {
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
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
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
              Handyman Services
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Complete <span className="text-[#002D72]">Handyman</span> Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From small repairs to major projects, our skilled handymen handle all your home maintenance and improvement needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Handyman Services
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                No job too big or too small. Our experienced handymen provide reliable service for all your home repair and maintenance needs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">General Repairs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Furniture Assembly</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Painting & Touch-ups</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Door & Window Repairs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Electrical Work</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/handyman.jpg"
                alt="Handyman Repair and Services"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#002D72]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need Handyman Service?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            From small fixes to major projects, our skilled handymen are ready to help with all your home repair needs.
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
                <Link href="/" className="block hover:text-gray-300 transition-colors">Home</Link>
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
