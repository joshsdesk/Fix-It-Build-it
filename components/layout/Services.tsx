"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, LayoutGrid, Box, FileText, ClipboardList, PencilRuler, Hammer, Home } from "lucide-react";
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
        title: "Specialized Install",
        description: "Quick, clean, non-structural integration.",
        icon: Home,
    },
];

const bentoTabs = [
    {
        title: "Tactile Hardware",
        description: "Sensory bins & stations for durability.",
        icon: Box,
        color: "purple"
    },
    {
        title: "Structural Focus",
        description: "Grounded furniture & proprioceptive rigs.",
        icon: Shield,
        color: "orange"
    },
    {
        title: "Zoning",
        description: "Spatial room mods for sensory flow.",
        icon: LayoutGrid,
        color: "orange"
    },
    {
        title: "Methodology",
        description: "ASPECTSS™ evidence-based design.",
        icon: FileText,
        color: "purple"
    }
];

export default function Services() {
    return (
        <section id="services" className="relative min-h-screen flex items-center justify-center pt-16 pb-14 md:pt-20 md:pb-16 bg-gradient-to-b from-background to-stone-900 overflow-hidden">
            <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col gap-5 sm:gap-6">
                    {/* Header Section: Centered Narrative */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center gap-2.5 relative"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fibi-purple/10 border border-fibi-purple/20 text-fibi-purple text-[10px] md:text-xs font-bold uppercase tracking-wider w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fibi-purple opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-fibi-purple"></span>
                            </span>
                            Specialized Adaptations
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
                                The <span className="font-normal text-gradient">Sensory Spaces Blueprint</span>
                            </h2>
                            <p className="text-slate-400 text-xs sm:text-sm md:text-base font-light max-w-2xl leading-relaxed mx-auto">
                                Independent carpentry integrated with sensory science. We build non-structural,
                                high-impact adaptations that transform your home into a safe harbor.
                            </p>
                        </div>
                    </motion.div>

                    {/* Unified Content Area: Bento + Timeline */}
                    <div className="flex flex-col gap-5 sm:gap-6 w-full relative">
                        {/* Slim Bento Tabs Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full">
                            {bentoTabs.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -2 }}
                                    className={cn(
                                        "glass-card relative p-2.5 sm:p-3 group overflow-hidden flex flex-row items-center gap-3 border-white/10 w-full rounded-xl",
                                        item.color === "orange" ? "border-orange-500/20 hover:border-orange-500/40" : "border-fibi-purple/20 hover:border-fibi-purple/40"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0",
                                        item.color === "orange" ? "bg-orange-500/10 text-orange-500" : "bg-fibi-purple/10 text-fibi-purple"
                                    )} >
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xs sm:text-[13px] font-bold text-white tracking-tight leading-tight">{item.title}</h3>
                                        <p className="text-[10px] sm:text-[11px] text-slate-400 font-light mt-0.5 leading-tight">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Compact Process Timeline */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4 sm:gap-4 w-full pt-3 sm:pt-4 border-t border-white/5">
                            {steps.map((step, idx) => (
                                <div key={step.id} className="relative group flex flex-col items-center text-center">
                                    {/* Desktop Flow Arrows */}
                                    {idx < steps.length - 1 && (
                                        <div className="hidden lg:flex absolute top-4 left-[75%] w-[50%] items-center justify-center z-0">
                                            <div className="h-[1px] w-full bg-fibi-purple/10 rounded-full" />
                                        </div>
                                    )}

                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className={cn(
                                            "relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center mb-1.5 transition-all duration-500",
                                            step.highlight
                                                ? "bg-fibi-accent text-white"
                                                : "glass-card border-white/5 text-slate-400"
                                        )}
                                    >
                                        <step.icon className="w-4 h-4" />
                                    </motion.div>

                                    <div className="space-y-0.5">
                                        <h4 className="text-[11px] sm:text-xs font-bold text-slate-200 tracking-tight">{step.title}</h4>
                                        <p className="text-[9px] sm:text-[10px] text-slate-400 italic px-1 max-w-[130px] mx-auto opacity-80 leading-tight">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Experience Badge */}
                                    {idx === 3 && (
                                        <div className="mt-2 pt-1">
                                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-fibi-purple/10 border border-fibi-purple/20 text-fibi-purple text-[8px] sm:text-[9px] font-bold uppercase tracking-wider w-fit mx-auto">
                                                <span className="relative flex h-1.5 w-1.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fibi-purple opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-fibi-purple"></span>
                                                </span>
                                                15+ Yrs. Experience
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
