"use client";

import React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const fieldStyles = cva(
    "w-full rounded-xl border bg-slate-950/80 text-slate-100 outline-none transition-colors duration-200 focus:border-fibi-accent focus:ring-2 focus:ring-fibi-accent/25 disabled:cursor-not-allowed disabled:opacity-60",
    {
        variants: {
            state: {
                default: "border-white/10",
                error: "border-red-400/70 focus:border-red-400 focus:ring-red-400/20",
            },
        },
        defaultVariants: {
            state: "default",
        },
    }
);

type SelectOption = {
    label: string;
    value: string;
    disabled?: boolean;
};

export interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
    required?: boolean;
    type?: React.HTMLInputTypeAttribute;
    as?: "input" | "textarea" | "select";
    options?: SelectOption[];
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    autoComplete?: string;
    className?: string;
    componentNamespace: string;
    elementIdentifier: string;
}

export function FormInput({
    label,
    value,
    onChange,
    error,
    required = false,
    type = "text",
    as = "input",
    options = [],
    placeholder,
    rows = 4,
    disabled = false,
    autoComplete,
    className,
    componentNamespace,
    elementIdentifier,
}: FormInputProps) {
    const controlId = `${componentNamespace}-${elementIdentifier}`;

    const sharedProps = {
        id: controlId,
        name: elementIdentifier,
        value,
        disabled,
        required,
        autoComplete,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? `${controlId}-error` : undefined,
        className: cn(fieldStyles({ state: error ? "error" : "default" }), className),
        style: {
            minHeight: "var(--target-min)",
            paddingInline: "calc(var(--spacing-fitts) * 2)",
            paddingBlock: "calc(var(--spacing-fitts) * 1.6)",
        },
    } as const;

    return (
        <label
            data-component-namespace={componentNamespace}
            data-element-identifier={elementIdentifier}
            className="block space-y-2"
        >
            <span className="block text-xs font-bold uppercase tracking-widest text-fibi-accent">
                {label}
                {required ? <span className="ml-1">*</span> : null}
            </span>
            {as === "textarea" ? (
                <textarea
                    {...sharedProps}
                    rows={rows}
                    placeholder={placeholder}
                    onChange={(event) => onChange(event.target.value)}
                />
            ) : as === "select" ? (
                <select
                    {...sharedProps}
                    onChange={(event) => onChange(event.target.value)}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    {...sharedProps}
                    type={type}
                    placeholder={placeholder}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}
            {error ? (
                <span id={`${controlId}-error`} className="block text-xs text-red-300">
                    {error}
                </span>
            ) : null}
        </label>
    );
}
