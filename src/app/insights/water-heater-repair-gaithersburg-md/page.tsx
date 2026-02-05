"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RequestServiceModal from "../../../components/RequestServiceModal";

export default function WaterHeaterRepairGaithersburg() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Water Heater Repair Gaithersburg MD - Expert Service Guide",
    "description": "Expert water heater repair and replacement services in Gaithersburg, MD. Same-day service for tankless and conventional water heaters.",
    "author": {
      "@type": "Organization",
      "name": "Bettar Services",
      "url": "https://www.bettarservices.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bettar Services",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bettarservices.com/logo.png"
      }
    },
    "datePublished": "2026-02-05",
    "dateModified": "2026-02-05",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.bettarservices.com/insights/water-heater-repair-gaithersburg-md"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does a water heater repair take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most repairs can be completed in 1-2 hours. More complex issues may take longer, but we'll provide a time estimate upfront."
        }
      },
      {
        "@type": "Question",
        "name": "What is the average cost of water heater repair in Gaithersburg?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Repair costs vary depending on the issue, but typically range from $200-$600. We provide free estimates before any work begins."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a water heater last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Conventional water heaters last 10-15 years, while tankless units can last 20+ years with proper maintenance."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.bettarservices.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": "https://www.bettarservices.com/insights"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Water Heater Repair Gaithersburg MD",
        "item": "https://www.bettarservices.com/insights/water-heater-repair-gaithersburg-md"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-[#002D72] transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link href="/insights" className="hover:text-[#002D72] transition-colors">
                Insights
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">Water Heater Repair Gaithersburg MD</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-10 pb-5 bg-[#F4F7FF]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Plumbing Services
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Water Heater Repair <span className="text-[#002D72]">Gaithersburg MD</span>
            </h1>
            <p className="text-lg text-gray-600">
              Expert water heater repair and replacement services in Gaithersburg, Rockville, Germantown, and surrounding Maryland areas. Same-day service available.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Schedule Repair Now
              </button>
              <a 
                href="tel:301-949-2500"
                className="bg-[#002D72] hover:bg-[#001a4d] text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Call 301-949-2500
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              When your water heater fails in Gaithersburg, MD, you need fast, reliable service from experienced professionals. At Bettar Services, we&apos;ve been providing expert water heater repair and replacement services since 1945, serving homeowners throughout Gaithersburg, Rockville, Germantown, North Bethesda, and Potomac.
            </p>
          </div>

          {/* Featured Image */}
          <div className="mb-16 overflow-hidden h-[400px]">
            <Image
              src="/insights/water-heater.jpg"
              alt="Licensed technician repairing tankless and conventional water heaters in Gaithersburg, Rockville, and Montgomery County Maryland"
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Common Water Heater Problems */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Common Water Heater Problems in Gaithersburg</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">No Hot Water</h3>
                <p className="text-gray-700">
                  The most common issue. Could be a faulty heating element, thermostat malfunction, or pilot light problems. Our technicians diagnose and fix the root cause quickly.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Water Not Hot Enough</h3>
                <p className="text-gray-700">
                  Insufficient hot water can indicate sediment buildup, undersized tank, or thermostat issues. We&apos;ll assess your needs and recommend solutions.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Leaking Water Heater</h3>
                <p className="text-gray-700">
                  Leaks can cause water damage and higher utility bills. We provide emergency leak repairs and assess whether repair or replacement is needed.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Strange Noises</h3>
                <p className="text-gray-700">
                  Rumbling, popping, or banging sounds often indicate sediment buildup. We perform professional flushing and maintenance to restore quiet operation.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Rusty or Discolored Water</h3>
                <p className="text-gray-700">
                  Brown or rusty water suggests internal corrosion. Our experts determine if your anode rod needs replacement or if it's time for a new unit.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">High Energy Bills</h3>
                <p className="text-gray-700">
                  Inefficient water heaters waste energy and money. We can repair, optimize, or recommend energy-efficient tankless options to reduce costs.
                </p>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="mb-16 bg-[#F4F7FF] p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-black mb-6">Water Heater Service Areas</h2>
            <p className="text-gray-700 mb-4">
              We provide comprehensive water heater repair, replacement, and installation services throughout Montgomery County, Maryland:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Gaithersburg, MD</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Rockville, MD</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Germantown, MD</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>North Bethesda, MD</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Potomac, MD</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Olney, MD</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Kensington, MD</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Bethesda, MD</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Montgomery County</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Tankless vs Conventional */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Tankless vs Conventional Water Heaters</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-2 border-[#002D72] p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-[#002D72] mb-4">Tankless Water Heaters</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Endless hot water on demand</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>20-30% more energy efficient</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Space-saving compact design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>20+ year lifespan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2 mt-1">−</span>
                    <span>Higher upfront cost</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  <strong>Best for:</strong> Families wanting long-term savings and unlimited hot water
                </p>
              </div>
              <div className="border-2 border-gray-300 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Conventional Water Heaters</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Lower initial investment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Simpler installation process</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Easier repairs and parts replacement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2 mt-1">−</span>
                    <span>10-15 year lifespan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2 mt-1">−</span>
                    <span>Limited hot water capacity</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  <strong>Best for:</strong> Budget-conscious homeowners with moderate hot water needs
                </p>
              </div>
            </div>
          </section>

          {/* When to Repair vs Replace */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Should You Repair or Replace Your Water Heater?</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Consider Replacement If:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Your water heater is over 10 years old</li>
                <li>• You&apos;ve had multiple repairs in the past year</li>
                <li>• There&apos;s significant rust or corrosion</li>
                <li>• Your energy bills are consistently high</li>
                <li>• You&apos;re experiencing frequent leaks</li>
                <li>• Your family&apos;s hot water needs have increased</li>
              </ul>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Repair Makes Sense If:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Your unit is less than 7 years old</li>
                <li>• The issue is minor (thermostat, heating element)</li>
                <li>• There&apos;s no sign of major corrosion</li>
                <li>• Repair cost is less than 50% of replacement</li>
                <li>• The tank itself is still in good condition</li>
              </ul>
            </div>
            <p className="mt-6 text-gray-700">
              Our experienced technicians will provide honest recommendations based on your specific situation. We&apos;ll never push for an unnecessary replacement.
            </p>
          </section>

          {/* Emergency Service */}
          <section className="mb-16 bg-[#002D72] text-white p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Emergency Water Heater Repair in Gaithersburg</h2>
            <p className="text-lg mb-6">
              Water heater emergencies don&apos;t wait for business hours. That&apos;s why Bettar Services offers same-day emergency water heater repair throughout Gaithersburg and surrounding areas.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">Same-Day</div>
                <div className="text-sm">Service Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm">Emergency Response</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">80 Years</div>
                <div className="text-sm">Experience Since 1945</div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a
                href="tel:301-949-2500"
                className="inline-block bg-white text-[#002D72] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Call 301-949-2500
              </a>
            </div>
          </section>

          {/* Why Choose Bettar */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Why Choose Bettar Services for Water Heater Repair?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Family-Owned Since 1945</h3>
                  <p className="text-gray-700">Nearly 80 years of trusted service in the Gaithersburg community.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Licensed & Insured</h3>
                  <p className="text-gray-700">Fully licensed plumbers with comprehensive insurance coverage.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Pricing</h3>
                  <p className="text-gray-700">Upfront estimates with no hidden fees or surprise charges.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Workmanship Guaranteed</h3>
                  <p className="text-gray-700">We stand behind our work with comprehensive warranties.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How long does a water heater repair take?</h3>
                <p className="text-gray-700">Most repairs can be completed in 1-2 hours. More complex issues may take longer, but we'll provide a time estimate upfront.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">What is the average cost of water heater repair in Gaithersburg?</h3>
                <p className="text-gray-700">Repair costs vary depending on the issue, but typically range from $200-$600. We provide free estimates before any work begins.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How long does a water heater last?</h3>
                <p className="text-gray-700">Conventional water heaters last 10-15 years, while tankless units can last 20+ years with proper maintenance.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer water heater maintenance services?</h3>
                <p className="text-gray-700">Yes! Regular maintenance extends your water heater's lifespan and prevents costly breakdowns. We recommend annual service.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-[#002D72] text-white p-10 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Need Water Heater Repair in Gaithersburg?</h2>
            <p className="text-lg mb-6">
              Don&apos;t wait for a complete breakdown. Contact Bettar Services today for fast, reliable water heater repair and replacement services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#d32f2f] text-white hover:bg-[#B71C1C] font-bold py-3 px-8 rounded-lg transition-colors mr-4"
              >
                Request Service Online
              </button>
              <a 
                href="tel:301-949-2500"
                className="bg-white text-[#002D72] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Call 301-949-2500
              </a>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-black mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/insights/gaithersburg-emergency-plumber" className="block bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#002D72] mb-2">Emergency Plumber Gaithersburg</h3>
                <p className="text-sm text-gray-600">24/7 emergency plumbing services when you need them most.</p>
              </Link>
              <Link href="/insights/dishwasher-repair-buying-guide" className="block bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#002D72] mb-2">Dishwasher Repair Guide</h3>
                <p className="text-sm text-gray-600">Common dishwasher problems and when to call a pro.</p>
              </Link>
              <Link href="/insights" className="block bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#002D72] mb-2">More Tips & Insights</h3>
                <p className="text-sm text-gray-600">Browse all our home maintenance guides.</p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      <Footer />

      {/* Request Service Modal */}
      <RequestServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
