"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

type FilterState = {
  brand: string[];
};

type PriceRange = {
  min: number;
  max: number;
};

type Appliance = {
  id: string;
  brand?: string;
  [key: string]: unknown;
};

type ApplianceSidebarProps = {
  selectedFilters?: FilterState;
  priceRange?: PriceRange;
  onFilterChange?: (filterType: keyof FilterState, value: string) => void;
  onPriceRangeChange?: (range: PriceRange) => void;
  onClearAll?: () => void;
  appliances?: Appliance[];
};

export default function ApplianceSidebar({
  selectedFilters: externalFilters,
  priceRange: externalPriceRange,
  onFilterChange,
  onPriceRangeChange,
  onClearAll,
  appliances = [],
}: ApplianceSidebarProps = {}) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    categories: true,
    brand: true,
    price: true,
  });
  const [showAllBrands, setShowAllBrands] = useState(false);
  
  // Use external filters if provided, otherwise use internal state
  const [internalFilters, setInternalFilters] = useState<FilterState>({
    brand: [],
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
    (priceRange.min > 0 || priceRange.max < 5000);

  const clearAllFilters = () => {
    if (onClearAll) {
      onClearAll();
    } else {
      // Toggle off all selected filters
      if (onFilterChange) {
        [...selectedFilters.brand].forEach(brand => onFilterChange('brand', brand));
      } else {
        setInternalFilters({ brand: [] });
      }
      
      if (onPriceRangeChange) {
        onPriceRangeChange({ min: 0, max: 5000 });
      } else {
        setInternalPriceRange({ min: 0, max: 5000 });
      }
    }
  };

  // Extract unique brands from appliances with counts
  const brandList = useMemo(() => {
    const brandCounts: Record<string, number> = {};
    
    appliances.forEach((appliance) => {
      if (appliance.brand) {
        const brand = appliance.brand.trim();
        if (brand) {
          brandCounts[brand] = (brandCounts[brand] || 0) + 1;
        }
      }
    });

    // Sort by count (descending), then alphabetically
    return Object.entries(brandCounts)
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.brand.localeCompare(b.brand);
      });
  }, [appliances]);

  const displayedBrands = showAllBrands ? brandList : brandList.slice(0, 5);

  return (
    <div className="bg-white lg:sticky lg:top-24">
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
            {displayedBrands.length > 0 ? (
              <>
                {displayedBrands.map(({ brand, count }) => {
                  const brandLower = brand.toLowerCase();
                  const isChecked = selectedFilters.brand.some(b => {
                    const filterBrandLower = b.toLowerCase();
                    return brandLower === filterBrandLower || 
                           brandLower.includes(filterBrandLower) || 
                           filterBrandLower.includes(brandLower);
                  });
                  return (
                    <label key={brand} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleFilterChange('brand', brandLower)}
                        className="w-4 h-4 text-[#002D72] border-gray-300 rounded focus:ring-[#002D72]"
                      />
                      <span className="ml-3 text-gray-700">{brand} ({count})</span>
                    </label>
                  );
                })}
                {brandList.length > 5 && (
                  <button
                    onClick={() => setShowAllBrands(!showAllBrands)}
                    className="text-[#002D72] text-sm font-medium flex items-center mt-2 hover:text-[#001F5C] transition-colors"
                  >
                    {showAllBrands ? 'Show Less' : `Show More (${brandList.length - 5} more)`}
                    <svg 
                      className={`w-4 h-4 ml-1 transition-transform ${showAllBrands ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-sm">No brands available</p>
            )}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="pt-6 mt-6 px-6 pb-6">
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
    </div>
  );
}

