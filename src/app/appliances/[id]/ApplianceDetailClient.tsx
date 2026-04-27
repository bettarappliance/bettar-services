"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplianceRequestModal from "@/components/ApplianceRequestModal";
import RelatedAppliances from "@/components/RelatedAppliances";
import { resolveCategoryListingPath } from "@/lib/appliance-category-slugs";
import { applianceFromFirestoreDoc } from "@/lib/appliance-from-firestore";
import { parseApplianceDocIdFromPathname } from "@/lib/appliance-doc-id";
import { getApplianceSnapshotByUrlId } from "@/lib/appliance-resolve-doc";
import type { BettarAppliance } from "@/types/appliance";

function ApplianceDetailView({ appliance }: { appliance: BettarAppliance }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isApplianceModalOpen, setIsApplianceModalOpen] = useState(false);
  const [selectedApplianceName, setSelectedApplianceName] = useState("");
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "description">("specs");

  const categoryHref = resolveCategoryListingPath(appliance.category, appliance.categorySlug);

  const allImages = useMemo(() => {
    const urls = [appliance.imageUrl, ...(appliance.images ?? [])].filter(
      (u): u is string => typeof u === "string" && u.trim() !== ""
    );
    return [...new Set(urls)];
  }, [appliance.imageUrl, appliance.images]);

  const savings = appliance.priceOld ? appliance.priceOld - appliance.priceFrom : null;

  const specs: { label: string; value: string }[] = [
    { label: "Brand", value: appliance.brand },
    { label: "Category", value: appliance.category },
    appliance.modelNumber ? { label: "Model Number", value: appliance.modelNumber } : null,
    appliance.type ? { label: "Type", value: appliance.type } : null,
    appliance.color ? { label: "Color / Finish", value: appliance.color } : null,
    appliance.supplyType ? { label: "Supply Type", value: appliance.supplyType } : null,
    appliance.capacityKw ? { label: "Capacity", value: `${appliance.capacityKw} kW` } : null,
    appliance.roomSize ? { label: "Room Size", value: appliance.roomSize } : null,
    appliance.energyRating ? { label: "Energy Rating", value: appliance.energyRating } : null,
    appliance.warranty ? { label: "Warranty", value: appliance.warranty } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const hasFeatures = appliance.features && appliance.features.length > 0;
  const hasFullDescription = !!appliance.fullDescription;

  const visibleTabs = useMemo((): ("specs" | "features" | "description")[] => {
    return [
      "specs",
      ...(hasFeatures ? (["features"] as const) : []),
      ...(hasFullDescription ? (["description"] as const) : []),
    ];
  }, [hasFeatures, hasFullDescription]);

  const mainImageSrc = allImages[currentImageIndex] ?? allImages[0];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-[#F8FAFF] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-1.5 text-sm flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-400 hover:text-[#002D72] transition-colors">
              Home
            </Link>
            <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/appliances" className="text-gray-400 hover:text-[#002D72] transition-colors">
              Appliances
            </Link>
            <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={categoryHref} className="text-gray-400 hover:text-[#002D72] transition-colors">
              {appliance.category}
            </Link>
            <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-700 font-medium truncate max-w-[200px] sm:max-w-md">{appliance.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mb-12">
          <div className="space-y-3">
            <div className="relative bg-[#F8FAFF] rounded-2xl overflow-hidden border border-gray-100 aspect-square">
              {mainImageSrc ? (
                <Image
                  src={mainImageSrc}
                  alt={appliance.name}
                  fill
                  className="object-contain p-6"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm p-6 text-center">
                  No product image available
                </div>
              )}
              {appliance.discountPercent ? (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow">
                  {appliance.discountPercent}% OFF
                </div>
              ) : null}
              {appliance.inStock === false ? (
                <div className="absolute top-4 right-4 bg-gray-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl">
                  Out of Stock
                </div>
              ) : null}
              {allImages.length > 1 ? (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              ) : null}
            </div>

            {allImages.length > 1 ? (
              <div className="flex gap-2 flex-wrap">
                {allImages.map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    type="button"
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      currentImageIndex === i
                        ? "border-[#002D72] ring-2 ring-[#002D72]/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-label={`Show image ${i + 1} of ${allImages.length}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="inline-block bg-[#EEF4FF] text-[#002D72] text-xs font-semibold px-3 py-1 rounded-full">
                {appliance.brand}
              </span>
              <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                {appliance.category}
              </span>
              {appliance.modelNumber ? (
                <span className="inline-block bg-gray-100 text-gray-400 text-xs font-medium px-3 py-1 rounded-full">
                  Model: {appliance.modelNumber}
                </span>
              ) : null}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">{appliance.name}</h1>

            <div className="bg-[#F8FAFF] rounded-2xl p-5 border border-gray-100 space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#002D72]">
                  ${appliance.priceFrom.toLocaleString()}
                </span>
                {appliance.priceOld ? (
                  <span className="text-lg text-gray-400 line-through">
                    ${appliance.priceOld.toLocaleString()}
                  </span>
                ) : null}
              </div>
              {savings && savings > 0 ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-green-100 text-green-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                    Save ${savings.toLocaleString()}
                  </span>
                  {appliance.discountPercent ? (
                    <span className="text-green-600 text-sm font-medium">({appliance.discountPercent}% off)</span>
                  ) : null}
                </div>
              ) : null}
              <p className="text-xs text-gray-400">
                * Starting price. Final quote subject to installation and delivery.
              </p>
            </div>

            {appliance.inStock === false ? (
              <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-700">Out of Stock</p>
                  <p className="text-xs text-red-500">Contact us for estimated availability</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="text-sm font-semibold text-green-700">In Stock</p>
                  <p className="text-xs text-green-600">Available — contact us to schedule delivery</p>
                </div>
              </div>
            )}

            {appliance.shortDescription ? (
              <p className="text-gray-600 leading-relaxed text-sm border-l-4 border-[#002D72]/20 pl-4">
                {appliance.shortDescription}
              </p>
            ) : null}

            {(appliance.color || appliance.supplyType || appliance.energyRating || appliance.type) && (
              <div className="flex flex-wrap gap-2">
                {appliance.color ? (
                  <span className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                    </svg>
                    {appliance.color}
                  </span>
                ) : null}
                {appliance.supplyType ? (
                  <span className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {appliance.supplyType}
                  </span>
                ) : null}
                {appliance.energyRating ? (
                  <span className="inline-flex items-center gap-1.5 border border-green-200 text-green-700 bg-green-50 text-xs px-3 py-1.5 rounded-full">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                    </svg>
                    {appliance.energyRating}
                  </span>
                ) : null}
                {appliance.type ? (
                  <span className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full">
                    {appliance.type}
                  </span>
                ) : null}
              </div>
            )}

            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedApplianceName(appliance.name);
                  setIsApplianceModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#002D72] hover:bg-[#001F5C] text-white font-bold py-4 px-6 rounded-xl text-base transition-all duration-200 shadow-lg shadow-[#002D72]/20 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Request Quote / Buy Now
              </button>
              <a
                href="tel:301-949-2500"
                className="w-full flex items-center justify-center gap-2 border-2 border-[#002D72] text-[#002D72] hover:bg-[#002D72] hover:text-white font-semibold py-3.5 px-6 rounded-xl text-base transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Us: 301-949-2500
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                {
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  label: "Fully Insured",
                },
                {
                  icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                  label: "Family Owned",
                },
                {
                  icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                  label: "Free Consultation",
                },
                {
                  icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
                  label: "Pro Installation",
                },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[#F8FAFF] rounded-xl px-3 py-2.5 border border-gray-100">
                  <svg className="w-4 h-4 text-[#002D72] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                  <span className="text-xs font-semibold text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex gap-1 border-b border-gray-200 mb-6 overflow-x-auto">
            {visibleTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px whitespace-nowrap ${
                    activeTab === tab
                      ? "border-[#002D72] text-[#002D72]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "specs" ? "Specifications" : tab === "features" ? "Key Features" : "Description"}
                </button>
              ))}
          </div>

          {activeTab === "specs" ? (
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <table className="min-w-full divide-y divide-gray-100">
                <tbody className="divide-y divide-gray-50">
                  {specs.map(({ label, value }, i) => (
                    <tr key={label} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFF]"}>
                      <th scope="row" className="px-6 py-4 text-sm font-semibold text-gray-500 w-44 text-left align-top">
                        {label}
                      </th>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{value}</td>
                    </tr>
                  ))}
                  {specs.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="px-6 py-8 text-center text-gray-400 text-sm">
                        No specifications available for this model.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          ) : null}

          {activeTab === "features" && hasFeatures ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {appliance.features!.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#F8FAFF] rounded-xl p-4 border border-gray-100">
                  <div className="w-6 h-6 bg-[#002D72] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === "description" && hasFullDescription ? (
            <div className="bg-[#F8FAFF] rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {appliance.fullDescription}
              </p>
            </div>
          ) : null}
        </div>

        <RelatedAppliances current={appliance} />

        <div className="bg-[#002D72] rounded-3xl p-8 sm:p-10 text-white mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                Why Choose Bettar
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Serving DC &amp; Maryland Since 1945</h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                We&apos;re a family-owned business with over 80 years of experience selling and servicing appliances in the
                Greater Washington DC area. Every appliance comes with our personal commitment to quality and after-sale
                support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "Expert Installation", desc: "Certified technicians handle every install" },
                { title: "After-Sale Support", desc: "We stand behind every product we sell" },
                { title: "Competitive Pricing", desc: "Honest prices, no hidden fees" },
                { title: "Local & Trusted", desc: "30,000+ happy customers in the community" },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white/10 rounded-xl p-4 border border-white/15">
                  <p className="text-sm font-bold text-white mb-1">{title}</p>
                  <p className="text-xs text-blue-200 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-100">
          <Link
            href="/appliances"
            className="inline-flex items-center gap-2 text-[#002D72] hover:text-[#001F5C] font-semibold text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Appliances
          </Link>
          <Link
            href={categoryHref}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#002D72] font-medium text-sm transition-colors"
          >
            More {appliance.category} models
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>

      <ApplianceRequestModal
        isOpen={isApplianceModalOpen}
        onClose={() => {
          setIsApplianceModalOpen(false);
          setSelectedApplianceName("");
        }}
        applianceName={selectedApplianceName}
      />

      <Footer />
    </div>
  );
}

type ApplianceDetailClientProps = {
  id: string;
  /** From server REST when available; otherwise client loads via Firestore SDK. */
  initialAppliance: BettarAppliance | null;
};

export default function ApplianceDetailClient({ id, initialAppliance }: ApplianceDetailClientProps) {
  const [appliance, setAppliance] = useState<BettarAppliance | null>(() =>
    initialAppliance
      ? applianceFromFirestoreDoc(initialAppliance.id, { ...initialAppliance })
      : null
  );
  const [loading, setLoading] = useState(() => initialAppliance === null);

  useEffect(() => {
    if (initialAppliance) {
      setAppliance(applianceFromFirestoreDoc(initialAppliance.id, { ...initialAppliance }));
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        // Browser URL keeps Firestore casing; `id` from Next params is sometimes lowercased (e.g. I → i).
        const fromPath =
          typeof window !== "undefined"
            ? parseApplianceDocIdFromPathname(window.location.pathname)
            : null;
        const docId = fromPath ?? id;

        const snap = await getApplianceSnapshotByUrlId(docId);
        if (cancelled) return;
        if (snap) {
          const raw = snap.data() as Record<string, unknown>;
          setAppliance(applianceFromFirestoreDoc(snap.id, raw));
        } else {
          setAppliance(null);
        }
      } catch {
        if (!cancelled) setAppliance(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, initialAppliance]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#002D72] border-t-transparent animate-spin" />
          <p className="text-gray-500 text-sm">Loading appliance details…</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!appliance) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Appliance Not Found</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            We couldn&apos;t find that appliance. It may have been removed or the link is incorrect.
          </p>
          <Link
            href="/appliances"
            className="inline-flex items-center gap-2 bg-[#002D72] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#001F5C] transition-colors"
          >
            Browse All Appliances
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return <ApplianceDetailView appliance={appliance} />;
}
