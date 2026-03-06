"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Partnerships() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - background image with dark overlay */}
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
        <div className="absolute inset-0 bg-black/55 z-10" aria-hidden />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-block bg-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            Bettar Partner Network
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-sm">
            Reduce vacancy.{" "}
            <span className="text-[#93C5FD]">Protect your assets.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/95 leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            One partner for appliance repair, full-unit turns, renovations, and emergency response. Faster turnaround. Better ROI. Fewer vendors.
          </p>
        </div>
      </section>

      {/* The Bettar Difference */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
            The <span className="text-[#002D72]">Bettar</span> difference
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
            Built for portfolio operations—not one-off jobs. Here’s what partner accounts get.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-[#F4F7FF] rounded-xl p-6 border border-[#002D72]/10">
              <div className="w-10 h-10 rounded-lg bg-[#002D72] flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Consolidated billing</h3>
              <p className="text-sm text-gray-600">One invoice per period. Simplified reconciliation and fewer POs.</p>
            </div>
            <div className="bg-[#F4F7FF] rounded-xl p-6 border border-[#002D72]/10">
              <div className="w-10 h-10 rounded-lg bg-[#002D72] flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Priority scheduling</h3>
              <p className="text-sm text-gray-600">Partner work gets slotted first. Shorter vacancy windows.</p>
            </div>
            <div className="bg-[#F4F7FF] rounded-xl p-6 border border-[#002D72]/10">
              <div className="w-10 h-10 rounded-lg bg-[#002D72] flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H20a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Photo documentation</h3>
              <p className="text-sm text-gray-600">Before/after and completion photos for owners and files.</p>
            </div>
            <div className="bg-[#F4F7FF] rounded-xl p-6 border border-[#002D72]/10">
              <div className="w-10 h-10 rounded-lg bg-[#002D72] flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Emergency response</h3>
              <p className="text-sm text-gray-600">Urgent calls for managed portfolios—leaks, no heat, no cooling.</p>
            </div>
            <div className="bg-[#F4F7FF] rounded-xl p-6 border border-[#002D72]/10">
              <div className="w-10 h-10 rounded-lg bg-[#002D72] flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Dedicated point of contact</h3>
              <p className="text-sm text-gray-600">One team that knows your portfolio and your standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience-Specific Messaging */}
      <section className="py-12 md:py-16 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
            Built for <span className="text-[#002D72]">your role</span>
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
            Same partner. Different priorities. We adapt to how you operate.
          </p>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#002D72]/10 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#002D72] flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Property management firms</h3>
              <p className="text-gray-600 leading-relaxed">
                Cut vendor sprawl and speed up unit turns. We handle appliance repair and replacement, general maintenance, and full interior refreshes so you hit lease-up dates and protect owner assets with one trusted vendor and one consolidated bill.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#002D72]/10 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#002D72] flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Short-term rental (Airbnb) hosts</h3>
              <p className="text-gray-600 leading-relaxed">
                Guest-ready means no broken appliances or last-minute surprises. We deliver fast repair and replacement plus turnover support so your calendar stays full and your reviews stay strong—with one call for everything.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#002D72]/10 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#002D72] flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fix-and-flip & buy-and-hold investors</h3>
              <p className="text-gray-600 leading-relaxed">
                From rehabs to rent-ready to ongoing maintenance, we keep projects on schedule and hold costs predictable. One vendor for appliances, repairs, plumbing, and renovations so you scale without juggling subs or missing punch lists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
            One partner. <span className="text-[#002D72]">Every service.</span>
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
            Appliances, repairs, renovations, and plumbing—all under one roof. Fewer vendors, faster turnaround, clearer accountability.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="rounded-xl border-2 border-[#002D72]/20 p-6 hover:border-[#002D72]/40 hover:bg-[#F4F7FF]/50 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Appliances</h3>
              <p className="text-sm text-gray-600">Repair, replacement, sales &amp; installation. Washers, dryers, refrigerators, ranges, dishwashers, and more.</p>
            </div>
            <div className="rounded-xl border-2 border-[#002D72]/20 p-6 hover:border-[#002D72]/40 hover:bg-[#F4F7FF]/50 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Repairs &amp; maintenance</h3>
              <p className="text-sm text-gray-600">General home repairs, handyman services, and ongoing maintenance to keep units safe and rent-ready.</p>
            </div>
            <div className="rounded-xl border-2 border-[#002D72]/20 p-6 hover:border-[#002D72]/40 hover:bg-[#F4F7FF]/50 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Renovations &amp; unit turns</h3>
              <p className="text-sm text-gray-600">Full unit turns, interior renovations, and remodel support so properties lease faster and hold value.</p>
            </div>
            <div className="rounded-xl border-2 border-[#002D72]/20 p-6 hover:border-[#002D72]/40 hover:bg-[#F4F7FF]/50 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Plumbing &amp; heating</h3>
              <p className="text-sm text-gray-600">Plumbing, heating, and emergency response. Leaks, no heat, no hot water—handled quickly and correctly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Join the Bettar Partner Network */}
      <section className="py-14 md:py-20 bg-[#002D72]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Join the Bettar Partner Network
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Fewer vendors. Faster turnaround. One team that protects your assets and reduces vacancy. Add Bettar to your approved vendor list and simplify how you manage repairs, turns, and emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:301-949-2500"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#002D72] font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              301-949-2500
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg border-2 border-white hover:bg-white/20 transition-colors"
            >
              Request partner info
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Serving Upper Northwest DC, Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Brookville, Gaithersburg & Germantown.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
