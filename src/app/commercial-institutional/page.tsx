import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessCapabilities from "@/components/BusinessCapabilities";

export const metadata: Metadata = { title: "Commercial & Institutional Appliance Supply", description: "From a single replacement to a quantity purchase, Bettar Appliance Master helps turn your requirements into a practical equipment, delivery and installation plan. Based in Kensington, serving projects in DC, Maryland and Northern Virginia subject to location and scope.", alternates: { canonical: "/commercial-institutional" } };
export default function Page() {
  return <div className="min-h-screen bg-white"><Header /><main>
    <section className="bg-gradient-to-br from-[#002D72] to-[#001a4d] text-white py-20 sm:py-24"><div className="max-w-7xl mx-auto px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-blue-100 mb-8"><Link href="/" className="underline">Home</Link> / Commercial & Institutional Appliance Supply</nav>
      <p className="text-sm font-bold uppercase tracking-widest text-blue-200">Bettar Appliance Master</p>
      <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">Appliance supply, installation and service for government, institutions and property portfolios.</h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-blue-50">From a single replacement to a quantity purchase, Bettar Appliance Master helps turn your requirements into a practical equipment, delivery and installation plan. Based in Kensington, serving projects in DC, Maryland and Northern Virginia subject to location and scope.</p>
      <div className="mt-8 flex flex-wrap gap-4"><a href="#project-contact" className="rounded-xl bg-[#dc2626] px-6 py-4 font-bold hover:bg-[#b91c1c]">Request project pricing</a><a href="tel:301-949-2500" className="rounded-xl border border-white/60 px-6 py-4 font-bold">301-949-2500</a></div>
    </div></section>
    <BusinessCapabilities title="Built around your requirements" intro="Equipment is only part of the job. Start with the application, then plan the supply, installation and ongoing support." items={[{"title": "Government & local agencies", "body": "Appliance requirements for agency facilities, fire and rescue stations, schools, colleges and housing. Send your solicitation, specifications and deadline for review."}, {"title": "Supply & replacement", "body": "Refrigerators, freezers, ranges, dishwashers, microwaves, washers and dryers. Model selection is based on specifications, budget and confirmed availability."}, {"title": "Delivery, installation & removal", "body": "Ask for a complete project quote, including access requirements, delivery, installation, testing and removal of old equipment."}, {"title": "Property portfolios", "body": "Standard replacement models, unit-turn packages and quantity purchases for occupied and vacant units."}, {"title": "Repair & ongoing support", "body": "Repair-or-replace guidance and preventive-maintenance requirements reviewed against equipment, location and service needs."}, {"title": "Commercial laundry", "body": "Shared laundry rooms and institutional applications need the right equipment. Review light-commercial and heavier laundry requirements with Bettar."}]} />
    <section id="project-contact" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24"><div className="rounded-2xl border border-[#002D72]/20 p-6 sm:p-10">
      <h2 className="text-3xl font-bold text-gray-900">Need 5, 20 or 100 appliances?</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">For an RFQ, include your organization, project location, due date, solicitation number, models or specifications, quantities, and delivery, installation and removal requirements. Call us to arrange secure delivery of attachments.</p>
      <p className="mt-4 text-gray-600">Our team will review the scope and confirm model access, pricing, lead times and project fit before a commitment.</p>
      <div className="mt-6 flex flex-wrap gap-4"><a href="tel:301-949-2500" className="rounded-xl bg-[#002D72] px-6 py-3 text-white font-semibold">Call the Bettar team</a><Link href="/contact" className="rounded-xl border border-[#002D72] px-6 py-3 text-[#002D72] font-semibold">Contact Bettar</Link></div>
    </div></section>
    <section className="max-w-7xl mx-auto px-6 pb-16"><h2 className="text-2xl font-bold text-gray-900">Related services</h2><div className="mt-4 flex flex-wrap gap-6"><Link href="/partnerships" className="text-[#002D72] underline">Property management</Link><Link href="/commercial-laundry" className="text-[#002D72] underline">Commercial laundry</Link><Link href="/appliances" className="text-[#002D72] underline">Shop appliances</Link></div></section>
  </main><Footer /></div>;
}
