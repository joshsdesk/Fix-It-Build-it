"use client";

import React from "react";
import { faLinkedin, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { vcardData } from "@/config/BusinessInfo";

export default function Footer() {
    return (
        <footer className="py-16 border-t border-white/5 bg-slate-950">
            <div className="max-w-[90rem] w-full mx-auto px-6">

                {/* Tier 1: Brand Details */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="flex items-center justify-center mb-4">
                        {(() => {
                            // Dynamically parse "Fix it, Build it Colorado" to color "Build it" purple
                            const parts = vcardData.company.split(/(Build it)/i);
                            if (parts.length === 3) {
                                return (
                                    <>
                                        <span className="text-3xl tracking-[0.2em] font-light text-white leading-none">
                                            {parts[0].trim()}
                                        </span>
                                        {" "}
                                        <span className="text-3xl tracking-[0.2em] font-normal text-fibi-purple leading-none">
                                            {parts[1].trim()}
                                        </span>
                                        {" "}
                                        <span className="text-3xl tracking-[0.2em] font-light text-white leading-none">
                                            {parts[2].trim()}
                                        </span>
                                    </>
                                );
                            }
                            // Fallback
                            return (
                                <span className="text-3xl tracking-[0.2em] font-light text-white leading-none">
                                    {vcardData.company}
                                </span>
                            );
                        })()}
                    </div>
                    <p className="text-slate-400 text-sm max-w-sm mb-4 leading-relaxed font-light">
                        {vcardData.seoDescription}
                    </p>
                    <div className="flex gap-6 mt-2 text-sm text-slate-300">
                        <a href={`tel:${vcardData.phone}`} className="hover:text-fibi-purple transition-colors font-medium">{vcardData.displayPhone}</a>
                        <span className="opacity-30">|</span>
                        <a href={`mailto:${vcardData.email}`} className="hover:text-fibi-purple transition-colors font-medium">{vcardData.email}</a>
                    </div>
                </div>

                {/* Tier 2: Legal & Social */}
                <div className="flex justify-center border-y border-white/5 py-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center text-sm font-medium">
                        <div className="flex gap-6 text-slate-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Waivers</a>
                        </div>

                        <div className="hidden md:block w-px h-4 bg-white/20"></div>

                        <div className="flex gap-6 text-slate-400">
                            <SocialIcon href={vcardData.instagram} target="_blank" rel="noopener noreferrer" icon={faInstagram} label="Instagram" size="lg" />
                            <SocialIcon href={vcardData.linkedin} target="_blank" rel="noopener noreferrer" icon={faLinkedin} label="LinkedIn" size="lg" />
                            <SocialIcon href={vcardData.facebook} target="_blank" rel="noopener noreferrer" icon={faFacebook} label="Facebook" size="lg" />
                            <SocialIcon href="/vcard" icon={faAddressCard} label="Digital Business Card" size="lg" />
                        </div>
                    </div>
                </div>

                {/* Tier 3: Admin & Dashboard */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p className="text-slate-500 uppercase tracking-widest text-center md:text-left">
                        © {new Date().getFullYear()} {vcardData.company}
                    </p>
                    <div className="flex gap-6 font-bold text-fibi-purple/60 uppercase tracking-widest">
                        <a href="https://fixitbuildit-portal.cloudflareaccess.com" className="hover:text-fibi-purple transition-colors">Client Portal</a>
                        <a href="https://fixitbuildit-portal.cloudflareaccess.com" className="hover:text-fibi-purple transition-colors">Admin Login</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
