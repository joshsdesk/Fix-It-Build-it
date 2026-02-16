"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GeometricBackground from "@/components/GeometricBackground";

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <GeometricBackground />

            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-fibi-accent/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-fibi-accent/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fibi-accent/10 border border-fibi-accent/20 text-fibi-accent text-xs font-bold uppercase tracking-wider w-fit">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fibi-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-fibi-accent"></span>
                        </span>
                        Professional HAA Specialist • Colorado
                    </div>

                    <h1 className="text-5xl md:text-7xl font-thin tracking-tight leading-[1.1]">
                        Building Autonomy.<br />
                        <span className="font-normal text-gradient">One Room at a Time.</span>
                    </h1>

                    <p className="text-xl text-slate-300 max-w-lg leading-relaxed font-light">
                        Specialized Home Accessibility Adaptations (HAA) for the Neurodivergent Community.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={onOpenModal}
                            className="btn-primary flex items-center justify-center gap-2 text-lg"
                        >
                            Start Intake <ArrowRight className="w-5 h-5" />
                        </button>
                        <a
                            href="#roadmap"
                            className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center font-bold"
                        >
                            HAA Roadmap
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative"
                >
                    <div className="glass-card p-4 relative z-10 aspect-square flex items-center justify-center overflow-hidden">
                        {/* Abstract Construction Visualization */}
                        <div className="grid grid-cols-2 gap-4 w-full h-full opacity-30">
                            <div className="bg-slate-700 rounded-lg animate-pulse" />
                            <div className="bg-fibi-accent/20 rounded-lg" />
                            <div className="bg-slate-600 rounded-lg" />
                            <div className="bg-slate-700 rounded-lg animate-pulse" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl font-black text-white/10 select-none">FIBI</div>
                                <div className="text-sm font-mono text-fibi-accent/60 mt-2 tracking-widest uppercase">Colorado Specialist</div>
                            </div>
                        </div>
                    </div>
                    {/* Floating badge */}
                    <div className="absolute -bottom-6 -left-6 glass-card p-6 border-fibi-accent/30 animate-bounce-slow">
                        <div className="text-3xl font-bold text-fibi-accent">15+</div>
                        <div className="text-xs text-slate-400 uppercase tracking-widest">Years Expertise</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
