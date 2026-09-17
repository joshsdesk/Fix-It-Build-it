"use client";

import React from "react";
import { vcardData } from "@/components/layout/BusinessInfo";

export default function ContactInfoCard() {
  return (
    <div className="component-surface p-6 bg-slate-900/80 backdrop-blur-md flex flex-col gap-4 text-center">
      <div className="flex flex-col items-center justify-center mb-1">
        <h2 className="text-3xl font-bold text-fibi-accent text-center">Contact Us</h2>
      </div>
      
      <div className="border-t border-dashed border-white/20 my-1"></div>

      <div className="flex flex-col gap-1 items-center">
        <span className="text-fibi-accent font-medium text-lg">Call Us</span>
        <a href={`tel:${vcardData.phone}`} className="text-slate-300 text-base hover:text-white transition-colors">
          {vcardData.displayPhone}
        </a>
      </div>

      <div className="flex flex-col gap-1 items-center">
        <span className="text-fibi-accent font-medium text-lg">Email</span>
        <a href={`mailto:${vcardData.email}`} className="text-slate-300 text-base hover:text-white transition-colors">
          {vcardData.email}
        </a>
      </div>
    </div>
  );
}
