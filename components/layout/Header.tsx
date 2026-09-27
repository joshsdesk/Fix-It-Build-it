"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { faLinkedin, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { vcardData } from "@/config/BusinessInfo";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Sensory Wizard", href: "#estimator" },
    { name: "About", href: "#about" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-3 lg:py-4",
                "bg-[#1A1A1A]/95 backdrop-blur-md border-b border-white/5"
            )}
        >
            <div className="max-w-[90rem] w-full mx-auto flex items-center justify-between relative">
                {/* Left: Logo */}
                <div className="flex items-center justify-start gap-2 sm:gap-3">
                    {(() => {
                        // Dynamically parse "Fix it, Build it Colorado" to color "Build it" purple
                        const parts = vcardData.company.split(/(Build it)/i);
                        if (parts.length === 3) {
                            return (
                                <>
                                    <span className="text-xl sm:text-2xl lg:text-3xl tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold text-white leading-none">
                                        {parts[0].trim()}
                                    </span>
                                    {" "}
                                    <span className="text-xl sm:text-2xl lg:text-3xl tracking-[0.15em] sm:tracking-[0.2em] uppercase font-normal text-fibi-purple leading-none">
                                        {parts[1].trim()}
                                    </span>
                                    {" "}
                                    <span className="text-xl sm:text-2xl lg:text-3xl tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold text-white leading-none">
                                        {parts[2].trim()}
                                    </span>
                                </>
                            );
                        }
                        // Fallback if they change the name completely
                        return (
                            <span className="text-xl sm:text-2xl lg:text-3xl tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold text-white leading-none">
                                {vcardData.company}
                            </span>
                        );
                    })()}
                </div>

                {/* Right: Mobile Menu Trigger + Desktop Nav */}
                <div className="flex items-center justify-end gap-4 lg:gap-8">
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm xl:text-base font-light tracking-widest text-slate-300 hover:text-fibi-purple transition-colors uppercase whitespace-nowrap"
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
                    <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-12 gap-6 sm:gap-8 p-6">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-xl sm:text-2xl font-thin tracking-[0.25em] text-white hover:text-fibi-purple transition-colors uppercase group"
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
