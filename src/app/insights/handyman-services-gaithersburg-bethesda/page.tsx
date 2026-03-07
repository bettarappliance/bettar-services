"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RequestServiceModal from "../../../components/RequestServiceModal";

export default function HandymanServicesArticle() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Schema markup for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Professional Handyman Services in Gaithersburg & Bethesda",
    "description": "Expert handyman services in Gaithersburg, Bethesda, and surrounding areas. Skilled repairs, installations, and home improvements.",
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
    "datePublished": "2026-03-07",
    "dateModified": "2026-03-07",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.bettarservices.com/insights/handyman-services-gaithersburg-bethesda"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What handyman services do you offer in Gaithersburg?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer comprehensive handyman services including fixture installations, furniture assembly, drywall repair, painting, carpentry, door and window repairs, deck maintenance, and general home repairs throughout Gaithersburg and surrounding areas."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide same-day handyman services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer same-day handyman services for urgent repairs in Gaithersburg, Bethesda, Rockville, and surrounding Montgomery County areas, subject to availability."
        }
      },
      {
        "@type": "Question",
        "name": "Are your handymen licensed and insured?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. All our handymen are fully licensed, insured, and experienced professionals who follow industry best practices and local building codes."
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
        "name": "Handyman Services Gaithersburg & Bethesda",
        "item": "https://www.bettarservices.com/insights/handyman-services-gaithersburg-bethesda"
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
              <span className="text-gray-900 font-medium">Handyman Services Gaithersburg & Bethesda</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-10 pb-5 bg-[#F4F7FF]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              HOME IMPROVEMENT
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Professional Handyman Services in{' '}
              <span className="text-[#002D72]">Gaithersburg & Bethesda</span>
            </h1>
            <p className="text-lg text-gray-600">
              Expert home repair and improvement services for Gaithersburg, Bethesda, Rockville, Silver Spring, and all Montgomery County. Skilled craftsmen ready to handle your projects, big or small.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#002D72] hover:bg-[#001f4d] text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Schedule Service
              </button>
              <Link
                href="/contact"
                className="border-2 border-[#002D72] text-[#002D72] font-bold py-3 px-8 rounded-lg hover:bg-[#002D72] hover:text-white transition-colors"
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Featured Image */}
        <div className="mb-16 overflow-hidden h-[400px]">
          <Image
            src="/insights/handyman.jpg"
            alt="Professional handyman services in Gaithersburg and Bethesda"
            width={500}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Introduction */}
        <section className="mb-16">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Finding a reliable, skilled handyman in the Gaithersburg and Bethesda area can be challenging. Whether you need a quick repair, a home improvement project, or regular maintenance services, Bettar Services provides professional handyman solutions throughout Montgomery County, Maryland.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our experienced team handles everything from minor fixes to major renovations, delivering quality workmanship that exceeds expectations. With same-day availability and transparent pricing, we make home repairs stress-free.
          </p>
        </section>

        {/* Comprehensive Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Comprehensive Handyman Services
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#002D72]">Interior Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Drywall repair and patching</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Interior painting and touch-ups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Door and window repairs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Fixture installation (lights, fans, shelves)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Furniture assembly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Tile and grout repair</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#002D72]">Exterior Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Deck and fence repair</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Gutter cleaning and maintenance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Exterior painting and staining</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Power washing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Mailbox installation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Outdoor lighting installation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-[#002D72]">Specialized Services</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Carpentry and woodworking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Cabinet repairs and adjustments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Smart home device installation</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Bathroom fixture upgrades</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Kitchen backsplash installation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#002D72] mr-2">✓</span>
                  <span className="text-gray-700">Weatherproofing and caulking</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Why Choose Bettar Services for Your Handyman Needs?
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-[#002D72] pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Skilled & Experienced Professionals</h3>
              <p className="text-gray-700">
                Our handymen bring years of experience across multiple trades. From carpentry to electrical work, we have the expertise to handle diverse projects with precision and care.
              </p>
            </div>

            <div className="border-l-4 border-[#002D72] pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Same-Day Service Available</h3>
              <p className="text-gray-700">
                Need urgent repairs? We offer same-day handyman services throughout Gaithersburg, Bethesda, Rockville, and surrounding Montgomery County areas. Call us before noon for same-day availability.
              </p>
            </div>

            <div className="border-l-4 border-[#002D72] pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Transparent, Upfront Pricing</h3>
              <p className="text-gray-700">
                No hidden fees or surprise charges. We provide detailed estimates before starting any work, so you know exactly what to expect.
              </p>
            </div>

            <div className="border-l-4 border-[#002D72] pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Licensed & Insured</h3>
              <p className="text-gray-700">
                Your peace of mind matters. All our handymen are fully licensed and insured, and we follow all local building codes and safety regulations.
              </p>
            </div>

            <div className="border-l-4 border-[#002D72] pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Workmanship Guaranteed</h3>
              <p className="text-gray-700">
                We stand behind our work with a satisfaction guarantee. If you&apos;re not completely satisfied, we&apos;ll make it right.
              </p>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Serving Montgomery County & Surrounding Areas
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Bettar Services proudly serves residential and commercial clients throughout Montgomery County, Maryland:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F4F7FF] p-4 rounded-lg">
              <h3 className="font-semibold text-[#002D72] mb-2">Primary Areas</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Gaithersburg</li>
                <li>• Bethesda</li>
                <li>• Rockville</li>
                <li>• North Bethesda</li>
              </ul>
            </div>
            <div className="bg-[#F4F7FF] p-4 rounded-lg">
              <h3 className="font-semibold text-[#002D72] mb-2">Extended Areas</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Silver Spring</li>
                <li>• Germantown</li>
                <li>• Potomac</li>
                <li>• Chevy Chase</li>
              </ul>
            </div>
            <div className="bg-[#F4F7FF] p-4 rounded-lg">
              <h3 className="font-semibold text-[#002D72] mb-2">Also Serving</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Kensington</li>
                <li>• Wheaton</li>
                <li>• Olney</li>
                <li>• Derwood</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Projects */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Popular Handyman Projects in Gaithersburg & Bethesda
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#002D72]">1. Smart Home Installations</h3>
              <p className="text-gray-700">
                From smart thermostats to Ring doorbells and security cameras, we help homeowners modernize their properties with the latest technology. Professional installation ensures proper setup and functionality.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#002D72]">2. Deck & Patio Repairs</h3>
              <p className="text-gray-700">
                With Maryland&apos;s varying weather conditions, decks require regular maintenance. We handle board replacement, railing repairs, staining, and complete deck restoration to keep your outdoor space safe and beautiful.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#002D72]">3. Kitchen & Bathroom Updates</h3>
              <p className="text-gray-700">
                Minor updates can dramatically improve these high-use spaces. We install new faucets, cabinet hardware, backsplashes, towel bars, and lighting fixtures to refresh your home&apos;s appearance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#002D72]">4. Drywall Repair & Painting</h3>
              <p className="text-gray-700">
                Holes, cracks, and water damage are no problem. Our handymen expertly patch and repair drywall, then paint to match existing walls for seamless results.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#002D72]">5. Furniture Assembly</h3>
              <p className="text-gray-700">
                Skip the frustration of DIY furniture assembly. We quickly and correctly assemble items from IKEA, Wayfair, and other retailers, ensuring stability and proper construction.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Services */}
        <section className="mb-16">
          <div className="bg-[#002D72] text-white p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Emergency Handyman Services</h2>
            <p className="text-lg mb-6 opacity-90">
              Some repairs can&apos;t wait. We provide emergency handyman services for urgent situations like broken doors, window damage, water intrusion, and safety hazards. Available 7 days a week.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-white text-[#002D72] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Request Emergency Service
              </Link>
              <a
                href="tel:+1234567890"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#002D72] transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Our Simple 4-Step Process
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#002D72] mb-3">01</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Contact Us</h3>
              <p className="text-gray-700">
                Call, email, or use our online form to describe your project. We&apos;ll schedule a convenient time for service.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#002D72] mb-3">02</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Get an Estimate</h3>
              <p className="text-gray-700">
                We provide a detailed, upfront estimate with no hidden fees. You&apos;ll know the cost before any work begins.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#002D72] mb-3">03</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Work</h3>
              <p className="text-gray-700">
                Our skilled handymen complete your project efficiently with attention to detail and respect for your property.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#002D72] mb-3">04</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Final Walkthrough</h3>
              <p className="text-gray-700">
                We review the completed work with you to ensure your complete satisfaction before we leave.
              </p>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Handyman Tips for Homeowners
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#002D72]">Know When to Call a Professional</h3>
              <p className="text-gray-700">
                While DIY projects can be rewarding, some jobs require professional expertise. Electrical work, structural repairs, and gas line work should always be handled by licensed professionals to ensure safety and code compliance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#002D72]">Regular Maintenance Saves Money</h3>
              <p className="text-gray-700">
                Small repairs handled promptly prevent bigger, more expensive problems. Annual maintenance checks can identify issues before they become emergencies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#002D72]">Keep a Home Repair List</h3>
              <p className="text-gray-700">
                Document minor issues as they arise. When you schedule a handyman visit, you can tackle multiple small projects in one appointment, saving time and money.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#002D72]">Quality Materials Matter</h3>
              <p className="text-gray-700">
                Using quality materials extends the life of repairs and installations. We recommend trusted brands that offer durability and value.
              </p>
            </div>
          </div>
        </section>

        {/* Local Service Section */}
        <section className="mb-16">
          <div className="bg-[#002D72] text-white p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Your Local Gaithersburg & Bethesda Handyman Experts
            </h2>
            <p className="text-lg text-center mb-8 opacity-90">
              Trusted by homeowners throughout Montgomery County for reliable, professional service
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">Same-Day</div>
                <div className="text-lg opacity-90">Service Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Licensed</div>
                <div className="text-lg opacity-90">& Insured</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-lg opacity-90">Satisfaction Guaranteed</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 bg-[#F4F7FF] p-8 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Ready to Get Your Project Done?
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            From minor repairs to major improvements, Bettar Services is your trusted partner for all handyman needs in Gaithersburg, Bethesda, and throughout Montgomery County.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/request-service"
              className="bg-[#002D72] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#001f4d] transition-colors"
            >
              Request Service Online
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#002D72] text-[#002D72] px-8 py-3 rounded-lg font-semibold hover:bg-[#002D72] hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">

            <Link
              href="/insights/water-heater-repair-gaithersburg-md"
              className="group"
            >
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 h-48">
                <Image
                  src="/insights/water-heater.jpg"
                  alt="Water Heater Repair"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#002D72] transition-colors">
                Water Heater Repair in Gaithersburg
              </h3>
            </Link>

            <Link
              href="/insights/dishwasher-repair-buying-guide"
              className="group"
            >
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 h-48">
                <Image
                  src="/insights/dishwasher.jpg"
                  alt="Dishwasher Repair Guide"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#002D72] transition-colors">
                Dishwasher Repair & Buying Guide
              </h3>
            </Link>
          </div>
        </section>
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
