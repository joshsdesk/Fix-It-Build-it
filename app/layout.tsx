import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

import { vcardData } from "@/config/BusinessInfo";

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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://fixitbuilditcolorado.com/#website",
                  "url": "https://fixitbuilditcolorado.com",
                  "name": "FIX IT, BUILD IT COLORADO LLC",
                  "publisher": {
                    "@type": "HomeAndConstructionBusiness",
                    "name": "Fix-It Build-It Colorado, LLC",
                    "legalName": "FIX IT, BUILD IT COLORADO LLC",
                    "url": "https://fixitbuilditcolorado.com",
                    "telephone": vcardData.phone,
                    "email": vcardData.email,
                    "image": vcardData.logoImage,
                    "description": vcardData.seoDescription,
                    "sameAs": [
                      vcardData.facebook,
                      vcardData.linkedin,
                      vcardData.instagram,
                    ].filter(Boolean),
                    "areaServed": [
                      "Denver Metro Area",
                      "Arvada",
                      "Lakewood",
                      "Aurora",
                      "Centennial",
                      "Jefferson County",
                      "Arapahoe County",
                      "Adams County"
                    ],
                    "keywords": [
                      "Sensory Room Builder Denver",
                      "Environmental Accessibility Adaptations (EAA)",
                      "Autism Home Modifications Colorado",
                      "Sensory Swing Joist Installation"
                    ],
                    "knowsAbout": [
                      "Environmental Accessibility Adaptations",
                      "Specialty Code 677",
                      "Procedure Code T2025",
                      "Sensory-Informed Carpentry",
                      "Winnie Dunn Sensory Framework"
                    ]
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
