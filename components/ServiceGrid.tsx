"use client";

import React from "react";
import { Shield, LayoutGrid, Info, Box, FileText } from "lucide-react";

const services = [
    {
        title: "Sensory Pods",
        description: "Custom calming stations designed for compression and regulation.",
        icon: Box,
    },
    {
        title: "Safety Installs",
        description: "Reinforced gates, wall padding, and elopement prevention.",
        icon: Shield,
    },
    {
        title: "Adaptive Storage",
        description: "Visual organization systems for executive function support.",
        icon: LayoutGrid,
    },
    {
        title: "Waiver Decoder",
        description: "We speak 'Case Manager'. Compatible with CES, SLS, and CHRP Waivers. We provide itemized HAA quotes.",
        icon: FileText,
    },
];

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
                    {services.map((service) => (
                        <div key={service.title} className="glass-card relative p-8 group overflow-hidden">
                            {/* L-Bracket: Top Right */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-fibi-accent/30 group-hover:border-fibi-accent group-hover:shadow-[0_0_15px_rgba(209,136,94,0.5)] transition-all duration-300 rounded-tr-lg" />
                            {/* L-Bracket: Bottom Left */}
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-fibi-accent/30 group-hover:border-fibi-accent group-hover:shadow-[0_0_15px_rgba(209,136,94,0.5)] transition-all duration-300 rounded-bl-lg" />

                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-fibi-accent/10 text-fibi-accent group-hover:scale-110 transition-transform relative z-10">
                                <service.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white relative z-10">{service.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm relative z-10">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
