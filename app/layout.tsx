import type { Metadata } from "next";
import "./globals.css";

import { vcardData } from "@/components/layout/BusinessInfo";

export const metadata: Metadata = {
  metadataBase: new URL(vcardData.website || 'https://fixitbuilditcolorado.com'),
  alternates: {
    canonical: '/',
  },
  title: vcardData.seoTitle,
  description: vcardData.seoDescription,
  keywords: vcardData.seoKeywords,
  openGraph: {
    title: vcardData.seoTitle,
    description: vcardData.seoDescription,
    url: vcardData.website,
    siteName: vcardData.company,
    images: [
      {
        url: vcardData.logoImage, // This acts as the thumbnail for shares
        width: 1200,
        height: 630,
        alt: `${vcardData.company} Logo`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: vcardData.company,
              image: vcardData.logoImage,
              description: vcardData.seoDescription,
              url: vcardData.website,
              telephone: vcardData.phone,
              email: vcardData.email,
              sameAs: [
                vcardData.facebook,
                vcardData.linkedin,
                vcardData.instagram,
              ].filter(Boolean),
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
