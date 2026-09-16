"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Home from "@/components/layout/Home";
import Services from "@/components/layout/Services";
import About from "@/components/layout/About";
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
      <Header />

      <section className="snap-start h-[100svh] min-h-[100svh] overflow-hidden flex flex-col justify-between relative lg:min-h-screen">
        <Home onOpenModal={() => openContact()} />
        <div className="w-full z-20 relative -mt-2 sm:-mt-12 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-[1px]">
          <SectionDivider variant="mountains" />
        </div>
      </section>

      {/* Dividers are integrated into the snap flow to avoid bleeding */}
      <section className="snap-start h-[100svh] min-h-[100svh] overflow-hidden flex flex-col justify-between relative lg:min-h-screen">
        <Services />
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
        <About />
        <div className="w-full z-20 relative -mt-2 sm:-mt-12 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-0">
          <SectionDivider variant="mtns-trees" />
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
