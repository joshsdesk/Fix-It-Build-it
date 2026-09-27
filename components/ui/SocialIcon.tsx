"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";

export interface SocialIconProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    icon: IconProp;
    label: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

export function SocialIcon({
    icon,
    label,
    size = "xl",
    className,
    ...props
}: SocialIconProps) {
    return (
        <a
            aria-label={label}
            className={`flex items-center justify-center text-slate-400 hover:text-fibi-purple transition-all duration-300 hover:scale-110 ${className || ""}`}
            {...props}
        >
            <FontAwesomeIcon icon={icon} className={`text-${size}`} />
        </a>
    );
}
