"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { faLinkedin, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { vcardData } from "@/config/BusinessInfo";
import Image from "next/image";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Sensory Wizard", href: "/sensory-wizard" },
    { name: "About", href: "/about" },
    { name: "Packages", href: "/packages" },
    { name: "Funding", href: "/funding" },
    { name: "Unmet Needs", href: "/unmet-needs" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav
            className={cn(
                "absolute top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 pt-3 pb-1.5 lg:pt-4 lg:pb-2 bg-transparent"
            )}
        >
            <div className="max-w-[90rem] w-full mx-auto flex items-center justify-between relative">
                {/* Left: Logo */}
                <div className="flex items-center justify-start z-50">
                    <a href="/" className="block relative w-64 sm:w-80 lg:w-96">
                        <Image
                            src={vcardData.logoImage}
                            alt="FIX IT, BUILD IT COLORADO LLC Logo"
                            width={384}
                            height={120}
                            className="w-full h-auto object-left"
                            priority
                        />
                    </a>
                </div>

                {/* Right: Desktop Nav + Mobile Menu Trigger */}
                <div className="flex items-center justify-end gap-4 lg:gap-8 flex-1">
                    <nav className="hidden lg:flex items-center justify-end gap-3 xl:gap-4 w-full">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="min-h-[48px] flex items-center text-lg xl:text-xl font-light tracking-widest text-slate-300 hover:text-fibi-purple transition-all uppercase whitespace-nowrap [text-shadow:_0_0_12px_rgba(255,255,255,0.6)] hover:[text-shadow:_0_0_15px_rgba(168,85,247,0.8)]"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-white p-2 z-[60] relative"
                        aria-label="Toggle navigation menu"
                    >
                        <span className="sr-only">Menu</span>
                        <div className="space-y-1.5">
                            <span className={cn("block w-6 h-0.5 bg-white transition-all", isMenuOpen && "rotate-45 translate-y-2")}></span>
                            <span className={cn("block w-4 h-0.5 bg-white transition-all", isMenuOpen && "opacity-0")}></span>
                            <span className={cn("block w-6 h-0.5 bg-white transition-all", isMenuOpen && "-rotate-45 -translate-y-2")}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={cn(
                    "fixed inset-0 min-h-screen bg-[#1A1A1A]/98 backdrop-blur-2xl lg:hidden transition-all duration-500 ease-in-out transform z-50 overflow-y-auto",
                    isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
                )}>
                    <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-12 gap-3 sm:gap-4 p-6">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="min-h-[48px] flex items-center text-base sm:text-lg font-thin tracking-[0.25em] text-white hover:text-fibi-purple transition-colors uppercase group"
                            >
                                <span className="group-hover:text-orange-400 transition-colors">
                                    {item.name}
                                </span>
                            </a>
                        ))}

                        {/* Mobile Social Links */}
                        <div className="flex gap-8 mt-2 pt-6 border-t border-white/10 w-full justify-center max-w-xs">
                            <SocialIcon href={vcardData.instagram} target="_blank" rel="noopener noreferrer" icon={faInstagram} label="Instagram" size="2xl" />
                            <SocialIcon href={vcardData.linkedin} target="_blank" rel="noopener noreferrer" icon={faLinkedin} label="LinkedIn" size="2xl" />
                            <SocialIcon href={vcardData.facebook} target="_blank" rel="noopener noreferrer" icon={faFacebook} label="Facebook" size="2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
