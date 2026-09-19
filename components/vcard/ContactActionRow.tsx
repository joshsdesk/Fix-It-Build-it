"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileScreen,
  faEnvelope,
  faCommentDots,
  faCalendarCheck,
  faBagShopping,
  faChair,
  faCartShopping,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { vcardData, getCtaLinks, type CtaKey } from "@/components/layout/BusinessInfo";

const CTA_ICONS: Record<CtaKey, typeof faLink> = {
  appointment: faCalendarCheck,
  orderAhead: faBagShopping,
  reservation: faChair,
  shopOnline: faCartShopping,
  custom: faLink,
};

export default function ContactActionRow() {
  const phoneNumber = `tel:${vcardData.phone}`;
  const emailAddress = `mailto:${vcardData.email}`;
  const smsNumber = `sms:${vcardData.phone}`;
  const ctaLinks = getCtaLinks();

  return (
    <div className="flex flex-col gap-3">
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

      {ctaLinks.length > 0 ? (
        <div className="component-surface p-3 flex flex-wrap justify-center gap-2 bg-slate-900/80 backdrop-blur-md">
          {ctaLinks.map((cta) => (
            <a
              key={cta.key}
              href={cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-fibi-accent/50 bg-fibi-accent/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-fibi-purple/80 hover:bg-fibi-purple/40"
            >
              <FontAwesomeIcon icon={CTA_ICONS[cta.key]} className="text-sm" />
              {cta.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

