import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fix-It Build-It Colorado, LLC | Neuro-Inclusive Home Adaptations",
  description: "Sensory-Informed Carpentry Technician serving the Denver Metro Front Range. Specialized in tactile hardware, environmental zoning, and psycho-proof home modifications.",
  keywords: ["Neuro-Inclusive Colorado", "Westminster Sensory Rooms", "Front Range Home Mods", "Sensory-Informed Technician", "Autism Home Safety Colorado", "Westminster Specialized Carpentry"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
