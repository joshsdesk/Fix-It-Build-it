"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface BentoModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: "past" | "future" | null;
}

const sensoryImages = [
    { src: "/imgs/Portfolio/Jobs/20180809_091517.jpg", alt: "Suspension swing installation" },
    { src: "/imgs/Portfolio/Jobs/20180920_125230.jpg", alt: "Crash pad setup" },
    { src: "/imgs/Portfolio/Jobs/20181009_101235-COLLAGE.jpg", alt: "Sensory room collage" }
];

const safetyImages = [
    { src: "/imgs/Portfolio/Jobs/20181013_173229.jpg", alt: "Tamper proof enclosure" },
    { src: "/imgs/Portfolio/Jobs/20181109_161737~2.jpg", alt: "Safety adaptation" }
];

const hardwareImages = [
    { src: "/imgs/Portfolio/Jobs/20200110_171720.jpg", alt: "Ceiling lift" },
    { src: "/imgs/Portfolio/Jobs/20260226_202316-COLLAGE.jpg", alt: "Hardware installation" }
];

export default function BentoModal({ isOpen, onClose, category }: BentoModalProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    // Escape key listener
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Reset index when category changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [category]);

    if (!isOpen || !category) return null;

    const images = category === "past" ? [
        { src: "/imgs/Portfolio/Jobs/20260311_213221-COLLAGE.jpg", alt: "Specialized Installation" },
        { src: "/imgs/Portfolio/Jobs/20260226_202316-COLLAGE.jpg", alt: "Hardware Mounting" },
        { src: "/imgs/Portfolio/Jobs/20200110_171720.jpg", alt: "Sensory Setup" },
        { src: "/imgs/Portfolio/Jobs/20181109_161737~2.jpg", alt: "Safety Adaptation" },
        { src: "/imgs/Portfolio/Jobs/20181013_173229.jpg", alt: "Enclosure Build" }
    ] : [
        { src: "/imgs/Portfolio/Blueprints/Screenshot_20260312_025357.png", alt: "Future Design 1" },
        { src: "/imgs/Portfolio/Blueprints/il_794xN.5910131741_6ou1.webp", alt: "Future Design 2" },
        { src: "/imgs/Portfolio/Blueprints/Untitled.jpg", alt: "Future Design 3" }
    ];

    let title = category === "past" ? "Past Projects" : "Future Plans";
    let textClass = category === "past"
        ? "bg-gradient-to-r from-orange-500 to-fibi-purple bg-clip-text text-transparent"
        : "bg-gradient-to-r from-fibi-purple to-orange-500 bg-clip-text text-transparent";
    let borderColor = category === "past" ? "border-fibi-purple/40" : "border-orange-500/40";

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-[#0f0f0f]/90 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className={`relative w-full max-w-6xl aspect-[16/10] sm:aspect-video glass-card ${borderColor} overflow-hidden shadow-2xl flex flex-col`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="absolute top-0 inset-x-0 z-30 flex justify-between items-center p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                        <div className="flex flex-col">
                            <h2 className={`text-2xl font-bold uppercase tracking-widest ${textClass}`}>
                                {title}
                            </h2>
                            <p className="text-white/50 text-xs tracking-widest uppercase mt-1">
                                {images[currentIndex].alt} — {currentIndex + 1} / {images.length}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Image Area */}
                    <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={images[currentIndex].src}
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-contain"
                            />
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-40 pointer-events-none">
                            <button
                                onClick={prevImage}
                                className="p-3 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur border border-white/10 transition-all pointer-events-auto"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="p-3 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur border border-white/10 transition-all pointer-events-auto"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Progress Dots */}
                        <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-40">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-1 transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-8 bg-fibi-purple' : 'w-2 bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
