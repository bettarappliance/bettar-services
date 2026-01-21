"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ApplianceRequestModal from "../../../components/ApplianceRequestModal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

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
  fullDescription?: string;
  capacityKw?: number;
  inStock?: boolean;
  roomSize?: string;
  supplyType?: string;
  type?: string;
  modelNumber?: string;
  color?: string;
  energyRating?: string;
  warranty?: string;
  features?: string[];
  images?: string[];
  categorySlug?: string;
};

export default function ApplianceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [appliance, setAppliance] = useState<BettarAppliance | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isApplianceModalOpen, setIsApplianceModalOpen] = useState(false);
  const [selectedApplianceName, setSelectedApplianceName] = useState<string>("");

  useEffect(() => {
    const fetchAppliance = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, "appliances", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as Omit<BettarAppliance, "id">;
          setAppliance({ id: docSnap.id, ...data });
        } else {
          // Appliance not found, redirect to appliances page
          router.push("/appliances");
        }
      } catch (error) {
        console.error("Error loading appliance:", error);
        router.push("/appliances");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliance();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D72]"></div>
            <p className="mt-4 text-gray-600">Loading appliance details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!appliance) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Appliance Not Found</h1>
            <p className="text-gray-600 mb-6">The appliance you're looking for doesn't exist.</p>
            <Link
              href="/appliances"
              className="inline-block px-6 py-3 bg-[#002D72] text-white rounded-lg font-semibold hover:bg-[#001F5C] transition-colors"
            >
              Browse All Appliances
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = appliance.images && appliance.images.length > 0 
    ? [appliance.imageUrl, ...appliance.images]
    : [appliance.imageUrl];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#002D72] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/appliances" className="hover:text-[#002D72] transition-colors">Appliances</Link>
            <span>/</span>
            <Link 
              href={`/appliances/${appliance.categorySlug || appliance.category.toLowerCase()}`} 
              className="hover:text-[#002D72] transition-colors capitalize"
            >
              {appliance.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{appliance.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={allImages[currentImageIndex]}
                alt={appliance.name}
                fill
                className="object-contain p-4"
                priority
              />
              {appliance.discountPercent && (
                <div className="absolute top-4 left-4 bg-[#002D72] text-white px-4 py-2 rounded-lg text-sm font-semibold z-10">
                  {appliance.discountPercent}% OFF
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? "border-[#002D72] ring-2 ring-[#002D72] ring-offset-2"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${appliance.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {appliance.brand} • {appliance.category}
              </p>
              {appliance.modelNumber && (
                <p className="text-xs text-gray-400">Model: {appliance.modelNumber}</p>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {appliance.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#002D72]">
                ${appliance.priceFrom.toLocaleString()}
              </span>
              {appliance.priceOld && (
                <span className="text-xl text-gray-500 line-through">
                  ${appliance.priceOld.toLocaleString()}
                </span>
              )}
            </div>

            {appliance.discountPercent && (
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                Save {appliance.discountPercent}% on this model
              </div>
            )}

            {/* Stock Status */}
            {appliance.inStock === false ? (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                <p className="font-semibold">Out of Stock</p>
                <p className="text-sm">Contact us for availability</p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                <p className="font-semibold">In Stock</p>
                <p className="text-sm">Available for purchase</p>
              </div>
            )}

            {/* Short Description */}
            {appliance.shortDescription && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{appliance.shortDescription}</p>
              </div>
            )}

            {/* Full Description */}
            {appliance.fullDescription && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {appliance.fullDescription}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {appliance.brand && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Brand</dt>
                    <dd className="text-sm text-gray-900">{appliance.brand}</dd>
                  </>
                )}
                {appliance.category && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                    <dd className="text-sm text-gray-900 capitalize">{appliance.category}</dd>
                  </>
                )}
                {appliance.modelNumber && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Model Number</dt>
                    <dd className="text-sm text-gray-900">{appliance.modelNumber}</dd>
                  </>
                )}
                {appliance.type && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="text-sm text-gray-900 capitalize">{appliance.type}</dd>
                  </>
                )}
                {appliance.color && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Color</dt>
                    <dd className="text-sm text-gray-900 capitalize">{appliance.color}</dd>
                  </>
                )}
                {appliance.energyRating && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Energy Rating</dt>
                    <dd className="text-sm text-gray-900">{appliance.energyRating}</dd>
                  </>
                )}
                {appliance.supplyType && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Supply Type</dt>
                    <dd className="text-sm text-gray-900">{appliance.supplyType}</dd>
                  </>
                )}
                {appliance.capacityKw && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Capacity</dt>
                    <dd className="text-sm text-gray-900">{appliance.capacityKw} kW</dd>
                  </>
                )}
                {appliance.roomSize && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Room Size</dt>
                    <dd className="text-sm text-gray-900">{appliance.roomSize}</dd>
                  </>
                )}
                {appliance.warranty && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Warranty</dt>
                    <dd className="text-sm text-gray-900">{appliance.warranty}</dd>
                  </>
                )}
              </dl>
            </div>

            {/* Features */}
            {appliance.features && appliance.features.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {appliance.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-[#002D72] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Buy Now Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => {
                  setSelectedApplianceName(appliance.name);
                  setIsApplianceModalOpen(true);
                }}
                className="w-full bg-[#002D72] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#001F5C] transition-colors shadow-lg hover:shadow-xl"
              >
                Request Quote / Buy Now
              </button>
              <p className="text-sm text-gray-600 text-center mt-3">
                Our team will contact you to confirm availability and schedule delivery
              </p>
            </div>
          </div>
        </div>

        {/* Back to Appliances Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/appliances"
            className="inline-flex items-center text-[#002D72] hover:text-[#001F5C] font-semibold transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Appliances
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

