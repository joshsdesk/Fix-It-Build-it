"use client";

import React from "react";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { vcardData } from "@/components/layout/BusinessInfo";

export default function Footer() {
    return (
        <footer className="py-16 border-t border-white/5 bg-slate-950">
            <div className="max-w-[90rem] w-full mx-auto px-6">

                {/* Tier 1: Brand Details */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl tracking-[0.2em] font-light text-white leading-none">
                            FIX-IT
                        </span>
                        <span className="text-3xl tracking-[0.2em] font-normal text-fibi-purple leading-none">
                            BUILD-IT
                        </span>
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
                            <a href={vcardData.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all"><Instagram size={18} /></a>
                            <a href={vcardData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all"><Linkedin size={18} /></a>
                            <a href={vcardData.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all"><Facebook size={18} /></a>
                            <a href="#" className="hover:text-white hover:scale-110 transition-all flex items-center justify-center">
                                {/* TikTok icon fallback */}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                            </a>
                            <a href="/vcard" className="hover:text-fibi-accent hover:scale-110 transition-all flex items-center justify-center" aria-label="Digital Business Card">
                                <FontAwesomeIcon icon={faAddressCard} className="text-[18px]" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Tier 3: Admin & Dashboard */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p className="text-slate-500 uppercase tracking-widest text-center md:text-left">
                        © 2026 Fix-It Build-It Colorado LLC.
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
