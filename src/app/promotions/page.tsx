"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { collection, getDocs, db } from "@/lib/firebase";
import type { BettarAppliance } from "@/types/appliance";
import {
  MANUFACTURER_REBATES,
  getRebateStatus,
  formatDateRange,
  LABOR_DAY_SALE_ITEMS,
  isLaborDaySaleActive,
} from "@/lib/promotions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


export default function Promotions() {
  const [deals, setDeals] = useState<BettarAppliance[]>([]);
  const [loadingDeals, setLoadingDeals] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const ref = collection(db, "appliances");
        const snap = await getDocs(ref);
        const items: BettarAppliance[] = snap.docs.map((doc) => {
          const data = doc.data() as Omit<BettarAppliance, "id">;
          return { id: doc.id, ...data };
        });

        // Only show in-stock appliances that currently carry a discount
        const discounted = items
          .filter((item) => item.inStock !== false && (item.discountPercent || 0) > 0)
          .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));

        setDeals(discounted);
      } catch (error) {
        console.error("Error loading promotions from Firestore", error);
      } finally {
        setLoadingDeals(false);
      }
    };

    fetchDeals();
  }, []);

  const today = new Date();
  const activeRebates = MANUFACTURER_REBATES.filter((r) => getRebateStatus(r, today) === "active");
  const upcomingRebates = MANUFACTURER_REBATES.filter((r) => getRebateStatus(r, today) === "upcoming");
  const laborDaySaleActive = isLaborDaySaleActive(today);

  // Breadcrumb schema for SEO — reflects the site's actual navigation
  // (Home > Promotions), nothing more.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.bettarservices.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Appliance Promotions & Deals",
        item: "https://www.bettarservices.com/promotions",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb schema for SEO */}
      <Script
        id="promotions-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Current Appliance Promotions
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4">
              Appliance Promotions &amp; <span className="text-[#002D72]">Deals</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Browse current appliance deals, manufacturer rebates and seasonal sales on top brands — all backed by the same trusted team Kensington, Bethesda and Rockville have known since 1945.
            </p>
          </div>
        </div>
      </section>

      {/* Labor Day Sale Section */}
      {laborDaySaleActive && (
        <section className="pt-10 md:pt-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                Labor Day Sale • Aug 27 – Sep 16, 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Store-Wide Labor Day Appliance Sale
              </h2>
              <p className="text-gray-600">
                Appliance discounts on qualifying Whirlpool®, Maytag®, KitchenAid® and Amana® kitchen and laundry suites — available now through September 16.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
              {LABOR_DAY_SALE_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href="/appliances"
                  className="block rounded-2xl overflow-hidden border border-gray-200 hover:border-[#002D72]/30 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative aspect-square bg-white">
                    <Image
                      src={item.image}
                      alt={`${item.brand} ${item.category} appliance sale — Labor Day Sale, August 27 to September 16, 2026`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-100 bg-white">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{item.category}</p>
                    <p className="font-bold text-gray-900">{item.brand}</p>
                  </div>
                </Link>
              ))}
            </div>

            <p className="text-center text-xs text-gray-500 max-w-2xl mx-auto mt-8">
              Applicable to qualifying appliances. Ask our team in-store or by phone for current eligibility and pricing.
            </p>
          </div>
        </section>
      )}

      {/* Manufacturer Rebates Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <span className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Featured Promotions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Current Appliance Promotions
            </h2>
            <p className="text-gray-600">
              These appliance rebates and special offers are run by the manufacturers, redeemed as a prepaid Mastercard® after purchase. Ask our team in-store or by phone to confirm your model qualifies before you buy.
            </p>
          </div>

          {activeRebates.length === 0 ? (
            <div className="text-center py-12 bg-[#F8FAFF] rounded-2xl border border-gray-100">
              <p className="text-gray-600 mb-4">
                No manufacturer rebates are running right now — call us and we&apos;ll let you know what&apos;s coming up.
              </p>
              <a
                href="tel:301-949-2500"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#D32F2F] text-white font-semibold hover:bg-[#B71C1C] transition-colors"
              >
                Call 301-949-2500
              </a>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6">
              {activeRebates.map((rebate) => (
                <div
                  key={rebate.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#002D72]/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6 md:p-7">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className={`inline-block ${rebate.brandColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        {rebate.brand}
                      </span>
                      <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                        Active Now
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-xl mb-1">{rebate.title}</h3>
                    <p className="text-2xl font-bold text-[#002D72] mb-3">{rebate.amount}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{rebate.blurb}</p>
                    <div className="pt-4 border-t border-gray-100 space-y-1.5">
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold text-gray-700">Eligible: </span>
                        {rebate.eligibility}
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold text-gray-700">Offer window: </span>
                        {formatDateRange(rebate.startDate, rebate.endDate)}
                      </p>
                      <p className="text-xs text-gray-500">{rebate.footnote}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {upcomingRebates.length > 0 && (
            <p className="text-center text-sm text-gray-500 mt-8">
              More rebates coming soon — call us to ask what&apos;s next.
            </p>
          )}

          <div className="text-center mt-10">
            <a
              href="tel:301-949-2500"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#D32F2F] text-white font-semibold hover:bg-[#B71C1C] transition-colors shadow-md"
            >
              Call to Ask if You Qualify
            </a>
            <p className="text-xs text-gray-500 mt-4 max-w-2xl mx-auto">
              Rebate amounts, dates and eligible models are set by the manufacturer and subject to change without notice. Confirm current terms and eligible models with our team at time of purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Current Appliance Deals - Firebase Powered */}
      <section className="py-16 md:py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <span className="inline-block bg-[#E6EDFF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                Appliance Deals
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Appliance Deals &amp; <span className="text-[#002D72]">Special Offers</span>
              </h2>
              <p className="text-gray-600 mt-2 max-w-xl">
                Appliance sales and discounts on our current in-stock inventory, updated regularly.
              </p>
              <div className="h-1 w-16 bg-[#002D72] mt-3 rounded-full" />
            </div>
            <Link href="/appliances" className="text-[#002D72] hover:text-[#1e3a8a] font-semibold text-base mt-5 md:mt-0 flex items-center gap-1 group">
              Shop All Appliances
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loadingDeals ? (
            <p className="text-gray-600 text-center py-8">Loading current deals…</p>
          ) : deals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-600 mb-4">
                No discounted appliances are listed right now — check back soon, or give us a call for current pricing.
              </p>
              <a
                href="tel:301-949-2500"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#D32F2F] text-white font-semibold hover:bg-[#B71C1C] transition-colors"
              >
                Call 301-949-2500
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {deals.map((item) => (
                <Link
                  key={item.id}
                  href={`/appliances/${item.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                  <div className="relative">
                    {item.discountPercent && (
                      <div className="absolute top-2 right-2 z-10 bg-[#D32F2F] text-white px-3 py-1 rounded-lg text-xs font-semibold">
                        {item.discountPercent}% OFF
                      </div>
                    )}
                    <div className="h-48 bg-gray-100 flex items-center justify-center p-4 relative">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={220}
                          height={192}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <div className="text-4xl mb-2">📦</div>
                          <div className="text-sm">No Image Available</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    {item.modelNumber && (
                      <p className="text-xs text-gray-400 mb-1">{item.modelNumber}</p>
                    )}
                    <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">
                      {item.brand} • {item.category}
                    </p>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold text-[#002D72]">
                        ${item.priceFrom.toLocaleString()}
                      </span>
                      {item.priceOld && (
                        <span className="text-gray-500 line-through text-sm">
                          ${item.priceOld.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {item.discountPercent && (
                      <p className="text-green-600 font-medium text-xs">
                        Save {item.discountPercent}% on this model
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ways to Save Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              More Ways to Save on <span className="text-[#002D72]">Appliances</span>
            </h2>
            <p className="text-gray-600">
              Appliance sales and discounts change throughout the year. Here&apos;s how to stay on top of the latest offers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFF] rounded-2xl border border-gray-200 p-6 md:p-7 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-[#E6EDFF] flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Ask About Service Specials</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Seasonal specials on repair and installation come up throughout the year. Call ahead of booking to ask what&apos;s currently available.
              </p>
            </div>

            <div className="bg-[#F8FAFF] rounded-2xl border border-gray-200 p-6 md:p-7 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-[#E6EDFF] flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Follow Us for Updates</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                New appliance deals and limited-time offers are often shared on our social channels first.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <a href="https://www.facebook.com/profile.php?id=61581279980561" target="_blank" rel="noopener noreferrer" className="text-[#002D72] hover:text-[#001F5C] transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/bettarservices" target="_blank" rel="noopener noreferrer" className="text-[#002D72] hover:text-[#001F5C] transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@bettarservices" target="_blank" rel="noopener noreferrer" className="text-[#002D72] hover:text-[#001F5C] transition-colors" aria-label="TikTok">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-[#F8FAFF] rounded-2xl border border-gray-200 p-6 md:p-7 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-[#E6EDFF] flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Talk to Our Team</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Request service or give us a call — we&apos;ll confirm what promotions currently apply to your job.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#002D72]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Save?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Request service or reach out today, and we&apos;ll let you know what current promotions apply.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/request-service"
              className="bg-[#D32F2F] text-white px-8 py-4 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold text-lg"
            >
              Request Service
            </Link>
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
    </div>
  );
}
