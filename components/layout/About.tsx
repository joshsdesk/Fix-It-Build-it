"use client";

import React from "react";
import { Hammer, History, Heart, Shield, Volume2, LogOut, Instagram, Linkedin, Facebook } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="relative min-h-screen flex items-center justify-center pt-16 pb-14 md:pt-20 md:pb-16 overflow-hidden">
            <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-6 sm:mb-8 md:mb-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-[1.1] mb-1.5 sm:mb-2">The Lead <span className="font-normal text-gradient">Craftsman</span></h2>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 font-light mx-auto max-w-2xl">
                        Building specialized environments with precision and empathy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
                    <div className="flex flex-col justify-between gap-4 text-left">
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-800 border-2 border-fibi-accent flex items-center justify-center font-black text-lg sm:text-xl text-fibi-accent shadow-lg shadow-fibi-accent/20 shrink-0">
                                    JB
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="font-bold text-base sm:text-lg uppercase tracking-wider text-white">Josh</div>
                                        <div className="flex gap-2.5 text-slate-400">
                                            <a href="https://www.instagram.com/fixitbuildit?igsh=MTh5eHI5bXAwc2V5Yw==" target="_blank" rel="noopener noreferrer" className="hover:text-fibi-purple transition-all hover:scale-110"><Instagram size={15} /></a>
                                            <a href="https://www.linkedin.com/in/josh-bourassa-375a3948?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-fibi-purple transition-all hover:scale-110"><Linkedin size={15} /></a>
                                            <a href="https://www.facebook.com/fixitbuilditcolorado/" target="_blank" rel="noopener noreferrer" className="hover:text-fibi-purple transition-all hover:scale-110"><Facebook size={15} /></a>
                                        </div>
                                    </div>
                                    <div className="text-fibi-accent text-xs sm:text-sm font-bold">Sensory-Informed Technician</div>
                                </div>
                            </div>

                            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                                I didn&apos;t just learn these skills; I lived the need for them. As a father navigating the trials and triumphs of the ASD world, I saw the gaps in standard home construction. I am not a doctor or a lawyer—I am a Technician. I applied my trade to solve the friction points my own family faced. Now, I build those solutions for you.
                            </p>

                            <p className="text-fibi-accent font-bold text-xs sm:text-sm">
                                &quot;All-Access&quot; Policy: We do not filter by &quot;Level&quot; or support needs. If you&apos;ve been told your needs are &quot;too much,&quot; you&apos;re in the right place.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
                            <div className="p-3 sm:p-4 card-container group hover:border-fibi-purple/50 transition-colors rounded-xl">
                                <History className="w-5 h-5 text-fibi-accent mb-1.5 group-hover:text-fibi-purple transition-colors" />
                                <h4 className="font-bold text-xs sm:text-sm text-white">Structural Roots</h4>
                                <p className="text-[10px] sm:text-xs text-slate-400">15+ years of elite trade experience.</p>
                            </div>
                            <div className="p-3 sm:p-4 card-container group hover:border-fibi-purple/50 transition-colors rounded-xl">
                                <Heart className="w-5 h-5 text-fibi-accent mb-1.5 group-hover:text-fibi-purple transition-colors" />
                                <h4 className="font-bold text-xs sm:text-sm text-white">Lived Experience</h4>
                                <p className="text-[10px] sm:text-xs text-slate-400">Parent-to-Parent understanding.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative group flex flex-col justify-center">
                        <div className="card-container p-6 sm:p-8 md:p-10 hover:border-fibi-purple/50 transition-colors rounded-2xl h-full flex flex-col justify-between">
                            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-fibi-purple" />
                                <h3 className="text-lg sm:text-xl font-bold text-white">High-Durability Standard</h3>
                            </div>
                            <div className="space-y-4 sm:space-y-5">
                                <div className="flex justify-between items-center group">
                                    <div className="flex items-center gap-2">
                                        <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fibi-purple" />
                                        <span className="text-slate-300 text-xs sm:text-sm font-medium whitespace-nowrap">Acoustics</span>
                                    </div>
                                    <span className="w-full mx-3 sm:mx-4 h-px bg-white/5 min-w-[20px]" />
                                    <span className="text-slate-400 text-xs italic whitespace-nowrap">Sound management</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <div className="flex items-center gap-2">
                                        <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fibi-purple" />
                                        <span className="text-slate-300 text-xs sm:text-sm font-medium whitespace-nowrap">Escape</span>
                                    </div>
                                    <span className="w-full mx-3 sm:mx-4 h-px bg-white/5 min-w-[20px]" />
                                    <span className="text-slate-400 text-xs italic whitespace-nowrap">Decompression zones</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fibi-purple" />
                                        <span className="text-slate-300 text-xs sm:text-sm font-medium whitespace-nowrap">Integrity</span>
                                    </div>
                                    <span className="w-full mx-3 sm:mx-4 h-px bg-white/5 min-w-[20px]" />
                                    <span className="text-slate-400 text-xs italic whitespace-nowrap">Impact-resistant builds</span>
                                </div>
                            </div>
                            <div className="mt-6 pt-5 border-t border-white/10">
                                <p className="text-xs sm:text-sm text-slate-400">
                                    Every project is tailored to the functional needs of the individual, ensuring safety without compromising quality.
                                </p>
                            </div>
                        </div>
                        {/* Decorative tool icon */}
                        <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-12 h-12 sm:w-14 sm:h-14 bg-fibi-accent rounded-full flex items-center justify-center animate-spin-slow shadow-lg shadow-fibi-accent/20">
                            <Hammer className="w-6 h-6 sm:w-7 sm:h-7 text-stone-900 rotate-45" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
