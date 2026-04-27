"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db, collection, getDocs, query, where, limit } from "@/lib/firebase";
import { applianceFromFirestoreDoc } from "@/lib/appliance-from-firestore";
import type { BettarAppliance } from "@/types/appliance";

const COLLECTION = "appliances";
const MAX_SHOW = 4;

export default function RelatedAppliances({ current }: { current: BettarAppliance }) {
  const [related, setRelated] = useState<BettarAppliance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // 1) Same-category items (fetch extra to have room after filtering self out)
        const sameQ = query(
          collection(db, COLLECTION),
          where("category", "==", current.category),
          limit(MAX_SHOW + 2)
        );
        const sameSnap = await getDocs(sameQ);
        const sameItems: BettarAppliance[] = sameSnap.docs
          .filter((d) => d.id !== current.id)
          .map((d) => applianceFromFirestoreDoc(d.id, d.data() as Record<string, unknown>))
          .slice(0, MAX_SHOW);

        // 2) Pad with other appliances if same-category doesn't fill the grid
        let items = sameItems;
        if (items.length < MAX_SHOW) {
          const otherQ = query(collection(db, COLLECTION), limit(20));
          const otherSnap = await getDocs(otherQ);
          const existingIds = new Set([current.id, ...items.map((i) => i.id)]);
          const extra = otherSnap.docs
            .filter((d) => !existingIds.has(d.id))
            .map((d) => applianceFromFirestoreDoc(d.id, d.data() as Record<string, unknown>))
            .slice(0, MAX_SHOW - items.length);
          items = [...items, ...extra];
        }

        if (!cancelled) setRelated(items);
      } catch {
        // Related section is non-critical — fail silently
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [current.id, current.category]);

  if (loading) {
    return (
      <div className="mb-12">
        <div className="h-7 w-52 bg-gray-100 rounded-lg animate-pulse mb-5" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (related.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          More {current.category} Appliances
        </h2>
        <Link
          href="/appliances"
          className="text-sm text-[#002D72] font-semibold hover:underline flex items-center gap-1 whitespace-nowrap"
        >
          View All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((item) => (
          <Link
            key={item.id}
            href={`/appliances/${item.id}`}
            className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#002D72]/20 transition-all duration-200"
          >
            {/* Image */}
            <div className="relative bg-[#F8FAFF] aspect-square overflow-hidden">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs">
                  No image
                </div>
              )}
              {item.discountPercent ? (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.discountPercent}% OFF
                </div>
              ) : null}
              {item.inStock === false ? (
                <div className="absolute top-2 right-2 bg-gray-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Out of Stock
                </div>
              ) : null}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 p-3 flex-1">
              <p className="text-[11px] text-[#002D72] font-semibold uppercase tracking-wide truncate">
                {item.brand}
              </p>
              <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 flex-1">
                {item.name}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-base font-extrabold text-[#002D72]">
                  ${item.priceFrom.toLocaleString()}
                </p>
                <span className="text-xs text-[#002D72] font-semibold group-hover:underline">
                  View →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
