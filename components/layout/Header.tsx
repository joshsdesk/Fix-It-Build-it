"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Instagram, Linkedin, Facebook } from "lucide-react";

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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:py-5",
                "bg-[#1A1A1A]/95 backdrop-blur-md border-b border-white/5"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">
                {/* Left: Mobile Menu Trigger + Desktop Nav */}
                <div className="flex items-center gap-8 md:w-2/3">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white p-2 z-[60] relative"
                    >
                        <span className="sr-only">Menu</span>
                        <div className="space-y-1.5">
                            <span className={cn("block w-6 h-0.5 bg-white transition-all", isMenuOpen && "rotate-45 translate-y-2")}></span>
                            <span className={cn("block w-4 h-0.5 bg-white transition-all", isMenuOpen && "opacity-0")}></span>
                            <span className={cn("block w-6 h-0.5 bg-white transition-all", isMenuOpen && "-rotate-45 -translate-y-2")}></span>
                        </div>
                    </button>

                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-3xl font-thin tracking-widest text-slate-300 hover:text-fibi-purple transition-colors uppercase whitespace-nowrap"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Right: Logo */}
                <div className="flex items-center justify-end gap-3 w-full md:w-1/3">
                    <span className="text-3xl tracking-[0.2em] uppercase font-bold text-white leading-none">
                        FIX-IT
                    </span>
                    <span className="text-3xl tracking-[0.2em] uppercase font-normal text-fibi-purple leading-none">
                        BUILD-IT
                    </span>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={cn(
                    "fixed inset-0 min-h-screen bg-[#1A1A1A]/98 backdrop-blur-2xl md:hidden transition-all duration-500 ease-in-out transform z-50",
                    isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
                )}>
                    <div className="flex flex-col items-center justify-center min-h-screen pt-20 gap-12 p-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl font-thin tracking-[0.3em] text-white hover:text-fibi-purple transition-colors uppercase group"
                            >
                                <span className="group-hover:text-orange-400 transition-colors">
                                    {item.name}
                                </span>
                            </a>
                        ))}

                        {/* Mobile Social Links */}
                        <div className="flex gap-8 mt-4 pt-8 border-t border-white/10 w-full justify-center">
                            <a href="https://www.instagram.com/fixitbuildit?igsh=MTh5eHI5bXAwc2V5Yw==" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/josh-bourassa-375a3948?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                <Linkedin size={24} />
                            </a>
                            <a href="https://www.facebook.com/fixitbuilditcolorado/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                <Facebook size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
