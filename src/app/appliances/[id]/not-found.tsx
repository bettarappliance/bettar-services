import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ApplianceNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Appliance Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          We couldn&apos;t find that appliance. It may have been removed or the link is incorrect.
        </p>
        <Link
          href="/appliances"
          className="inline-flex items-center gap-2 bg-[#002D72] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#001F5C] transition-colors"
        >
          Browse All Appliances
        </Link>
      </div>
      <Footer />
    </div>
  );
}
