import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "Service Packages | Fix-It Build-It Colorado LLC",
  description: "Transparent investment tiers for neurodivergent home adaptations.",
};

export default function StandalonePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-40 pb-20 px-6 max-w-4xl mx-auto text-slate-200">
        <div className="flex flex-col items-center text-center gap-2 relative mb-12">
          <h3 className="text-sm tracking-widest text-white/50 uppercase font-bold mb-2">Equipment & Packages</h3>
          <div className="h-px w-32 bg-fibi-accent/30 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
            Transparent Investment Tiers
          </h1>
          <p className="text-slate-400 text-sm md:text-lg font-light max-w-3xl leading-relaxed mx-auto">
            We operate on direct private-pay and milestone contracts. Itemized invoices are available for HSA/FSA or private grant reimbursement.
          </p>
        </div>

        <div className="prose prose-invert max-w-none mb-12 space-y-8">
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">Initial Spatial Assessment</h2>
            <div className="text-fibi-accent font-mono text-xl mb-4">$250</div>
            <p className="text-slate-400">Comprehensive in-home sensory evaluation, structural joist mapping, and custom environmental blueprint.</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">Assembly & Precision Mounting</h2>
            <div className="text-fibi-accent font-mono text-xl mb-4">Custom Estimate</div>
            <p className="text-slate-400">Dedicated labor for assembling and anchoring client-purchased sensory equipment and safety pads.</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">Turnkey Custom Sensory Space</h2>
            <div className="text-fibi-accent font-mono text-xl mb-4">Custom Milestone Contract</div>
            <p className="text-slate-400">End-to-end design, Baltic Birch French cleat fabrication, ceiling swing installation, and HEPA cleanup.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
