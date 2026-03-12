"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Home from "@/components/layout/Home";
import Services from "@/components/layout/Services";
import About from "@/components/layout/About";
import Footer from "@/components/layout/Footer";
import ContactModal from "@/components/ContactModal";
import SensoryNeedsWizard from "@/features/sensory-wizard/SensoryWizard";
import ZeroFailureContent from "@/components/ZeroFailureContent";
import SectionDivider from "@/components/SectionDivider";

export default function Page() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen selection:bg-fibi-accent selection:text-white snap-y snap-mandatory overflow-y-auto overflow-x-hidden">
      <Header />

      <section className="snap-start min-h-screen relative">
        <Home onOpenModal={() => setIsContactOpen(true)} />
        <div className="absolute bottom-0 left-0 w-full z-20">
          <SectionDivider variant="mountains" />
        </div>
      </section>

      {/* Dividers are integrated into the snap flow to avoid bleeding */}
      <section className="snap-start min-h-screen relative">
        <Services />
        <div className="absolute bottom-0 left-0 w-full z-20">
          <SectionDivider variant="trees" />
        </div>
      </section>

      <section className="snap-start min-h-screen relative">
        <SensoryNeedsWizard />
        <div className="absolute bottom-0 left-0 w-full z-20">
          <SectionDivider variant="mountains" />
        </div>
      </section>

      <section className="snap-start min-h-screen relative">
        <About />
        <div className="absolute bottom-0 left-0 w-full z-20">
          <SectionDivider variant="mtns-trees" />
        </div>
      </section>

      <section className="snap-start bg-slate-950">
        <Footer />
      </section>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
