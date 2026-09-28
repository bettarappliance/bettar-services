import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DiagnosticFeeNotice from "../../components/DiagnosticFeeNotice";
import { DIAGNOSTIC_FEE_LABEL } from "@/lib/pricing";

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
    q: `Can the ${DIAGNOSTIC_FEE_LABEL} be applied toward a new appliance?`,
    a: `No. The ${DIAGNOSTIC_FEE_LABEL} credit applies to repair service only and is not applied toward the purchase of a new appliance. If you decide to replace instead of repair, ask our sales team about current promotions.`,
  },
];

const otherServices = [
  { name: "Appliance installation", href: "/services/appliances" },
  { name: "Handyman repair and services", href: "/services/handyman" },
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
            Here is exactly how our appliance repair pricing works, so there are no surprises when our technician arrives.
          </p>
        </div>
      </section>

      {/* Diagnostic fee */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <DiagnosticFeeNotice variant="full" showLink={false} />
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 bg-[#F4F7FF]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">Other services</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Installation, handyman, plumbing, and renovation work is priced by the job. Call us or request service and we&apos;ll give you a quote.
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
