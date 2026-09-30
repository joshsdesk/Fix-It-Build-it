import { Metadata } from 'next';
import { vcardData } from '@/config/BusinessInfo';

export const metadata: Metadata = {
  title: `${vcardData.firstName} ${vcardData.lastName} - Digital Business Card`,
  description: `Digital Business Card for ${vcardData.firstName} ${vcardData.lastName} at ${vcardData.company}. ${vcardData.seoDescription}`,
  alternates: {
    canonical: '/vcard',
  },
};

export default function VCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: vcardData.company,
    description: vcardData.seoDescription,
    telephone: vcardData.phone,
    email: vcardData.email,
    url: vcardData.website,
    address: {
      "@type": "PostalAddress",
      addressLocality: vcardData.city,
      addressRegion: vcardData.state,
      addressCountry: vcardData.country,
    },
    areaServed: vcardData.serviceAreas.map(area => ({
      "@type": "Place",
      name: area
    })),
    knowsAbout: vcardData.specialties,
    sameAs: [
      vcardData.linkedin,
      vcardData.facebook,
      vcardData.instagram
    ].filter(Boolean)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
