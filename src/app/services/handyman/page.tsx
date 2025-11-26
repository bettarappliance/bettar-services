"use client";

import Image from "next/image";
import { useState } from "react";
import Script from "next/script";
import RequestServiceModal from "../../../components/RequestServiceModal";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function Handyman() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What handyman services do you offer in Kensington MD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer comprehensive handyman services in Kensington, MD including general repairs, furniture assembly, painting, door and window repairs, electrical work, and home maintenance. Our experienced handymen handle both small repairs and major home improvement projects."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide handyman services in Bethesda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide professional handyman services throughout Bethesda, MD. Whether you need a local handyman for residential repairs or commercial handyman services for your business, our team is ready to help. We also serve Chevy Chase, Kensington, and Northwest DC."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can you provide handyman service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer same-day and next-day handyman service for most projects in Kensington, MD and Bethesda. For emergency repairs, we can often dispatch a handyman within hours. Contact us at 301-949-2500 to schedule your service."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide handyman services throughout Kensington, MD, Bethesda, Chevy Chase, Silver Spring, and Northwest Washington DC. Our service area extends to surrounding communities in Montgomery County and the greater DC metropolitan area."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer commercial handyman services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide commercial handyman services for businesses in Bethesda, Kensington, and throughout the DC area. Our commercial services include office maintenance, retail space improvements, and commercial property repairs with minimal business disruption."
        }
      }
    ]
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Script
        id="handyman-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Handyman Services
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Handyman Services in <span className="text-[#002D72]">Kensington MD</span> & <span className="text-[#002D72]">Bethesda</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert handyman services in Kensington, MD and Bethesda. From small repairs to major projects, our skilled handymen handle all your home maintenance and improvement needs.
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
                Local Handyman Services in Bethesda & Kensington
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                No job too big or too small. Our experienced handymen provide reliable service for all your home repair and maintenance needs throughout Kensington, MD, Bethesda, Chevy Chase, and Northwest DC.
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

      {/* Location-Specific Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Handyman Services Near You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted handyman services in Kensington, MD, Bethesda, and surrounding areas. We&apos;re your local handyman experts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Handyman Services in Kensington MD
              </h3>
              <p className="text-gray-600 mb-4">
                Looking for a reliable handyman in Kensington, MD? Our skilled team provides comprehensive home repair and maintenance services throughout Kensington and Kensington Park. From appliance repair to home improvements, we&apos;re your trusted local handyman.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Home repair services in Kensington</li>
                <li>• Appliance repair Kensington MD</li>
                <li>• Home maintenance and repair services</li>
                <li>• Same-day handyman service available</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Bethesda Handyman Services
              </h3>
              <p className="text-gray-600 mb-4">
                Professional handyman services in Bethesda, MD. Whether you need a local handyman for small repairs or major home improvement projects, our experienced team delivers quality workmanship. We also provide commercial handyman services for businesses in Bethesda.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Local handyman Bethesda</li>
                <li>• Commercial handyman Bethesda</li>
                <li>• Handyman services Bethesda MD</li>
                <li>• Home repair technician services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Handyman Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/handyman.jpg"
                alt="Commercial Handyman Services"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Commercial Handyman Services in Bethesda
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Need commercial handyman services in Bethesda? Our team provides professional maintenance and repair services for businesses, offices, and commercial properties throughout Bethesda, Kensington, and the greater Washington DC area.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                From office repairs to retail space maintenance, we handle all your commercial handyman needs with minimal disruption to your business operations.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Office maintenance and repairs</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Retail space improvements</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Commercial property maintenance</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Emergency commercial repairs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                What handyman services do you offer in Kensington MD?
              </h3>
              <p className="text-gray-600">
                We offer comprehensive handyman services in Kensington, MD including general repairs, furniture assembly, painting, door and window repairs, electrical work, and home maintenance. Our experienced handymen handle both small repairs and major home improvement projects.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Do you provide handyman services in Bethesda?
              </h3>
              <p className="text-gray-600">
                Yes, we provide professional handyman services throughout Bethesda, MD. Whether you need a local handyman for residential repairs or commercial handyman services for your business, our team is ready to help. We also serve Chevy Chase, Kensington, and Northwest DC.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                How quickly can you provide handyman service?
              </h3>
              <p className="text-gray-600">
                We offer same-day and next-day handyman service for most projects in Kensington, MD and Bethesda. For emergency repairs, we can often dispatch a handyman within hours. Contact us at 301-949-2500 to schedule your service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                What areas do you serve?
              </h3>
              <p className="text-gray-600">
                We provide handyman services throughout Kensington, MD, Bethesda, Chevy Chase, Silver Spring, and Northwest Washington DC. Our service area extends to surrounding communities in Montgomery County and the greater DC metropolitan area.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Do you offer commercial handyman services?
              </h3>
              <p className="text-gray-600">
                Yes, we provide commercial handyman services for businesses in Bethesda, Kensington, and throughout the DC area. Our commercial services include office maintenance, retail space improvements, and commercial property repairs with minimal business disruption.
              </p>
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

      <Footer />

      {/* Request Service Modal */}
      <RequestServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
