import type { Metadata } from "next";
import { headers } from "next/headers";
import { APPLIANCE_DOC_ID_HEADER, resolveApplianceDocId } from "@/lib/appliance-doc-id";
import { buildProductJsonLd, getApplianceByUrlId } from "@/lib/firestore-appliance-server";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = await applianceDocId(params);
  const appliance = await getApplianceByUrlId(id);
  const canonicalId = appliance?.id ?? id;
  if (!appliance) {
    const canonical = `${SITE_URL}/appliances/${canonicalId}`;
    return {
      title: "Appliance Details | Bettar Services",
      description:
        "Shop appliances with delivery and installation in Greater DC and Maryland. Contact Bettar Services for pricing and availability.",
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
      siteName: "Bettar Services",
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
  const appliance = await getApplianceByUrlId(id);

  return (
    <>
      {appliance ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildProductJsonLd(appliance, appliance.id)),
          }}
        />
      ) : null}
      {/* Server REST often cannot read Firestore without OAuth; client SDK loads the doc in the browser. */}
      <ApplianceDetailClient id={id} initialAppliance={appliance} />
    </>
  );
}
