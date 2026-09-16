"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ModalCardProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    componentNamespace: string;
    elementIdentifier: string;
}

export function ModalCard({
    isOpen,
    onClose,
    children,
    className,
    componentNamespace,
    elementIdentifier,
}: ModalCardProps) {
    return (
        <AnimatePresence>
            {isOpen ? (
                <div
                    data-component-namespace={componentNamespace}
                    data-element-identifier={elementIdentifier}
                    className="fixed inset-0 z-[100] flex items-center justify-center px-6"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={cn(
                            "relative w-full max-w-lg glass-card border-fibi-accent/30 overflow-hidden flex flex-col items-center text-center max-h-[90vh] overflow-y-auto p-8",
                            className,
                        )}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-action-close absolute right-4 top-4"
                            aria-label="Close dialog"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        {children}
                    </motion.div>
                </div>
            ) : null}
        </AnimatePresence>
    );
}
