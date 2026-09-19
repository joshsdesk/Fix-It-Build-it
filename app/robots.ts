import { MetadataRoute } from 'next';
import { vcardData } from '@/components/layout/BusinessInfo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = vcardData.website || 'https://fixitbuilditcolorado.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
