"use client";

import React from "react";
import { vcardData } from "@/components/layout/BusinessInfo";

export default function AboutCard() {
  return (
    <div className="component-surface p-6 flex flex-col items-center bg-slate-900/80 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-fibi-accent mb-4 text-center">About Me</h2>
      <p className="text-slate-300 text-left leading-relaxed text-base">
        {vcardData.about}
      </p>
    </div>
  );
}
