"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hammer, History, Heart, Shield, Volume2, LogOut } from "lucide-react";

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
                                    <div className="font-bold text-xl uppercase tracking-wider text-white">Josh</div>
                                    <div className="text-fibi-accent text-sm font-bold">Sensory-Informed Technician</div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                I didn't just learn these skills; I lived the need for them. As a father navigating the trials and triumphs of the ASD world, I saw the gaps in standard home construction. I am not a doctor or a lawyer—I am a Technician. I applied my trade to solve the friction points my own family faced. Now, I build those solutions for you.
                            </p>
                            <p className="text-fibi-accent font-bold text-lg mb-6">
                                "All-Access" Policy: We do not filter by "Level" or support needs. If you've been told your needs are "too much," you're in the right place.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-4 glass-card bg-white/5 border-white/10">
                                <History className="w-6 h-6 text-fibi-accent mb-3" />
                                <h4 className="font-bold mb-1 text-white">Structural Roots</h4>
                                <p className="text-xs text-slate-500">15+ years of elite trade experience.</p>
                            </div>
                            <div className="p-4 glass-card bg-white/5 border-white/10">
                                <Heart className="w-6 h-6 text-fibi-accent mb-3" />
                                <h4 className="font-bold mb-1 text-white">Lived Experience</h4>
                                <p className="text-xs text-slate-500">Parent-to-Parent understanding.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="glass-card p-12 border-fibi-purple/20 bg-fibi-purple/5">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="w-6 h-6 text-fibi-purple" />
                                <h3 className="text-2xl font-bold text-white">High-Durability Standard</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center group">
                                    <div className="flex items-center gap-2">
                                        <Volume2 className="w-4 h-4 text-fibi-purple" />
                                        <span className="text-slate-300 font-medium whitespace-nowrap">Acoustics</span>
                                    </div>
                                    <span className="w-full mx-4 h-px bg-white/5 min-w-[20px]" />
                                    <span className="text-slate-500 text-sm italic whitespace-nowrap">Sound management</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <div className="flex items-center gap-2">
                                        <LogOut className="w-4 h-4 text-fibi-purple" />
                                        <span className="text-slate-300 font-medium whitespace-nowrap">Escape</span>
                                    </div>
                                    <span className="w-full mx-4 h-px bg-white/5 min-w-[20px]" />
                                    <span className="text-slate-500 text-sm italic whitespace-nowrap">Decompression zones</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-fibi-purple" />
                                        <span className="text-slate-300 font-medium whitespace-nowrap">Integrity</span>
                                    </div>
                                    <span className="w-full mx-4 h-px bg-white/5 min-w-[20px]" />
                                    <span className="text-slate-500 text-sm italic whitespace-nowrap">Impact-resistant builds</span>
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
