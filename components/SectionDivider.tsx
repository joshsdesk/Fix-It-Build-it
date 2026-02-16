"use client";

import React from "react";

export default function SectionDivider() {
    return (
        <div className="relative w-full h-16 -mt-8 z-20 pointer-events-none">
            <svg
                className="absolute w-full h-full text-[#1A1A1A]"
                preserveAspectRatio="none"
                viewBox="0 0 1200 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background Peak to match section color if needed, or transparent */}
                <path d="M0 48H1200V0L600 48L0 0V48Z" fill="currentColor" />

                {/* Copper Peaks Stroke */}
                <path
                    d="M0 0L200 32L400 0L600 32L800 0L1000 32L1200 0"
                    stroke="#D1885E"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.8"
                />
            </svg>
        </div>
    );
}
