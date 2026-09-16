"use client";

import React from "react";

import { cn } from "@/lib/utils";

export interface FormCardProps extends React.FormHTMLAttributes<HTMLFormElement> {
    componentNamespace: string;
    elementIdentifier: string;
    children: React.ReactNode;
    className?: string;
}

export function FormCard({
    componentNamespace,
    elementIdentifier,
    children,
    className,
    ...props
}: FormCardProps) {
    return (
        <form
            data-component-namespace={componentNamespace}
            data-element-identifier={elementIdentifier}
            className={cn("w-full space-y-6 text-left", className)}
            {...props}
        >
            {children}
        </form>
    );
}
