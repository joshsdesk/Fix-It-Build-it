"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Background from "@/components/Background";
import BentoModal from "@/features/bento-grid/BentoModal";

export default function Home({ onOpenModal }: { onOpenModal: () => void }) {
    const [selectedCategory, setSelectedCategory] = useState<"past" | "future" | null>(null);
    const bentoImages = [
        "/imgs/Portfolio/Jobs/20260311_213221-COLLAGE.jpg",
        "/imgs/Portfolio/Blueprints/Screenshot_20260312_025357.png",
        "/imgs/Portfolio/Blueprints/il_794xN.5910131741_6ou1.webp",
        "/imgs/Portfolio/Jobs/20260226_202316-COLLAGE.jpg"
    ];

    const gridItems = [
        { id: "past-1", category: "past" as const, img: bentoImages[0] },
        { id: "future-1", category: "future" as const, img: bentoImages[1] },
        { id: "future-2", category: "future" as const, img: bentoImages[2] },
        { id: "past-2", category: "past" as const, img: bentoImages[3] }
    ];

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 pb-14 md:pt-20 md:pb-16 overflow-hidden">
            {/* Background Elements */}
            <Background />

            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-fibi-accent/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-fibi-accent/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[45%_55%] gap-6 md:gap-8 lg:gap-12 items-center relative z-10">
                {/* Left Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center gap-6 items-center text-center md:items-start md:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fibi-purple/10 border border-fibi-purple/20 text-fibi-purple text-[10px] md:text-xs font-bold uppercase tracking-wider w-fit mx-auto md:mx-0">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fibi-purple opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-fibi-purple"></span>
                        </span>
                        Sensory-Informed Technician
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-thin tracking-tight leading-[1.1]">
                            Precision Installation for<br />
                            <span className="font-normal text-gradient">Specialized Environments.</span>
                        </h1>

                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 max-w-lg leading-relaxed font-light mx-auto md:mx-0">
                            Professional assembly and mounting of sensory equipment, safety adaptations, and functional home hardware in the Denver Metro Front Range.
                        </p>
                    </div>

                    <button
                        onClick={onOpenModal}
                        className="btn-action-primary flex items-center justify-center gap-2 text-sm md:text-base lg:text-lg px-6 py-2.5 lg:px-8 lg:py-3.5 w-fit mx-auto md:mx-0"
                    >
                        Request Installation Quote <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </motion.div>

                {/* Right Column */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative w-full flex flex-col items-center md:items-end gap-4"
                >
                    {/* Bento Photo Gallery - Compact ratio for single screen fit */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4 w-full">
                        {gridItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedCategory(item.category)}
                                className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] cursor-pointer overflow-hidden border border-fibi-accent/20 group/item transition-all duration-500 rounded-xl lg:rounded-2xl glass-card !bg-black/20 hover:z-20 shadow-xl"
                            >
                                <div className="absolute inset-0 bg-slate-900 group-hover/item:scale-105 transition-transform duration-700">
                                    {item.img && (
                                        <Image
                                            src={item.img}
                                            alt=""
                                            fill
                                            sizes="(max-width: 1024px) 50vw, 25vw"
                                            className="object-cover opacity-60 group-hover/item:opacity-90 transition-all duration-500"
                                        />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-fibi-purple/0 to-fibi-purple/0 group-hover/item:from-orange-500/20 group-hover/item:via-fibi-purple/20 group-hover/item:to-fibi-purple/40 transition-all duration-500" />
                                <div className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                    <div className="p-1.5 lg:p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                        <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mirrored Experience Badge */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-fibi-purple/10 border border-fibi-purple/20 text-fibi-purple text-[9px] md:text-xs font-bold uppercase tracking-wider w-fit self-center md:self-end">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fibi-purple opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-fibi-purple"></span>
                        </span>
                        15+ Yrs. Experience
                    </div>
                </motion.div>
            </div>

            {/* Modal */}
            <BentoModal
                isOpen={selectedCategory !== null}
                onClose={() => setSelectedCategory(null)}
                category={selectedCategory}
            />
        </section>
    );
}
