"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";
import ProcessTimeline from "@/components/ProcessTimeline";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import SensoryNeedsWizard from "@/components/SensoryNeedsWizard";
import ZeroFailureContent from "@/components/ZeroFailureContent";
import HAARoadmapModal from "@/components/HAARoadmapModal";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  // Listen for hash changes to trigger roadmap modal
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#roadmap") {
        setIsRoadmapOpen(true);
      }
    };
    window.addEventListener("hashchange", handleHash);
    handleHash(); // Check on mount
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <main className="min-h-screen selection:bg-fibi-accent selection:text-white">
      <Navbar />

      <Hero onOpenModal={() => setIsContactOpen(true)} />

      <SectionDivider />

      <ServiceGrid />

      <ProcessTimeline />

      <SensoryNeedsWizard />

      <ZeroFailureContent />

      <div className="rotate-180 transform">
        <SectionDivider />
      </div>

      <AboutSection />

      <Footer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <HAARoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => {
          setIsRoadmapOpen(false);
          window.history.pushState(null, "", window.location.pathname);
        }}
      />
    </main>
  );
}
