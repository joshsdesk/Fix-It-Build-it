"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, LayoutGrid, Info, Box, FileText, ClipboardList, PencilRuler, Hammer, Home } from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function Services() {
    return (
        <section id="services" className="snap-start min-h-screen relative flex flex-col justify-center py-12 bg-gradient-to-b from-background to-stone-900 overflow-hidden">
            <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col gap-8">
                    {/* Header Section: Centered Narrative */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center gap-4 relative"
                    >
                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
                                The <span className="font-normal text-gradient">Sensory Spaces Blueprint</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg font-light max-w-2xl leading-relaxed mx-auto">
                                Independent carpentry integrated with sensory science. We build non-structural,
                                high-impact adaptations that transform your home into a safe harbor.
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-fibi-purple/30 text-[10px] text-fibi-purple font-bold w-fit uppercase tracking-wider">
                            <Info className="w-3 h-3" />
                            Specialized Adaptations
                        </div>
                    </motion.div>

                    {/* Unified Content Area: Bento + Timeline in one Balanced Grid System */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full relative">

                        {/* Compact Bento Cards (Restored to 2.8/1 aspect ratio and centered content) */}
                        {[
                            {
                                title: "Tactile Hardware",
                                description: "Custom-crafted sensory bins and stations designed for engagement and durability.",
                                icon: Box,
                                color: "purple"
                            },
                            {
                                title: "Structural Focus",
                                description: "Heavy-duty, grounded furniture (desks, shelving) providing essential proprioceptive feedback.",
                                icon: Shield,
                                color: "orange"
                            },
                            {
                                title: "Environmental Zoning",
                                description: "Physical room modifications implemented based on sensory-friendly frameworks.",
                                icon: LayoutGrid,
                                color: "orange"
                            },
                            {
                                title: "Methodology Framework",
                                description: "Utilizing the ASPECTSS™ framework for neuro-inclusive spatial design.",
                                icon: FileText,
                                color: "purple"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -3 }}
                                className={cn(
                                    "glass-card relative p-5 group overflow-hidden flex flex-col justify-center aspect-[2.8/1] border-white/10 lg:col-span-2",
                                    item.color === "orange" ? "border-orange-500/20 hover:border-orange-500/40" : "hover:border-fibi-purple/40"
                                )}
                            >
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-15 transition-opacity duration-500",
                                    item.color === "orange" ? "from-orange-500/10 to-transparent" : "from-fibi-purple/10 to-transparent"
                                )} />
                                <div className="flex items-center gap-4 relative z-10 text-left">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.1)] shrink-0",
                                        item.color === "orange" ? "bg-orange-500/10 text-orange-500 group-hover:bg-orange-500/20" : "bg-fibi-purple/10 text-fibi-purple group-hover:bg-fibi-purple/20"
                                    )}>
                                        <item.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{item.title}</h3>
                                        <p className="text-slate-400 text-xs font-light max-w-xs mt-1 leading-snug">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Timeline Items (Integrated directly into the same grid flow) */}
                        {steps.map((step, idx) => (
                            <div key={step.id} className="relative group flex flex-col items-center text-center mt-6 lg:mt-4">
                                {/* Simplified Flow Arrows */}
                                {idx < steps.length - 1 && (
                                    <div className="hidden lg:flex absolute top-7 left-[70%] w-[60%] items-center justify-center z-0">
                                        <div className="h-[1px] w-full bg-gradient-to-r from-fibi-purple/20 to-fibi-accent/20 rounded-full" />
                                        <div className="w-1 h-1 border-t border-r border-fibi-accent/30 rotate-45 transform -translate-x-1" />
                                    </div>
                                )}

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className={cn(
                                        "relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500",
                                        step.highlight
                                            ? "bg-fibi-accent text-white shadow-[0_0_20px_rgba(209,136,94,0.3)]"
                                            : "glass-card border-white/10 text-slate-400 group-hover:text-white"
                                    )}
                                >
                                    <step.icon className="w-6 h-6" />
                                    {step.highlight && (
                                        <div className="absolute -top-1.5 -right-1.5 bg-white text-fibi-accent text-[8px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase tracking-tight animate-pulse">
                                            Key
                                        </div>
                                    )}
                                </motion.div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-slate-100 tracking-tight">{step.title}</h4>
                                    <p className="text-[10px] text-slate-500 italic leading-tight px-1 max-w-[120px] mx-auto opacity-70 group-hover:opacity-100 transition-opacity">
                                        &quot;{step.description}&quot;
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
