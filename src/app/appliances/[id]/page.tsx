import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import { APPLIANCE_DOC_ID_HEADER, resolveApplianceDocId } from "@/lib/appliance-doc-id";
import { buildBreadcrumbJsonLd, buildProductJsonLd, lookupApplianceByUrlId } from "@/lib/firestore-appliance-server";
import { resolveCategoryListingPath } from "@/lib/appliance-category-slugs";
import { SITE_URL } from "@/lib/site";
import ApplianceDetailClient from "./ApplianceDetailClient";

export const revalidate = 120;

type PageProps = {
  params: Promise<{ id: string }>;
};

async function applianceDocId(params: Promise<{ id: string }>): Promise<string> {
  const { id: paramId } = await params;
  const h = await headers();
  return resolveApplianceDocId(paramId, h.get(APPLIANCE_DOC_ID_HEADER));
}

/** Shared by generateMetadata and the page so each request resolves the appliance once. */
const loadAppliance = cache(async (id: string) => {
  const result = await lookupApplianceByUrlId(id);
  // Only a confirmed miss returns a real 404. If the lookup failed, fall through to the client loader.
  if (result.status === "missing") notFound();
  return result.status === "found" ? result.appliance : null;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = await applianceDocId(params);
  const appliance = await loadAppliance(id);
  const canonicalId = appliance?.id ?? id;
  if (!appliance) {
    const canonical = `${SITE_URL}/appliances/${canonicalId}`;
    return {
      title: "Appliance Details | Bettar Appliance Master",
      description:
        "Shop appliances with delivery and installation in Greater DC and Maryland. Contact Bettar Appliance Master for pricing and availability.",
      alternates: { canonical },
    };
  }

  const title = `${appliance.name} | ${appliance.brand} | Bettar Appliance Sales`;
  const description =
    appliance.shortDescription?.slice(0, 160) ||
    `${appliance.brand} ${appliance.category}. Starting at $${appliance.priceFrom.toLocaleString()}. Sales, delivery & installation in Greater DC & Maryland.`;
  const canonical = `${SITE_URL}/appliances/${canonicalId}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Bettar Appliance Master",
      locale: "en_US",
      type: "website",
      images: appliance.imageUrl ? [{ url: appliance.imageUrl, alt: appliance.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: appliance.imageUrl ? [appliance.imageUrl] : undefined,
    },
  };
}

export default async function ApplianceDetailPage({ params }: PageProps) {
  const id = await applianceDocId(params);
  const appliance = await loadAppliance(id);

  return (
    <>
      {appliance ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildProductJsonLd(appliance, appliance.id)),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                buildBreadcrumbJsonLd(
                  appliance,
                  appliance.id,
                  resolveCategoryListingPath(appliance.category, appliance.categorySlug)
                )
              ),
            }}
          />
        </>
      ) : null}
      {/* Server REST often cannot read Firestore without OAuth; client SDK loads the doc in the browser. */}
      <ApplianceDetailClient id={id} initialAppliance={appliance} />
    </>
  );
}
