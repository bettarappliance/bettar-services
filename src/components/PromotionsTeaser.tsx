import Link from "next/link";
import { getActiveRebates, isLaborDaySaleActive } from "@/lib/promotions";

// Reusable "current promotions" banner. Reads from the same data as the
// Promotions page (src/lib/promotions.ts), so it always matches what's
// live there and hides itself automatically once nothing is running.
export default function PromotionsTeaser() {
  const activeRebates = getActiveRebates();
  const laborDaySaleActive = isLaborDaySaleActive();

  if (activeRebates.length === 0 && !laborDaySaleActive) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#002D72] to-[#001233] p-6 sm:p-10 md:p-12">
          {/* Decorative glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#dc2626]/20 rounded-full blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" aria-hidden />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-block bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-white/20">
                Limited-Time Offers
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Current Appliance Promotions &amp; Rebates
              </h2>
              <p className="text-blue-100 mb-6">
                Browse every current appliance promotion and special offer — from manufacturer rebates to seasonal appliance sales on top brands, all in one place.
              </p>
              <Link
                href="/promotions"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#D32F2F] text-white font-semibold hover:bg-[#B71C1C] transition-colors shadow-md"
              >
                View Appliance Promotions
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 lg:max-w-sm">
              {laborDaySaleActive && (
                <div className="bg-[#D32F2F] border border-white/20 rounded-xl px-4 py-3 min-w-[140px]">
                  <p className="text-white/80 text-[10px] uppercase tracking-wide font-semibold mb-1">Labor Day Sale</p>
                  <p className="text-white text-sm font-bold">Thru Sep 16</p>
                </div>
              )}
              {activeRebates.slice(0, 3).map((rebate) => (
                <div key={rebate.id} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 backdrop-blur-sm min-w-[140px]">
                  <p className="text-white/70 text-[10px] uppercase tracking-wide font-semibold mb-1">{rebate.brand}</p>
                  <p className="text-white text-lg font-bold">{rebate.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
