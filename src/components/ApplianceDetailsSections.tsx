"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { BettarAppliance, SpecItem } from "@/types/appliance";

function CheckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

/** At-a-glance tiles (capacity, width, fuel, warranty) shown next to the price. */
export function ApplianceQuickFacts({ facts }: { facts: SpecItem[] }) {
  return (
    <dl className="grid grid-cols-2 gap-2">
      {facts.slice(0, 4).map(({ label, value }) => (
        <div key={label} className="rounded-xl border border-gray-100 bg-white px-4 py-3">
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
          <dd className="mt-0.5 text-sm font-bold text-gray-900 leading-snug">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Short "why you'll like it" list for homeowners. */
export function ApplianceHighlights({ highlights }: { highlights: string[] }) {
  return (
    <div className="rounded-2xl border border-[#002D72]/10 bg-[#F8FAFF] p-5">
      <h2 className="text-sm font-bold text-[#002D72] mb-3">Why you&apos;ll like it</h2>
      <ul className="space-y-2.5">
        {highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#002D72] text-white">
              <CheckIcon className="w-3 h-3" />
            </span>
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

function findSpec(appliance: BettarAppliance, label: string): string | undefined {
  for (const g of appliance.specGroups ?? []) {
    const hit = g.items.find((i) => i.label.toLowerCase() === label.toLowerCase());
    if (hit) return hit.value;
  }
  return undefined;
}

type TabKey = "description" | "specs" | "features";

/**
 * Description / Specifications / Features tabs (like AJ Madison). Every panel is rendered
 * in the page HTML and only hidden with the `hidden` attribute, so search engines can read
 * all of it while visitors see one tab at a time.
 */
export default function ApplianceDetailsSections({ appliance }: { appliance: BettarAppliance }) {
  const groups = appliance.specGroups ?? [];
  const width = findSpec(appliance, "Width");
  const height = findSpec(appliance, "Height");
  const depth = findSpec(appliance, "Depth");
  const doorOpen = findSpec(appliance, "Depth with door open") ?? findSpec(appliance, "Depth With Door Open 90 Degree");
  const categoryLower = appliance.category.toLowerCase();
  const hasFeatures = !!(appliance.featureDetails?.length || appliance.features?.length);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "description", label: "Description" },
    ...(groups.length ? [{ key: "specs" as const, label: "Specifications" }] : []),
    ...(hasFeatures ? [{ key: "features" as const, label: "Features" }] : []),
  ];
  const [active, setActive] = useState<TabKey>("description");
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = (next + tabs.length) % tabs.length;
    setActive(tabs[n].key);
    tabRefs.current[n]?.focus();
  };

  const panelProps = (key: TabKey) => ({
    id: `${baseId}-panel-${key}`,
    role: "tabpanel" as const,
    "aria-labelledby": `${baseId}-tab-${key}`,
    hidden: active !== key,
    tabIndex: 0,
  });

  return (
    <div className="mb-12">
      <div role="tablist" aria-label="Product details" className="flex gap-1 border-b border-gray-200">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={`${baseId}-tab-${t.key}`}
            type="button"
            role="tab"
            aria-selected={active === t.key}
            aria-controls={`${baseId}-panel-${t.key}`}
            tabIndex={active === t.key ? 0 : -1}
            onClick={() => setActive(t.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`-mb-px whitespace-nowrap rounded-t-xl border px-5 py-3 text-sm font-semibold transition-colors sm:px-7 ${
              active === t.key
                ? "border-gray-200 border-b-white bg-white text-[#002D72]"
                : "border-transparent bg-gray-50 text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-b-2xl rounded-tr-2xl border border-t-0 border-gray-200 p-5 sm:p-8">
        {/* Description */}
        <section {...panelProps("description")}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="mb-3 text-xl font-extrabold text-gray-900">About this {categoryLower}</h2>
              <div className="space-y-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                {(appliance.fullDescription || appliance.shortDescription || "")
                  .split(/\n\s*\n/)
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
              </div>
            </div>
            <div className="rounded-2xl bg-[#EEF4FF] p-5 sm:p-6 lg:col-span-2">
              <h2 className="mb-4 text-lg font-extrabold text-[#002D72]">Will it fit your space?</h2>
              {width || height || depth ? (
                <dl className="mb-5 grid grid-cols-3 gap-2 text-center">
                  {[
                    ["Width", width],
                    ["Height", height],
                    ["Depth", depth],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-white px-2 py-3">
                      <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
                      <dd className="text-sm font-bold text-gray-900">{value ?? "—"}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
                <li>Measure your space and the doorways it has to pass through.</li>
                <li>
                  Leave room behind for hookups{categoryLower.includes("dryer") ? " and the vent" : ""}
                  {doorOpen ? `, and in front for the door (${doorOpen} deep when open)` : ", and in front for the door to open"}.
                </li>
                <li>Check that your power or gas hookup matches the specifications.</li>
              </ol>
              <a
                href="tel:301-949-2500"
                className="mt-4 inline-block text-sm font-semibold text-[#002D72] underline underline-offset-2 hover:text-[#001F5C]"
              >
                Not sure? Call 301-949-2500 and we&apos;ll help you check.
              </a>
            </div>
          </div>
        </section>

        {/* Specifications */}
        {groups.length ? (
          <section {...panelProps("specs")}>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-extrabold text-gray-900">Specifications</h2>
              {appliance.modelNumber ? (
                <p className="text-sm text-gray-500">
                  Model <span className="font-semibold text-gray-700">{appliance.modelNumber}</span>
                </p>
              ) : null}
            </div>
            <div className="columns-1 gap-6 md:columns-2">
              {groups.map((group) => (
                <div key={group.title} className="mb-6 break-inside-avoid">
                  <h3 className="mb-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-800">{group.title}</h3>
                  <dl className="divide-y divide-dashed divide-gray-200">
                    {group.items.map(({ label, value }) => (
                      <div key={label} className="grid grid-cols-2 gap-3 px-4 py-2 text-sm">
                        <dt className="font-semibold text-gray-700">{label}</dt>
                        <dd className="text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            {appliance.specsSource ? <p className="mt-2 text-xs text-gray-400">{appliance.specsSource}</p> : null}
          </section>
        ) : null}

        {/* Features */}
        {hasFeatures ? (
          <section {...panelProps("features")}>
            <h2 className="mb-4 text-xl font-extrabold text-gray-900">Features</h2>
            {appliance.featureDetails?.length ? (
              <dl className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                {appliance.featureDetails.map(({ title, text }) => (
                  <div key={title}>
                    <dt className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#002D72] text-white">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {title}
                    </dt>
                    <dd className="mt-1 pl-7 text-sm leading-relaxed text-gray-600">{text}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {appliance.features!.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#002D72] text-white">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}
      </div>
    </div>
  );
}
