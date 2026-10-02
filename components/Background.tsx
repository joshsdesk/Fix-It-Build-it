"use client";

import Image from "next/image";

export default function Background() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
                src="/imgs/UI/Background.png"
                alt="Neuro-inclusive structural modifications in Denver Front Range by Fix-It Build-It Colorado, LLC - EAA Specialist"
                fill
                className="hidden md:block object-cover opacity-20"
                priority
            />
            <Image
                src="/imgs/UI/BackgroundMobile.png"
                alt="Sensory-safe home environments in Colorado by Fix-It Build-It Colorado, LLC - EAA Specialist"
                fill
                className="block md:hidden object-cover opacity-20"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>
    );
}
