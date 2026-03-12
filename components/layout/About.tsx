"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hammer, History, Heart, Shield, Volume2, LogOut, Instagram, Linkedin, Facebook } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="min-h-screen flex flex-col justify-center py-12 relative overflow-hidden">
            <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-[1.1] mb-2">The Lead <span className="font-normal text-gradient">Craftsman</span></h2>
                    <p className="text-lg md:text-xl text-slate-300 font-light mx-auto max-w-2xl">
                        Building specialized environments with precision and empathy.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-8 text-left">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-fibi-accent flex items-center justify-center font-black text-2xl text-fibi-accent shadow-lg shadow-fibi-accent/20">
                                    JB
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="font-bold text-xl uppercase tracking-wider text-white">Josh</div>
                                        <div className="flex gap-3 text-slate-400">
                                            <a href="https://www.instagram.com/fixitbuildit?igsh=MTh5eHI5bXAwc2V5Yw==" target="_blank" rel="noopener noreferrer" className="hover:text-fibi-purple transition-all hover:scale-110"><Instagram size={16} /></a>
                                            <a href="https://www.linkedin.com/in/josh-bourassa-375a3948?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-fibi-purple transition-all hover:scale-110"><Linkedin size={16} /></a>
                                            <a href="https://www.facebook.com/fixitbuilditcolorado/" target="_blank" rel="noopener noreferrer" className="hover:text-fibi-purple transition-all hover:scale-110"><Facebook size={16} /></a>
                                        </div>
                                    </div>
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
                            <div className="p-4 card-container group hover:border-fibi-purple/50 transition-colors">
                                <History className="w-6 h-6 text-fibi-accent mb-3 group-hover:text-fibi-purple transition-colors" />
                                <h4 className="font-bold mb-1 text-white">Structural Roots</h4>
                                <p className="text-xs text-slate-500">15+ years of elite trade experience.</p>
                            </div>
                            <div className="p-4 card-container group hover:border-fibi-purple/50 transition-colors">
                                <Heart className="w-6 h-6 text-fibi-accent mb-3 group-hover:text-fibi-purple transition-colors" />
                                <h4 className="font-bold mb-1 text-white">Lived Experience</h4>
                                <p className="text-xs text-slate-500">Parent-to-Parent understanding.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="card-container p-12 hover:border-fibi-purple/50 transition-colors">
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
                            <Hammer className="w-8 h-8 text-stone-900 rotate-45" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
