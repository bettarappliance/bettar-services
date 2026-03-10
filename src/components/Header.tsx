"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop (xl = 1280px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const handler = () => setIsMobileMenuOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#002D72] text-white shadow-lg">
      <div className="max-w-7xl mx-auto relative flex items-center justify-between xl:justify-center gap-4 xl:gap-4 2xl:gap-8 px-4 sm:px-6 md:px-6 xl:px-4 2xl:px-8 py-3 sm:py-4 md:py-4 xl:py-3 2xl:py-5 flex-nowrap min-h-[56px] sm:min-h-[64px]">
        {/* Logo + Nav + CTA: on mobile only logo shows; on xl+ centered group, compact so phone+button fit at 1280px */}
        <div className="flex items-center flex-nowrap gap-4 xl:gap-4 2xl:gap-8 min-w-0 flex-1 xl:flex-initial xl:justify-center w-full xl:w-auto xl:max-w-full">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity shrink-0" onClick={closeMobileMenu}>
          <Image
            src="/bettarlogo.png"
            alt="Bettar Logo"
            width={40}
            height={40}
            className="w-10 h-10 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10"
          />
          <span className="text-white font-semibold text-lg sm:text-xl md:text-2xl xl:text-xl 2xl:text-2xl truncate">BETTAR SERVICES</span>
        </Link>
        
        {/* Navigation + CTA in one line - show from xl (1280px), compact so everything fits */}
        <div className="hidden xl:flex items-center flex-nowrap gap-1.5 2xl:gap-2 min-w-0">
        <nav className="flex items-center gap-1.5 2xl:gap-2 flex-nowrap shrink-0 text-sm 2xl:text-base">
          <Link href="/" className="text-white hover:text-gray-300 transition-colors px-2 py-1.5 2xl:px-3 2xl:py-2 rounded">Home</Link>
          <div className="relative group">
            <div className="flex items-center">
              <Link href="/appliances" className="text-white hover:text-gray-300 transition-colors flex items-center px-2 py-1.5 2xl:px-3 2xl:py-2 rounded">
                Appliances
              </Link>
              <svg className="w-4 h-4 ml-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {/* Dropdown Menu - shows on hover and stays open when hovering over menu items */}
            <div className="absolute top-full left-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white rounded-lg shadow-lg py-2">
                <Link href="/appliances/refrigerators" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Refrigerators
                </Link>
                <Link href="/appliances" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Ice Maker
                </Link>
                <Link href="/appliances/dishwasher" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Dishwasher
                </Link>
                <Link href="/appliances" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Garbage Disposer
                </Link>
                <Link href="/appliances" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Trash Compactor
                </Link>
                <Link href="/appliances/range" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Range
                </Link>
                <Link href="/appliances/cooktops" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Cooktops
                </Link>
                <Link href="/appliances/microwave" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Microwave
                </Link>
                <Link href="/appliances/washers" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Washers
                </Link>
                <Link href="/appliances/dryer" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Clothes Dryer
                </Link>
                <Link href="/appliances" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Washer-Dryer
                </Link>
                <Link href="/appliances" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Parts & Accessories
                </Link>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="flex items-center">
              <Link href="/services" className="text-white hover:text-gray-300 transition-colors flex items-center px-2 py-1.5 2xl:px-3 2xl:py-2 rounded">
                Services
              </Link>
              <svg className="w-4 h-4 ml-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {/* Dropdown Menu - shows on hover and stays open when hovering over menu items */}
            <div className="absolute top-full left-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white rounded-lg shadow-lg py-2">
                <Link href="/services/renovations" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Renovations and Remodeling
                </Link>
                <Link href="/services/plumbing" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Plumbing and Heating
                </Link>
                <Link href="/services/handyman" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Handyman Repair and Services
                </Link>
                <Link href="/appliances" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                  Appliances Services
                </Link>
              </div>
            </div>
          </div>
          <Link href="/gallery" className="text-white hover:text-gray-300 transition-colors px-2 py-1.5 2xl:px-3 2xl:py-2 rounded">Gallery</Link>
          <Link href="/partnerships" className="text-white hover:text-gray-300 transition-colors px-2 py-1.5 2xl:px-3 2xl:py-2 rounded">Partnerships</Link>
          <Link href="/about" className="text-white hover:text-gray-300 transition-colors px-2 py-1.5 2xl:px-3 2xl:py-2 rounded whitespace-nowrap">About Us</Link>
          <Link href="/contact" className="text-white hover:text-gray-300 transition-colors px-2 py-1.5 2xl:px-3 2xl:py-2 rounded whitespace-nowrap">Contact Us</Link>
        </nav>

        {/* CTA: number + button - same line as nav, compact at xl so it fits at 1280px */}
        <div className="hidden xl:flex items-center gap-2 2xl:gap-3 flex-nowrap shrink-0 pl-1.5 2xl:pl-4 border-l border-white/30">
          <a href="tel:301-949-2500" className="flex items-center gap-1.5 2xl:gap-2 text-white hover:text-gray-200 transition-colors whitespace-nowrap text-sm 2xl:text-base">
            <svg className="w-4 h-4 2xl:w-5 2xl:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>301-949-2500</span>
          </a>
          <Link 
            href="/request-service"
            className="bg-[#D32F2F] text-white px-4 py-1.5 2xl:px-5 2xl:py-2 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold whitespace-nowrap shrink-0 text-sm 2xl:text-base"
          >
            Request Service
          </Link>
        </div>
        </div>
        </div>

        {/* Mobile Menu Button - show below xl so phone + Request Service aren't cut off at ~1026px */}
        <button
          type="button"
          className="xl:hidden text-white p-2 -m-2 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="xl:hidden px-4 sm:px-6 pb-6 pt-2 border-t border-white/20 bg-[#001a4d]">
          <nav className="flex flex-col gap-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <Link href="/" className="text-white hover:bg-white/10 py-3 px-3 rounded-lg transition-colors" onClick={closeMobileMenu}>Home</Link>
            <Link href="/about" className="text-white hover:bg-white/10 py-3 px-3 rounded-lg transition-colors" onClick={closeMobileMenu}>About Us</Link>
            <Link href="/services" className="text-white hover:bg-white/10 py-3 px-3 rounded-lg transition-colors" onClick={closeMobileMenu}>Services</Link>
            <Link href="/appliances" className="text-white hover:bg-white/10 py-3 px-3 rounded-lg transition-colors" onClick={closeMobileMenu}>Appliances</Link>
            <Link href="/gallery" className="text-white hover:bg-white/10 py-3 px-3 rounded-lg transition-colors" onClick={closeMobileMenu}>Gallery</Link>
            <Link href="/partnerships" className="text-white hover:bg-white/10 py-3 px-3 rounded-lg transition-colors" onClick={closeMobileMenu}>Partnerships</Link>
            <Link href="/contact" className="text-white hover:bg-white/10 py-3 px-3 rounded-lg transition-colors" onClick={closeMobileMenu}>Contact Us</Link>
            <div className="pt-4 mt-2 border-t border-white/20 space-y-3">
              <a href="tel:301-949-2500" className="flex items-center gap-2 py-3 px-3 text-white hover:bg-white/10 rounded-lg transition-colors" onClick={closeMobileMenu}>
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">301-949-2500</span>
              </a>
              <div className="flex items-center gap-2 py-2 px-3 text-white/90 text-sm">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Kensington, MD</span>
              </div>
              <Link 
                href="/request-service"
                className="block w-full text-center bg-[#D32F2F] text-white py-3 px-6 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold"
                onClick={closeMobileMenu}
              >
                Request Service
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
