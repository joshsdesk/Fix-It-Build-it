export interface SocialAccount {
  id?: string; 
  platform: 'instagram' | 'linkedin' | 'facebook' | 'youtube' | 'x' | 'github' | 'website';
  type: 'Business' | 'Personal' | 'Brand' | 'Community';
  label: string;
  description?: string;
  url: string;
  imageUrl?: string; 
}

export const vcardData = {
  // Basic Info
  firstName: "Josh",
  lastName: "Bourassa",
  company: "FIX IT, BUILD IT COLORADO LLC",
  tagline: "Precision Installation for Specialized Environments.",
  title: "Owner, Consultant/Technician",
  profileImage: "/imgs/UI/ME.png",
  logoImage: "/imgs/UI/FIBILOGO.png",

  // Contact Details
  phone: "+17205153348", // Ensure E.164 format for schema
  displayPhone: "720-515-3348",
  email: "FixitBuilditColorado@gmail.com",
  
  // Address & Service Area
  address: "Denver Metro Front Range",
  city: "Denver",
  state: "CO",
  country: "US",
  serviceAreas: ["Denver Metro Front Range", "Colorado"],

  // Call-to-Action Links
  appointmentUrl: "", 
  orderAheadUrl: "", 
  reservationUrl: "", 
  shopOnlineUrl: "", 
  customUrl: "", 
  customUrlLabel: "Learn More", 

  // Bio / About
  about: "I didn't just learn these skills; I lived the need for them. As a father navigating the trials and triumphs of the ASD world, I saw the gaps in standard home construction. I am not a doctor or a lawyer—I am a Technician. I applied my trade to solve the friction points my own family faced. Now, I build those solutions for you.",
  accessibilityPolicy: "\"All-Access\" Policy: We do not filter by \"Level\" or support needs. If you've been told your needs are \"too little or too much,\" you're in the right place.",

  // Web Links
  website: "https://fixitbuilditcolorado.com",
  linkedin: "https://www.linkedin.com/in/josh-bourassa-375a3948?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  facebook: "https://www.facebook.com/people/Sensory-Spaces-Colorado/61562943394572/",
  instagram: "https://www.instagram.com/fixitbuildit?igsh=MTh5eHI5bXAwc2V5Yw==",
  
  // Extra Social Accounts (Use this if you have MULTIPLE profiles for the same platform)
  socialAccounts: [
    {
      platform: "facebook",
      type: "Brand",
      label: "Sensory Cinema Club",
      description: "Join the community for inclusive and sensory-safe cinema experiences.",
      url: "https://www.facebook.com/people/Sensory-Cinema-Club/61594500516516/?sk=following",
      imageUrl: "https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/797671626_122102809065483350_2094159119014200301_n.jpg?stp=dst-jpg_tt6&cstp=mx800x800&ctp=s800x800&_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ZuFmyoVsb2cQ7kNvwGzsc6E&_nc_oc=AdrYx6XUSHXhZ-ttaLnsnP1VPEYcFKK-7OPQAhQ63KI2zziuqSZLxVu8hNk6Q9q5z5w&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=UJlWck2EHs9A7nslaHacHA&_nc_ss=7b289&oh=00_AQN2IErmFQUWCfBuNr0Ij3VP8vBAGR4kWF91lXTEG4ewPA&oe=6AC37161"
    },
    {
      platform: "facebook",
      type: "Brand",
      label: "Sensory Spaces Colorado",
      description: "Sensory Spaces Colorado Official Facebook Page.",
      url: "https://www.facebook.com/people/Sensory-Spaces-Colorado/61562943394572/",
      imageUrl: "https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-1/743805699_122105570360431446_7988522473345692815_n.jpg?stp=c100.0.842.842a_cp6_dst-jpg_tt6&cstp=mx842x842&ctp=s200x200&_nc_cat=103&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=C4KSBzb0QXsQ7kNvwG3CnAm&_nc_oc=AdpmHvFSp8aXY92XYWF1jt1OfHYErNnimf7X-mfFpuyQd0JsKkB9H7MBQbO2oaKjTlA&_nc_zt=24&_nc_ht=scontent-msp1-1.xx&_nc_gid=bq4qKtGstvWGOW32RWfZ_Q&_nc_ss=7b289&oh=00_AQNJeYTYZS4OI8ZdR55bVJov06BCbjK48CGHPLG7ege_2Q&oe=6AC35862"
    },
    {
      platform: "instagram",
      type: "Brand",
      label: "Sensory Cinema Club",
      description: "Official Instagram for Sensory Cinema Club.",
      url: "https://www.instagram.com/sensorycinemaclub?stkn=MTU3OGo5YTNmcG01Nw==",
      imageUrl: "https://scontent-msp1-1.cdninstagram.com/v/t51.82787-19/831033301_18135044800584934_8535636354560626201_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=106&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy43ODguQzMifQ%3D%3D&_nc_ohc=CocdrxbTMKMQ7kNvwGX_YE_&_nc_oc=Adrd4ifEbPedD_FItYrsInRxWgS7DUSYOIYnnbdD3_qOzhm4963CtZaOmRgVbzmvmmM&_nc_zt=24&_nc_ht=scontent-msp1-1.cdninstagram.com&_nc_gid=ZO7hhT7ebnpGBW6yapqzPw&_nc_ss=7b689&oh=00_AQMIgSZRGfm_2L7ta5lFsFQaYs1EgTu73pniYC4hDXJTNw&oe=6AC36E1B"
    },
    {
      platform: "website",
      type: "Personal",
      label: "Josh's Work Portfolio",
      description: "My personal project portfolio and past work.",
      url: "https://joshswork.netlify.app/",
      imageUrl: "/imgs/UI/ME.png"
    }
  ] as SocialAccount[],

  // Site Meta & SEO
  seoTitle: "FIX IT, BUILD IT COLORADO LLC | EAA Specialist",
  seoDescription: "Colorado’s Specialized Partner for Environmental Accessibility Adaptations (EAA). Specializing in sensory-safe spaces for the neurodivergent home.",
  seoKeywords: ["Neuro-Inclusive Colorado", "Environmental Accessibility Adaptations", "Sensory Room Builder", "Autism Home Modifications Colorado", "safe rooms", "wheelchair thresholds"],
  specialties: ["Custom sensory walls", "Safe rooms", "Wheelchair thresholds", "Sensory equipment mounting"],

  // Home Page (Hero)
  heroTitleBase: "Precision Installation for",
  heroTitleHighlight: "Specialized Environments.",
  heroSubtitle: "Professional assembly and mounting of sensory equipment, safety adaptations, and functional home hardware in the Denver Metro Front Range.",
  heroCta: "Contact Us",

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
