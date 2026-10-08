"use client";

import { useState, type ReactNode } from "react";
import ApplianceSidebar from "./ApplianceSidebar";
import type { BettarAppliance } from "@/types/appliance";

type CategoryFilterLayoutProps = {
  appliances: BettarAppliance[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  onClearBrands: () => void;
  children: ReactNode;
};

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

/**
 * Category-page layout with the sidebar hidden behind a "Filters" button,
 * matching /appliances: toggles the sidebar on desktop, opens a drawer on mobile.
 */
export default function CategoryFilterLayout({
  appliances,
  selectedBrands,
  onToggleBrand,
  onClearBrands,
  children,
}: CategoryFilterLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const activeCount = selectedBrands.length;
  const badge = activeCount > 0 && (
    <span className="bg-white text-[#002D72] px-2 py-0.5 rounded-full text-xs font-bold">{activeCount}</span>
  );

  const sidebar = (
    <ApplianceSidebar
      variant="category"
      appliances={appliances}
      selectedFilters={{ brand: selectedBrands }}
      onFilterChange={(_, value) => onToggleBrand(value)}
      onClearAll={onClearBrands}
    />
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsFilterModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#002D72] text-white rounded-lg font-semibold hover:bg-[#001F5C] transition-colors shadow-md"
        >
          <FilterIcon />
          Filters
          {badge}
        </button>
      </div>

      {/* Sidebar - hidden on mobile; toggled by the Filters button on desktop */}
      {isSidebarOpen && (
        <aside className="hidden lg:block w-full lg:w-64 xl:w-72 flex-shrink-0">{sidebar}</aside>
      )}

      <div className="w-full flex-1 space-y-8">
        {/* Desktop Filter Toggle Button */}
        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => setIsSidebarOpen((open) => !open)}
            aria-expanded={isSidebarOpen}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#002D72] text-white rounded-lg font-semibold hover:bg-[#001F5C] transition-colors shadow-md"
          >
            <FilterIcon />
            {isSidebarOpen ? "Hide Filters" : "Filters"}
            {badge}
          </button>
        </div>

        {children}
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterModalOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close filters"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">{sidebar}</div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="w-full bg-[#002D72] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001F5C] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
