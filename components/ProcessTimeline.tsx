"use client";

import React from "react";
import { ClipboardList, PencilRuler, Hammer, Home } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Site Audit",
        description: "Comprehensive sensory & safety evaluation with scheduling for quiet hours.",
        icon: ClipboardList,
    },
    {
        id: 2,
        title: "Custom Design",
        description: "Tailored adaptation planning with HEPA dust control protocols.",
        icon: PencilRuler,
    },
    {
        id: 3,
        title: "Off-Site Fabrication",
        description: "80% of fabrication happens in our shop, not your living room.",
        icon: Hammer,
        highlight: true,
    },
    {
        id: 4,
        title: "Specialist Install",
        description: "Quick, clean, non-structural integration.",
        icon: Home,
    },
];

export default function ProcessTimeline() {
    return (
        <section id="process" className="py-24 relative overflow-hidden bg-slate-900/40 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">The <span className="text-fibi-accent">HAA Protocol</span></h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        A rigorous 4-step process designed for the ASD community. We prioritize safety, speed, and minimal environmental intrusion.
                    </p>
                </div>

                <div className="relative pt-8">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {steps.map((step) => (
                            <div key={step.id} className="relative group flex flex-col items-center text-center">
                                <div className={`
                                    relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300
                                    ${step.highlight
                                        ? "bg-fibi-accent text-white shadow-lg shadow-fibi-accent/20 scale-110"
                                        : "bg-slate-800 border border-white/10 text-slate-400 group-hover:border-fibi-accent/50 group-hover:text-fibi-accent"}
                                `}>
                                    <step.icon className="w-8 h-8" />
                                    {step.highlight && (
                                        <div className="absolute -top-3 -right-3 bg-white text-fibi-accent text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                                            Key
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className={`text-xl font-bold mb-2 ${step.highlight ? "text-white" : "text-slate-200"}`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed px-4">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
