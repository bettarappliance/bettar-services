import Link from "next/link";
import { DIAGNOSTIC_FEE_LABEL } from "@/lib/pricing";

type Props = {
  /** "compact": one-line notice (hero, forms). "full": explainer card with steps. */
  variant?: "compact" | "full";
  /** Show the "See service pricing" link (hide it on the pricing page itself). */
  showLink?: boolean;
  className?: string;
};

const steps = [
  {
    title: "Diagnostic visit",
    body: `A technician comes to your home and finds the cause of the problem. The diagnostic visit is ${DIAGNOSTIC_FEE_LABEL}.`,
  },
  {
    title: "Repair estimate",
    body: "You get a repair estimate before any repair work begins.",
  },
  {
    title: "Your choice",
    body: `If you approve the repair, the ${DIAGNOSTIC_FEE_LABEL} is credited toward your repair cost. If you decline, you pay only the ${DIAGNOSTIC_FEE_LABEL} diagnostic fee.`,
  },
];

export default function DiagnosticFeeNotice({
  variant = "compact",
  showLink = true,
  className = "",
}: Props) {
  if (variant === "compact") {
    return (
      <div
        className={`flex items-start gap-3 rounded-xl border border-[#002D72]/15 bg-[#EEF4FF] px-4 py-3 text-sm text-gray-700 ${className}`}
      >
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#002D72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>
          <span className="font-semibold text-[#002D72]">
            Appliance repair diagnostic visit: {DIAGNOSTIC_FEE_LABEL}.
          </span>{" "}
          Credited toward your repair if you approve it. Not applicable toward new appliance purchases.
          {showLink && (
            <>
              {" "}
              <Link href="/service-pricing" className="font-semibold text-[#002D72] underline underline-offset-2 hover:text-[#1e3a8a]">
                See how it works
              </Link>
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-[#002D72]/10 bg-white p-6 shadow-md sm:p-8 ${className}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#002D72]">Appliance repair</p>
          <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">Diagnostic visit</h3>
        </div>
        <p className="text-4xl font-extrabold text-[#002D72]">{DIAGNOSTIC_FEE_LABEL}</p>
      </div>

      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-xl bg-[#F4F7FF] p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#002D72] text-sm font-bold text-white" aria-hidden="true">
                {i + 1}
              </span>
              <span className="font-semibold text-gray-900">{step.title}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">Please note:</span> the {DIAGNOSTIC_FEE_LABEL} credit applies to repair service only. It is not applied toward the purchase of a new appliance. If you decide to replace instead of repair, ask our sales team about current promotions.
        </p>
      </div>

      {showLink && (
        <p className="mt-5 text-sm">
          <Link href="/service-pricing" className="font-semibold text-[#002D72] underline underline-offset-2 hover:text-[#1e3a8a]">
            See full service pricing details
          </Link>
        </p>
      )}
    </div>
  );
}
