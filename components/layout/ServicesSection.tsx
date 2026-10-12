import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function ServicesSection() {
    return (
        <section id="services" className="relative min-h-0 flex flex-col justify-start lg:justify-center pt-28 sm:pt-32 lg:pt-24 pb-32 sm:pb-40 lg:pb-32 bg-gradient-to-b from-background to-stone-900 scroll-mt-28">
            <div className="layout-container relative z-10 w-full overflow-y-auto">
                <div className="flex flex-col gap-6 lg:gap-8">
                    <div className="flex flex-col items-center text-center gap-2 relative">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
                            Sensory Home Adaptations & <span className="font-normal text-gradient">Technical Installation</span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-lg font-light max-w-3xl leading-relaxed mx-auto">
                            Fix-It Build-It Colorado is a licensed contractor specializing in sensory room design and non-structural home installations. We engineer high-load ceiling swing mounts, modular climbing walls, and acoustic sound-dampening retreats built around sensory science and occupational therapy goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {/* Service Items */}
                        <div className="glass-card border-white/5 p-6 rounded-2xl flex flex-col h-full">
                            <h3 className="text-xl font-bold text-white mb-2">Joist-Anchored Ceiling Swing Mounts</h3>
                            <p className="text-sm text-slate-400 mb-4 flex-grow">Commercial-grade 360-degree rotational swivels anchored directly into structural ceiling framing, engineered to a 1,000 lb dynamic load rating for Lycra cocoon, platform, and bolster swings.</p>
                            <span className="text-xs font-medium text-fibi-accent uppercase tracking-widest">Vestibular (Motion & Balance)</span>
                        </div>
                        <div className="glass-card border-white/5 p-6 rounded-2xl flex flex-col h-full">
                            <h3 className="text-xl font-bold text-white mb-2">Modular Climbing & Heavy-Work Walls</h3>
                            <p className="text-sm text-slate-400 mb-4 flex-grow">Cabinet-grade 3/4-inch Baltic Birch hardwood panels secured into wall studs with modular French cleat systems, paired with commercial 4-inch cross-linked foam safety crash pads.</p>
                            <span className="text-xs font-medium text-fibi-accent uppercase tracking-widest">Proprioceptive (Deep Pressure)</span>
                        </div>
                        <div className="glass-card border-white/5 p-6 rounded-2xl flex flex-col h-full">
                            <h3 className="text-xl font-bold text-white mb-2">Acoustic Felt & Sound Isolation</h3>
                            <p className="text-sm text-slate-400 mb-4 flex-grow">Architectural beveled PET acoustic felt wall panels (NRC ≥ 0.75) and automatic drop-down door seals to lower ambient room noise floors and eliminate sensory auditory echo.</p>
                            <span className="text-xs font-medium text-fibi-purple uppercase tracking-widest">Acoustics & Auditory Regulation</span>
                        </div>
                        <div className="glass-card border-white/5 p-6 rounded-2xl flex flex-col h-full">
                            <h3 className="text-xl font-bold text-white mb-2">Low-Lux Calming Decompression Nooks</h3>
                            <p className="text-sm text-slate-400 mb-4 flex-grow">Built-in birch reading and recharge alcoves featuring zero-flicker solid-state DC warm dimming lighting (under 50 Lux) for safe retreat during sensory overload.</p>
                            <span className="text-xs font-medium text-fibi-purple uppercase tracking-widest">Photometric & Circadian Decompression</span>
                        </div>
                    </div>

                    {/* Quality Standard */}
                    <div className="w-full max-w-4xl mx-auto mt-8">
                        <div className="glass-card border-white/10 rounded-2xl p-6 md:p-8 text-center bg-black/40">
                            <h4 className="text-2xl font-bold text-white mb-4">Clinical-Grade Cleanliness Standard</h4>
                            <p className="text-slate-300 leading-relaxed">
                                Every interior cut and installation utilizes HEPA-filtered dust extraction and containment to protect sensitive airways and preserve clean indoor air quality.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
