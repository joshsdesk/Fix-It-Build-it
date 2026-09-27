"use client";

import React from "react";

import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { vcardData } from "@/config/BusinessInfo";
import { SocialIcon } from "@/components/ui/SocialIcon";

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
        <SocialIcon
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          icon={link.icon}
          label={link.label}
          size="4xl"
          className="w-14 h-14"
        />
      ))}
    </div>
  );
}
