import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "Sensory Wizard | FIX IT, BUILD IT COLORADO LLC",
  description: "A 2-minute interactive audit matching environmental friction to sensory adaptations.",
};

export default function StandalonePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-40 pb-20 px-6 max-w-4xl mx-auto text-slate-200">
        {/* Hero Header */}
        <div className="flex flex-col items-center text-center gap-2 relative mb-12">
          <h3 className="text-sm tracking-widest text-white/50 uppercase font-bold mb-2">Intake Estimator</h3>
          <div className="h-px w-32 bg-fibi-accent/30 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
            Smart Sensory Wizard Intake Estimator
          </h1>
          <p className="text-slate-400 text-sm md:text-lg font-light max-w-3xl leading-relaxed mx-auto">
            A 2-minute interactive audit matching environmental friction to sensory adaptations.
          </p>
        </div>

        {/* Content Sections */}
        <div className="prose prose-invert max-w-none mb-12 space-y-8">
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">Embedded Sensory Wizard</h2>
            <p className="text-slate-400">Interactive component mapping sensory needs to structural solutions.</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">Step-by-Step Intake Progress</h2>
            <p className="text-slate-400">Guided questionnaire targeting friction points in the home.</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">Private Pay vs. Medicaid CMA Pathway</h2>
            <p className="text-slate-400">Estimator comparing out-of-pocket costs with waiver funding pathways.</p>
          </div>
        </div>

        {/* Bottom Bento Container */}
        <div className="relative w-full max-w-4xl mx-auto mt-12">
          
          <div className="w-full rounded-2xl bg-gradient-to-r from-fibi-accent/20 to-fibi-purple/20 border border-white/10 p-4 md:p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/imgs/UI/noise.png')] opacity-20 mix-blend-overlay" />
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-slate-300 text-sm md:text-base leading-relaxed w-full">
                Data privacy notice (HIPAA non-PHI masking) and submit gate.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
