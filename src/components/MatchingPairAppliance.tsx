"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db, collection, getDocs, query, where, limit } from "@/lib/firebase";
import { applianceFromFirestoreDoc } from "@/lib/appliance-from-firestore";
import {
  findHeuristicMatch,
  getComplementaryCategory,
  pairSectionBlurb,
  pairSectionTitle,
} from "@/lib/matching-pair";
import type { BettarAppliance } from "@/types/appliance";

const COLLECTION = "appliances";

/**
 * "Complete Your Pair" recommendation — shown on an appliance's product page when a
 * reliable matching appliance (e.g. the matching dryer for a washer) exists in the live
 * catalog. Resolution order: 1) the admin-entered `matchingModel` field, exact model
 * number lookup; 2) a conservative same-brand / complementary-category heuristic. Renders
 * nothing when no confident match is found — see src/lib/matching-pair.ts for the logic.
 */
export default function MatchingPairAppliance({ current }: { current: BettarAppliance }) {
  const [match, setMatch] = useState<BettarAppliance | null>(null);

  useEffect(() => {
    let cancelled = false;
    setMatch(null);

    const hasExplicitTarget = !!current.matchingModel?.trim();
    const complementaryCategory = getComplementaryCategory(current.category);

    // Nothing this feature could ever match on — skip the Firestore reads entirely.
    if (!hasExplicitTarget && !complementaryCategory) return;

    (async () => {
      try {
        // 1) Explicit admin-designated match, by exact model number.
        if (hasExplicitTarget) {
          const target = current.matchingModel!.trim();
          const explicitQ = query(
            collection(db, COLLECTION),
            where("modelNumber", "==", target),
            limit(3)
          );
          const explicitSnap = await getDocs(explicitQ);
          const explicitHits = explicitSnap.docs
            .filter((d) => d.id !== current.id)
            .map((d) => applianceFromFirestoreDoc(d.id, d.data() as Record<string, unknown>));
          if (explicitHits.length === 1) {
            if (!cancelled) setMatch(explicitHits[0]);
            return;
          }
        }

        // 2) Heuristic fallback, scoped to same-brand candidates.
        if (complementaryCategory && current.modelNumber?.trim()) {
          const brandQ = query(
            collection(db, COLLECTION),
            where("brand", "==", current.brand),
            limit(30)
          );
          const brandSnap = await getDocs(brandQ);
          const candidates = brandSnap.docs.map((d) =>
            applianceFromFirestoreDoc(d.id, d.data() as Record<string, unknown>)
          );
          const heuristicMatch = findHeuristicMatch(current, candidates);
          if (heuristicMatch && !cancelled) {
            setMatch(heuristicMatch);
          }
        }
      } catch {
        // Non-critical — fail silently, same as RelatedAppliances.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [current]);

  if (!match) return null;

  const title = pairSectionTitle(current, match);
  const blurb = pairSectionBlurb(current, match);
  const outOfStock = match.inStock === false;

  return (
    <div className="mb-12 bg-[#F4F7FF] border border-[#002D72]/15 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <svg className="w-5 h-5 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-4.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"
          />
        </svg>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <p className="text-sm text-gray-600 mb-5">{blurb}</p>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-white rounded-xl p-4 border border-gray-100">
        <div className="relative bg-[#F8FAFF] rounded-lg shrink-0 w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center overflow-hidden">
          {match.imageUrl ? (
            <Image
              src={match.imageUrl}
              alt={match.name}
              fill
              className="object-contain p-3"
              sizes="144px"
            />
          ) : (
            <div className="text-gray-300 text-xs">No image</div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <p className="text-[11px] text-[#002D72] font-semibold uppercase tracking-wide mb-1">
            Matching {match.category}
          </p>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-1">{match.name}</h3>
          {match.modelNumber ? (
            <p className="text-xs text-gray-500 mb-4">Model: {match.modelNumber}</p>
          ) : (
            <p className="text-xs text-gray-500 mb-4">&nbsp;</p>
          )}

          {outOfStock ? (
            <a
              href="tel:301-949-2500"
              className="inline-flex items-center gap-2 border-2 border-[#002D72] text-[#002D72] hover:bg-[#002D72] hover:text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              Call for Availability
            </a>
          ) : (
            <Link
              href={`/appliances/${match.id}`}
              className="inline-flex items-center gap-2 bg-[#002D72] hover:bg-[#001F5C] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              View Product
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
