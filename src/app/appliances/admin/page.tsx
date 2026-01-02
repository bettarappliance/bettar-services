"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminAuth from "@/components/AdminAuth";

type ApplianceFormData = {
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceFrom: string;
  priceOld: string;
  discountPercent: string;
  shortDescription: string;
  capacityKw: string;
  inStock: string; // "true" or "false"
  roomSize: string;
  supplyType: string;
  type: string;
  // Optional fields
  modelNumber: string;
  color: string;
  energyRating: string;
  warranty: string;
  categorySlug: string;
};

type ImageInput = {
  id: string;
  url: string;
};

type BettarAppliance = {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceFrom?: number;
  priceOld?: number;
  discountPercent?: number;
  shortDescription?: string;
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
  fullDescription?: string;
  images?: string[];
  categorySlug?: string;
  [key: string]: unknown; // Allow additional Firestore fields
};

function AdminPageContent() {
  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");
  const [appliances, setAppliances] = useState<BettarAppliance[]>([]);
  const [loadingAppliances, setLoadingAppliances] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<ApplianceFormData>({
    name: "",
    brand: "",
    category: "",
    imageUrl: "",
    priceFrom: "",
    priceOld: "",
    discountPercent: "",
    shortDescription: "",
    capacityKw: "",
    inStock: "true",
    roomSize: "",
    supplyType: "",
    type: "",
    modelNumber: "",
    color: "",
    energyRating: "",
    warranty: "",
    categorySlug: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [additionalImages, setAdditionalImages] = useState<ImageInput[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addAdditionalImage = () => {
    setAdditionalImages((prev) => [
      ...prev,
      { id: Date.now().toString(), url: "" },
    ]);
  };

  const removeAdditionalImage = (id: string) => {
    setAdditionalImages((prev) => prev.filter((img) => img.id !== id));
  };

  const updateAdditionalImage = (id: string, url: string) => {
    setAdditionalImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, url } : img))
    );
  };

  // Fetch all appliances
  const fetchAppliances = async () => {
    setLoadingAppliances(true);
    try {
      const ref = collection(db, "appliances");
      const q = query(ref, orderBy("name"));
      const snap = await getDocs(q);
      const items = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        } as BettarAppliance;
      });
      setAppliances(items);
    } catch (error) {
      console.error("Error fetching appliances:", error);
      setErrorMessage("Failed to fetch appliances");
    } finally {
      setLoadingAppliances(false);
    }
  };

  // Load appliance data into form for editing
  const handleEdit = (appliance: BettarAppliance) => {
    setEditingId(appliance.id);
    setActiveTab("add");
    setFormData({
      name: appliance.name || "",
      brand: appliance.brand || "",
      category: appliance.category || "",
      imageUrl: appliance.imageUrl || "",
      priceFrom: appliance.priceFrom?.toString() || "",
      priceOld: appliance.priceOld?.toString() || "",
      discountPercent: appliance.discountPercent?.toString() || "",
      shortDescription: appliance.shortDescription || "",
      capacityKw: appliance.capacityKw?.toString() || "",
      inStock: appliance.inStock ? "true" : "false",
      roomSize: appliance.roomSize || "",
      supplyType: appliance.supplyType || "",
      type: appliance.type || "",
      modelNumber: appliance.modelNumber || "",
      color: appliance.color || "",
      energyRating: appliance.energyRating || "",
      warranty: appliance.warranty || "",
      categorySlug: appliance.categorySlug || "",
    });
    if (appliance.images && Array.isArray(appliance.images)) {
      setAdditionalImages(
        appliance.images.map((url: string, index: number) => ({
          id: index.toString(),
          url: url,
        }))
      );
    } else {
      setAdditionalImages([]);
    }
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete appliance
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appliance?")) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "appliances", id));
      setAppliances((prev) => prev.filter((item) => item.id !== id));
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting appliance:", error);
      setErrorMessage("Failed to delete appliance");
      setDeletingId(null);
    }
  };

  // Update appliance
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Validation
    if (!formData.name.trim() || !formData.brand.trim() || !formData.category.trim() || !formData.imageUrl.trim()) {
      setErrorMessage("Name, Brand, Category, and Image URL are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const applianceData: Partial<BettarAppliance> & { name: string; brand: string; category: string; imageUrl: string } = {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        category: formData.category.trim(),
        imageUrl: formData.imageUrl.trim(),
        priceFrom: Number(formData.priceFrom),
        inStock: formData.inStock === "true",
      };

      if (formData.priceOld.trim()) {
        applianceData.priceOld = Number(formData.priceOld);
      }
      if (formData.discountPercent.trim()) {
        applianceData.discountPercent = Number(formData.discountPercent);
      }
      if (formData.shortDescription.trim()) {
        applianceData.shortDescription = formData.shortDescription.trim();
      }
      if (formData.capacityKw.trim()) {
        applianceData.capacityKw = Number(formData.capacityKw);
      }
      if (formData.roomSize.trim()) {
        applianceData.roomSize = formData.roomSize.trim();
      }
      if (formData.supplyType.trim()) {
        applianceData.supplyType = formData.supplyType.trim();
      }
      if (formData.type.trim()) {
        applianceData.type = formData.type.trim();
      }
      if (formData.modelNumber.trim()) {
        applianceData.modelNumber = formData.modelNumber.trim();
      }
      if (formData.color.trim()) {
        applianceData.color = formData.color.trim();
      }
      if (formData.energyRating.trim()) {
        applianceData.energyRating = formData.energyRating.trim();
      }
      if (formData.warranty.trim()) {
        applianceData.warranty = formData.warranty.trim();
      }
      if (formData.categorySlug.trim()) {
        applianceData.categorySlug = formData.categorySlug.trim();
      }

      const imageUrls = additionalImages
        .map((img) => img.url.trim())
        .filter((url) => url.length > 0);
      if (imageUrls.length > 0) {
        applianceData.images = imageUrls;
      }

      await updateDoc(doc(db, "appliances", editingId), applianceData);
      setSubmitStatus("success");
      setEditingId(null);
      fetchAppliances();
      
      // Reset form
      setFormData({
        name: "",
        brand: "",
        category: "",
        imageUrl: "",
        priceFrom: "",
        priceOld: "",
        discountPercent: "",
        shortDescription: "",
        capacityKw: "",
        inStock: "true",
        roomSize: "",
        supplyType: "",
        type: "",
        modelNumber: "",
        color: "",
        energyRating: "",
        warranty: "",
        categorySlug: "",
      });
      setAdditionalImages([]);

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error updating appliance:", error);
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to update appliance");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch appliances when manage tab is active
  useEffect(() => {
    if (activeTab === "manage") {
      fetchAppliances();
    }
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage("Name is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.brand.trim()) {
      setErrorMessage("Brand is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.category.trim()) {
      setErrorMessage("Category is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.imageUrl.trim()) {
      setErrorMessage("Image URL is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.priceFrom.trim() || isNaN(Number(formData.priceFrom))) {
      setErrorMessage("Valid price is required");
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for Firestore
      const applianceData: Record<string, string | number | boolean | string[]> = {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        category: formData.category.trim(),
        imageUrl: formData.imageUrl.trim(),
        priceFrom: Number(formData.priceFrom),
        inStock: formData.inStock === "true",
      };

      // Add optional fields if they have values
      if (formData.priceOld.trim()) {
        applianceData.priceOld = Number(formData.priceOld);
      }
      if (formData.discountPercent.trim()) {
        applianceData.discountPercent = Number(formData.discountPercent);
      }
      if (formData.shortDescription.trim()) {
        applianceData.shortDescription = formData.shortDescription.trim();
      }
      if (formData.capacityKw.trim()) {
        applianceData.capacityKw = Number(formData.capacityKw);
      }
      if (formData.roomSize.trim()) {
        applianceData.roomSize = formData.roomSize.trim();
      }
      if (formData.supplyType.trim()) {
        applianceData.supplyType = formData.supplyType.trim();
      }
      if (formData.type.trim()) {
        applianceData.type = formData.type.trim();
      }
      if (formData.modelNumber.trim()) {
        applianceData.modelNumber = formData.modelNumber.trim();
      }
      if (formData.color.trim()) {
        applianceData.color = formData.color.trim();
      }
      if (formData.energyRating.trim()) {
        applianceData.energyRating = formData.energyRating.trim();
      }
      if (formData.warranty.trim()) {
        applianceData.warranty = formData.warranty.trim();
      }
      if (formData.categorySlug.trim()) {
        applianceData.categorySlug = formData.categorySlug.trim();
      }

      // Add additional images if any
      const validAdditionalImages = additionalImages
        .map((img) => img.url.trim())
        .filter((url) => url.length > 0);
      if (validAdditionalImages.length > 0) {
        applianceData.images = validAdditionalImages;
      }

      // Add to Firestore
      const docRef = await addDoc(collection(db, "appliances"), applianceData);

      console.log("Appliance added with ID: ", docRef.id);
      setSubmitStatus("success");

      // Reset form
      setFormData({
        name: "",
        brand: "",
        category: "",
        imageUrl: "",
        priceFrom: "",
        priceOld: "",
        discountPercent: "",
        shortDescription: "",
        capacityKw: "",
        inStock: "true",
        roomSize: "",
        supplyType: "",
        type: "",
        modelNumber: "",
        color: "",
        energyRating: "",
        warranty: "",
        categorySlug: "",
      });
      setAdditionalImages([]);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error adding appliance:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to add appliance"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => {
                  setActiveTab("add");
                  setEditingId(null);
                  setFormData({
                    name: "",
                    brand: "",
                    category: "",
                    imageUrl: "",
                    priceFrom: "",
                    priceOld: "",
                    discountPercent: "",
                    shortDescription: "",
                    capacityKw: "",
                    inStock: "true",
                    roomSize: "",
                    supplyType: "",
                    type: "",
                    modelNumber: "",
                    color: "",
                    energyRating: "",
                    warranty: "",
                    categorySlug: "",
                  });
                  setAdditionalImages([]);
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === "add"
                    ? "border-[#002D72] text-[#002D72]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {editingId ? "Edit Appliance" : "Add New Appliance"}
              </button>
              <button
                onClick={() => setActiveTab("manage")}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === "manage"
                    ? "border-[#002D72] text-[#002D72]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Manage Appliances
              </button>
            </nav>
          </div>
        </div>

        {activeTab === "add" ? (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {editingId ? "Edit Appliance" : "Add New Appliance"}
          </h1>
          <p className="text-gray-600 mb-8">
              {editingId
                ? "Update the appliance information below."
                : "Fill out the form below to add a new appliance to the catalog."}
          </p>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {errorMessage}
            </div>
          )}

          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              Appliance added successfully!
            </div>
          )}

          <form onSubmit={editingId ? handleUpdate : handleSubmit} className="space-y-6">
            {/* Required Fields Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Required Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="e.g., Frigidaire Top Freezer Refrigerator"
                  />
                </div>

                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Brand *
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="e.g., Frigidaire"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-900"
                  >
                    <option value="">Select category</option>
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="Dishwasher">Dishwasher</option>
                    <option value="Range">Range</option>
                    <option value="Cooktop">Cooktop</option>
                    <option value="Microwave">Microwave</option>
                    <option value="Washer">Washer</option>
                    <option value="Dryer">Dryer</option>
                    <option value="Wall Oven">Ice Maker</option>
                    <option value="Ice Maker">Garbage Disposer</option>
                    <option value="Wall Oven">Compactor</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="priceFrom"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price (From) *
                  </label>
                  <input
                    type="number"
                    id="priceFrom"
                    name="priceFrom"
                    value={formData.priceFrom}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="809"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Primary Image URL *
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="/appliances-images/ref/image.jpg or https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This is the main image that will be displayed in listings. Use <code className="bg-gray-100 px-1 rounded">/appliances-images/ref/image.jpg</code> for local images or a full URL for external images.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Images Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Additional Images (Optional)
                </h2>
                <button
                  type="button"
                  onClick={addAdditionalImage}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  + Add Image
                </button>
              </div>

              {additionalImages.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No additional images added. Click &quot;Add Image&quot; to add more images.
                </p>
              ) : (
                <div className="space-y-3">
                  {additionalImages.map((image) => (
                    <div key={image.id} className="flex gap-2 items-start">
                      <input
                        type="text"
                        value={image.url}
                        onChange={(e) =>
                          updateAdditionalImage(image.id, e.target.value)
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                        placeholder="/appliances-images/ref/image2.jpg or https://example.com/image.jpg"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(image.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pricing
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="priceOld"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Old Price (optional)
                  </label>
                  <input
                    type="number"
                    id="priceOld"
                    name="priceOld"
                    value={formData.priceOld}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="899"
                  />
                </div>

                <div>
                  <label
                    htmlFor="discountPercent"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Discount % (optional)
                  </label>
                  <input
                    type="number"
                    id="discountPercent"
                    name="discountPercent"
                    value={formData.discountPercent}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h2>

              <div>
                <label
                  htmlFor="shortDescription"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Short Description (optional)
                </label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                  placeholder="Brief description of the appliance..."
                />
              </div>
            </div>

            {/* Specifications Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Specifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="capacityKw"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Capacity (kW) (optional)
                  </label>
                  <input
                    type="number"
                    id="capacityKw"
                    name="capacityKw"
                    value={formData.capacityKw}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="2.5"
                  />
                </div>

                <div>
                  <label
                    htmlFor="roomSize"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Room Size (optional)
                  </label>
                  <input
                    type="text"
                    id="roomSize"
                    name="roomSize"
                    value={formData.roomSize}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="e.g., Large, Medium, Small"
                  />
                </div>

                <div>
                  <label
                    htmlFor="supplyType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Supply Type (optional)
                  </label>
                  <select
                    id="supplyType"
                    name="supplyType"
                    value={formData.supplyType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-900"
                  >
                    <option value="">Select type</option>
                    <option value="Gas">Gas</option>
                    <option value="Electric">Electric</option>
                    <option value="Dual Fuel">Dual Fuel</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Type (optional)
                  </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="e.g., Top Freezer, Front Load"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inStock"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    In Stock *
                  </label>
                  <select
                    id="inStock"
                    name="inStock"
                    value={formData.inStock}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-900"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Information (Optional)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="modelNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Model Number
                  </label>
                  <input
                    type="text"
                    id="modelNumber"
                    name="modelNumber"
                    value={formData.modelNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="e.g., FRT18B3AW"
                  />
                </div>

                <div>
                  <label
                    htmlFor="color"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Color / Finish
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="e.g., Stainless Steel, Black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="energyRating"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Energy Rating
                  </label>
                  <input
                    type="text"
                    id="energyRating"
                    name="energyRating"
                    value={formData.energyRating}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="e.g., Energy Star Certified"
                  />
                </div>

                <div>
                  <label
                    htmlFor="warranty"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Warranty
                  </label>
                  <input
                    type="text"
                    id="warranty"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="e.g., 1 Year Parts & Labor"
                  />
                </div>

                <div>
                  <label
                    htmlFor="categorySlug"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category Slug (URL-friendly)
                  </label>
                  <input
                    type="text"
                    id="categorySlug"
                    name="categorySlug"
                    value={formData.categorySlug}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent placeholder:text-gray-600 text-gray-900"
                    placeholder="e.g., refrigerators"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#002D72] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding..." : "Add Appliance"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    name: "",
                    brand: "",
                    category: "",
                    imageUrl: "",
                    priceFrom: "",
                    priceOld: "",
                    discountPercent: "",
                    shortDescription: "",
                    capacityKw: "",
                    inStock: "true",
                    roomSize: "",
                    supplyType: "",
                    type: "",
                    modelNumber: "",
                    color: "",
                    energyRating: "",
                    warranty: "",
                    categorySlug: "",
                  });
                  setAdditionalImages([]);
                  setSubmitStatus("idle");
                  setErrorMessage("");
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Manage Appliances
                </h1>
                <p className="text-gray-600">
                  View, edit, and delete appliances in your catalog.
                </p>
              </div>
              <button
                onClick={fetchAppliances}
                className="px-4 py-2 bg-[#002D72] text-white rounded-lg font-semibold hover:bg-[#001F5C] transition-colors"
              >
                Refresh
              </button>
            </div>

            {loadingAppliances ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading appliances...</p>
              </div>
            ) : appliances.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No appliances found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Brand
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appliances.map((appliance) => (
                      <tr key={appliance.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-16 w-16 relative bg-gray-100 rounded flex items-center justify-center">
                            {appliance.imageUrl ? (
                              <Image
                                src={appliance.imageUrl}
                                alt={appliance.name || "Appliance"}
                                fill
                                className="object-contain rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent && !parent.querySelector('.placeholder-icon')) {
                                    const placeholder = document.createElement('div');
                                    placeholder.className = 'placeholder-icon text-gray-400 text-xs text-center p-2';
                                    placeholder.innerHTML = '📦<br/>No Image';
                                    parent.appendChild(placeholder);
                                  }
                                }}
                              />
                            ) : (
                              <div className="text-gray-400 text-xs text-center p-2">
                                📦<br/>No Image
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appliance.name || "N/A"}
                          </div>
                          {appliance.modelNumber && (
                            <div className="text-sm text-gray-500">
                              {appliance.modelNumber}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {appliance.brand || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {appliance.category || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${appliance.priceFrom?.toLocaleString() || "0"}
                          {appliance.discountPercent && (
                            <span className="ml-2 text-green-600 font-semibold">
                              ({appliance.discountPercent}% OFF)
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              appliance.inStock
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {appliance.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(appliance)}
                            className="text-[#002D72] hover:text-[#001F5C] mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(appliance.id)}
                            disabled={deletingId === appliance.id}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50"
                          >
                            {deletingId === appliance.id ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminAuth>
      <AdminPageContent />
    </AdminAuth>
  );
}

