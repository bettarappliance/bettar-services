import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kensington Appliance Showroom | Bettar Appliance Master",
  description: "Plan your visit to Bettar Appliance Master's Kensington showroom. Compare kitchen and laundry appliances and discuss delivery, installation, and replacement at 10503 Wheatley St.",
  alternates: { canonical: "https://www.bettarservices.com/showroom" },
};

const categories = [
  { title: "Refrigeration", description: "Find the right capacity, layout, and fit for your kitchen.", href: "/appliances/refrigerators" },
  { title: "Cooking", description: "Compare ranges, cooktops, and ovens around how you cook.", href: "/appliances/range" },
  { title: "Dishwashers", description: "Consider loading space, noise, and everyday cleaning needs.", href: "/appliances/dishwasher" },
  { title: "Laundry", description: "Match your washer and dryer to your space and household.", href: "/appliances/washers" },
];

export default function ShowroomPage() {
  return <><Header /><main id="main-content">
    <section className="bg-[#F4F7FF]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#002D72]">Kensington, Maryland</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-6xl">Your kitchen.<br />Your laundry.<br /><span className="text-[#002D72]">Your local appliance team.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">Start with your space and how you use it. We can help you compare appliances, check measurements, and discuss delivery and installation before you decide.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="tel:301-949-2500" className="rounded-xl bg-[#D32F2F] px-6 py-4 font-semibold text-white hover:bg-[#B71C1C]">Call to plan your visit</a>
            <a href="https://maps.app.goo.gl/jWiLxN1TavWfZNKK6" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#002D72] px-6 py-4 font-semibold text-[#002D72]">Get directions</a>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-gray-600">10503 Wheatley St · Kensington, MD 20895<br />Call 301-949-2500 to confirm hours and availability of specific models.</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-sm">
          <Image src="/IMG_0274.png" alt="Bettar team at the Kensington office with appliance brand displays" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm font-bold uppercase tracking-widest text-[#002D72]">Choose with confidence</p>
      <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Appliances that fit your home.</h2>
      <p className="mt-4 max-w-3xl text-lg text-gray-600">Ask about Whirlpool, Maytag, KitchenAid, GE Appliances, Speed Queen, and Samsung. Display models and inventory vary; contact us before visiting to see a particular appliance.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{categories.map(item => <Link key={item.title} href={item.href} className="rounded-2xl border border-gray-200 p-6 transition-colors hover:border-[#002D72] hover:bg-[#F4F7FF]">
        <h3 className="text-xl font-bold text-[#002D72]">{item.title}</h3><p className="mt-3 leading-relaxed text-gray-600">{item.description}</p><p className="mt-5 font-semibold text-[#002D72]">Browse options <span aria-hidden="true">→</span></p>
      </Link>)}</div>
    </section>
    <section className="bg-[#002D72] text-white"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2">
      <div><h2 className="text-3xl font-bold">Bring a few details.<br />Leave with a clearer plan.</h2><p className="mt-4 max-w-lg leading-relaxed text-white/80">A photo and a few measurements help us narrow the choices. If you are replacing an appliance, your existing model number is a useful starting point.</p></div>
      <ul className="grid gap-4 sm:grid-cols-2">{["Width, height, and depth of the opening", "Photos of the space and existing appliance", "Current model number, if available", "Doorways, stairs, and delivery access", "Gas or electric connections and venting", "Your priorities, budget, and timing"].map(item => <li key={item} className="rounded-xl border border-white/20 p-4 text-sm leading-relaxed">{item}</li>)}</ul>
    </div></section>
    <section className="mx-auto max-w-7xl px-6 py-16"><div className="grid gap-8 lg:grid-cols-2">
      <div><h2 className="text-3xl font-bold text-gray-900">From selection to installation.</h2><p className="mt-4 text-lg leading-relaxed text-gray-600">Ask our team about delivery, installation requirements, and removal of your old appliance. Confirm the scope and charges with your quote so you know what to expect.</p><Link href="/appliances" className="mt-6 inline-block rounded-xl bg-[#002D72] px-6 py-3 font-semibold text-white">Browse appliances</Link></div>
      <div className="rounded-2xl bg-[#F4F7FF] p-7"><h2 className="text-2xl font-bold text-gray-900">Repair or replace?</h2><p className="mt-4 leading-relaxed text-gray-600">If you are still deciding, start with an appliance diagnosis. The $179 diagnostic fee is credited toward your approved repair. It does not apply to a new appliance purchase.</p><Link href="/request-service" className="mt-5 inline-block font-semibold text-[#002D72] underline underline-offset-4">Request a diagnostic visit</Link></div>
    </div></section>
    <section className="border-t border-gray-200 bg-gray-50"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-2xl font-bold text-gray-900">Replacing appliances across several properties?</h2><p className="mt-2 text-gray-600">Discuss coordinated repair, replacement, and installation with our team.</p></div><Link href="/partnerships" className="shrink-0 rounded-xl border border-[#002D72] px-6 py-3 font-semibold text-[#002D72]">Property manager services</Link></div></section>
  </main><Footer /></>;
}
