"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Map, CheckCircle2, FileText, ChevronRight } from "lucide-react";

interface HAARoadmapModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const steps = [
    {
        title: "Eligibility Check",
        desc: "Verify waiver (CES, SLS, HCBS-DD) or private pay status.",
        icon: FileText,
    },
    {
        title: "Functional Consult",
        desc: "Virtual or onsite assessment of sensory and safety triggers.",
        icon: Map,
    },
    {
        title: "Design Manifest",
        desc: "Custom HAA blueprint tailored to individual regulation needs.",
        icon: CheckCircle2,
    },
    {
        title: "Precision Build",
        desc: "Professional installation with high-end structural integrity.",
        icon: ChevronRight,
    },
];

export default function HAARoadmapModal({ isOpen, onClose }: HAARoadmapModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-2xl glass-card p-10 border-fibi-accent/30"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-12">
                            <h3 className="text-3xl font-bold mb-3">The <span className="text-gradient">HAA Roadmap</span></h3>
                            <p className="text-slate-400">Our 4-step process to a safer, more regulated home.</p>
                        </div>

                        <div className="space-y-8 relative">
                            {/* Vertical line connector */}
                            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/5" />

                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-6 relative"
                                >
                                    <div className="w-14 h-14 rounded-full bg-slate-900 border border-fibi-accent/30 flex items-center justify-center shrink-0 z-10 shadow-lg shadow-fibi-accent/10">
                                        <step.icon className="w-6 h-6 text-fibi-accent" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={onClose}
                                className="btn-primary w-full max-w-xs"
                            >
                                Got it, let's start
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
