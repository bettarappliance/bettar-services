"use client";

import Image from "next/image";
import Link from "next/link";
import type { BettarAppliance } from "@/types/appliance";

type Props = {
  item: BettarAppliance;
  onBuyNow: (name: string) => void;
};

export default function ApplianceProductCard({ item, onBuyNow }: Props) {
  return (
    <Link
      href={`/appliances/${item.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
    >
      <div className="relative">
        {item.discountPercent ? (
          <div className="absolute top-2 right-2 z-10 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
            {item.discountPercent}% OFF
          </div>
        ) : null}
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
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent && !parent.querySelector(".placeholder-icon")) {
                  const placeholder = document.createElement("div");
                  placeholder.className = "placeholder-icon text-gray-400 text-center";
                  placeholder.innerHTML =
                    '<div class="text-4xl mb-2">📦</div><div class="text-sm">No Image Available</div>';
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
          {item.images && item.images.length > 0 ? (
            <div className="absolute bottom-2 right-2 bg-[#002D72] text-white text-xs px-2 py-1 rounded-full font-semibold">
              +{item.images.length} more
            </div>
          ) : null}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        {item.modelNumber ? <p className="text-xs text-gray-400 mb-1">{item.modelNumber}</p> : null}
        <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2 group-hover:text-[#002D72] transition-colors">
          {item.name}
        </h3>
        <p className="text-xs text-gray-500 mb-1">
          {item.brand} • {item.category}
        </p>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-bold text-[#002D72]">
            ${item.priceFrom.toLocaleString()}
          </span>
          {item.priceOld ? (
            <span className="text-gray-500 line-through text-sm">
              ${item.priceOld.toLocaleString()}
            </span>
          ) : null}
        </div>
        {item.discountPercent ? (
          <p className="text-green-600 font-medium text-xs">Save {item.discountPercent}% on this model</p>
        ) : null}
        {item.shortDescription ? (
          <p className="text-gray-600 text-sm line-clamp-2 mt-1 mb-2">{item.shortDescription}</p>
        ) : null}
        {item.inStock === false ? (
          <p className="text-red-600 font-medium text-xs mt-1 mb-2">Out of Stock</p>
        ) : null}
      </div>
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onBuyNow(item.name);
          }}
          className="w-full py-2.5 rounded-lg bg-[#002D72] text-white font-semibold text-sm text-center hover:bg-[#001F5C] transition-colors shadow-md hover:shadow-lg"
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
}
