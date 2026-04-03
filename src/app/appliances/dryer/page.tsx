"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ApplianceSidebar from "../../../components/ApplianceSidebar";
import { collection, getDocs, query, where, db } from "@/lib/firebase";
import ApplianceRequestModal from "../../../components/ApplianceRequestModal";
import ApplianceProductCard from "../../../components/ApplianceProductCard";
import type { BettarAppliance } from "@/types/appliance";

export default function DryerPage() {
  const [appliances, setAppliances] = useState<BettarAppliance[]>([]);
  const [loadingAppliances, setLoadingAppliances] = useState(true);
  const [isApplianceModalOpen, setIsApplianceModalOpen] = useState(false);
  const [selectedApplianceName, setSelectedApplianceName] = useState<string>("");

  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const ref = collection(db, "appliances");
        const q = query(ref, where("category", "==", "Dryer"));
        const snap = await getDocs(q);
        const items: BettarAppliance[] = snap.docs.map((doc) => {
          const data = doc.data() as Omit<BettarAppliance, "id">;
          return { id: doc.id, ...data };
        });
        
        const sortedByDiscount = items.sort((a, b) => {
          const discountA = a.discountPercent || 0;
          const discountB = b.discountPercent || 0;
          return discountB - discountA;
        });
        
        setAppliances(sortedByDiscount);
      } catch (error) {
        console.error("Error loading dryers from Firestore", error);
      } finally {
        setLoadingAppliances(false);
      }
    };

    fetchAppliances();
  }, []);

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Dryers",
    "description": "Shop quality dryers from top brands. Professional dryer sales, installation, and repair in Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, and Germantown, MD.",
    "url": "https://bettarservices.com/appliances/dryer",
  };

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="dryer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />

      <Header />

      <section className="py-12 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              <span className="text-[#002D72]">Dryers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect dryer for your home. From gas to electric models, we offer quality dryers from top brands with professional installation and repair services.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setIsApplianceModalOpen(true)}
                className="px-8 py-3 rounded-full bg-[#002D72] text-white font-semibold hover:bg-[#001F5C] transition shadow-lg hover:shadow-xl"
              >
                Shop Dryers
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
          <ApplianceSidebar />
        </aside>

        <div className="w-full flex-1 space-y-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              All Dryers
            </h2>
            <p className="text-gray-600">
              Showing {appliances.length} dryer{appliances.length !== 1 ? 's' : ''}
            </p>
          </div>

          {loadingAppliances ? (
            <p className="text-gray-600 text-center py-8">Loading dryers…</p>
          ) : appliances.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No dryers available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {appliances.map((item) => (
                <ApplianceProductCard
                  key={item.id}
                  item={item}
                  onBuyNow={(name) => {
                    setSelectedApplianceName(name);
                    setIsApplianceModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <section className="bg-[#002D72] text-white py-10 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Need help choosing a dryer?
            </h2>
            <p className="text-sm md:text-base text-[#E0E7FF] max-w-xl">
              Our team can help you find the perfect dryer for your home. Contact us today!
            </p>
          </div>
          <button
            onClick={() => setIsApplianceModalOpen(true)}
            className="px-8 py-3 rounded-full bg-white text-[#002D72] font-semibold hover:bg-[#E6EDFF] transition"
          >
            Request Service
          </button>
        </div>
      </section>

      <Footer />

      <ApplianceRequestModal
        isOpen={isApplianceModalOpen}
        onClose={() => {
          setIsApplianceModalOpen(false);
          setSelectedApplianceName("");
        }}
        applianceName={selectedApplianceName}
      />
    </div>
  );
}
