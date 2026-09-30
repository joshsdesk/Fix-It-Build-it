"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Activity, Shield, Ear, Eye, 
    VolumeX, ArrowRightLeft, DoorOpen, 
    Layers, Milestone, Focus, ShieldCheck, 
    Wrench, Hammer
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PendingApprovalStamp } from "@/components/ui/rubber-stamp/PendingApprovalStamp";

const quadrants = [
  {
    id: "seeker",
    title: "1. The Seeker",
    subtitle: "(High/Active)",
    icon: Activity,
    color: "orange",
    whatsHappening: "Craves intense movement, spinning, crashing, and deep proprioceptive input.",
    aspectssFocus: "Activity Zones & Safety Clearance",
    diyHack: "Converting low-profile storage benches into padded crash zones with heavy-duty floor mats.",
    customSolution: "Structural ceiling joist mounts with 360-degree dual-swivel hardware for indoor swings, climbing rigs, and heavy-work walls."
  },
  {
    id: "avoider",
    title: "2. The Avoider",
    subtitle: "(Low/Active)",
    icon: Shield,
    color: "purple",
    whatsHappening: "Quickly overwhelmed by loud noises, bright lights, or crowds; seeks escape or hides.",
    aspectssFocus: "Quiet Escape & Acoustic Containment",
    diyHack: "Lining shelving units or closet nooks with acoustic felt and blackout curtains to create a micro \"Battery Recharge\" hideaway.",
    customSolution: "Built-in, recessed padded decompression nooks with low-lux dimmable lighting and wall-integrated acoustic dampening."
  },
  {
    id: "sensor",
    title: "3. The Sensor",
    subtitle: "(Low/Passive)",
    icon: Ear,
    color: "orange",
    whatsHappening: "Highly reactive to subtle sensory inputs—distracted by echo, background noise, or visual clutter.",
    aspectssFocus: "Spatial Focus & Transition Buffers",
    diyHack: "Mounting sound-dampening felt panels behind study desks and adding non-glare surface covers to play tables.",
    customSolution: "Architectural wall sound dampening, custom low-reverb ceiling treatments, and organized visual transition zones."
  },
  {
    id: "bystander",
    title: "4. The Bystander",
    subtitle: "(High/Passive)",
    icon: Eye,
    color: "purple",
    whatsHappening: "Misses environmental cues, appears low-energy or unengaged, needs bold visual and tactile prompts.",
    aspectssFocus: "Spatial Sequencing & High-Tactile Touchpoints",
    diyHack: "Mounting high-contrast sensory boards, tactile tiles, and visual schedules onto standard storage frames.",
    customSolution: "Modular Baltic birch French cleat wall track systems with interchangeable climbing holds, tactile activity panels, and sensory bins."
  }
];

const principles = [
    { title: "Acoustics", desc: "Minimizing echo and background reverberation so the nervous system doesn't have to work overtime to filter sound.", icon: VolumeX },
    { title: "Spatial Sequencing", desc: "Organizing rooms so high-energy play areas don't bleed into quiet rest or sleep zones.", icon: ArrowRightLeft },
    { title: "Escape Spaces", desc: "Creating safe, predictable retreat spots within the room where a child can de-escalate without feeling isolated.", icon: DoorOpen },
    { title: "Compartmentalization", desc: "Defining clear visual boundaries for activities (study zone, sensory zone, quiet zone).", icon: Layers },
    { title: "Transition Zones", desc: "Building buffer areas (like doorway sensory strips or hall stations) that help the brain switch from one task to another.", icon: Milestone },
    { title: "Sensory Focus", desc: "Reducing unnecessary visual clutter so the child can focus on play or regulation.", icon: Focus },
    { title: "Safety & Durability", desc: "Ensuring all fixtures, anchors, and padding exceed residential impact standards for peace of mind.", icon: ShieldCheck }
];

