"use client";

import React from "react";

export default function GeometricBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <svg
                className="absolute w-full h-full opacity-[0.05]"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
            >
                <defs>
                    <pattern
                        id="grid-pattern"
                        width="80"
                        height="80"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M0 80L80 0 M0 0L80 80"
                            stroke="#FFFFFF"
                            strokeWidth="1"
                            fill="none"
                        />
                        <circle cx="40" cy="40" r="1.5" fill="#FFFFFF" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/0 via-[#1A1A1A]/50 to-[#1A1A1A]" />
        </div>
    );
}
