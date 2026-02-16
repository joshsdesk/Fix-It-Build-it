"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Sensory Wizard", href: "#estimator" },
    { name: "About", href: "#about" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-6 md:py-8",
                scrolled ? "bg-[#1A1A1A]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Mobile Menu Trigger / Nav Links (Desktop) */}
                <div className="flex items-center">
                    <button className="md:hidden text-white p-2">
                        <span className="sr-only">Menu</span>
                        <div className="space-y-1.5">
                            <span className="block w-6 h-0.5 bg-white"></span>
                            <span className="block w-4 h-0.5 bg-white"></span>
                            <span className="block w-6 h-0.5 bg-white"></span>
                        </div>
                    </button>
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-light tracking-widest text-slate-300 hover:text-fibi-purple transition-colors uppercase"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right: Logo (Fixed Top-Right) */}
                <div className="flex items-center gap-3">
                    <span className="text-2xl tracking-[0.2em] uppercase font-thin text-white leading-none">
                        FIX-IT
                    </span>
                    <span className="text-2xl tracking-[0.2em] uppercase font-normal text-fibi-purple leading-none">
                        BUILD-IT
                    </span>
                </div>
            </div>
        </nav>
    );
}
