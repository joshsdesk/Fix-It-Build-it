"use client";

import React from "react";

export default function ScheduleMeetingCard({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <div className="component-surface p-6 bg-slate-900/80 backdrop-blur-md flex flex-col items-center gap-4">
      <h2 className="text-3xl font-bold text-fibi-accent text-center mb-1">Contact</h2>
      
      <p className="text-slate-300 text-center leading-relaxed text-base">
        Eliminate daily friction. Get a custom adaptation plan tailored to your family&apos;s exact needs.
      </p>

      <div className="border-t border-dashed border-white/20 w-full my-2"></div>

      <div className="flex justify-center w-full">
        <button 
          onClick={onOpenContact}
          className="w-full max-w-[240px] bg-fibi-accent/20 hover:bg-fibi-purple/40 border border-fibi-accent/50 hover:border-fibi-purple/80 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-all duration-300"
        >
          <span>Get Your Adaptation Plan</span>
        </button>
      </div>
    </div>
  );
}
