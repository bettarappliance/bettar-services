"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RequestServiceModal from "../../../components/RequestServiceModal";

export default function DishwasherRepairBuyingGuide() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Dishwasher Repair & Buying Guide - Expert Advice",
    "description": "Complete guide to dishwasher problems, repairs, and buying advice from local appliance technicians.",
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
      "@id": "https://www.bettarservices.com/insights/dishwasher-repair-buying-guide"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Where can I buy a dishwasher near me in Bethesda or Gaithersburg?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bettar Services offers a selection of quality dishwashers with professional installation included. We can also recommend local retailers and provide installation services for dishwashers purchased elsewhere."
        }
      },
      {
        "@type": "Question",
        "name": "How long does dishwasher installation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional installation typically takes 1-2 hours, including removal of the old unit, connecting water and electrical lines, and testing the new dishwasher."
        }
      },
      {
        "@type": "Question",
        "name": "What's the average lifespan of a dishwasher?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most dishwashers last 9-12 years with proper maintenance. Premium brands like Miele can last 20+ years."
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
        "name": "Dishwasher Repair & Buying Guide",
        "item": "https://www.bettarservices.com/insights/dishwasher-repair-buying-guide"
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
              <span className="text-gray-900 font-medium">Dishwasher Repair & Buying Guide</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-10 pb-5 bg-[#F4F7FF]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Appliance Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Dishwasher Repair & <span className="text-[#002D72]">Buying Guide</span>
            </h1>
            <p className="text-lg text-gray-600">
              Everything you need to know about dishwasher problems, repairs, and buying the right model for your Bethesda, Gaithersburg, or Rockville home.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Get Appliance Help
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
              As your local appliance technician serving Bethesda, Gaithersburg, Rockville, and surrounding Maryland areas since 1945, Bettar Services has seen it all when it comes to dishwashers. Whether you&apos;re troubleshooting a problem, deciding between repair or replacement, or shopping for a new model, this comprehensive guide has you covered.
            </p>
          </div>

          {/* Featured Image */}
          <div className="mb-16 overflow-hidden h-[400px]">
            <Image
              src="/insights/dishwasher.jpg"
              alt="Professional dishwasher repair technician servicing appliances in Bethesda, Gaithersburg, and Rockville Maryland"
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dishwasher Not Starting */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Dishwasher Does Not Start? Here's Why</h2>
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                <strong>Before calling for service, check these common issues:</strong>
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">1. Power Supply Issues</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#D32F2F] mr-2">✓</span>
                    <span><strong>Check the circuit breaker:</strong> Reset if tripped</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D32F2F] mr-2">✓</span>
                    <span><strong>Verify outlet power:</strong> Test with another appliance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D32F2F] mr-2">✓</span>
                    <span><strong>Inspect power cord:</strong> Look for visible damage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D32F2F] mr-2">✓</span>
                    <span><strong>Ensure door is latched:</strong> Dishwashers won&apos;t start if the door isn&apos;t fully closed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">2. Door Latch Problems</h3>
                <p className="text-gray-700 mb-3">
                  The door latch must be fully engaged for the dishwasher to start. If the latch is broken, misaligned, or the door switch is faulty, the control board won&apos;t receive the signal to begin the cycle.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>DIY Fix:</strong> Check for obstructions preventing the door from closing completely. If the latch mechanism is damaged, contact a local appliance technician.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">3. Control Panel Malfunction</h3>
                <p className="text-gray-700 mb-3">
                  If buttons are unresponsive or the display is blank, the control panel may need resetting or replacing. Sometimes, a simple power cycle resolves the issue.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Try this:</strong> Turn off the breaker for 5 minutes, then restore power. If this doesn&apos;t help, the control board likely needs professional repair.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">4. Thermal Fuse Blown</h3>
                <p className="text-gray-700 mb-3">
                  The thermal fuse protects your dishwasher from overheating. If it blows, the dishwasher won't start at all. This requires professional diagnosis and replacement.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Professional service needed:</strong> Testing and replacing thermal fuses requires technical expertise and proper tools.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">5. Timer or Motor Issues</h3>
                <p className="text-gray-700 mb-3">
                  A faulty timer or motor can prevent the dishwasher from starting. These are complex components that typically require professional diagnosis and repair.
                </p>
              </div>
            </div>
          </section>

          {/* Common Problems */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Common Dishwasher Problems & Solutions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Poor Cleaning Performance</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Causes:</strong> Clogged spray arms, dirty filter, hard water buildup, or wrong detergent
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Solution:</strong> Clean spray arms and filter monthly. Use rinse aid. Check water temperature (120°F minimum).
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Water Not Draining</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Causes:</strong> Clogged filter, blocked drain hose, or faulty drain pump
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Solution:</strong> Clean the filter and check the drain hose for kinks. If problem persists, the drain pump may need replacement.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Leaking Water</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Causes:</strong> Worn door gasket, loose connections, or cracked tub
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Solution:</strong> Inspect and replace door gasket if worn. Tighten connections. Cracked tubs usually require replacement.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Strange Noises</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Causes:</strong> Foreign objects, worn pump bearings, or loose spray arms
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Solution:</strong> Check for debris. Ensure spray arms spin freely. Loud grinding may indicate pump failure needing repair.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Dishes Not Drying</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Causes:</strong> Faulty heating element, broken vent, or low rinse aid
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Solution:</strong> Refill rinse aid. Check if heating element works. Ensure vent opens properly during drying cycle.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#002D72]">
                <h3 className="text-xl font-bold text-[#002D72] mb-3">Soap Dispenser Not Opening</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Causes:</strong> Blocked by dishes, broken latch, or timer malfunction
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Solution:</strong> Ensure nothing blocks the dispenser door. Clean around the latch. Replace if mechanism is broken.
                </p>
              </div>
            </div>
          </section>

          {/* Repair vs Replace */}
          <section className="mb-16 bg-[#F4F7FF] p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-black mb-6">Should You Repair or Replace Your Dishwasher?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-green-50 border-2 border-green-400 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✓ Repair Makes Sense If:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Dishwasher is less than 7 years old</li>
                  <li>• Repair cost is under $300</li>
                  <li>• It&apos;s a simple fix (pump, heating element)</li>
                  <li>• You&apos;re satisfied with its performance</li>
                  <li>• It&apos;s an energy-efficient model</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">➔ Replace Makes Sense If:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Dishwasher is over 10 years old</li>
                  <li>• Repair cost exceeds 50% of replacement</li>
                  <li>• Multiple components are failing</li>
                  <li>• It&apos;s not Energy Star certified</li>
                  <li>• Cleaning performance has declined</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3">The 50% Rule</h3>
              <p className="text-gray-700">
                If the repair cost is more than 50% of a new dishwasher&apos;s price AND your unit is over 7 years old, replacement is usually the smarter investment. Our local appliance technicians will provide honest advice tailored to your situation.
              </p>
            </div>
          </section>

          {/* Buying Guide */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Dishwasher Buying Guide: What to Look For</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#002D72] mb-4">1. Size & Capacity</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Standard (24&quot;)</h4>
                    <p className="text-sm text-gray-700">Most common size. Fits 12-16 place settings. Perfect for families.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Compact (18&quot;)</h4>
                    <p className="text-sm text-gray-700">Space-saving option. Fits 8-10 place settings. Ideal for small kitchens.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Drawer Style</h4>
                    <p className="text-sm text-gray-700">Single or double drawers. Flexible loading. Great for smaller loads.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#002D72] mb-4">2. Noise Level</h3>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700 mb-4">
                    Noise is measured in decibels (dB). Lower is quieter:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="font-bold text-green-600 mr-3">38-44 dB</span>
                      <span>Very quiet - you&apos;ll barely notice it running</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-bold text-blue-600 mr-3">45-49 dB</span>
                      <span>Quiet - noticeable but not intrusive</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-bold text-yellow-600 mr-3">50-54 dB</span>
                      <span>Moderate - you&apos;ll hear it clearly</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-bold text-red-600 mr-3">55+ dB</span>
                      <span>Loud - may interrupt conversations</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">
                    <strong>Tip:</strong> For open-plan kitchens, invest in a model under 46 dB.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#002D72] mb-4">3. Cleaning Cycles & Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Essential Cycles</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Normal wash</li>
                      <li>• Heavy/pots & pans</li>
                      <li>• Quick wash</li>
                      <li>• Eco/energy-saving</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Nice-to-Have Features</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Sanitize cycle (155°F+)</li>
                      <li>• Third rack for utensils</li>
                      <li>• Adjustable racks</li>
                      <li>• Soil sensor</li>
                      <li>• Delay start</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#002D72] mb-4">4. Energy Efficiency</h3>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700 mb-4">
                    <strong>Look for Energy Star certification.</strong> Energy-efficient dishwashers:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Use 12% less energy than standard models</li>
                    <li>• Use 30% less water (as little as 3 gallons per cycle)</li>
                    <li>• Save approximately $35 per year in utility costs</li>
                    <li>• Better for the environment</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#002D72] mb-4">5. Top Brands to Consider</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Bosch</h4>
                    <p className="text-sm text-gray-700">Extremely quiet, reliable, excellent cleaning. Premium pricing.</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">KitchenAid</h4>
                    <p className="text-sm text-gray-700">Powerful cleaning, great features. Mid to high price range.</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Whirlpool</h4>
                    <p className="text-sm text-gray-700">Reliable, affordable, good features. Best value for money.</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">GE</h4>
                    <p className="text-sm text-gray-700">Solid performance, easy to service. Budget to mid-range.</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Miele</h4>
                    <p className="text-sm text-gray-700">Top-tier quality, 20+ year lifespan. Premium investment.</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Samsung/LG</h4>
                    <p className="text-sm text-gray-700">Modern features, good value. Smart home integration.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Local Service */}
          <section className="mb-16 bg-[#002D72] text-white p-10 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Your Local Appliance Technician Since 1945</h2>
            <p className="text-lg mb-6">
              Bettar Services has been helping homeowners in Bethesda, Gaithersburg, Rockville, and throughout Montgomery County with all their appliance needs for nearly 80 years. From expert repairs to professional installation of new dishwashers, we&apos;re your trusted local appliance technician.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center rounded-lg p-6 border border-white/20">
                <div className="text-4xl font-bold mb-2">Same-Day</div>
                <div className="text-sm text-white/90">Repair Service Available</div>
              </div>
              <div className="text-center rounded-lg p-6 border border-white/30">
                <div className="text-4xl font-bold mb-2">All Brands</div>
                <div className="text-sm text-white/90">We Service Every Major Brand</div>
              </div>
              <div className="text-center rounded-lg p-6 border border-white/25">
                <div className="text-4xl font-bold mb-2">Licensed</div>
                <div className="text-sm text-white/90">Fully Insured Technicians</div>
              </div>
            </div>
            <div className="text-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#d32f2f] text-white hover:bg-[#B71C1C] font-bold py-3 px-8 rounded-lg transition-colors mr-4"
              >
                Schedule Service
              </button>
              <a 
                href="tel:301-949-2500"
                className="bg-white text-[#002D72] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Call 301-949-2500
              </a>
            </div>
          </section>

          {/* Maintenance Tips */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Dishwasher Maintenance Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Monthly Tasks</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Clean the filter thoroughly</li>
                  <li>✓ Wipe down door gasket and edges</li>
                  <li>✓ Check and clean spray arm holes</li>
                  <li>✓ Run cleaning cycle with dishwasher cleaner</li>
                  <li>✓ Refill rinse aid dispenser</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Scrape (don't rinse) dishes before loading</li>
                  <li>✓ Load dishes properly for best cleaning</li>
                  <li>✓ Use the right amount of detergent</li>
                  <li>✓ Run hot water at sink before starting</li>
                  <li>✓ Run dishwasher regularly (prevents seals drying)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Dishwasher FAQs</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Where can I buy a dishwasher near me in Bethesda or Gaithersburg?</h3>
                <p className="text-gray-700">Bettar Services offers a selection of quality dishwashers with professional installation included. We can also recommend local retailers and provide installation services for dishwashers purchased elsewhere.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How long does dishwasher installation take?</h3>
                <p className="text-gray-700">Professional installation typically takes 1-2 hours, including removal of the old unit, connecting water and electrical lines, and testing the new dishwasher.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">What&apos;s the average lifespan of a dishwasher?</h3>
                <p className="text-gray-700">Most dishwashers last 9-12 years with proper maintenance. Premium brands like Miele can last 20+ years.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Do you service all dishwasher brands?</h3>
                <p className="text-gray-700">Yes! Our local appliance technicians are trained on all major brands including Bosch, KitchenAid, Whirlpool, GE, Samsung, LG, Miele, and more.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#002D72] text-white p-10 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Need Dishwasher Help?</h2>
            <p className="text-lg mb-6">
              Whether you need repair, maintenance, or help choosing a new dishwasher, our local appliance technicians are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#d32f2f] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#B71C1C] transition-colors"
              >
                Schedule Service
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
              <Link href="/insights/water-heater-repair-gaithersburg-md" className="block bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#002D72] mb-2">Water Heater Repair Guide</h3>
                <p className="text-sm text-gray-600">Expert water heater repair and maintenance tips.</p>
              </Link>
              <Link href="/insights/gaithersburg-emergency-plumber" className="block bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#002D72] mb-2">24/7 Emergency Plumber</h3>
                <p className="text-sm text-gray-600">Fast plumbing emergency response in Gaithersburg.</p>
              </Link>
              <Link href="/insights" className="block bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#002D72] mb-2">More Home Tips</h3>
                <p className="text-sm text-gray-600">Browse all our maintenance and repair guides.</p>
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
