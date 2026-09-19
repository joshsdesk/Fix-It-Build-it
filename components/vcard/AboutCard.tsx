"use client";

import React from "react";
import { vcardData } from "@/components/layout/BusinessInfo";

export default function AboutCard() {
  return (
    <div className="component-surface p-6 flex flex-col items-center bg-slate-900/80 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-fibi-accent mb-4 text-center">About Me</h2>
      <ul className="text-slate-300 text-left leading-relaxed text-base space-y-3 w-full">
        {Array.isArray(vcardData.about) ? vcardData.about.map((point, index) => {
          const [boldText, restText] = point.split(': ');
          return (
            <li key={index} className="flex gap-2">
              <span className="text-fibi-accent mt-1">•</span>
              <span>
                {restText ? (
                  <>
                    <strong className="text-white font-semibold">{boldText}:</strong> {restText}
                  </>
                ) : (
                  boldText
                )}
              </span>
            </li>
          );
        }) : (
          <li>{vcardData.about}</li>
        )}
      </ul>
    </div>
  );
}