export default function ServicesSection() {
    const [activeQuadrant, setActiveQuadrant] = useState(0);
    const [activePrinciple, setActivePrinciple] = useState(0);

    const isOrange = quadrants[activeQuadrant].color === "orange";

    return (
        <section id="services" className="relative min-h-0 flex flex-col justify-start lg:justify-center pt-28 sm:pt-32 lg:pt-24 pb-32 sm:pb-40 lg:pb-32 bg-gradient-to-b from-background to-stone-900 scroll-mt-28">
            <div className="layout-container relative z-10 w-full overflow-y-auto">
                <div className="flex flex-col gap-6 lg:gap-8">
                    
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center gap-2 relative"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
                            Home Adaptations Guided by <span className="font-normal text-gradient">Sensory Science</span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-lg font-light max-w-3xl leading-relaxed mx-auto">
                            We bridge clinical insights with precision carpentry. Identify your child’s sensory profile and discover how evidence-based spatial zoning transforms everyday home life.
                        </p>
                    </motion.div>

                    {/* Section 1: Winnie Dunn's Quadrants */}
                    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
                        <div className="text-center mb-6">
                            <h3 className="text-sm tracking-widest text-white/50 uppercase font-bold mb-2">Select Your Child&apos;s Sensory Processing Profile</h3>
                            <div className="h-px w-32 bg-fibi-accent/30 mx-auto" />
                        </div>

                        {/* Quadrant Tabs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full mb-6">
                            {quadrants.map((quad, idx) => (
                                <button
                                    key={quad.id}
                                    onClick={() => setActiveQuadrant(idx)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300",
                                        activeQuadrant === idx 
                                            ? quad.color === "orange" 
                                                ? "bg-fibi-accent/20 border-fibi-accent text-white shadow-[0_0_15px_rgba(209,136,94,0.3)]"
                                                : "bg-fibi-purple/20 border-fibi-purple text-white shadow-[0_0_15px_rgba(109,40,217,0.3)]"
                                            : "glass-card border-white/5 text-slate-400 hover:bg-white/5 hover:border-white/20"
                                    )}
                                >
                                    <quad.icon className={cn("w-5 h-5 mb-1.5", activeQuadrant === idx ? (quad.color === "orange" ? "text-fibi-accent" : "text-fibi-purple") : "")} />
                                    <span className="font-bold text-sm leading-tight">{quad.title}</span>
                                    <span className="text-[9px] opacity-70 mt-0.5 uppercase tracking-wider">{quad.subtitle}</span>
                                </button>
                            ))}
                        </div>

                        {/* Quadrant Details Card */}
                        <div className="glass-card border-fibi-accent/20 w-full rounded-2xl overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeQuadrant}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-6 md:p-8 flex flex-col gap-6"
                                >
                                    <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                                        <div className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                                            quadrants[activeQuadrant].color === "orange" ? "bg-fibi-accent/20 text-fibi-accent" : "bg-fibi-purple/20 text-fibi-purple"
                                        )}>
                                            {React.createElement(quadrants[activeQuadrant].icon, { className: "w-6 h-6" })}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{quadrants[activeQuadrant].title}</h4>
                                            <p className="text-sm text-slate-300 mt-1"><strong className="text-white">What&apos;s Happening:</strong> {quadrants[activeQuadrant].whatsHappening}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Box 1 (DIY) */}
                                        <div className={cn(
                                            "rounded-xl p-5 border group hover:scale-[1.02] transition-transform",
                                            isOrange ? "bg-black/30 border-white/5" : "bg-fibi-purple/10 border-fibi-purple/30"
                                        )}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Wrench className={cn("w-4 h-4", isOrange ? "text-slate-400" : "text-fibi-purple")} />
                                                <h5 className={cn("font-bold text-sm", isOrange ? "text-slate-200" : "text-white")}>Flat-Pack / DIY Hack</h5>
                                            </div>
                                            <p className={cn("text-xs leading-relaxed", isOrange ? "text-slate-400" : "text-slate-200")}>{quadrants[activeQuadrant].diyHack}</p>
                                        </div>

                                        {/* Box 2 (Custom) */}
                                        <div className={cn(
                                            "rounded-xl p-5 border group hover:scale-[1.02] transition-transform",
                                            isOrange ? "bg-fibi-accent/10 border-fibi-accent/30" : "bg-black/30 border-white/5"
                                        )}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Hammer className={cn("w-4 h-4", isOrange ? "text-fibi-accent" : "text-slate-400")} />
                                                <h5 className={cn("font-bold text-sm", isOrange ? "text-white" : "text-slate-200")}>Custom Craftsman Solution</h5>
                                            </div>
                                            <p className={cn("text-xs leading-relaxed", isOrange ? "text-slate-200" : "text-slate-400")}>{quadrants[activeQuadrant].customSolution}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-2 text-center text-xs font-medium text-slate-500 uppercase tracking-widest">
                                        ASPECTSS™ Focus: <span className={cn(quadrants[activeQuadrant].color === "orange" ? "text-fibi-accent" : "text-fibi-purple")}>{quadrants[activeQuadrant].aspectssFocus}</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Section 2: ASPECTSS Principles (Interactive) */}
                    <div className="w-full max-w-4xl mx-auto pt-6">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight mb-3 text-white">
                                The 7 Core Principles of <span className="text-gradient">ASPECTSS™</span>
                            </h2>
                            <p className="text-base md:text-lg text-slate-400">How we guide every build and modification in your home.</p>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {/* Scrollable horizontal pill list */}
                            <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent snap-x snap-mandatory px-4 md:px-0 md:flex-wrap md:justify-center">
                                {principles.map((principle, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActivePrinciple(idx)}
                                        className={cn(
                                            "snap-center shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap",
                                            activePrinciple === idx 
                                                ? "bg-white/10 border-white/20 text-white shadow-lg backdrop-blur-md" 
                                                : "bg-black/20 border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                        )}
                                    >
                                        {idx + 1}. {principle.title}
                                    </button>
                                ))}
                            </div>

                            {/* Active Principle Display */}
                            <div className="glass-card border-white/10 rounded-2xl p-6 text-center min-h-[140px] flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                                    {React.createElement(principles[activePrinciple].icon, { className: "w-32 h-32" })}
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">{principles[activePrinciple].title}</h4>
                                <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                                    {principles[activePrinciple].desc}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA Banner */}
                    <div className="relative w-full max-w-4xl mx-auto mt-6">
                        <PendingApprovalStamp text="pending approval" />
                        <div className="w-full rounded-2xl bg-gradient-to-r from-fibi-accent/20 to-fibi-purple/20 border border-white/10 p-3 md:p-5 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/imgs/UI/noise.png')] opacity-20 mix-blend-overlay" />
                            <div className="relative z-10 flex flex-col items-center">
                                <p className="text-slate-300 text-sm md:text-base leading-relaxed w-full">
                                    Our <span className="text-fibi-accent font-bold">non-structural adaptations</span> are custom-designed to align with Health First Colorado Specialty Code 677 standards under 10 CCR 2505-10 § 8.7525. Services are available via private pay or through HCBS Medicaid Waivers (CES, SLS, BI) via Case Management Agency (CMA) Prior Authorization Requests (PARs) upon enrollment approval.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
