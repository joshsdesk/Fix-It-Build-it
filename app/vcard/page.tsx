"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProfileHeader from "@/components/vcard/ProfileHeader";
import ContactActionRow from "@/components/vcard/ContactActionRow";
import AboutCard from "@/components/vcard/AboutCard";
import WebLinksCard from "@/components/vcard/WebLinksCard";
import ScheduleMeetingCard from "@/components/vcard/ScheduleMeetingCard";
import FloatingBottomBar from "@/components/vcard/FloatingBottomBar";
import ContactModal from "@/components/ContactModal";
import { vcardData } from "@/components/layout/BusinessInfo";

export default function ProfilePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main 
      className="min-h-screen w-full relative overflow-x-hidden pb-24"
      style={{
        backgroundImage: "url('/imgs/UI/Background Mobile.png')",
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Semi-transparent overlay to ensure readability if background is busy */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      {/* Main Content Container - constrained for mobile view */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8 flex flex-col gap-6">
        
        {/* Top Logo - Floating without bento background */}
        <div className="flex justify-center mb-2 w-full px-2">
          <Image 
            src={vcardData.logoImage} 
            alt={`${vcardData.company} Logo`} 
            width={500}
            height={200}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <ProfileHeader />
        
        <ContactActionRow />
        
        <AboutCard />
        
        <WebLinksCard />
        
        <ScheduleMeetingCard onOpenContact={() => setIsContactOpen(true)} />

      </div>

      <FloatingBottomBar />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefill={{}}
      />
    </main>
  );
}
