"use client";

import React from "react";
import { faLinkedin, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { vcardData } from "@/config/BusinessInfo";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="py-16 border-t border-white/5">
            <div className="max-w-[90rem] w-full mx-auto px-6">

                {/* Tier 1: Brand Details */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="relative h-20 w-48 sm:h-24 sm:w-56">
                            <Image
                                src={vcardData.logoImage}
                                alt="FIX IT, BUILD IT COLORADO LLC Logo"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 192px, 224px"
                            />
                        </div>
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
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-400">
                            <a href="/grievance-policy" className="min-h-[48px] flex items-center hover:text-white transition-colors">Client Grievance Policy</a>
                            <a href="/hepa-policy" className="min-h-[48px] flex items-center hover:text-white transition-colors">HEPA Dust Containment</a>
                            <a href="/privacy" className="min-h-[48px] flex items-center hover:text-white transition-colors">Data Privacy</a>
                            <a href="/non-discrimination" className="min-h-[48px] flex items-center hover:text-white transition-colors">Non-Discrimination</a>
                            <a href="/terms" className="min-h-[48px] flex items-center hover:text-white transition-colors">Terms & Warranty</a>
                            <a href="/payment-terms" className="min-h-[48px] flex items-center hover:text-white transition-colors">Payment Terms</a>
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
                <div className="flex flex-col items-center gap-4 text-xs">
                    <p className="text-slate-500 text-center max-w-4xl leading-relaxed">
                        FIX IT, BUILD IT COLORADO LLC | Specialty Code 677 (Environmental Accessibility Adaptations - EAA) | Procedure Code T2025 | Health First Colorado Provider Enrollment Pending
                    </p>
                    <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 mt-2 border-t border-white/5 pt-4">
                        <p className="text-slate-500 uppercase tracking-widest text-center md:text-left">
                            © {new Date().getFullYear()} FIX IT, BUILD IT COLORADO LLC
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-bold text-fibi-purple/60 uppercase tracking-widest">
                            <a href="https://fixitbuildit-portal.cloudflareaccess.com" className="min-h-[48px] flex items-center hover:text-fibi-purple transition-colors">Client Portal</a>
                            <a href="/admin" className="min-h-[48px] flex items-center hover:text-fibi-purple transition-colors">Admin Login</a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
