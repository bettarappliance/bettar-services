import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-[#002D72] mb-6">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to our main services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-[#002D72] text-white px-8 py-4 rounded-lg hover:bg-[#1e3a8a] transition-colors font-semibold text-lg"
            >
              Go Home
            </Link>
            <Link 
              href="/services"
              className="bg-[#D32F2F] text-white px-8 py-4 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold text-lg"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
