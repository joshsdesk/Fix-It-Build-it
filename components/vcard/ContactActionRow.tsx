"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen, faEnvelope, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { vcardData } from "@/components/layout/BusinessInfo";

export default function ContactActionRow() {
  const phoneNumber = `tel:${vcardData.phone}`;
  const emailAddress = `mailto:${vcardData.email}`;
  const smsNumber = `sms:${vcardData.phone}`;

  return (
    <div className="component-surface p-4 flex justify-around items-center bg-fibi-accent">
      <a 
        href={phoneNumber} 
        className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-white text-white hover:bg-white hover:text-fibi-accent transition-colors"
        aria-label="Call"
      >
        <FontAwesomeIcon icon={faMobileScreen} className="text-2xl" />
      </a>
      
      <a 
        href={emailAddress} 
        className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-white text-white hover:bg-white hover:text-fibi-accent transition-colors"
        aria-label="Email"
      >
        <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
      </a>
      
      <a 
        href={smsNumber} 
        className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-white text-white hover:bg-white hover:text-fibi-accent transition-colors"
        aria-label="Text Message"
      >
        <FontAwesomeIcon icon={faCommentDots} className="text-2xl" />
      </a>
    </div>
  );
}
