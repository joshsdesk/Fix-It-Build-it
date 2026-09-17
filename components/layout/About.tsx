"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Hammer, History, Heart, Instagram, Linkedin, Facebook, ChevronLeft, ChevronRight, X } from "lucide-react";
import { vcardData } from "@/components/layout/BusinessInfo";

const DEFAULT_ABOUT_IMAGES = [
    "/imgs/Portfolio/about/20200202_201313.jpg",
    "/imgs/Portfolio/about/20200226_181420.jpg",
    "/imgs/Portfolio/about/20200619_181315.jpg",
    "/imgs/Portfolio/about/20200727_095029.jpg",
    "/imgs/Portfolio/about/20200731_140950.jpg",
    "/imgs/Portfolio/about/20200807_103820.jpg",
    "/imgs/Portfolio/about/20200903_170054.jpg",
    "/imgs/Portfolio/about/20220708_190610.jpg",
    "/imgs/Portfolio/about/20230819_113919.jpg",
    "/imgs/Portfolio/about/20230826_160449.jpg",
    "/imgs/Portfolio/about/20231216_165833.jpg",
    "/imgs/Portfolio/about/download_20200208_194129.jpg",
    "/imgs/Portfolio/about/PXL_20250128_194508115.jpg",
    "/imgs/Portfolio/about/PXL_20250202_165648838.jpg",
    "/imgs/Portfolio/about/PXL_20250209_175202653.MP.jpg",
    "/imgs/Portfolio/about/PXL_20250919_011449773.jpg",
    "/imgs/Portfolio/about/PXL_20251018_204141986.jpg",
    "/imgs/Portfolio/about/PXL_20251024_233342686.MP.jpg",
    "/imgs/Portfolio/about/PXL_20251231_234545618.jpg",
    "/imgs/Portfolio/about/PXL_20260101_000551848.MP.jpg",
    "/imgs/Portfolio/about/PXL_20260101_004225537.jpg",
    "/imgs/Portfolio/about/PXL_20260105_213747693.jpg",
    "/imgs/Portfolio/about/PXL_20260112_235134821.jpg",
    "/imgs/Portfolio/about/PXL_20260116_023240598.jpg",
    "/imgs/Portfolio/about/Screenshot_20200611-092232_Messenger.jpg",
    "/imgs/Portfolio/about/VideoCapture_20230805-161050.jpg",
];

const MAX_VISIBLE_BOARD_IMAGES = 12;
const MOBILE_GALLERY_ROTATIONS = ["-2.5deg", "1.8deg", "1.4deg", "-1.6deg"];

const PIN_COLORS = ["#dbdb2b", "#00f077", "#ea4597", "#6f9ac6", "#9452d7", "#ff7f00", "#0ff"];
const WIDE_DESKTOP_SLOTS = [
    { top: "2%", left: "0%", width: "27%", rotation: "-4.4deg", zIndex: 4 },
    { top: "4%", left: "24%", width: "27%", rotation: "2.2deg", zIndex: 3 },
    { top: "2%", left: "48%", width: "27%", rotation: "-2.2deg", zIndex: 5 },
    { top: "4%", left: "72%", width: "27%", rotation: "3.6deg", zIndex: 3 },
    { top: "31%", left: "0%", width: "27%", rotation: "2.6deg", zIndex: 2 },
    { top: "29%", left: "24%", width: "27%", rotation: "-3.6deg", zIndex: 6 },
    { top: "31%", left: "48%", width: "27%", rotation: "1.4deg", zIndex: 4 },
    { top: "29%", left: "72%", width: "27%", rotation: "-2.6deg", zIndex: 2 },
    { top: "60%", left: "0%", width: "27%", rotation: "2.2deg", zIndex: 5 },
    { top: "58%", left: "24%", width: "27%", rotation: "-1.8deg", zIndex: 3 },
    { top: "60%", left: "48%", width: "27%", rotation: "3.8deg", zIndex: 4 },
    { top: "58%", left: "72%", width: "27%", rotation: "-4.1deg", zIndex: 2 },
];

