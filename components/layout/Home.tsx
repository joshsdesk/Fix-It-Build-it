"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Background from "@/components/Background";
import BentoModal from "@/features/bento-grid/BentoModal";

export default function Home({ onOpenModal }: { onOpenModal: () => void }) {
    const [selectedCategory, setSelectedCategory] = useState<"past" | "future" | null>(null);
    const [bentoImages, setBentoImages] = useState<string[]>([]);

    useEffect(() => {
        const pastImages = [
            "/imgs/Portfolio/Jobs/20260311_213221-COLLAGE.jpg",
            "/imgs/Portfolio/Jobs/20260226_202316-COLLAGE.jpg",
            "/imgs/Portfolio/Jobs/20200110_171720.jpg",
            "/imgs/Portfolio/Jobs/20181109_161737~2.jpg"
        ];
        const blueprintImages = [
            "/imgs/Portfolio/Blueprints/Screenshot_20260312_025357.png",
            "/imgs/Portfolio/Blueprints/il_794xN.5910131741_6ou1.webp",
            "/imgs/Portfolio/Blueprints/Untitled.jpg",
            "/imgs/Portfolio/Blueprints/Untitled1.jpg"
        ];

        // Pick 2 random from each
        const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);
        const selectedPast = shuffle(pastImages).slice(0, 2);
        const selectedBlueprints = shuffle(blueprintImages).slice(0, 2);

        // Grid layout: 
        // [Past 0] [Blue 0]
        // [Blue 1] [Past 1]
        setBentoImages([selectedPast[0], selectedBlueprints[0], selectedBlueprints[1], selectedPast[1]]);
    }, []);

    const gridItems = [
        { id: "past-1", category: "past" as const, img: bentoImages[0] },
        { id: "future-1", category: "future" as const, img: bentoImages[1] },
        { id: "future-2", category: "future" as const, img: bentoImages[2] },
        { id: "past-2", category: "past" as const, img: bentoImages[3] }
    ];

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
            {/* Background Elements */}
            <Background />

            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-fibi-accent/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-fibi-accent/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 lg:gap-16 items-center relative z-10">
                {/* Left Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-6 py-6 items-center text-center lg:items-start lg:text-left"
                >
                    <div className="flex flex-col gap-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fibi-purple/10 border border-fibi-purple/20 text-fibi-purple text-[10px] md:text-xs font-bold uppercase tracking-wider w-fit mx-auto lg:mx-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fibi-purple opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-fibi-purple"></span>
                            </span>
                            Sensory-Informed Technician
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-thin tracking-tight leading-[1.05]">
                                Precision Installation for<br />
                                <span className="font-normal text-gradient">Specialized Environments.</span>
                            </h1>

                            <p className="text-sm md:text-lg lg:text-xl text-slate-300 max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                                Professional assembly and mounting of sensory equipment, safety adaptations, and functional home hardware in the Denver Metro Front Range.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onOpenModal}
                        className="btn-action-primary flex items-center justify-center gap-2 text-base lg:text-xl px-8 py-3 lg:px-12 lg:py-4 w-fit mx-auto lg:mx-0"
                    >
                        Request Installation Quote <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                </motion.div>

                {/* Right Column */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative w-full flex flex-col items-center lg:items-end gap-8 pb-12 lg:pb-0"
                >
                    {/* Bento Photo Gallery - Fluid Scaling */}
                    <div className="grid grid-cols-2 gap-3 lg:gap-4 w-full">
                        {gridItems.map((item, idx) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedCategory(item.category)}
                                className="relative aspect-[16/10] lg:aspect-[4/3] cursor-pointer overflow-hidden border border-fibi-accent/20 group/item transition-all duration-500 rounded-[1.2rem] lg:rounded-[2rem] glass-card !bg-black/20 hover:z-20 shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-slate-900 group-hover/item:scale-105 transition-transform duration-700">
                                    {item.img && (
                                        <img
                                            src={item.img}
                                            alt=""
                                            className="w-full h-full object-cover opacity-60 group-hover/item:opacity-90 transition-all duration-500"
                                        />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-fibi-purple/0 to-fibi-purple/0 group-hover/item:from-orange-500/20 group-hover/item:via-fibi-purple/20 group-hover/item:to-fibi-purple/40 transition-all duration-500" />
                                <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                    <div className="p-2 lg:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mirrored Experience Badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-fibi-purple/10 border border-fibi-purple/20 text-fibi-purple text-[9px] md:text-sm font-bold uppercase tracking-wider w-fit absolute bottom-2 right-0 lg:bottom-0">
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
