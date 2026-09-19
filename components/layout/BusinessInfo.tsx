export const vcardData = {
  // Basic Info
  firstName: "Josh",
  lastName: "Bourassa",
  company: "Fix-it, Build-it",
  title: "Owner, Consultant/Technician",
  profileImage: "/imgs/UI/ME.png",
  logoImage: "/imgs/UI/FIBILOGO.png",

  // Contact Details
  phone: "+7205153348",
  displayPhone: "720-515-3348", // How it looks on the page
  email: "FixitBuilditColorado@gmail.com",

  // Call-to-Action Links (Google Business Profile / labs.google/pomelli style).
  // Leave any of these blank to hide that button everywhere it's used — no code changes needed.
  appointmentUrl: "", // e.g. Calendly/Square booking link
  orderAheadUrl: "", // e.g. online estimate/order intake form
  reservationUrl: "", // e.g. consultation slot booking
  shopOnlineUrl: "", // e.g. storefront / product catalog
  customUrl: "", // any extra link (portfolio, financing, etc.)
  customUrlLabel: "Learn More", // button text shown for customUrl

  // Bio / About
  about: [
    "Lived Experience: As an ASD father, I know the gaps in standard home construction firsthand.",
    "Practical Solutions: I'm a Technician, not a doctor. I solve real friction points in your home.",
    "Tailored For You: I build the exact safety and sensory solutions my own family needed."
  ],

  // Web Links
  website: "https://fixitbuilditcolorado.com",
  linkedin: "https://www.linkedin.com/in/josh-bourassa-375a3948?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  facebook: "https://www.facebook.com/fixitbuilditcolorado/",
  instagram: "https://www.instagram.com/fixitbuildit?igsh=MTh5eHI5bXAwc2V5Yw==",

  // Site Meta & SEO
  seoTitle: "Fix-It Build-It Colorado, LLC | Neuro-Inclusive Home Adaptations",
  seoDescription: "Sensory-Informed Carpentry Technician serving the Denver Metro Front Range. Specialized in tactile hardware, environmental zoning, and psycho-proof home modifications.",
  seoKeywords: ["Neuro-Inclusive Colorado", "Westminster Sensory Rooms", "Front Range Home Mods", "Sensory-Informed Technician", "Autism Home Safety Colorado", "Westminster Specialized Carpentry"],

  // Additional Policies/Sayings
  accessibilityPolicy: '"All-Access" Policy: We do not filter by "Level" or support needs. If you\'ve been told your needs are "too much," you\'re in the right place.'
};

export type CtaKey = "appointment" | "orderAhead" | "reservation" | "shopOnline" | "custom";

export interface CtaLink {
  key: CtaKey;
  label: string;
  url: string;
}

// Single source of truth for the extra CTA buttons — reads straight off vcardData
// so filling in a URL above is enough to make the button appear everywhere.
export function getCtaLinks(): CtaLink[] {
  const links: CtaLink[] = [];

  if (vcardData.appointmentUrl) links.push({ key: "appointment", label: "Book Appointment", url: vcardData.appointmentUrl });
  if (vcardData.orderAheadUrl) links.push({ key: "orderAhead", label: "Order Ahead", url: vcardData.orderAheadUrl });
  if (vcardData.reservationUrl) links.push({ key: "reservation", label: "Reserve a Spot", url: vcardData.reservationUrl });
  if (vcardData.shopOnlineUrl) links.push({ key: "shopOnline", label: "Shop Online", url: vcardData.shopOnlineUrl });
  if (vcardData.customUrl) links.push({ key: "custom", label: vcardData.customUrlLabel || "Learn More", url: vcardData.customUrl });

  return links;
}
