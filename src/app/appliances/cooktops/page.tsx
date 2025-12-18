"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Script from "next/script";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ApplianceSidebar from "../../../components/ApplianceSidebar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import ApplianceRequestModal from "../../../components/ApplianceRequestModal";

type BettarAppliance = {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceFrom: number;
  priceOld?: number;
  discountPercent?: number;
  shortDescription?: string;
  modelNumber?: string;
  inStock?: boolean;
  images?: string[];
};

export default function CooktopsPage() {
  const [appliances, setAppliances] = useState<BettarAppliance[]>([]);
  const [loadingAppliances, setLoadingAppliances] = useState(true);
  const [isApplianceModalOpen, setIsApplianceModalOpen] = useState(false);

  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const ref = collection(db, "appliances");
        const q = query(ref, where("category", "==", "Cooktop"));
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
        console.error("Error loading cooktops from Firestore", error);
      } finally {
        setLoadingAppliances(false);
      }
    };

    fetchAppliances();
  }, []);

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Cooktops",
    "description": "Shop quality cooktops from top brands. Professional cooktop sales, installation, and repair in Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, and Germantown, MD.",
    "url": "https://bettarservices.com/appliances/cooktops",
  };

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="cooktops-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />

      <Header />

      <section className="py-12 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              <span className="text-[#002D72]">Cooktops</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect cooktop for your kitchen. From gas to induction models, we offer quality cooktops from top brands with professional installation and repair services.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setIsApplianceModalOpen(true)}
                className="px-8 py-3 rounded-full bg-[#002D72] text-white font-semibold hover:bg-[#001F5C] transition shadow-lg hover:shadow-xl"
              >
                Shop Cooktops
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
              All Cooktops
            </h2>
            <p className="text-gray-600">
              Showing {appliances.length} cooktop{appliances.length !== 1 ? 's' : ''}
            </p>
          </div>

          {loadingAppliances ? (
            <p className="text-gray-600 text-center py-8">Loading cooktops…</p>
          ) : appliances.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No cooktops available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {appliances.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    {item.discountPercent && (
                      <div className="absolute top-2 right-2 z-10 bg-[#002D72] text-white px-3 py-1 rounded-lg text-xs font-semibold">
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
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.placeholder-icon')) {
                              const placeholder = document.createElement('div');
                              placeholder.className = 'placeholder-icon text-gray-400 text-center';
                              placeholder.innerHTML = '<div class="text-4xl mb-2">📦</div><div class="text-sm">No Image Available</div>';
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <div className="text-4xl mb-2">📦</div>
                          <div className="text-sm">No Image Available</div>
                        </div>
                      )}
                      {item.images && item.images.length > 0 && (
                        <div className="absolute bottom-2 right-2 bg-[#002D72] text-white text-xs px-2 py-1 rounded-full font-semibold">
                          +{item.images.length} more
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    {item.modelNumber && (
                      <p className="text-xs text-gray-400 mb-1">
                        {item.modelNumber}
                      </p>
                    )}
                    <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2">
                      {item.name}
                    </h3>
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
                    {item.shortDescription && (
                      <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                        {item.shortDescription}
                      </p>
                    )}
                    {item.inStock === false && (
                      <p className="text-red-600 font-medium text-xs mt-1">
                        Out of Stock
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <section className="bg-[#002D72] text-white py-10 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Need help choosing a cooktop?
            </h2>
            <p className="text-sm md:text-base text-[#E0E7FF] max-w-xl">
              Our team can help you find the perfect cooktop for your kitchen. Contact us today!
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
        onClose={() => setIsApplianceModalOpen(false)}
      />
    </div>
  );
}
