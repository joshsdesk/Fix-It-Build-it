"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonStyles = cva(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fibi-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-fibi-purple text-white shadow-md shadow-black/20 hover:brightness-110",
                secondary: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
                destructive: "bg-red-600 text-white shadow-md shadow-black/20 hover:bg-red-500",
            },
            size: {
                default: "px-5 py-3 text-sm",
                compact: "px-4 py-2 text-xs",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonStyles> {
    title: string;
    loading?: boolean;
    componentNamespace: string;
    elementIdentifier: string;
}

export function Button({
    title,
    variant,
    size,
    loading = false,
    disabled = false,
    className,
    componentNamespace,
    elementIdentifier,
    type = "button",
    children,
    style,
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            data-component-namespace={componentNamespace}
            data-element-identifier={elementIdentifier}
            className={cn(buttonStyles({ variant, size }), className)}
            disabled={disabled || loading}
            style={{
                minHeight: "var(--target-min)",
                paddingInline: "calc(var(--spacing-fitts) * 2.5)",
                paddingBlock: "calc(var(--spacing-fitts) * 1.6)",
                ...style,
            }}
            {...props}
        >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {children ?? title}
        </button>
    );
}
