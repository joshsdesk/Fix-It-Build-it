"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hammer, History, Heart, Shield } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight mb-6 text-white">The Lead <span className="text-gradient">Craftsman</span></h2>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-fibi-accent flex items-center justify-center font-black text-2xl text-fibi-accent shadow-lg shadow-fibi-accent/20">
                                    JB
                                </div>
                                <div>
                                    <div className="font-bold text-xl uppercase tracking-wider text-white">Josh Bourassa</div>
                                    <div className="text-fibi-accent text-sm font-bold">Independent Carpenter & HAA specialist</div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                Born from the personal necessity of building a safer, more regulated world for a son with Level 3 Autism,
                                Josh Bourassa combines 15+ years of structural experience with specialized sensory knowledge.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-4 glass-card bg-white/5 border-white/10">
                                <History className="w-6 h-6 text-fibi-accent mb-3" />
                                <h4 className="font-bold mb-1 text-white">Structural Roots</h4>
                                <p className="text-xs text-slate-500">15+ years of heritage in elite home construction.</p>
                            </div>
                            <div className="p-4 glass-card bg-white/5 border-white/10">
                                <Heart className="w-6 h-6 text-fibi-accent mb-3" />
                                <h4 className="font-bold mb-1 text-white">Lived Experience</h4>
                                <p className="text-xs text-slate-500">Personal dedication to neurodivergent safety standards.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="glass-card p-12 border-fibi-accent/20 bg-fibi-accent/5">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="w-6 h-6 text-fibi-accent" />
                                <h3 className="text-2xl font-bold text-white">Specialty Standards</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center group">
                                    <span className="text-slate-300 font-medium whitespace-nowrap">Safety First</span>
                                    <span className="w-full mx-4 h-px bg-white/5 min-w-[20px]" />
                                    <span className="text-slate-500 text-sm italic whitespace-nowrap">Reinforced Solutions</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-slate-300 font-medium whitespace-nowrap">Regulation</span>
                                    <span className="w-full mx-4 h-px bg-white/5 min-w-[20px]" />
                                    <span className="text-slate-500 text-sm italic whitespace-nowrap">Sensory Optimization</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-slate-300 font-medium whitespace-nowrap">Compliance</span>
                                    <span className="w-full mx-4 h-px bg-white/5 min-w-[20px]" />
                                    <span className="text-slate-500 text-sm italic whitespace-nowrap">Non-Structural Only</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-sm text-slate-400">
                                    Every project is tailored to the functional needs of the individual, ensuring safety without compromising quality.
                                </p>
                            </div>
                        </div>
                        {/* Decorative tool icon */}
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-fibi-accent rounded-full flex items-center justify-center animate-spin-slow shadow-lg shadow-fibi-accent/20">
                            <Hammer className="w-8 h-8 text-[#333333] rotate-45" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
