import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PendingApprovalStamp } from '@/components/ui/rubber-stamp/PendingApprovalStamp';

export const metadata: Metadata = {
  title: "Funding | FIX IT, BUILD IT COLORADO LLC",
  description: "Navigating Health First Colorado HCBS Waivers, private pay credits, and alternative grants.",
};

export default function StandalonePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-40 pb-20 px-6 max-w-4xl mx-auto text-slate-200">
        {/* Hero Header */}
        <div className="flex flex-col items-center text-center gap-2 relative mb-12">
          <h3 className="text-sm tracking-widest text-white/50 uppercase font-bold mb-2">Funding Options</h3>
          <div className="h-px w-32 bg-fibi-accent/30 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
            Payment, Waiver & Funding Pathways
          </h1>
          <p className="text-slate-400 text-sm md:text-lg font-light max-w-3xl leading-relaxed mx-auto">
            Navigating Health First Colorado HCBS Waivers, private pay credits, and alternative grants.
          </p>
        </div>

        {/* Content Sections */}
        <div className="prose prose-invert max-w-none mb-12 space-y-8">
          <div className="relative w-full">
            <PendingApprovalStamp text="pending approval" />
            <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20 relative overflow-hidden">
              <h2 className="text-2xl font-bold text-white mb-2">Medicaid HCBS Waivers</h2>
              <p className="text-slate-400">CES, SLS, and BI waivers processed via CMA PAR bids.</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">Private Pay</h2>
            <p className="text-slate-400">$250 in-home audit credited 100% toward the final build.</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">HSA/FSA Eligibility</h2>
            <p className="text-slate-400">Guidance on using health savings accounts for qualifying sensory adaptations.</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">Alternative Grants</h2>
            <p className="text-slate-400">FSSP, HBF, UHCCF, and Chive Charities for funding cap overages.</p>
          </div>
        </div>

        {/* Bottom Bento Container */}
        <div className="relative w-full max-w-4xl mx-auto mt-12">
          <PendingApprovalStamp text="pending approval" />
          <div className="w-full rounded-2xl bg-gradient-to-r from-fibi-accent/20 to-fibi-purple/20 border border-white/10 p-4 md:p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/imgs/UI/noise.png')] opacity-20 mix-blend-overlay" />
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-slate-300 text-sm md:text-base leading-relaxed w-full">
                Financial transparency statement and Case Manager intake link.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
