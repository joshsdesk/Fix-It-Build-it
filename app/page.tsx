"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/layout/HeroSection";
import ServicesSection from "@/components/layout/ServicesSection";
import AboutSection from "@/components/layout/AboutSection";
import Footer from "@/components/layout/Footer";
import ContactModal, { type ContactFormData } from "@/components/ContactModal";
import SensoryNeedsWizard from "@/features/sensory-wizard/SensoryWizard";
import SectionDivider from "@/components/SectionDivider";

export default function Page() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<Partial<ContactFormData>>({});

  const openContact = (prefill?: Partial<ContactFormData>) => {
    setContactPrefill(prefill ?? {});
    setIsContactOpen(true);
  };

  return (
    <main className="h-[100svh] selection:bg-fibi-accent selection:text-white snap-y snap-mandatory overflow-y-auto overflow-x-hidden lg:min-h-screen">
      <section className="snap-start h-[100svh] min-h-[100svh] overflow-hidden flex flex-col justify-between relative lg:min-h-screen">
        <Header />
        <HeroSection onOpenModal={() => openContact()} />
        <div className="w-full z-20 relative -mt-2 sm:-mt-12 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-[1px]">
          <SectionDivider variant="mountains" />
        </div>
      </section>

      {/* Dividers are integrated into the snap flow to avoid bleeding */}
      <section className="snap-start h-[100svh] min-h-[100svh] overflow-hidden flex flex-col justify-between relative lg:min-h-screen">
        <ServicesSection />
        <div className="w-full z-20 relative -mt-2 sm:-mt-12 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-[1px]">
          <SectionDivider variant="trees" />
        </div>
      </section>

      <section className="snap-start h-[100svh] min-h-[100svh] overflow-hidden flex flex-col justify-between relative lg:min-h-screen">
        <SensoryNeedsWizard onRequestConsultation={(prefill) => openContact(prefill)} />
        <div className="w-full z-20 relative -mt-2 sm:-mt-12 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-[1px]">
          <SectionDivider variant="mountains" />
        </div>
      </section>

      <section className="snap-start h-[100svh] min-h-[100svh] overflow-hidden flex flex-col justify-between relative lg:min-h-screen">
        <AboutSection />
        <div className="w-full z-20 relative -mt-2 sm:-mt-12 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-0">
          <SectionDivider variant="mtns-trees" />
        </div>
      </section>

      {/* The isolated Pending Enrollment Box */}
      <section className="snap-start min-h-[50svh] flex flex-col justify-center items-center bg-stone-900 py-16 px-6 relative z-10">
        <div className="max-w-4xl w-full border border-red-500/30 bg-red-950/20 rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px]"></div>
          <h2 className="text-2xl font-bold text-white mb-4">Funding & Regulatory Notice</h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            Fix-It Build-It Colorado LLC operates as an independent private-pay specialty contractor. All non-structural adaptations are custom-designed to align with therapeutic recommendations and environmental accessibility standards. Provider enrollment with Health First Colorado for HCBS Medicaid Waivers (including CES and SLS) is currently in pending status. Direct Medicaid billing and Prior Authorization Requests (PARs) will only be available once state enrollment is fully approved.
          </p>
          <div className="mt-8 inline-block px-4 py-1.5 border border-red-500/50 text-red-400 font-bold text-xs tracking-widest uppercase rounded-full bg-red-500/10">
            PENDING ENROLLMENT APPROVAL
          </div>
        </div>
      </section>

      <section className="snap-start bg-slate-950">
        <Footer />
      </section>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefill={contactPrefill}
      />
    </main>
  );
}
