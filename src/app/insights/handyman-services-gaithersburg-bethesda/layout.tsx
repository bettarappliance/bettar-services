import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Handyman Services in Gaithersburg & Bethesda | Bettar Services',
  description: 'Expert handyman services in Gaithersburg, Bethesda, and surrounding areas. Skilled repairs, installations, and home improvements. Same-day service available. Licensed & insured.',
  keywords: 'handyman services Gaithersburg, handyman Bethesda, skilled handyman repairs, professional handyman services, handyman Montgomery County, handyman Silver Spring, emergency handyman',
  openGraph: {
    title: 'Professional Handyman Services in Gaithersburg & Bethesda',
    description: 'Expert handyman services in Gaithersburg, Bethesda, and surrounding areas. Skilled repairs, installations, and home improvements.',
    type: 'article',
    url: 'https://bettarservices.com/insights/handyman-services-gaithersburg-bethesda',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
