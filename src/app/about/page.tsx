"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import RequestServiceModal from "../../components/RequestServiceModal";
import GoogleReviews from "../../components/GoogleReviews";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const historyImages = [
    "/history/image.jpg",
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
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              About Us
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              We have worked for you since <span className="text-[#D32F2F]">1945</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For nearly 81 years, Bettar has been the trusted name in home services across Kensington, Maryland, and the surrounding communities.
            </p>
            {/* Trust credentials strip */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-8 text-sm font-semibold text-[#002D72]">
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Licensed
              </span>
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Bonded
              </span>
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Insured
              </span>
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Family-owned since 1945
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* By the numbers */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#002D72] mb-1">81+</p>
              <p className="text-gray-600 font-medium">Years in business</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#002D72] mb-1">1</p>
              <p className="text-gray-600 font-medium">Family. One standard.</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#002D72] mb-1">DMV</p>
              <p className="text-gray-600 font-medium">Communities we serve</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#002D72] mb-1">100%</p>
              <p className="text-gray-600 font-medium">Committed to your satisfaction</p>
            </div>
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
                Experience the personalized, one-on-one service you won&apos;t find with larger corporations. We&apos;re your neighbors, deeply invested in our community.
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

      {/* Meet the team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Meet the <span className="text-[#002D72]">team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real people, real expertise. Our team is here to help with repairs, appliances, and home services you can count on.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src="/IMG_0274.png"
                  alt="Bettar team in the office with Whirlpool and KitchenAid branding"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 bg-[#F4F7FF] text-center">
                <p className="text-sm font-medium text-gray-700">Our team at the office</p>
                <p className="text-xs text-gray-500 mt-1">Proud to work with top appliance brands</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src="/IMG_1380.png"
                  alt="Bettar team members with Whirlpool and KitchenAid"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 bg-[#F4F7FF] text-center">
                <p className="text-sm font-medium text-gray-700">The Bettar crew</p>
                <p className="text-xs text-gray-500 mt-1">Ready to serve our community</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src="/IMG_0276.png"
                  alt="Bettar team member with GE Appliances inventory"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 bg-[#F4F7FF] text-center">
                <p className="text-sm font-medium text-gray-700">Expertise in every brand</p>
                <p className="text-xs text-gray-500 mt-1">Repair, replacement &amp; installation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What customers say - Google Reviews */}
      <GoogleReviews />

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

      <Footer />

      {/* Request Service Modal */}
      <RequestServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
