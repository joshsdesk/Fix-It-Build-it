import { Metadata } from 'next';
import { vcardData } from '@/components/layout/BusinessInfo';

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
  return <>{children}</>;
}
