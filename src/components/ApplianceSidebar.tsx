"use client";

import Link from "next/link";
import { useState } from "react";

type FilterState = {
  brand: string[];
  energy: string[];
  features: string[];
};

type PriceRange = {
  min: number;
  max: number;
};

type ApplianceSidebarProps = {
  selectedFilters?: FilterState;
  priceRange?: PriceRange;
  onFilterChange?: (filterType: keyof FilterState, value: string) => void;
  onPriceRangeChange?: (range: PriceRange) => void;
  onClearAll?: () => void;
};

export default function ApplianceSidebar({
  selectedFilters: externalFilters,
  priceRange: externalPriceRange,
  onFilterChange,
  onPriceRangeChange,
  onClearAll,
}: ApplianceSidebarProps = {}) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    categories: true,
    brand: true,
    price: true,
    energy: true,
    features: true,
  });
  
  // Use external filters if provided, otherwise use internal state
  const [internalFilters, setInternalFilters] = useState<FilterState>({
    brand: [],
    energy: [],
    features: [],
  });
  const [internalPriceRange, setInternalPriceRange] = useState<PriceRange>({ min: 0, max: 5000 });
  
  const selectedFilters = externalFilters || internalFilters;
  const priceRange = externalPriceRange || internalPriceRange;

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleFilter = (filterName: string) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    if (onFilterChange) {
      // Use external callback if provided
      onFilterChange(filterType, value);
    } else {
      // Use internal state
      setInternalFilters(prev => {
        const current = prev[filterType] || [];
        if (current.includes(value)) {
          return {
            ...prev,
            [filterType]: current.filter(v => v !== value)
          };
        } else {
          return {
            ...prev,
            [filterType]: [...current, value]
          };
        }
      });
    }
  };

  const handlePriceRangeChange = (newRange: PriceRange) => {
    if (onPriceRangeChange) {
      onPriceRangeChange(newRange);
    } else {
      setInternalPriceRange(newRange);
    }
  };

  const hasActiveFilters = 
    (selectedFilters.brand.length > 0) ||
    (selectedFilters.energy.length > 0) ||
    (selectedFilters.features.length > 0) ||
    (priceRange.min > 0 || priceRange.max < 5000);

  const clearAllFilters = () => {
    if (onClearAll) {
      onClearAll();
    } else {
      // Toggle off all selected filters
      if (onFilterChange) {
        [...selectedFilters.brand].forEach(brand => onFilterChange('brand', brand));
        [...selectedFilters.energy].forEach(energy => onFilterChange('energy', energy));
        [...selectedFilters.features].forEach(feature => onFilterChange('features', feature));
      } else {
        setInternalFilters({ brand: [], energy: [], features: [] });
      }
      
      if (onPriceRangeChange) {
        onPriceRangeChange({ min: 0, max: 5000 });
      } else {
        setInternalPriceRange({ min: 0, max: 5000 });
      }
    }
  };

  return (
    <div className="bg-white sticky top-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Categories</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-[#002D72] hover:text-[#001F5C] font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        <nav className="space-y-0">
          <button
            onClick={() => toggleCategory('appliances')}
            className="w-full flex items-center justify-between py-4 px-0 text-left text-gray-800 hover:text-[#002D72] transition-colors"
          >
            <span className="font-medium">Appliances by Category</span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${expandedCategory === 'appliances' ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedCategory === 'appliances' && (
            <div className="pl-4 space-y-0">
              <Link
                href="/appliances/refrigerators"
                className="w-full flex items-center justify-between py-3 px-0 text-left text-gray-700 hover:text-[#002D72] transition-colors"
              >
                <span className="font-medium text-sm">Refrigerators</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/appliances/dishwasher"
                className="w-full flex items-center justify-between py-3 px-0 text-left text-gray-700 hover:text-[#002D72] transition-colors"
              >
                <span className="font-medium text-sm">Dishwashers</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/appliances/range"
                className="w-full flex items-center justify-between py-3 px-0 text-left text-gray-700 hover:text-[#002D72] transition-colors"
              >
                <span className="font-medium text-sm">Ranges</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/appliances/washers"
                className="w-full flex items-center justify-between py-3 px-0 text-left text-gray-700 hover:text-[#002D72] transition-colors"
              >
                <span className="font-medium text-sm">Washers</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/appliances/dryer"
                className="w-full flex items-center justify-between py-3 px-0 text-left text-gray-700 hover:text-[#002D72] transition-colors"
              >
                <span className="font-medium text-sm">Dryers</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/appliances/microwave"
                className="w-full flex items-center justify-between py-3 px-0 text-left text-gray-700 hover:text-[#002D72] transition-colors"
              >
                <span className="font-medium text-sm">Microwaves</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/appliances/cooktops"
                className="w-full flex items-center justify-between py-3 px-0 text-left text-gray-700 hover:text-[#002D72] transition-colors"
              >
                <span className="font-medium text-sm">Cooktops</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/appliances/wall-oven"
                className="w-full flex items-center justify-between py-3 px-0 text-left text-gray-700 hover:text-[#002D72] transition-colors"
              >
                <span className="font-medium text-sm">Wall Ovens</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Brand Filter */}
      <div className="pt-1 px-6">
        <button
          onClick={() => toggleFilter('brand')}
          className="w-full flex items-center justify-between text-left mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900">Brand</h3>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${expandedFilters.brand ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedFilters.brand && (
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.brand.includes('whirlpool')}
                onChange={() => handleFilterChange('brand', 'whirlpool')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">Whirlpool (45)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.brand.includes('kitchenaid')}
                onChange={() => handleFilterChange('brand', 'kitchenaid')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">KitchenAid (38)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.brand.includes('ge')}
                onChange={() => handleFilterChange('brand', 'ge')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">GE (32)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.brand.includes('maytag')}
                onChange={() => handleFilterChange('brand', 'maytag')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">Maytag (28)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.brand.includes('samsung')}
                onChange={() => handleFilterChange('brand', 'samsung')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">Samsung (24)</span>
            </label>
            <Link href="/appliances" className="text-[#002D72] text-sm font-medium flex items-center mt-2">
              More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="pt-6 mt-6 px-6">
        <button
          onClick={() => toggleFilter('price')}
          className="w-full flex items-center justify-between text-left mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900">Price ($)</h3>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${expandedFilters.price ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedFilters.price && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceRangeChange({ ...priceRange, min: Number(e.target.value) })}
                className="w-20 px-3 py-2 border border-gray-300 rounded text-sm text-black"
                placeholder="0"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange({ ...priceRange, max: Number(e.target.value) })}
                className="w-20 px-3 py-2 border border-gray-300 rounded text-sm text-black"
                placeholder="5000"
              />
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange({ ...priceRange, max: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#002D72]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Energy Rating Filter */}
      <div className="pt-6 mt-6 px-6">
        <button
          onClick={() => toggleFilter('energy')}
          className="w-full flex items-center justify-between text-left mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900">Energy Rating</h3>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${expandedFilters.energy ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedFilters.energy && (
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.energy.includes('energy-star')}
                onChange={() => handleFilterChange('energy', 'energy-star')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">ENERGY STAR (156)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.energy.includes('high-efficiency')}
                onChange={() => handleFilterChange('energy', 'high-efficiency')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">High Efficiency (89)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.energy.includes('standard')}
                onChange={() => handleFilterChange('energy', 'standard')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">Standard (67)</span>
            </label>
          </div>
        )}
      </div>

      {/* Features Filter */}
      <div className="pt-6 mt-6 px-6 pb-6">
        <button
          onClick={() => toggleFilter('features')}
          className="w-full flex items-center justify-between text-left mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900">Features</h3>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${expandedFilters.features ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedFilters.features && (
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.features.includes('smart')}
                onChange={() => handleFilterChange('features', 'smart')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">Smart Features (78)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.features.includes('wifi')}
                onChange={() => handleFilterChange('features', 'wifi')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">Wi-Fi Enabled (54)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.features.includes('stainless')}
                onChange={() => handleFilterChange('features', 'stainless')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">Stainless Steel (142)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.features.includes('quiet')}
                onChange={() => handleFilterChange('features', 'quiet')}
                className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
              />
              <span className="ml-3 text-gray-700">Quiet Operation (91)</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

