export const vcardData = {
  // Basic Info
  firstName: "Josh",
  lastName: "Bourassa",
  company: "Fix it, Build it Colorado",
  title: "Owner, Consultant/Technician",
  profileImage: "/imgs/UI/ME.png",
  logoImage: "/imgs/UI/FIBILOGO.png",

  // Contact Details
  phone: "+7205153348",
  displayPhone: "720-515-3348",
  email: "FixitBuilditColorado@gmail.com",

  // Call-to-Action Links
  appointmentUrl: "", 
  orderAheadUrl: "", 
  reservationUrl: "", 
  shopOnlineUrl: "", 
  customUrl: "", 
  customUrlLabel: "Learn More", 

  // Bio / About (Updated from Master Copy)
  about: "I didn't just learn these skills; I lived the need for them. As a father navigating the trials and triumphs of the ASD world, I saw the gaps in standard home construction. I am not a doctor or a lawyer—I am a Technician. I applied my trade to solve the friction points my own family faced. Now, I build those solutions for you.",
  accessibilityPolicy: "\"All-Access\" Policy: We do not filter by \"Level\" or support needs. If you've been told your needs are \"too little or too much,\" you're in the right place.",

  // Web Links
  website: "https://fixitbuilditcolorado.com",
  linkedin: "https://www.linkedin.com/in/josh-bourassa-375a3948?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  facebook: "https://www.facebook.com/fixitbuilditcolorado/",
  instagram: "https://www.instagram.com/fixitbuildit?igsh=MTh5eHI5bXAwc2V5Yw==",

  // Site Meta & SEO (Updated from Master Copy)
  seoTitle: "Fix-It Build-It Colorado | EAA Specialist",
  seoDescription: "Colorado’s Specialized Partner for Environmental Accessibility Adaptations (EAA). Specializing in sensory-safe spaces for the neurodivergent home.",
  seoKeywords: ["Neuro-Inclusive Colorado", "Environmental Accessibility Adaptations", "Sensory Room Builder", "Autism Home Modifications Colorado"],

  // Home Page (Hero)
  heroTitleBase: "Precision Installation for",
  heroTitleHighlight: "Specialized Environments.",
  heroSubtitle: "Professional assembly and mounting of sensory equipment, safety adaptations, and functional home hardware in the Denver Metro Front Range.",
  heroCta: "Book Appointment",

  // Services Section
  servicesTitleBase: "Specialized",
  servicesTitleHighlight: "Neuro-Inclusive Services.",
  servicesSubtitle: "Expert structural and sensory modifications designed specifically for neurodivergent individuals and their families.",
};

export type CtaKey = "appointment" | "orderAhead" | "reservation" | "shopOnline" | "custom";

export interface CtaLink {
  key: CtaKey;
  label: string;
  url: string;
}

export function getCtaLinks(): CtaLink[] {
  const links: CtaLink[] = [];

  if (vcardData.appointmentUrl) links.push({ key: "appointment", label: "Book Appointment", url: vcardData.appointmentUrl });
  if (vcardData.orderAheadUrl) links.push({ key: "orderAhead", label: "Order Ahead", url: vcardData.orderAheadUrl });
  if (vcardData.reservationUrl) links.push({ key: "reservation", label: "Reserve a Spot", url: vcardData.reservationUrl });
  if (vcardData.shopOnlineUrl) links.push({ key: "shopOnline", label: "Shop Online", url: vcardData.shopOnlineUrl });
  if (vcardData.customUrl) links.push({ key: "custom", label: vcardData.customUrlLabel || "Learn More", url: vcardData.customUrl });

  return links;
}
