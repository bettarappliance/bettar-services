"use client";

import { useState } from "react";
import RequestServiceModal from "../../components/RequestServiceModal";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Contact() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Contact Us
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Get In <span className="text-[#002D72]">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to get started? Contact us today for a free consultation and let us help you with all your home service needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Container with Shadow */}
          <div className="bg-white rounded-[20px] shadow-lg overflow-hidden" style={{boxShadow: '0px 8px 25px rgba(0,0,0,0.05)'}}>
            <div className="grid md:grid-cols-2">
              {/* Left Column - Contact Info Card */}
              <div className="bg-[#002D72] text-white p-12 rounded-l-[20px]">
                <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
                <p className="text-[#E5E7EB] mb-8 leading-relaxed">
                  We are committed to processing the information in order to contact you and talk.
                </p>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:301-949-2500" className="text-lg font-bold hover:underline">301-949-2500</a>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:Info@bettarappliance.com" className="text-lg hover:underline">Info@bettarappliance.com</a>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=10503+Wheatley+St,+Kensington,+MD+20895" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline">
                      10503 Wheatley St, Kensington, MD 20895, United States
                    </a>
                  </div>
                </div>
                </div>

              {/* Right Column - Contact Form */}
              <div className="bg-white p-12">
                <form className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">First Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your first name"
                        className="w-full px-0 py-3 border-0 border-b border-[#D1D5DB] focus:ring-0 focus:border-[#002D72] focus:outline-none text-[#111827]" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your last name"
                        className="w-full px-0 py-3 border-0 border-b border-[#D1D5DB] focus:ring-0 focus:border-[#002D72] focus:outline-none text-[#111827]" 
                      />
                    </div>
                  </div>
                  
                  {/* Email and Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">Email</label>
                      <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full px-0 py-3 border-0 border-b border-[#D1D5DB] focus:ring-0 focus:border-[#002D72] focus:outline-none text-[#111827]" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="Enter your phone number"
                        className="w-full px-0 py-3 border-0 border-b border-[#D1D5DB] focus:ring-0 focus:border-[#002D72] focus:outline-none text-[#111827]" 
                      />
                    </div>
                  </div>
                  
                  {/* Subject Selection */}
                  <div>
                    <h4 className="text-lg font-semibold text-[#111827] mb-4">Select Subject?</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="renovations" defaultChecked className="w-4 h-4 text-[#002D72] border-gray-300 focus:ring-[#002D72]" />
                        <span className="ml-3 text-[#111827]">Renovations & Remodeling</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="plumbing" className="w-4 h-4 text-[#002D72] border-gray-300 focus:ring-[#002D72]" />
                        <span className="ml-3 text-[#111827]">Plumbing & Heating</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="handyman" className="w-4 h-4 text-[#002D72] border-gray-300 focus:ring-[#002D72]" />
                        <span className="ml-3 text-[#111827]">Handyman Services</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="subject" value="appliance" className="w-4 h-4 text-[#002D72] border-gray-300 focus:ring-[#002D72]" />
                        <span className="ml-3 text-[#111827]">Appliance Sale and Service</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">Message</label>
                    <textarea 
                      rows={4} 
                      placeholder="Write your message..."
                      className="w-full px-0 py-3 border-0 border-b border-[#D1D5DB] focus:ring-0 focus:border-[#002D72] focus:outline-none text-[#111827] resize-none"
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <button type="submit" className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-3 px-8 rounded-[10px] transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Find <span className="text-[#002D72]">Us</span>
            </h2>
            <p className="text-xl text-gray-600">
              Visit our location in Kensington, Maryland
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3099.474143684913!2d-77.07329152458799!3d39.0273075390294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7cec489ef279d%3A0xb948d82f2aeb2eb0!2sBettar%20Appliance%20Service!5e0!3m2!1sen!2sph!4v1760628835724!5m2!1sen!2sph" 
              width="100%" 
              height="450" 
              style={{border: 0}} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
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
