"use client";

import Image from "next/image";
import { useState } from "react";
import Script from "next/script";
import RequestServiceModal from "../../../components/RequestServiceModal";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function ApplianceServices() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What appliance repair services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide comprehensive appliance repair services for all major brands including refrigerators, washers, dryers, dishwashers, ranges, ovens, cooktops, microwaves, and more. Our experienced technicians can diagnose and repair most appliance issues, from simple fixes to complex repairs."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer same-day appliance repair service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer same-day and next-day appliance repair service for most projects in Kensington, MD, Bethesda, and surrounding areas. For emergency repairs, we can often dispatch a technician within hours. Contact us at 301-949-2500 to schedule your service."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve for appliance repair?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide appliance repair services throughout Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, Germantown, and surrounding communities in Montgomery County and the greater DC metropolitan area."
        }
      },
      {
        "@type": "Question",
        "name": "Do you repair all major appliance brands?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we service all major appliance brands including KitchenAid, Whirlpool, Maytag, GE, Samsung, LG, Bosch, Frigidaire, and more. Our technicians are trained to work on a wide variety of appliances and can source parts for most models."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer appliance installation services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide professional appliance installation services for new appliances including refrigerators, dishwashers, ranges, washers, dryers, and more. We ensure proper installation, connection, and testing to make sure your new appliance works correctly."
        }
      },
      {
        "@type": "Question",
        "name": "How much does appliance repair cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Appliance repair costs vary depending on the type of appliance, the issue, and parts needed. We provide upfront pricing and free estimates for most repairs. Contact us at 301-949-2500 for a detailed quote based on your specific appliance and problem."
        }
      }
    ]
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Script
        id="appliance-services-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Appliance Services
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Appliance Repair & Service | <span className="text-[#002D72]">Bethesda, Chevy Chase, Rockville, Kensington</span> | Same-Day Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional appliance repair, maintenance, and installation services serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD. Same-day service available. Licensed & insured. Call 301-949-2500.
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
                Expert Appliance Repair Services
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                From refrigerators to washers, our experienced technicians provide reliable appliance repair and maintenance services for all major brands. We serve Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, and Germantown, MD.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Refrigerator Repair</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Washer & Dryer Repair</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Dishwasher Repair</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Range & Oven Repair</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Appliance Installation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#002D72] font-bold">Preventive Maintenance</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/appliances.jpg"
                alt="Appliance Repair Services"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Appliance Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive appliance repair, maintenance, and installation services for all your home appliance needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Refrigerator Repair */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Refrigerator Repair
              </h3>
              <p className="text-gray-600 mb-4">
                Expert refrigerator repair for all brands. We fix cooling issues, ice maker problems, water leaks, compressor issues, and more.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Cooling system repair</li>
                <li>• Ice maker service</li>
                <li>• Compressor replacement</li>
                <li>• Door seal replacement</li>
                <li>• Water filter installation</li>
              </ul>
            </div>

            {/* Washer & Dryer Repair */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Washer & Dryer Repair
              </h3>
              <p className="text-gray-600 mb-4">
                Professional washer and dryer repair services. We fix spinning issues, drainage problems, heating elements, and more.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Washer drum repair</li>
                <li>• Dryer heating element</li>
                <li>• Drain pump replacement</li>
                <li>• Belt replacement</li>
                <li>• Control board repair</li>
              </ul>
            </div>

            {/* Dishwasher Repair */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Dishwasher Repair
              </h3>
              <p className="text-gray-600 mb-4">
                Complete dishwasher repair services. We fix cleaning issues, drainage problems, door seals, and more.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Cleaning cycle issues</li>
                <li>• Drain pump repair</li>
                <li>• Door seal replacement</li>
                <li>• Spray arm repair</li>
                <li>• Control panel service</li>
              </ul>
            </div>

            {/* Range & Oven Repair */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Range & Oven Repair
              </h3>
              <p className="text-gray-600 mb-4">
                Expert range and oven repair for gas and electric models. We fix heating issues, igniter problems, and more.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Oven heating element</li>
                <li>• Gas igniter repair</li>
                <li>• Temperature calibration</li>
                <li>• Control knob replacement</li>
                <li>• Burner repair</li>
              </ul>
            </div>

            {/* Microwave Repair */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Microwave Repair
              </h3>
              <p className="text-gray-600 mb-4">
                Professional microwave repair services. We fix heating issues, door problems, control panel malfunctions, and more.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Heating element repair</li>
                <li>• Door switch replacement</li>
                <li>• Control panel service</li>
                <li>• Turntable motor repair</li>
                <li>• Magnetron replacement</li>
              </ul>
            </div>

            {/* Appliance Installation */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Appliance Installation
              </h3>
              <p className="text-gray-600 mb-4">
                Professional installation services for new appliances. We ensure proper connection, setup, and testing.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Refrigerator installation</li>
                <li>• Dishwasher installation</li>
                <li>• Range & oven installation</li>
                <li>• Washer & dryer installation</li>
                <li>• Gas & electrical hookup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location-Specific Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Appliance Repair Services Near You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted appliance repair services in Kensington, MD, Bethesda, and surrounding areas. We&apos;re your local appliance repair experts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Appliance Repair in Kensington MD
              </h3>
              <p className="text-gray-600 mb-4">
                Looking for reliable appliance repair in Kensington, MD? Our skilled technicians provide comprehensive appliance repair and maintenance services throughout Kensington and Kensington Park. From refrigerator repair to washer service, we&apos;re your trusted local appliance repair experts.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Same-day appliance repair in Kensington</li>
                <li>• All major appliance brands serviced</li>
                <li>• Licensed & insured technicians</li>
                <li>• Upfront pricing & free estimates</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-[#002D72] mb-4">
                Bethesda Appliance Repair Services
              </h3>
              <p className="text-gray-600 mb-4">
                Professional appliance repair services in Bethesda, MD. Whether you need refrigerator repair, washer service, or dishwasher maintenance, our experienced team delivers quality workmanship. We also provide commercial appliance repair services for businesses in Bethesda.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Local appliance repair Bethesda</li>
                <li>• Commercial appliance service</li>
                <li>• Emergency appliance repair</li>
                <li>• Preventive maintenance programs</li>
              </ul>
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
                What appliance repair services do you offer?
              </h3>
              <p className="text-gray-600">
                We provide comprehensive appliance repair services for all major brands including refrigerators, washers, dryers, dishwashers, ranges, ovens, cooktops, microwaves, and more. Our experienced technicians can diagnose and repair most appliance issues, from simple fixes to complex repairs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Do you offer same-day appliance repair service?
              </h3>
              <p className="text-gray-600">
                Yes, we offer same-day and next-day appliance repair service for most projects in Kensington, MD, Bethesda, and surrounding areas. For emergency repairs, we can often dispatch a technician within hours. Contact us at 301-949-2500 to schedule your service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                What areas do you serve for appliance repair?
              </h3>
              <p className="text-gray-600">
                We provide appliance repair services throughout Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg, Germantown, and surrounding communities in Montgomery County and the greater DC metropolitan area.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Do you repair all major appliance brands?
              </h3>
              <p className="text-gray-600">
                Yes, we service all major appliance brands including KitchenAid, Whirlpool, Maytag, GE, Samsung, LG, Bosch, Frigidaire, and more. Our technicians are trained to work on a wide variety of appliances and can source parts for most models.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                Do you offer appliance installation services?
              </h3>
              <p className="text-gray-600">
                Yes, we provide professional appliance installation services for new appliances including refrigerators, dishwashers, ranges, washers, dryers, and more. We ensure proper installation, connection, and testing to make sure your new appliance works correctly.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#002D72] mb-3">
                How much does appliance repair cost?
              </h3>
              <p className="text-gray-600">
                Appliance repair costs vary depending on the type of appliance, the issue, and parts needed. We provide upfront pricing and free estimates for most repairs. Contact us at 301-949-2500 for a detailed quote based on your specific appliance and problem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#002D72]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need Appliance Repair Service?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            From emergency repairs to scheduled maintenance, our skilled technicians are ready to help with all your appliance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#D32F2F] text-white px-8 py-4 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold text-lg"
            >
              Schedule Service
            </button>
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


