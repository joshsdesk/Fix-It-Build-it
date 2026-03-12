"use client";

import React from "react";
import Image from "next/image";

interface SectionDividerProps {
    variant?: "mountains" | "trees" | "mtns-trees" | "default";
    className?: string;
}

export default function SectionDivider({ variant = "default", className = "" }: SectionDividerProps) {
    const getAsset = () => {
        switch (variant) {
            case "mountains":
                return "/imgs/UI/Mtns.png";
            case "trees":
                return "/imgs/UI/Trees.png";
            case "mtns-trees":
                return "/imgs/UI/Mtns Trees.png";
            default:
                return null;
        }
    };

    const asset = getAsset();

    if (!asset) {
        return (
            <div className={`relative w-full z-20 pointer-events-none ${className}`}>
                <div className="max-w-[90rem] mx-auto px-6">
                    <svg
                        className="w-full h-16 -mt-8 text-[#1A1A1A]"
                        preserveAspectRatio="none"
                        viewBox="0 0 1200 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 48H1200V0L600 48L0 0V48Z" fill="currentColor" />
                        <path
                            d="M0 0L200 32L400 0L600 32L800 0L1000 32L1200 0"
                            stroke="#D1885E"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                            opacity="0.8"
                        />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full z-20 pointer-events-none ${className}`}>
            <div className="max-w-[90rem] mx-auto px-6">
                <div className="-mt-12 sm:-mt-16 md:-mt-20">
                    <img
                        src={asset}
                        alt={`${variant} divider`}
                        className="w-full h-auto object-contain object-bottom"
                    />
                </div>
            </div>
        </div>
    );
}
