import Link from "next/link";

const paths = [
  { label: "Something stopped working", title: "Get it repaired.", body: "Tell us the appliance and the problem. Start with a $179 diagnosis, credited toward your approved repair.", href: "/request-service", action: "Request appliance repair" },
  { label: "Time for something new", title: "Find the right fit.", body: "Compare kitchen and laundry appliances with our Kensington team. Discuss delivery and installation before you decide.", href: "/showroom", action: "Plan your showroom visit" },
  { label: "You manage the property", title: "Keep things moving.", body: "Bring us the appliance issue, access details, and approval contact. Discuss repair or replacement for your property.", href: "/partnerships", action: "Explore property manager services" },
];

export default function CustomerPaths() {
  return <section aria-labelledby="customer-paths-heading" className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
    <h2 id="customer-paths-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">What can we help you with?</h2>
    <div className="mt-8 grid gap-5 md:grid-cols-3">{paths.map(path => <Link key={path.href} href={path.href} className="group flex flex-col rounded-2xl border border-[#002D72]/15 bg-white p-7 transition-colors hover:border-[#002D72] hover:bg-[#F4F7FF]">
      <p className="text-xs font-bold uppercase tracking-widest text-[#002D72]">{path.label}</p><h3 className="mt-4 text-2xl font-bold text-gray-900">{path.title}</h3><p className="mt-4 flex-1 leading-relaxed text-gray-600">{path.body}</p><p className="mt-6 font-semibold text-[#002D72]">{path.action} <span aria-hidden="true">→</span></p>
    </Link>)}</div>
  </section>;
}