const COMPACT_DESKTOP_SLOTS = [
    { top: "4%", left: "0%", width: "28%", rotation: "-4.8deg", zIndex: 4 },
    { top: "6%", left: "24%", width: "28%", rotation: "2.1deg", zIndex: 3 },
    { top: "4%", left: "48%", width: "28%", rotation: "-2.3deg", zIndex: 5 },
    { top: "6%", left: "72%", width: "28%", rotation: "3.8deg", zIndex: 3 },
    { top: "34%", left: "0%", width: "28%", rotation: "2.8deg", zIndex: 2 },
    { top: "32%", left: "24%", width: "28%", rotation: "-3.7deg", zIndex: 6 },
    { top: "34%", left: "48%", width: "28%", rotation: "1.3deg", zIndex: 4 },
    { top: "32%", left: "72%", width: "28%", rotation: "-2.8deg", zIndex: 2 },
    { top: "64%", left: "0%", width: "28%", rotation: "2.5deg", zIndex: 5 },
    { top: "62%", left: "24%", width: "28%", rotation: "-1.9deg", zIndex: 3 },
    { top: "64%", left: "48%", width: "28%", rotation: "3.9deg", zIndex: 4 },
    { top: "62%", left: "72%", width: "28%", rotation: "-4.2deg", zIndex: 2 },
];

function shuffleImages(images: string[]) {
    const items = [...images];

    for (let index = items.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
    }

    return items;
}

