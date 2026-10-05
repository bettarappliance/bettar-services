"use client";

import ContactForm from "../../components/ContactForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Get In <span className="text-[#002D72]">Touch</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Need a repair, a replacement appliance or pricing for a project? Choose the path below or call our Kensington team at 301-949-2500.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[
        { href: "/request-service", title: "Appliance repair", body: "Request a diagnostic visit through our existing service form." },
        { href: "/appliances", title: "Appliance sales", body: "Browse appliances or request availability and pricing for a model." },
        { href: "/partnerships", title: "Property managers", body: "Repair, replacement, unit turns and recurring portfolio support." },
        { href: "/commercial-institutional", title: "Projects & RFQs", body: "Quantity purchases, institutional requirements and commercial laundry." }
      ].map(item => <Link key={item.href} href={item.href} className="rounded-2xl border border-[#002D72]/20 p-6 hover:bg-[#EEF4FF]"><h2 className="text-xl font-bold text-[#002D72]">{item.title}</h2><p className="mt-3 text-gray-600">{item.body}</p></Link>)}</div><p className="mt-6 text-gray-600">For project inquiries, include your organization, location, quantity and deadline in the message below. Call us to arrange sending specifications or attachments.</p></section>
      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm />
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
            <p className="text-base text-gray-500 mt-2">
              Open Monday – Friday, 8:00 AM – 5:00 PM
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


    </div>
  );
}
