"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RequestServiceModal from "../../components/RequestServiceModal";

export default function Insights() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const articles = [
    {
      id: 1,
      slug: "water-heater-repair-gaithersburg-md",
      image: "/insights/water-heater.jpg",
      category: "Plumbing Services",
      title: "Water Heater Repair Gaithersburg MD",
      description: "Expert water heater repair and replacement services in Gaithersburg. Same-day service for tankless and conventional water heaters.",
      date: "05 Feb 2026"
    },
    {
      id: 2,
      slug: "gaithersburg-emergency-plumber",
      image: "/insights/plumbing.jpg",
      category: "Emergency Services",
      title: "Emergency Plumber Gaithersburg MD - 24/7 Service",
      description: "Fast 24/7 emergency plumbing service in Gaithersburg. Burst pipes, drain clogs, water heater failures - we respond quickly.",
      date: "05 Feb 2026"
    },
    {
      id: 3,
      slug: "dishwasher-repair-buying-guide",
      image: "/insights/dishwasher.jpg",
      category: "Appliance Service",
      title: "Dishwasher Repair & Buying Guide",
      description: "Complete guide to dishwasher problems, repairs, and buying advice from your local appliance technician.",
      date: "05 Feb 2026"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-10 pb-5 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Blog
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Latest <span className="text-[#002D72]">Insights & Tips </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert advice on appliance care, home maintenance, and troubleshooting common problems.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link 
                href={`/insights/${article.slug}`}
                key={article.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group cursor-pointer block"
              >
                <div className="h-64 relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">{article.category}</p>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#002D72] transition-colors">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                  <p className="text-gray-500 text-xs">{article.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-12">
            Quick Maintenance Tips
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Regular Cleaning</h3>
              <p className="text-gray-600 text-sm">
                Clean appliance filters and coils regularly to maintain efficiency and prevent breakdowns.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Check Water Lines</h3>
              <p className="text-gray-600 text-sm">
                Inspect water supply lines for leaks or wear to prevent water damage.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Don&apos;t Overload</h3>
              <p className="text-gray-600 text-sm">
                Avoid overloading washers and dryers to extend their lifespan and maintain performance.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#002D72] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Annual Service</h3>
              <p className="text-gray-600 text-sm">
                Schedule professional maintenance annually to catch issues before they become major problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#002D72]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need Expert Help?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Our experienced technicians are ready to help with all your appliance and home service needs.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-4 px-10 rounded-lg transition-colors text-lg"
          >
            Schedule Service Now
          </button>
        </div>
      </section>

      <Footer />

      {/* Request Service Modal */}
      <RequestServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
