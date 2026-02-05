"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RequestServiceModal from "../../../components/RequestServiceModal";

export default function EmergencyPlumberGaithersburg() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Emergency Plumber Gaithersburg MD - 24/7 Service Guide",
    "description": "Fast 24/7 emergency plumbing service in Gaithersburg. Expert response for burst pipes, drain clogs, and water heater failures.",
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
      "@id": "https://www.bettarservices.com/insights/gaithersburg-emergency-plumber"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly can you respond to a plumbing emergency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We typically arrive within 1-2 hours of your call. For life-threatening situations like gas leaks, we dispatch immediately."
        }
      },
      {
        "@type": "Question",
        "name": "Do you charge extra for emergency service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide upfront pricing and clearly explain any after-hours fees before starting work. No hidden charges or surprises."
        }
      },
      {
        "@type": "Question",
        "name": "Are your emergency plumbers licensed and insured?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our plumbers are fully licensed, bonded, and insured. We maintain comprehensive coverage for your protection."
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
        "name": "Emergency Plumber Gaithersburg",
        "item": "https://www.bettarservices.com/insights/gaithersburg-emergency-plumber"
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
              <span className="text-gray-900 font-medium">Emergency Plumber Gaithersburg</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-10 pb-5 bg-[#F4F7FF]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              24/7 Emergency Service
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Emergency Plumber <span className="text-[#002D72]">Gaithersburg MD</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Fast, reliable 24/7 emergency plumbing service in Gaithersburg and throughout Montgomery County. Licensed, insured, and ready to help.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:301-949-2500"
                className="bg-[#002D72] hover:bg-[#001F4D] text-white font-bold py-4 px-10 rounded-lg transition-colors text-xl"
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
              Plumbing emergencies don&apos;t wait for convenient times. Whether it&apos;s a burst pipe flooding your basement at 2 AM or a backed-up sewer line on a holiday weekend, Bettar Services is here to help. Since 1945, we&apos;ve been Gaithersburg&apos;s trusted emergency plumber, providing fast, reliable service when you need it most.
            </p>
          </div>

          {/* Featured Image */}
          <div className="mb-16 overflow-hidden h-[400px]">
            <Image
              src="/insights/plumbing.jpg"
              alt="24/7 emergency plumber responding to burst pipes and plumbing emergencies in Gaithersburg, Bethesda, and Rockville Maryland"
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Emergency Situations */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">When to Call an Emergency Plumber</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Call Immediately If You Experience:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">•</span>
                    <span><strong>Burst pipes</strong> causing flooding</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">•</span>
                    <span><strong>Sewage backup</strong> into your home</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">•</span>
                    <span><strong>No water</strong> throughout the house</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">•</span>
                    <span><strong>Gas line leaks</strong> (smell of gas)</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">•</span>
                    <span><strong>Water heater failure</strong> with leaking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">•</span>
                    <span><strong>Frozen pipes</strong> at risk of bursting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">•</span>
                    <span><strong>Major leaks</strong> causing water damage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 font-bold">•</span>
                    <span><strong>Complete drain blockage</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Emergencies */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Common Plumbing Emergencies We Handle</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Burst & Frozen Pipes</h3>
                <p className="text-gray-700 mb-3">
                  Maryland winters can cause pipes to freeze and burst, leading to extensive water damage. We provide emergency pipe repair and thawing services to minimize damage and restore your plumbing quickly.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Response time:</strong> Typically within 1-2 hours
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Sewage & Drain Backups</h3>
                <p className="text-gray-700 mb-3">
                  Sewage backups pose serious health risks and require immediate attention. Our emergency team has the equipment and expertise to clear blockages and sanitize affected areas safely.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Response time:</strong> Priority emergency service
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Water Heater Emergencies</h3>
                <p className="text-gray-700 mb-3">
                  Leaking water heaters can flood your home in minutes. We provide emergency shutoff, repair, or same-day replacement to restore your hot water and prevent property damage.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Response time:</strong> Same-day service available
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Gas Line Leaks</h3>
                <p className="text-gray-700 mb-3">
                  Gas leaks are life-threatening emergencies. If you smell gas, evacuate immediately and call 911, then call us for emergency gas line repair once the area is secure.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Response time:</strong> Immediate emergency dispatch
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Sump Pump Failures</h3>
                <p className="text-gray-700 mb-3">
                  During heavy rain, a failed sump pump can flood your basement. We offer emergency sump pump repair and replacement to protect your home from water damage.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Response time:</strong> Within 2 hours during storms
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Emergency Drain Cleaning</h3>
                <p className="text-gray-700 mb-3">
                  Completely blocked drains can halt your household activities. Our professional drain cleaning removes stubborn clogs quickly using advanced equipment like hydro-jetting.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Response time:</strong> Same-day appointments
                </p>
              </div>
            </div>
          </section>

          {/* What to Do */}
          <section className="mb-16 bg-[#F4F7FF] p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-black mb-6">What to Do During a Plumbing Emergency</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#002D72] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Shut Off the Water</h3>
                  <p className="text-gray-700">
                    Locate your main water shutoff valve (usually in the basement or near the water meter) and turn it clockwise to stop water flow. For individual fixtures, use the local shutoff valves.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#002D72] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Call Bettar Services Immediately</h3>
                  <p className="text-gray-700">
                    Contact us at <a href="tel:301-949-2500" className="text-[#002D72] font-bold">301-949-2500</a> for 24/7 emergency dispatch. Our team will arrive promptly with the tools and expertise to resolve your emergency.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#002D72] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Minimize Water Damage</h3>
                  <p className="text-gray-700">
                    Move valuables away from water, use towels to soak up standing water, and turn off electricity in affected areas if it&apos;s safe to do so.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#002D72] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Document the Damage</h3>
                  <p className="text-gray-700">
                    Take photos for insurance purposes. We can provide detailed documentation of the repairs needed and work completed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">24/7 Emergency Plumbing Service Areas</h2>
            <p className="text-gray-700 mb-6">
              Our emergency plumbers serve Gaithersburg and all surrounding Montgomery County communities:
            </p>
            <div className="grid md:grid-cols-4 gap-4">
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
                  <span>Chevy Chase, MD</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Silver Spring, MD</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Upper NW DC</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2 mt-1">✓</span>
                  <span>Montgomery County</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16 bg-[#002D72] text-white p-10 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6">Why Choose Bettar Services for Emergency Plumbing?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Fast Response Times</h3>
                  <p className="text-white/90">We understand emergencies can&apos;t wait. Our team typically arrives within 1-2 hours of your call.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Available 24/7/365</h3>
                  <p className="text-white/90">Day or night, weekends and holidays - we&apos;re always ready to help with your plumbing emergency.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Licensed & Insured</h3>
                  <p className="text-white/90">All our plumbers are fully licensed, bonded, and insured for your protection and peace of mind.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Fully Stocked Trucks</h3>
                  <p className="text-white/90">Our service vehicles carry extensive inventory, allowing us to complete most repairs on the first visit.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Transparent Pricing</h3>
                  <p className="text-white/90">We provide upfront pricing before starting work - no surprise charges during an emergency.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">80 Years Experience</h3>
                  <p className="text-white/90">Since 1945, we&apos;ve been Gaithersburg&apos;s trusted plumbing experts, handling thousands of emergencies.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Prevention Tips */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Prevent Plumbing Emergencies</h2>
            <p className="text-gray-700 mb-6">
              While we&apos;re always here for emergencies, prevention is the best approach. Here are tips to avoid common plumbing disasters:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Winter Preparation</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Insulate exposed pipes in unheated areas</li>
                  <li>• Keep garage doors closed in freezing weather</li>
                  <li>• Let faucets drip during extreme cold</li>
                  <li>• Maintain heat at minimum 55°F when away</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Regular Maintenance</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Schedule annual water heater inspections</li>
                  <li>• Test sump pump before rainy season</li>
                  <li>• Clean drains regularly to prevent clogs</li>
                  <li>• Check for leaks under sinks monthly</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Know Warning Signs</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Slow drains indicate developing clogs</li>
                  <li>• Water stains suggest hidden leaks</li>
                  <li>• Unusual noises from pipes need attention</li>
                  <li>• Low water pressure may signal issues</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Know Your System</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Locate main water shutoff valve</li>
                  <li>• Tag individual fixture shutoffs</li>
                  <li>• Keep our emergency number posted</li>
                  <li>• Know your water heater age and location</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Emergency Plumbing FAQs</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How quickly can you respond to a plumbing emergency?</h3>
                <p className="text-gray-700">We typically arrive within 1-2 hours of your call. For life-threatening situations like gas leaks, we dispatch immediately.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Do you charge extra for emergency service?</h3>
                <p className="text-gray-700">We provide upfront pricing and clearly explain any after-hours fees before starting work. No hidden charges or surprises.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">What should I do if I have a gas leak?</h3>
                <p className="text-gray-700">Evacuate immediately, call 911 from outside, and don&apos;t use any electrical switches or open flames. Call us once the area is secured for repair.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Are your emergency plumbers licensed and insured?</h3>
                <p className="text-gray-700">Yes, all our plumbers are fully licensed, bonded, and insured. We maintain comprehensive coverage for your protection.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Will you work with my insurance company?</h3>
                <p className="text-gray-700">Absolutely. We provide detailed documentation and photos for insurance claims and can communicate directly with your adjuster.</p>
              </div>
            </div>
          </section>

          {/* Emergency CTA */}
          <section className="bg-[#002D72] text-white p-10 rounded-2xl text-center">
            <h2 className="text-4xl font-bold mb-4">Plumbing Emergency? We&apos;re Here 24/7</h2>
            <p className="text-xl mb-6">
              Don&apos;t let a plumbing emergency cause extensive damage to your Gaithersburg home. Call now for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="tel:301-949-2500"
                className="bg-white text-[#002D72] font-bold py-4 px-10 rounded-lg hover:bg-gray-100 transition-colors text-xl"
              >
                Call 301-949-2500
              </a>
            </div>
            <p className="text-sm text-white/80">
              Family-owned and trusted since 1945 | Licensed & Insured | Serving Montgomery County, MD
            </p>
          </section>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-black mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/insights/water-heater-repair-gaithersburg-md" className="block bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#002D72] mb-2">Water Heater Repair Guide</h3>
                <p className="text-sm text-gray-600">Complete guide to water heater problems and solutions.</p>
              </Link>
              <Link href="/insights/dishwasher-repair-buying-guide" className="block bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#002D72] mb-2">Dishwasher Repair & Buying</h3>
                <p className="text-sm text-gray-600">Everything you need to know about dishwashers.</p>
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
