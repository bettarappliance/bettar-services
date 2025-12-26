"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Script from "next/script";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Gallery = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  location?: string;
  date?: string;
  images?: string[];
  featured?: boolean;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Gallery[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<Gallery[]>([]);
  const [categories, setCategories] = useState<string[]>(["all"]);

  // Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const ref = collection(db, "projects");
        const q = query(ref, orderBy("date", "desc"));
        const snap = await getDocs(q);
        const items: Gallery[] = snap.docs.map((doc) => {
          const data = doc.data() as Omit<Gallery, "id">;
          return { id: doc.id, ...data };
        });
        
        // If no items from Firestore, use static fallback
        const finalItems = items.length > 0 ? items : getStaticGallery();
        setProjects(finalItems);
        setFilteredProjects(finalItems);
        
        // Update categories
        const uniqueCategories = Array.from(new Set(finalItems.map((p) => p.category).filter(Boolean)));
        setCategories(["all", ...uniqueCategories]);
      } catch (error) {
        console.error("Error loading projects from Firestore", error);
        // If Firestore fails, use static projects as fallback
        const staticItems = getStaticGallery();
        setProjects(staticItems);
        setFilteredProjects(staticItems);
        const uniqueCategories = Array.from(new Set(staticItems.map((p) => p.category).filter(Boolean)));
        setCategories(["all", ...uniqueCategories]);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects by category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory)
      );
    }
  }, [selectedCategory, projects]);

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Our Projects",
    "description": "Explore our portfolio of completed projects including renovations, plumbing, handyman services, and more in Bethesda, Chevy Chase, Rockville, Kensington, Potomac, Olney, Gaithersburg, and Germantown, MD.",
    "url": "https://bettarservices.com/projects",
  };

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="projects-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />

      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Portfolio
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Our <span className="text-[#002D72]">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of completed projects. From kitchen renovations to plumbing installations, see the quality workmanship that has made Bettar Services a trusted name since 1945.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#002D72] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "All Projects" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {loadingProjects ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">
              No projects found in this category.
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-[#002D72] hover:underline font-semibold"
            >
              View all projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full bg-gray-100 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <div className="text-4xl mb-2">📸</div>
                        <div className="text-sm">No Image</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {project.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#002D72] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>
                  )}
                  {project.images && project.images.length > 0 && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-[#002D72] px-2 py-1 rounded-full text-xs font-semibold">
                        +{project.images.length} photos
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {project.title}
                    </h3>
                    {project.location && (
                      <p className="text-white/90 text-sm">
                        📍 {project.location}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 font-bold text-lg mb-2 group-hover:text-[#002D72] transition-colors">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  )}
                  {project.date && (
                    <p className="text-gray-500 text-xs">
                      Completed: {(() => {
                        try {
                          const date = new Date(project.date);
                          return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                        } catch {
                          return project.date;
                        }
                      })()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* CTA Section */}
      <section className="bg-[#002D72] text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Service?
          </h2>
          <p className="text-xl text-[#E0E7FF] mb-8 max-w-2xl mx-auto">
            Let us bring the same quality and attention to detail to your next project. Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/request-service"
              className="bg-[#D32F2F] text-white px-8 py-3 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold text-lg"
            >
              Request Service
            </Link>
            <Link
              href="/contact"
              className="bg-white text-[#002D72] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Static projects fallback (from homepage)
function getStaticGallery(): Gallery[] {
  return [
    {
      id: "1",
      title: "Windows & Doors",
      category: "Windows & Doors",
      imageUrl: "/projects/Windows & Doors 1.jpg",
    },
    {
      id: "2",
      title: "Windows & Doors",
      category: "Windows & Doors",
      imageUrl: "/projects/Windows & Doors 6.jpg",
    },
    {
      id: "3",
      title: "Kitchen Remodeling",
      category: "Kitchen Remodeling",
      imageUrl: "/projects/Kitchen remodelling 3.jpg",
    },
    {
      id: "4",
      title: "Landscaping & Lawn",
      category: "Landscaping",
      imageUrl: "/projects/Landscaping & Lawn Maint 1.jpg",
    },
    {
      id: "5",
      title: "Cabinet Installation",
      category: "Kitchen Remodeling",
      imageUrl: "/projects/Cabinet installation 2.jpg",
    },
    {
      id: "6",
      title: "Concrete Work",
      category: "Concrete",
      imageUrl: "/projects/Concrete work 3.jpg",
    },
    {
      id: "7",
      title: "Deck",
      category: "Deck",
      imageUrl: "/projects/Deck 7.jpg",
    },
    {
      id: "8",
      title: "Windows",
      category: "Windows & Doors",
      imageUrl: "/projects/Windows & Doors 7.jpg",
    },
    {
      id: "9",
      title: "Sub-Zero Refrigerator Repair",
      category: "Appliance Repair",
      imageUrl: "/projects/subzero.jpg",
      description: "A client reported that her Sub-Zero refrigerator was making a loud, intermittent noise. Upon inspection, we found that the issue was caused by a faulty ice maker and a worn-out freezer door gasket, both of which needed replacement.",
      images: ["/projects/subzero.jpg", "/projects/subzero1.jpg"],
    },
  ];
}
