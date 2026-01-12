"use client";

import Image from "next/image";
import { useState } from "react";
import Script from "next/script";
import RequestServiceModal from "../../../components/RequestServiceModal";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function Plumbing() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you provide plumbing services in Kensington, MD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we are a trusted plumbing company in Kensington, MD. We provide comprehensive plumbing services including water heater service, heating services, emergency repairs, drain cleaning, and pipe installation throughout Kensington and surrounding areas."
        }
      },
      {
        "@type": "Question",
        "name": "What heating services do you offer in Kensington, MD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer complete heating services in Kensington, MD including heating system maintenance, boiler repair, boiler replacement, hydronic heating installation, furnace repair, and emergency heating service. Our licensed technicians ensure your home stays comfortable year-round."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide water heater service in Kensington, MD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide professional water heater service in Kensington, MD including water heater repair, installation, and maintenance. Our experienced plumbers can help with both traditional and tankless water heater systems. Same-day service available."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide water heater repair in Gaithersburg, MD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide water heater repair in Gaithersburg, MD. Our licensed plumbers offer same-day water heater repair service for Gaithersburg residents. We fix all types of water heater issues including no hot water, leaks, strange noises, and temperature problems."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide water heater replacement in Gaithersburg, MD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide water heater replacement in Gaithersburg, MD. Our expert plumbers help you choose the right water heater (tank or tankless) and handle complete installation including removal of your old unit. We serve Gaithersburg, Germantown, Rockville, and throughout Montgomery County, MD."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do your plumbers serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our plumbing and heating services cover Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, Germantown, and throughout Montgomery County. We also serve surrounding communities in the greater DC metropolitan area."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer emergency plumbing repair?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide 24/7 emergency plumbing repair services in Kensington, MD. Whether you have a burst pipe, water heater failure, or heating emergency, our team responds quickly to minimize damage and restore your home's comfort."
        }
      }
    ]
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Script
        id="plumbing-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Plumbing & Heating
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Water Heater Service & <span className="text-[#002D72]">Heating Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional water heater service and heating services serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD. Expert plumbing and heating solutions to keep your home comfortable and your systems running efficiently.
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
                Water Heater Service & Heating Services in Kensington
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                From emergency repairs to complete system installations, our licensed plumbers provide reliable water heater service and heating services throughout Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Emergency Repairs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Water Heater Services</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Drain Cleaning</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Pipe Installation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Heating System Maintenance</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/plumbing.jpeg"
                alt="Plumbing and Heating"
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
              Plumbing & Heating Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted plumbing company serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD with expert water heater service, heating services, and plumbing repairs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Plumbing Company in Kensington, MD
              </h3>
              <p className="text-gray-600 mb-4">
                As a leading plumbing company in Kensington, MD, we provide comprehensive plumbing services including emergency repairs, drain cleaning, pipe installation, and plumbing maintenance. Our licensed plumbers are available 24/7 for urgent plumbing issues.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Plumbing repair Kensington, MD</li>
                <li>• Plumbing services Kensington, MD</li>
                <li>• Emergency plumbing repairs</li>
                <li>• Professional plumber Kensington, MD</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Heating Services in Kensington, MD
              </h3>
              <p className="text-gray-600 mb-4">
                Professional heating services in Kensington, MD including boiler repair, boiler replacement, hydronic heating installation, furnace repair, and heating system maintenance. Keep your home warm and comfortable with our expert heating services.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Boiler repair Kensington, MD</li>
                <li>• Boiler replacement Kensington, MD</li>
                <li>• Hydronic heating installation</li>
                <li>• Emergency heating service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Water Heater Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <Image
                src="/plumbing.jpeg"
                alt="Water Heater Service"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Water Heater Service in Kensington, MD
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Professional water heater service in Kensington, MD. Whether you need water heater repair, installation, or maintenance, our experienced plumbers provide reliable service to keep your hot water flowing.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We service all types of water heaters including traditional tank water heaters and modern tankless systems. Same-day water heater service available for urgent repairs.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Water heater repair and replacement</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Tankless water heater installation</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Water heater maintenance and tune-ups</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Emergency water heater service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gaithersburg Water Heater Services Section */}
          <div className="bg-[#F4F7FF] rounded-2xl p-8 md:p-12 mt-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Water Heater Repair & Replacement in <span className="text-[#002D72]">Gaithersburg, MD</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Need <strong>water heater repair Gaithersburg MD</strong>? Looking for <strong>water heater replacement Gaithersburg MD</strong>? Bettar Services provides expert water heater repair and replacement services in Gaithersburg and throughout Montgomery County, MD.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                  Water Heater Repair Gaithersburg MD
                </h3>
                <p className="text-gray-600 mb-4">
                  Is your water heater not working properly? Our licensed plumbers provide fast and reliable <strong>water heater repair in Gaithersburg, MD</strong>. We diagnose and fix common issues including:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#002D72] mr-2">•</span>
                    <span>No hot water or insufficient hot water</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#002D72] mr-2">•</span>
                    <span>Water heater leaking or dripping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#002D72] mr-2">•</span>
                    <span>Strange noises from water heater</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#002D72] mr-2">•</span>
                    <span>Pilot light won&apos;t stay lit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#002D72] mr-2">•</span>
                    <span>Water temperature issues</span>
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Same-day <strong>water heater repair Gaithersburg MD</strong> service available. Call <strong>301-949-2500</strong> for immediate assistance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                  Water Heater Replacement Gaithersburg MD
                </h3>
                <p className="text-gray-600 mb-4">
                  Is your water heater over 10 years old or beyond repair? We provide professional <strong>water heater replacement in Gaithersburg, MD</strong>. Our expert plumbers help you choose the right water heater and handle the complete installation:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#002D72] mr-2">•</span>
                    <span>Traditional tank water heaters (40-80 gallons)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#002D72] mr-2">•</span>
                    <span>Energy-efficient tankless water heaters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#002D72] mr-2">•</span>
                    <span>High-efficiency condensing water heaters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#002D72] mr-2">•</span>
                    <span>Gas and electric water heater installation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#002D72] mr-2">•</span>
                    <span>Old water heater removal and disposal</span>
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Professional <strong>water heater replacement Gaithersburg MD</strong> service with warranty. Serving Gaithersburg, Germantown, Rockville, and surrounding areas.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700 mb-6">
                <strong>Why Choose Bettar Services for Water Heater Repair & Replacement in Gaithersburg?</strong>
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-[#002D72] mb-2">Licensed & Insured</h4>
                  <p className="text-sm text-gray-600">Fully licensed plumbers with insurance coverage for your protection</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-[#002D72] mb-2">Same-Day Service</h4>
                  <p className="text-sm text-gray-600">Fast response for water heater emergencies in Gaithersburg, MD</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-[#002D72] mb-2">Quality Brands</h4>
                  <p className="text-sm text-gray-600">We install and repair top water heater brands with warranty</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 px-8 py-3 rounded-full bg-[#002D72] text-white font-semibold hover:bg-[#001F5C] transition"
              >
                Schedule Water Heater Service in Gaithersburg
              </button>
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
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Do you provide plumbing services in Kensington, MD?
              </h3>
              <p className="text-gray-600">
                Yes, we are a trusted plumbing company in Kensington, MD. We provide comprehensive plumbing services including water heater service, heating services, emergency repairs, drain cleaning, and pipe installation throughout Kensington and surrounding areas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                What heating services do you offer in Kensington, MD?
              </h3>
              <p className="text-gray-600">
                We offer complete heating services in Kensington, MD including heating system maintenance, boiler repair, boiler replacement, hydronic heating installation, furnace repair, and emergency heating service. Our licensed technicians ensure your home stays comfortable year-round.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Do you provide water heater service in Kensington, MD?
              </h3>
              <p className="text-gray-600">
                Yes, we provide professional water heater service in Kensington, MD including water heater repair, installation, and maintenance. Our experienced plumbers can help with both traditional and tankless water heater systems. Same-day service available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Do you provide water heater repair in Gaithersburg, MD?
              </h3>
              <p className="text-gray-600">
                Yes, we provide <strong>water heater repair in Gaithersburg, MD</strong>. Our licensed plumbers offer same-day water heater repair service for Gaithersburg residents. We fix all types of water heater issues including no hot water, leaks, strange noises, and temperature problems. Call <strong>301-949-2500</strong> for immediate service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Do you provide water heater replacement in Gaithersburg, MD?
              </h3>
              <p className="text-gray-600">
                Yes, we provide <strong>water heater replacement in Gaithersburg, MD</strong>. Our expert plumbers help you choose the right water heater (tank or tankless) and handle complete installation including removal of your old unit. We serve Gaithersburg, Germantown, Rockville, and throughout Montgomery County, MD with professional water heater replacement services.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                What areas do your plumbers serve?
              </h3>
              <p className="text-gray-600">
                Our plumbing and heating services cover Kensington, MD, Bethesda, Chevy Chase, Silver Spring, and throughout Montgomery County. We also serve Northwest Washington DC and surrounding communities in the greater DC metropolitan area.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Do you offer emergency plumbing repair?
              </h3>
              <p className="text-gray-600">
                Yes, we provide 24/7 emergency plumbing repair services in Kensington, MD. Whether you have a burst pipe, water heater failure, or heating emergency, our team responds quickly to minimize damage and restore your home&apos;s comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#002D72]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need Plumbing Service?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Don&apos;t let plumbing problems disrupt your day. Our expert plumbers are ready to help with fast, reliable service.
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
