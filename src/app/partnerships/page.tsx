"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Partnerships() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/partner.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/60 z-10" aria-hidden />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
          <div className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            Bettar Partner Network
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight drop-shadow-sm">
            Reliable appliance support for{" "}
            <span className="text-[#93C5FD]">property managers &amp; local partners</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/95 leading-relaxed max-w-2xl mx-auto drop-shadow-sm mb-8">
            Repair, replace, install, and support — handled by one local team you can call by name. Built for portfolios, hosts, and partners across Montgomery County and Upper Northwest DC.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#D32F2F] text-white font-semibold hover:bg-[#B71C1C] transition-colors shadow-md"
            >
              Become a partner
            </Link>
            <a
              href="tel:301-949-2500"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 text-white font-semibold border border-white/40 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              301-949-2500
            </a>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Family-owned since 1945 · Serving Montgomery County, MD &amp; Upper NW DC
          </p>
        </div>
      </section>

      {/* Who we partner with */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
              Who we partner with
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Built around the partners we already serve
            </h2>
            <p className="text-gray-600">
              Different priorities, same standard of care. We support the operators, owners, and businesses keeping homes and properties running across the DMV.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {/* Property Managers */}
            <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#002D72]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-1 bg-[#002D72]" />
              <div className="p-6 md:p-7">
                <div className="w-14 h-14 rounded-full bg-[#E6EDFF] flex items-center justify-center mb-5 group-hover:bg-[#002D72] transition-colors duration-300">
                  <svg className="w-7 h-7 text-[#002D72] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Property managers</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  One vendor for appliance repair, replacement, and unit-turn support. Faster lease-up windows and fewer back-and-forth tickets.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-[#002D72] uppercase tracking-wide mb-3">Common requests</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Vacant-unit appliance refresh</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Tenant-reported repair tickets</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Move-in / move-out installs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Landlords */}
            <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#002D72]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-1 bg-[#002D72]" />
              <div className="p-6 md:p-7">
                <div className="w-14 h-14 rounded-full bg-[#E6EDFF] flex items-center justify-center mb-5 group-hover:bg-[#002D72] transition-colors duration-300">
                  <svg className="w-7 h-7 text-[#002D72] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Landlords</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Honest repair-or-replace guidance, predictable pricing, and tenant-friendly scheduling so issues get resolved the first time.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-[#002D72] uppercase tracking-wide mb-3">Common requests</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Same-day repair triage</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Replace-vs-fix consultation</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Coordinated tenant scheduling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Realtors */}
            <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#002D72]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-1 bg-[#002D72]" />
              <div className="p-6 md:p-7">
                <div className="w-14 h-14 rounded-full bg-[#E6EDFF] flex items-center justify-center mb-5 group-hover:bg-[#002D72] transition-colors duration-300">
                  <svg className="w-7 h-7 text-[#002D72] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Realtors</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  A trusted local vendor to refer clients to — for inspection-period repairs, pre-listing fixes, and post-close appliance issues.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-[#002D72] uppercase tracking-wide mb-3">Common requests</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Inspection-period repair quotes</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Pre-listing appliance fixes</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Buyer post-close support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Condo Associations */}
            <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#002D72]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-1 bg-[#002D72]" />
              <div className="p-6 md:p-7">
                <div className="w-14 h-14 rounded-full bg-[#E6EDFF] flex items-center justify-center mb-5 group-hover:bg-[#002D72] transition-colors duration-300">
                  <svg className="w-7 h-7 text-[#002D72] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21V7a2 2 0 012-2h6a2 2 0 012 2v14M4 21V11a2 2 0 012-2h2a2 2 0 012 2v10M3 21h18M9 9h.01M9 13h.01M9 17h.01M16 9h.01M16 13h.01M16 17h.01" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Condo associations</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Approved-vendor support for unit-owner appliance work, common-area maintenance, and emergency response across multi-unit buildings.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-[#002D72] uppercase tracking-wide mb-3">Common requests</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Approved-vendor onboarding</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Common-area maintenance</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Emergency leak / no-heat response</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Local Businesses */}
            <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#002D72]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-1 bg-[#002D72]" />
              <div className="p-6 md:p-7">
                <div className="w-14 h-14 rounded-full bg-[#E6EDFF] flex items-center justify-center mb-5 group-hover:bg-[#002D72] transition-colors duration-300">
                  <svg className="w-7 h-7 text-[#002D72] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Local businesses</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Light-commercial appliance and plumbing work for cafés, salons, offices, and small retailers across Montgomery County.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-[#002D72] uppercase tracking-wide mb-3">Common requests</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Commercial dishwasher service</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Office break-room appliances</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Plumbing &amp; heating maintenance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Short-term rental hosts */}
            <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#002D72]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-1 bg-[#002D72]" />
              <div className="p-6 md:p-7">
                <div className="w-14 h-14 rounded-full bg-[#E6EDFF] flex items-center justify-center mb-5 group-hover:bg-[#002D72] transition-colors duration-300">
                  <svg className="w-7 h-7 text-[#002D72] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12V7a2 2 0 012-2h14a2 2 0 012 2v5M3 12v6a1 1 0 001 1h16a1 1 0 001-1v-6M3 12h18M7 12V9a2 2 0 012-2h6a2 2 0 012 2v3" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Short-term rental hosts</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Quick turnarounds between guests so a broken fridge or dryer doesn&apos;t tank your calendar or your reviews.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-[#002D72] uppercase tracking-wide mb-3">Common requests</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Same-day appliance repairs</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Between-stay turnover support</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span>Quick replacement installs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why partner with us */}
      <section className="py-16 md:py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <div className="inline-block bg-white text-[#002D72] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4 border border-[#002D72]/15">
              Why partner with us
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              The <span className="text-[#002D72]">Bettar</span> difference
            </h2>
            <p className="text-gray-600">
              Built for portfolio operations — not one-off service calls. Here&apos;s what partner accounts get.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {/* Repair-or-replace guidance */}
            <div className="group bg-white rounded-2xl p-6 md:p-7 border border-[#002D72]/10 hover:border-[#002D72]/30 hover:shadow-lg transition-all duration-300 flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#002D72] to-[#001a4d] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg mb-1.5">Repair-or-replace guidance</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Honest call on whether a unit is worth fixing — backed by 80+ years of appliance experience. No upselling, no guessing.</p>
              </div>
            </div>

            {/* Showroom access */}
            <div className="group bg-white rounded-2xl p-6 md:p-7 border border-[#002D72]/10 hover:border-[#002D72]/30 hover:shadow-lg transition-all duration-300 flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#002D72] to-[#001a4d] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg mb-1.5">Kensington showroom access</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Walk through replacement options with a real person, not a chat window. Bring tenants or owners along to see units in person.</p>
              </div>
            </div>

            {/* Professional installation */}
            <div className="group bg-white rounded-2xl p-6 md:p-7 border border-[#002D72]/10 hover:border-[#002D72]/30 hover:shadow-lg transition-all duration-300 flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#002D72] to-[#001a4d] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.121 2.121 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg mb-1.5">Professional installation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Certified install crews handle the haul-away, hookup, and leveling — so the new unit works on day one and doesn&apos;t come back as a callback.</p>
              </div>
            </div>

            {/* Consolidated billing */}
            <div className="group bg-white rounded-2xl p-6 md:p-7 border border-[#002D72]/10 hover:border-[#002D72]/30 hover:shadow-lg transition-all duration-300 flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#002D72] to-[#001a4d] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg mb-1.5">Consolidated billing</h3>
                <p className="text-sm text-gray-600 leading-relaxed">One invoice per period across all your properties. Simpler reconciliation, fewer POs, easier owner reporting.</p>
              </div>
            </div>

            {/* Priority scheduling */}
            <div className="group bg-white rounded-2xl p-6 md:p-7 border border-[#002D72]/10 hover:border-[#002D72]/30 hover:shadow-lg transition-all duration-300 flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#002D72] to-[#001a4d] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg mb-1.5">Priority scheduling</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Partner work gets slotted ahead of one-off calls. Shorter vacancy windows, fewer angry tenants, faster lease-up.</p>
              </div>
            </div>

            {/* Dedicated point of contact */}
            <div className="group bg-white rounded-2xl p-6 md:p-7 border border-[#002D72]/10 hover:border-[#002D72]/30 hover:shadow-lg transition-all duration-300 flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#002D72] to-[#001a4d] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg mb-1.5">Dedicated point of contact</h3>
                <p className="text-sm text-gray-600 leading-relaxed">One team that learns your portfolio, your standards, and your tenants&apos; quirks. No ticket roulette.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services we can support */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
              Services we can support
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              One partner. <span className="text-[#002D72]">Every service.</span>
            </h2>
            <p className="text-gray-600">
              Appliances are our specialty — but we also cover the repairs, renovations, and plumbing work that come with managing real properties.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Link
              href="/services/appliances"
              className="rounded-xl border-2 border-[#002D72]/20 p-6 hover:border-[#002D72]/40 hover:bg-[#F4F7FF]/50 transition-colors block"
            >
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Appliances</h3>
              <p className="text-sm text-gray-600">Repair, replacement, sales &amp; professional installation. Washers, dryers, refrigerators, ranges, dishwashers, and more.</p>
            </Link>
            <Link
              href="/services/handyman"
              className="rounded-xl border-2 border-[#002D72]/20 p-6 hover:border-[#002D72]/40 hover:bg-[#F4F7FF]/50 transition-colors block"
            >
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Repairs &amp; maintenance</h3>
              <p className="text-sm text-gray-600">General home repairs, handyman services, and ongoing maintenance to keep units safe and rent-ready.</p>
            </Link>
            <Link
              href="/services/renovations"
              className="rounded-xl border-2 border-[#002D72]/20 p-6 hover:border-[#002D72]/40 hover:bg-[#F4F7FF]/50 transition-colors block"
            >
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Renovations &amp; unit turns</h3>
              <p className="text-sm text-gray-600">Full unit turns, interior renovations, and remodel support so properties lease faster and hold their value.</p>
            </Link>
            <Link
              href="/services/plumbing"
              className="rounded-xl border-2 border-[#002D72]/20 p-6 hover:border-[#002D72]/40 hover:bg-[#F4F7FF]/50 transition-colors block"
            >
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Plumbing &amp; heating</h3>
              <p className="text-sm text-gray-600">Plumbing, heating, and emergency response. Leaks, no heat, no hot water — handled quickly and correctly.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <div className="inline-block bg-white text-[#002D72] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4 border border-[#002D72]/15">
              How it works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              A simple, predictable process
            </h2>
            <p className="text-gray-600">
              From the first request to ongoing support, partners stay informed at every step.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#002D72]/10 relative">
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-full bg-[#002D72] text-white font-bold flex items-center justify-center shadow-md text-sm">1</div>
              <h3 className="font-bold text-gray-900 mb-2 mt-3">Submit a request</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Call, email, or use the contact form. Share the property, the issue, and any tenant or scheduling constraints.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#002D72]/10 relative">
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-full bg-[#002D72] text-white font-bold flex items-center justify-center shadow-md text-sm">2</div>
              <h3 className="font-bold text-gray-900 mb-2 mt-3">We assess</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Diagnostic visit or remote triage. We give you a clear repair-or-replace recommendation with a price.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#002D72]/10 relative">
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-full bg-[#002D72] text-white font-bold flex items-center justify-center shadow-md text-sm">3</div>
              <h3 className="font-bold text-gray-900 mb-2 mt-3">Schedule &amp; complete</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Service or install on a window that works for your tenants. Photo documentation when the job closes out.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#002D72]/10 relative">
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-full bg-[#002D72] text-white font-bold flex items-center justify-center shadow-md text-sm">4</div>
              <h3 className="font-bold text-gray-900 mb-2 mt-3">Ongoing support</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your dedicated contact handles future requests, tracks history across units, and flags recurring issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals / local credibility */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
              Local credibility
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              A neighbor, not a national chain
            </h2>
            <p className="text-gray-600">
              Eight decades serving the same community — with the showroom, the team, and the accountability that comes with it.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-10 md:mb-14">
            <div className="text-center p-6 rounded-2xl bg-[#F4F7FF] border border-[#002D72]/10">
              <div className="text-3xl sm:text-4xl font-bold text-[#002D72] mb-2">1945</div>
              <div className="text-sm text-gray-700 font-medium">Family-owned since</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[#F4F7FF] border border-[#002D72]/10">
              <div className="text-3xl sm:text-4xl font-bold text-[#002D72] mb-2">81 yrs</div>
              <div className="text-sm text-gray-700 font-medium">Serving Montgomery County</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[#F4F7FF] border border-[#002D72]/10">
              <div className="text-3xl sm:text-4xl font-bold text-[#002D72] mb-2">Insured</div>
              <div className="text-sm text-gray-700 font-medium">Fully insured &amp; guaranteed</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[#F4F7FF] border border-[#002D72]/10">
              <div className="text-3xl sm:text-4xl font-bold text-[#002D72] mb-2">Local</div>
              <div className="text-sm text-gray-700 font-medium">Kensington showroom &amp; team</div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F4F7FF] border border-[#002D72]/10 p-6 md:p-8 text-center">
            <p className="text-sm font-semibold text-[#002D72] uppercase tracking-wide mb-3">Service area</p>
            <p className="text-gray-700 leading-relaxed">
              Upper Northwest DC · Bethesda · Chevy Chase · Rockville · Kensington · Potomac · Olney · Brookville · Gaithersburg · Germantown
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#002D72]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to add Bettar to your vendor list?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Tell us a bit about your portfolio and we&apos;ll set up a short call to walk through pricing, scheduling, and the partner intake process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full bg-[#D32F2F] text-white font-bold text-lg hover:bg-[#B71C1C] transition-colors shadow-lg"
            >
              Request a partnership
            </Link>
            <a
              href="tel:301-949-2500"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg border-2 border-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              301-949-2500
            </a>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg &amp; Germantown.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
