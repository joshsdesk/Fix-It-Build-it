"use client";

import React from "react";
import Image from "next/image";

export default function Background() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
                src="/imgs/UI/Background.png"
                alt="Background"
                fill
                className="hidden md:block object-contain opacity-20"
                priority
            />
            <Image
                src="/imgs/UI/Background Mobile.png"
                alt="Background Mobile"
                fill
                className="block md:hidden object-contain opacity-20"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>
    );
}
