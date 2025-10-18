"use client";

import Image from "next/image";
import { useState } from "react";
import RequestServiceModal from "../../components/RequestServiceModal";

export default function Contact() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1e3a8a] w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/bettarlogo.png"
              alt="Bettar Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-white font-semibold text-2xl">BETTAR SERVICES</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="/about" className="text-white hover:text-gray-300 transition-colors">About Us</a>
            <div className="relative group">
              <a href="/services" className="text-white hover:text-gray-300 transition-colors flex items-center">
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <a href="/services/renovations" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                    Renovations and Remodeling
                  </a>
                  <a href="/services/plumbing" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                    Plumbing and Heating
                  </a>
                  <a href="/services/handyman" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                    Handyman Repair and Services
                  </a>
                  <a href="/appliances" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a8a] transition-colors">
                    Appliances Services
                  </a>
                </div>
              </div>
            </div>
            <a href="/appliances" className="text-white hover:text-gray-300 transition-colors">Appliances</a>
            <a href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact Us</a>
          </nav>
          
          {/* CTA Button */}
          <a 
            href="/request-service"
            className="bg-[#dc2626] text-white px-6 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors font-medium"
          >
            Request Service
          </a>
        </div>
      </header>

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

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Section - Logo */}
          <div className="flex items-center mb-12 justify-center">
            <Image
              src="/bettarlogo.png"
              alt="Bettar Logo"
              width={40}
              height={40}
              className="w-10 h-10 mr-3"
            />
            <span className="text-2xl font-bold text-center">BETTAR SERVICES</span>
          </div>
          
          {/* Bottom Section - Links and Newsletter */}
          <div className="grid md:grid-cols-5 gap-8">
            {/* Reach Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Reach us</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>301-949-2500</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Info@bettarappliance.com</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>10503 Wheatley St, Kensington, MD 20895, United States</span>
                </div>
              </div>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="/about" className="block hover:text-gray-300 transition-colors">About</a>
                <a href="/contact" className="block hover:text-gray-300 transition-colors">Contact</a>
                <a href="/services" className="block hover:text-gray-300 transition-colors">Services</a>
              </div>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-gray-300 transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-gray-300 transition-colors">Terms & Services</a>
                <a href="#" className="block hover:text-gray-300 transition-colors">Terms of Use</a>
                <a href="#" className="block hover:text-gray-300 transition-colors">Refund Policy</a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/" className="block hover:text-gray-300 transition-colors">Home</a>
                <a href="/services" className="block hover:text-gray-300 transition-colors">Services</a>
                <a href="/appliances" className="block hover:text-gray-300 transition-colors">Appliances</a>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-[#D32F2F] p-2 rounded-lg max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-6 text-white text-center">Join Our Newsletter</h3>
              <div className="flex flex-col sm:flex-row gap-1 mb-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-lg text-gray-700 placeholder-gray-500 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-300 text-center">
                * Will send you weekly updates for your better tool management.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Request Service Modal */}
      <RequestServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
