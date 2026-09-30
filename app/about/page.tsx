import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PendingApprovalStamp } from '@/components/ui/rubber-stamp/PendingApprovalStamp';

export const metadata: Metadata = {
  title: "About Us | FIX IT, BUILD IT COLORADO LLC",
  description: "15+ years of master carpentry combined with lived parent experience raising a neurodivergent child.",
};

export default function StandalonePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-40 pb-20 px-6 max-w-4xl mx-auto text-slate-200">
        {/* Hero Header */}
        <div className="flex flex-col items-center text-center gap-2 relative mb-12">
          <h3 className="text-sm tracking-widest text-white/50 uppercase font-bold mb-2">About Us</h3>
          <div className="h-px w-32 bg-fibi-accent/30 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
            About FIX IT, BUILD IT COLORADO LLC
          </h1>
          <p className="text-slate-400 text-sm md:text-lg font-light max-w-3xl leading-relaxed mx-auto">
            15+ years of master carpentry combined with lived parent experience raising a neurodivergent child.
          </p>
        </div>

        {/* Content Sections */}
        <div className="prose prose-invert max-w-none mb-12 space-y-8">
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">Josh Bourassa Profile</h2>
            <p className="text-slate-400">Lead Craftsman dedicated to functional, sensory-safe home environments.</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">The "All-Access" Philosophy</h2>
            <p className="text-slate-400">We never turn away a family based on "levels" or severity of support needs.</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border-white/5 border-b-fibi-accent/20">
            <h2 className="text-2xl font-bold text-white mb-2">Clinical Partnership Pledge</h2>
            <p className="text-slate-400">Committed to executing designs approved by OT and BCBA professionals.</p>
          </div>
        </div>

        {/* Bottom Bento Container */}
        <div className="relative w-full max-w-4xl mx-auto mt-12">
          <PendingApprovalStamp text="pending approval" />
          <div className="w-full rounded-2xl bg-gradient-to-r from-fibi-accent/20 to-fibi-purple/20 border border-white/10 p-4 md:p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/imgs/UI/noise.png')] opacity-20 mix-blend-overlay" />
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-slate-300 text-sm md:text-base leading-relaxed w-full">
                Quality assurance attestation, pending approval notice, and craftsman sign-off.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
