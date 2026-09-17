import { vcardData } from "@/components/layout/BusinessInfo";

export function generateVCard(): Blob {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${vcardData.lastName};${vcardData.firstName};;;
FN:${vcardData.firstName} ${vcardData.lastName}
ORG:${vcardData.company}
TITLE:${vcardData.title}
TEL;TYPE=WORK,VOICE:${vcardData.phone}
TEL;TYPE=CELL,VOICE:${vcardData.phone}
EMAIL;TYPE=WORK:${vcardData.email}
URL:${vcardData.website}
END:VCARD`;

  return new Blob([vcard], { type: "text/vcard" });
}
