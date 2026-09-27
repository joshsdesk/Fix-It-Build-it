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
import { vcardData, getCtaLinks, type CtaKey } from "@/config/BusinessInfo";
import { SocialIcon } from "@/components/ui/SocialIcon";

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
      <div className="component-surface p-4 flex justify-around items-center bg-slate-900/80 backdrop-blur-md">
        <SocialIcon 
          href={phoneNumber} 
          icon={faMobileScreen} 
          label="Call" 
          size="4xl"
          className="w-14 h-14"
        />
        <SocialIcon 
          href={emailAddress} 
          icon={faEnvelope} 
          label="Email" 
          size="4xl"
          className="w-14 h-14"
        />
        <SocialIcon 
          href={smsNumber} 
          icon={faCommentDots} 
          label="Text Message" 
          size="4xl"
          className="w-14 h-14"
        />
      </div>

      {ctaLinks.length > 0 ? (
        <div className="component-surface p-3 flex flex-wrap justify-center gap-2 bg-slate-900/80 backdrop-blur-md">
          {ctaLinks.map((cta) => (
            <a
              key={cta.key}
              href={cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-fibi-accent/50 bg-fibi-accent/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-fibi-purple/80 hover:bg-fibi-purple/40"
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

