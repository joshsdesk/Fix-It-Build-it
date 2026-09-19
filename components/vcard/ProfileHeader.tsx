"use client";

import React from "react";
import Image from "next/image";
import { vcardData } from "@/components/layout/BusinessInfo";

export default function ProfileHeader() {
  return (
    <div className="component-surface p-0 flex flex-row items-stretch w-full overflow-hidden shadow-lg">
      {/* Profile Image (Left Side) */}
      <div className="w-2/5 relative flex-shrink-0 bg-slate-800 flex">
        <Image 
          src={vcardData.profileImage} 
          alt={`${vcardData.firstName} ${vcardData.lastName} profile picture`} 
          width={300}
          height={400}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      
      {/* Profile Details (Right Side) */}
      <div className="w-3/5 p-4 flex flex-col justify-center bg-slate-900/80 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide leading-tight">
          {vcardData.firstName} {vcardData.lastName}
        </h1>
        <p className="text-base text-slate-300 font-light mb-2 leading-snug">
          {vcardData.title}
        </p>
        <p className="text-sm font-bold text-fibi-accent tracking-widest uppercase">
          {vcardData.company}
        </p>
      </div>
    </div>
  );
}
