import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DiagnosticFeeNotice from "../../components/DiagnosticFeeNotice";
import {
  DIAGNOSTIC_FEE_LABEL,
  ADDITIONAL_APPLIANCE_FEE_LABEL,
  QUOTE_VALID_DAYS,
  REPAIR_WARRANTY_DAYS,
  HANDYMAN_RATES,
  INSTALLATION_MINIMUMS,
  INSTALLATION_ADD_ONS,
} from "@/lib/pricing";

const faqs = [
  {
    q: "How much is an appliance repair visit?",
    a: `The diagnostic visit is ${DIAGNOSTIC_FEE_LABEL}. A technician comes to your home, finds the cause of the problem, and gives you a repair estimate before any repair work begins.`,
  },
  {
    q: `Is the ${DIAGNOSTIC_FEE_LABEL} credited toward my repair?`,
    a: `Yes. If you approve the repair, the ${DIAGNOSTIC_FEE_LABEL} is credited toward your repair cost.`,
  },
  {
    q: "What if I decide not to repair?",
    a: `You pay only the ${DIAGNOSTIC_FEE_LABEL} diagnostic fee, which covers the technician's visit and diagnosis.`,
  },
  {
    q: "How are repair prices set?",
    a: "We use flat-rate pricing based on the Blue Book, the national price guide for major appliance service. Each repair has a set price based on the job's difficulty and the appliance brand, not on how long it takes. You know the full price before any work begins.",
  },
  {
    q: "What if I need more than one appliance checked?",
    a: `Each additional appliance diagnosed on the same visit is ${ADDITIONAL_APPLIANCE_FEE_LABEL}. If you approve repairs on both, ${DIAGNOSTIC_FEE_LABEL} is credited toward the higher-priced repair and ${ADDITIONAL_APPLIANCE_FEE_LABEL} toward the other. If you repair only one, ${DIAGNOSTIC_FEE_LABEL} is credited toward that repair.`,
  },
  {
    q: "How long is my repair quote valid?",
    a: `Repair quotes are valid for ${QUOTE_VALID_DAYS} days. The ${DIAGNOSTIC_FEE_LABEL} credit applies to repairs of the diagnosed issue approved within ${QUOTE_VALID_DAYS} days of your diagnostic visit. After that, prices may change.`,
  },
  {
    q: "Do repairs come with a warranty?",
    a: `Yes. Completed repairs carry a ${REPAIR_WARRANTY_DAYS}-day parts and labor warranty under normal use. The warranty does not cover misuse, neglect, unrelated issues, or customer-supplied parts. Parts supplied by Bettar are non-refundable once installed.`,
  },
  {
    q: "Can I supply my own parts?",
    a: "Yes, but customer-supplied parts are not covered by our warranty, and additional labor charges may apply if a part turns out to be defective or incompatible.",
  },
  {
    q: `Can the ${DIAGNOSTIC_FEE_LABEL} be applied toward a new appliance?`,
    a: `No. The ${DIAGNOSTIC_FEE_LABEL} credit applies to repair service only and is not applied toward the purchase of a new appliance. If you decide to replace instead of repair, ask our sales team about current promotions.`,
  },
];

const otherServices = [
  { name: "Plumbing and heating", href: "/services/plumbing" },
  { name: "Renovations and remodeling", href: "/services/renovations" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ServicePricing() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block bg-[#E6EDFF] text-[#002D72] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Service Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Clear pricing, <span className="text-[#002D72]">before we start</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Here is how our pricing works for appliance repair, handyman services, and installation, so there are no surprises when our team arrives.
          </p>
          <p className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto">
            Prices are subject to change and may vary depending on the appliance, brand, job, and location. Your final price is confirmed in your written quote before any work begins.
          </p>
        </div>
      </section>

      {/* Diagnostic fee */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <DiagnosticFeeNotice variant="full" showLink={false} />
        </div>
      </section>

      {/* Handyman */}
      <section className="py-16 bg-[#F4F7FF]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">Handyman services</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Hourly labor rates. Materials are not included and are quoted separately.
          </p>
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-[#002D72] text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Crew</th>
                  <th scope="col" className="px-4 py-3 font-semibold">First hour</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Each additional hour</th>
                </tr>
              </thead>
              <tbody>
                {HANDYMAN_RATES.map((r) => (
                  <tr key={r.crew} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.crew}</td>
                    <td className="px-4 py-3 text-gray-700">${r.firstHour}</td>
                    <td className="px-4 py-3 text-gray-700">${r.additionalHour}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">Installation &amp; haul-away</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Minimum fees for appliances purchased from Bettar. Pricing varies for appliances purchased elsewhere, so call us for a quote.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {INSTALLATION_MINIMUMS.map((i) => (
              <li key={i.item} className="flex items-center justify-between gap-4 rounded-xl bg-[#F4F7FF] px-5 py-3">
                <span className="font-medium text-gray-900">{i.item}</span>
                <span className="text-gray-700 whitespace-nowrap">from {i.price}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 mb-3 text-lg font-bold text-gray-900">Add-ons</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {INSTALLATION_ADD_ONS.map((i) => (
              <li key={i.item} className="flex items-center justify-between gap-4 rounded-xl bg-[#F4F7FF] px-5 py-3">
                <span className="font-medium text-gray-900">{i.item}</span>
                <span className="text-gray-700 whitespace-nowrap">{i.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 bg-[#F4F7FF]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">Plumbing &amp; renovations</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Plumbing, heating, and renovation work is priced by the job. Call us or request service and we&apos;ll give you a quote.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {otherServices.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-4 rounded-xl bg-white p-5 shadow-sm">
                <Link href={s.href} className="font-semibold text-[#002D72] hover:underline">
                  {s.name}
                </Link>
                <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Quoted per job</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Pricing questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-[#F4F7FF] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-[#002D72] mb-2">{f.q}</h3>
                <p className="text-gray-700">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12 bg-white">
        <p className="max-w-4xl mx-auto px-6 text-center text-xs text-gray-500">
          All prices are subject to change without notice and may vary depending on the appliance, brand, job complexity, and location. Installation prices are minimums. Your final price is confirmed in your written quote before any work begins.
        </p>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#002D72]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to schedule a repair?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/request-service"
              className="bg-[#D32F2F] text-white px-8 py-4 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold text-lg"
            >
              Request Service
            </Link>
            <a
              href="tel:301-949-2500"
              className="bg-white text-[#002D72] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Call 301-949-2500
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
