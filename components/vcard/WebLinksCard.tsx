"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { vcardData } from "@/components/layout/BusinessInfo";

export default function WebLinksCard() {
  const links = [
    { url: vcardData.website, icon: faGlobe, label: "Website" },
    { url: vcardData.linkedin, icon: faLinkedin, label: "LinkedIn" },
    { url: vcardData.facebook, icon: faFacebook, label: "Facebook" },
    { url: vcardData.instagram, icon: faInstagram, label: "Instagram" },
  ];

  return (
    <div className="component-surface p-4 flex justify-around items-center bg-slate-900/80 backdrop-blur-md">
      {links.map((link, idx) => (
        <a 
          key={idx} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center w-14 h-14 rounded-full border border-fibi-accent/30 text-white hover:bg-fibi-purple/20 hover:border-fibi-purple hover:text-white transition-all duration-300"
          aria-label={link.label}
        >
          <FontAwesomeIcon icon={link.icon} className="text-2xl" />
        </a>
      ))}
    </div>
  );
}
