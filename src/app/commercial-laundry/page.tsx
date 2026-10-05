import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessCapabilities from "@/components/BusinessCapabilities";

export const metadata: Metadata = { title: "Commercial Laundry Equipment & Project Support", description: "A shared laundry room, a fire station and a high-volume institutional operation have different needs. Bettar Appliance Master reviews your application, utilities, workload and installation requirements before recommending a sourcing path.", alternates: { canonical: "/commercial-laundry" } };
export default function Page() {
  return <div className="min-h-screen bg-white"><Header /><main>
    <section className="bg-gradient-to-br from-[#002D72] to-[#001a4d] text-white py-20 sm:py-24"><div className="max-w-7xl mx-auto px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-blue-100 mb-8"><Link href="/" className="underline">Home</Link> / Commercial Laundry Equipment & Project Support</nav>
      <p className="text-sm font-bold uppercase tracking-widest text-blue-200">Bettar Appliance Master</p>
      <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">Commercial laundry matched to the way you use it.</h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-blue-50">A shared laundry room, a fire station and a high-volume institutional operation have different needs. Bettar Appliance Master reviews your application, utilities, workload and installation requirements before recommending a sourcing path.</p>
      <div className="mt-8 flex flex-wrap gap-4"><a href="#project-contact" className="rounded-xl bg-[#dc2626] px-6 py-4 font-bold hover:bg-[#b91c1c]">Discuss your laundry project</a><a href="tel:301-949-2500" className="rounded-xl border border-white/60 px-6 py-4 font-bold">301-949-2500</a></div>
    </div></section>
    <BusinessCapabilities title="Built around your requirements" intro="Equipment is only part of the job. Start with the application, then plan the supply, installation and ongoing support." items={[{"title": "Light commercial", "body": "Familiar-size commercial washers, dryers and stack units for permitted commercial and institutional uses. Speed Queen Commercial is a starting point for equipment review."}, {"title": "Shared & multi-housing laundry", "body": "Apartment and condominium laundry rooms. Discuss capacity, space, payment requirements, controls and service expectations."}, {"title": "On-premises laundry", "body": "Higher-volume requirements for hospitality, fire and rescue, athletics and other institutions. UniMac equipment can be considered for heavier applications, subject to project and model confirmation."}, {"title": "Vended laundry", "body": "Huebsch and other appropriate commercial options can be reviewed for shared or revenue-producing laundry, with payment and management needs specified."}, {"title": "Specialized requirements", "body": "PPE drying, barrier washers and finishing equipment require application-specific review and confirmation of supply and support."}, {"title": "A complete project scope", "body": "Identify utilities, clearances, access, ventilation, equipment quantities and removal needs so pricing includes the work your site actually requires."}]} />
    <section id="project-contact" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24"><div className="rounded-2xl border border-[#002D72]/20 p-6 sm:p-10">
      <h2 className="text-3xl font-bold text-gray-900">Tell us about your laundry requirement</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">Tell us the end use, location, quantity, loads or pounds per day if known, available utilities, payment needs, and installation or service requirements. Equipment and brand availability are confirmed for each project.</p>
      <p className="mt-4 text-gray-600">Our team will review the scope and confirm model access, pricing, lead times and project fit before a commitment.</p>
      <div className="mt-6 flex flex-wrap gap-4"><a href="tel:301-949-2500" className="rounded-xl bg-[#002D72] px-6 py-3 text-white font-semibold">Call the Bettar team</a><Link href="/contact" className="rounded-xl border border-[#002D72] px-6 py-3 text-[#002D72] font-semibold">Contact Bettar</Link></div>
    </div></section>
    <section className="max-w-7xl mx-auto px-6 pb-16"><h2 className="text-2xl font-bold text-gray-900">Related services</h2><div className="mt-4 flex flex-wrap gap-6"><Link href="/partnerships" className="text-[#002D72] underline">Property management</Link><Link href="/commercial-institutional" className="text-[#002D72] underline">Commercial & institutional supply</Link><Link href="/appliances" className="text-[#002D72] underline">Shop appliances</Link></div></section>
  </main><Footer /></div>;
}