export default function About() {
    const [aboutImages, setAboutImages] = useState<string[]>([]);
    const [boardImages, setBoardImages] = useState<string[]>(DEFAULT_ABOUT_IMAGES.slice(0, MAX_VISIBLE_BOARD_IMAGES));
    const [viewportWidth, setViewportWidth] = useState<number>(1600);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const loadAboutImages = async () => {
            try {
                const response = await fetch("/imgs/Portfolio/about-manifest.json", { cache: "no-store" });

                if (!response.ok) {
                    return DEFAULT_ABOUT_IMAGES;
                }

                const data = (await response.json()) as unknown;
                if (!Array.isArray(data)) {
                    return DEFAULT_ABOUT_IMAGES;
                }

                const images = data.filter((item): item is string => typeof item === "string" && item.length > 0);
                return images.length ? images : DEFAULT_ABOUT_IMAGES;
            } catch {
                return DEFAULT_ABOUT_IMAGES;
            }
        };

        void loadAboutImages().then((images) => {
            if (!isMounted) {
                return;
            }

            setAboutImages(images);
            setBoardImages(shuffleImages(images).slice(0, Math.min(images.length, MAX_VISIBLE_BOARD_IMAGES)));
        });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const updateViewportWidth = () => setViewportWidth(window.innerWidth);

        updateViewportWidth();
        window.addEventListener("resize", updateViewportWidth);

        return () => window.removeEventListener("resize", updateViewportWidth);
    }, []);

    useEffect(() => {
        if (!isGalleryOpen) {
            return;
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsGalleryOpen(false);
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isGalleryOpen]);

    const galleryImages = aboutImages.length ? aboutImages : DEFAULT_ABOUT_IMAGES;

    const boardItems = useMemo(() => {
        const visible = boardImages.length ? boardImages : DEFAULT_ABOUT_IMAGES.slice(0, MAX_VISIBLE_BOARD_IMAGES);
        const activeSlots = viewportWidth < 1400 && viewportWidth >= 1024 ? COMPACT_DESKTOP_SLOTS : WIDE_DESKTOP_SLOTS;

        return visible.map((image, index) => ({
            image,
            pinColor: PIN_COLORS[index % PIN_COLORS.length],
            slot: activeSlots[index % activeSlots.length],
        }));
    }, [boardImages, viewportWidth]);

    const openGallery = (image: string) => {
        const imageIndex = galleryImages.indexOf(image);
        setCurrentIndex(imageIndex >= 0 ? imageIndex : 0);
        setIsGalleryOpen(true);
    };

    const nextImage = () => setCurrentIndex((previous) => (previous + 1) % galleryImages.length);
    const prevImage = () => setCurrentIndex((previous) => (previous - 1 + galleryImages.length) % galleryImages.length);
    const mobileGalleryImages = galleryImages.slice(0, Math.min(galleryImages.length, 4));

    return (
        <section id="about" className="relative h-full min-h-0 flex flex-col justify-start lg:justify-center py-20 sm:py-20 lg:py-12 pb-20 sm:pb-24 lg:pb-12 overflow-hidden scroll-mt-16 sm:scroll-mt-20 lg:scroll-mt-28">
            <div className="mx-auto flex h-full w-full max-w-[90rem] flex-col px-4 sm:px-6 lg:pt-4 lg:px-6">
                <div className="text-center mb-4 lg:mb-2 shrink-0">
                    <h2 className="text-[2.35rem] leading-[1.05] sm:text-5xl md:text-5xl lg:text-6xl font-thin tracking-tight mb-1.5 sm:mb-2">The Lead <span className="font-normal text-gradient">Craftsman</span></h2>
                    <p className="text-base leading-snug sm:text-xl md:text-xl text-slate-300 font-light mx-auto max-w-none md:max-w-2xl">
                        Building specialized environments with precision and empathy.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start lg:items-stretch lg:flex-1 lg:min-h-0 lg:mb-[clamp(3.75rem,6.5vw,6rem)]">
                    <div className="h-full">
                        <div className="h-full flex flex-col justify-between gap-6 sm:gap-8 text-left">
                        <div>
                            <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-fibi-accent flex items-center justify-center font-black text-2xl text-fibi-accent shadow-lg shadow-fibi-accent/20">
                                    JB
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)_minmax(0,0.9fr)] gap-2 items-start sm:block">
                                        <div className="min-w-0 pr-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <div className="font-bold text-xl uppercase tracking-wider text-white">{vcardData.firstName} {vcardData.lastName}</div>
                                                <div className="flex gap-3 text-slate-400">
                                                    <a href={vcardData.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-fibi-purple transition-all hover:scale-110"><Instagram size={16} /></a>
                                                    <a href={vcardData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-fibi-purple transition-all hover:scale-110"><Linkedin size={16} /></a>
                                                    <a href={vcardData.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-fibi-purple transition-all hover:scale-110"><Facebook size={16} /></a>
                                                </div>
                                            </div>
                                            <div className="text-fibi-accent text-xs sm:text-sm font-bold">{vcardData.title}</div>
                                        </div>

                                        <div className="sm:hidden rounded-2xl border border-white/10 bg-white/5 px-2 py-2.5 min-w-0">
                                                <History className="mb-1.5 w-4 h-4 text-fibi-accent" />
                                                <h4 className="text-[10px] font-bold leading-tight text-white">Structural Roots</h4>
                                                <p className="mt-1 text-[9px] leading-tight text-slate-400">15+ years elite trade experience.</p>
                                        </div>
                                        <div className="sm:hidden rounded-2xl border border-white/10 bg-white/5 px-2 py-2.5 min-w-0">
                                                <Heart className="mb-1.5 w-4 h-4 text-fibi-accent" />
                                                <h4 className="text-[10px] font-bold leading-tight text-white">Lived Experience</h4>
                                                <p className="mt-1 text-[9px] leading-tight text-slate-400">Parent-to-parent understanding.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                                {vcardData.about}
                            </p>
                            <p className="text-fibi-accent font-bold text-base sm:text-lg mb-4 sm:mb-6">
                                {vcardData.accessibilityPolicy}
                            </p>
                        </div>

                        <div className="lg:hidden card-container p-2.5 sm:p-3">
                            <div className="grid h-[11.5rem] grid-cols-2 gap-2 sm:h-[14rem]">
                            {mobileGalleryImages.map((image, index) => (
                                <button
                                    key={`${image}-mobile-${index}`}
                                    type="button"
                                    className="relative overflow-hidden rounded-[1rem] border border-white/10 bg-black/20 p-0 transition-colors hover:border-fibi-purple/50"
                                    style={{ transform: `rotate(${MOBILE_GALLERY_ROTATIONS[index % MOBILE_GALLERY_ROTATIONS.length]})` }}
                                    onClick={() => openGallery(image)}
                                >
                                    <Image
                                        src={image}
                                        alt={`About mobile gallery image ${index + 1}`}
                                        fill
                                        sizes="50vw"
                                        className="object-cover"
                                    />
                                    <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                                </button>
                            ))}
                            </div>
                        </div>

                        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-4 card-container group hover:border-fibi-purple/50 transition-colors">
                                <History className="w-6 h-6 text-fibi-accent mb-3 group-hover:text-fibi-purple transition-colors" />
                                <h4 className="font-bold mb-1 text-white">Structural Roots</h4>
                                <p className="text-xs text-slate-500">15+ years of elite trade experience.</p>
                            </div>
                            <div className="p-4 card-container group hover:border-fibi-purple/50 transition-colors">
                                <Heart className="w-6 h-6 text-fibi-accent mb-3 group-hover:text-fibi-purple transition-colors" />
                                <h4 className="font-bold mb-1 text-white">Lived Experience</h4>
                                <p className="text-xs text-slate-500">Parent-to-Parent understanding.</p>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="relative hidden lg:block group h-full min-h-0">
                        <div className="card-container p-4 sm:p-5 lg:p-5 hover:border-fibi-purple/50 transition-colors w-full h-full flex flex-col justify-between">
                            <div className="about-pinboard flex-1">
                                {boardItems.map(({ image, pinColor, slot }, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        className="about-pinboard-note"
                                        style={{
                                            "--pin-rotate": slot.rotation,
                                            "--pin-color": pinColor,
                                            top: slot.top,
                                            left: slot.left,
                                            width: slot.width,
                                            zIndex: slot.zIndex,
                                        } as React.CSSProperties}
                                        onClick={() => openGallery(image)}
                                    >
                                        <span className="about-pinboard-paper">
                                            <span className="about-pinboard-photo">
                                                <Image
                                                    src={image}
                                                    alt={`About photo ${index + 1}`}
                                                    fill
                                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                                    className="object-cover"
                                                />
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Decorative tool icon */}
                        <div className="absolute -top-5 -right-5 w-14 h-14 bg-fibi-accent rounded-full flex items-center justify-center animate-spin-slow shadow-lg shadow-fibi-accent/20 z-10">
                            <Hammer className="w-8 h-8 text-stone-900 rotate-45" />
                        </div>
                    </div>
                </div>
            </div>

            {isGalleryOpen ? (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-[#0f0f0f]/90 backdrop-blur-xl"
                        onClick={() => setIsGalleryOpen(false)}
                    />

                    <div
                        className="relative w-full max-w-5xl aspect-[16/10] sm:aspect-video glass-card border-fibi-accent/30 overflow-hidden shadow-2xl flex flex-col"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="absolute top-0 inset-x-0 z-30 flex justify-between items-center p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-bold uppercase tracking-widest text-gradient">About Gallery</h2>
                                <p className="text-white/50 text-xs tracking-widest uppercase mt-1">
                                    Photo {currentIndex + 1} / {galleryImages.length}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsGalleryOpen(false)}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                            <Image
                                src={galleryImages[currentIndex]}
                                alt={`About gallery image ${currentIndex + 1}`}
                                fill
                                sizes="100vw"
                                className="object-contain"
                            />

                            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-40 pointer-events-none">
                                <button
                                    type="button"
                                    onClick={prevImage}
                                    className="p-3 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur border border-white/10 transition-all pointer-events-auto"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    type="button"
                                    onClick={nextImage}
                                    className="p-3 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur border border-white/10 transition-all pointer-events-auto"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
}
