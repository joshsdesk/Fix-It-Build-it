"use client";

import React from "react";
import { Shield, LayoutGrid, Info, Box, FileText } from "lucide-react";

// Services array removed as content is now static in layout

export default function ServiceGrid() {
    return (
        <section id="services" className="py-24 bg-gradient-to-b from-[#1A1A1A] to-stone-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-4xl font-thin tracking-tight mb-4 text-white">The <span className="text-fibi-accent font-normal">HAA Protocol</span></h2>
                    <p className="text-slate-400 text-lg font-light">
                        Independent carpentry integrated with sensory science. We build non-structural,
                        high-impact adaptations that transform your home into a safe harbor.
                    </p>
                </div>
                <div className="glass-card px-4 py-2 border-fibi-accent/30 flex items-center gap-3 text-sm text-fibi-accent font-bold w-fit mb-12">
                    <Info className="w-4 h-4" />
                    Specialized Adaptations
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="glass-card relative p-8 group overflow-hidden">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-fibi-accent/10 text-fibi-accent group-hover:scale-110 transition-transform relative z-10">
                            <Box className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white relative z-10">Sensory Installations</h3>
                        <p className="text-slate-400 leading-relaxed text-sm relative z-10">
                            Professional assembly and secure mounting of tactile panels, bubble tubes, and specialized sensory furniture.
                        </p>
                    </div>

                    <div className="glass-card relative p-8 group overflow-hidden">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-fibi-accent/10 text-fibi-accent group-hover:scale-110 transition-transform relative z-10">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white relative z-10">Adaptive Safety</h3>
                        <p className="text-slate-400 leading-relaxed text-sm relative z-10">
                            Installation of specialized gate hardware, safety window films, wall padding, and anti-tip anchoring.
                        </p>
                    </div>

                    <div className="glass-card relative p-8 group overflow-hidden">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-fibi-accent/10 text-fibi-accent group-hover:scale-110 transition-transform relative z-10">
                            <LayoutGrid className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white relative z-10">Specialized Storage</h3>
                        <p className="text-slate-400 leading-relaxed text-sm relative z-10">
                            Organization systems for equipment and secure, safety-locking cabinetry for sensitive items.
                        </p>
                    </div>

                    <div className="glass-card relative p-8 group overflow-hidden">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-fibi-accent/10 text-fibi-accent group-hover:scale-110 transition-transform relative z-10">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white relative z-10">Technical Consultation</h3>
                        <p className="text-slate-400 leading-relaxed text-sm relative z-10">
                            On-site walkthroughs to plan installation strategy, hardware requirements, and equipment placement.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
