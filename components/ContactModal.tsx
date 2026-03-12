"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    fundingType: string;
    specs: string;
}

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

// Declare global for Turnstile
declare global {
    interface Window {
        turnstile: {
            render: (container: string | HTMLElement, options: any) => string;
            remove: (widgetId: string) => void;
        };
        onTurnstileVerify: (token: string) => void;
    }
}

export default function ContactModal({ isOpen, onClose }: BaseModalProps) {
    const [status, setStatus] = useState<SubmissionStatus>("idle");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [turnstileError, setTurnstileError] = useState<boolean>(false);
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        projectType: "Sensory Pod",
        fundingType: "Private Pay",
        specs: "",
    });

    const turnstileRef = React.useRef<HTMLDivElement>(null);

    // Handle Turnstile verification and EmailJS Init
    React.useEffect(() => {
        if (!isOpen) return;

        // Ensure EmailJS is initialized on the client before we try to send anything
        if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
            emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.trim());
            console.log("EmailJS Initialized with Public Key");
        } else {
            console.error("Missing NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in environment");
        }

        if (!turnstileRef.current) return;

        let widgetId: string | null = null;
        let interval: NodeJS.Timeout;
        let attempts = 0;

        const initTurnstile = () => {
            attempts++;
            if (attempts > 15) {
                if (interval) clearInterval(interval);
                setTurnstileError(true);
                return;
            }

            try {
                if (window.turnstile && turnstileRef.current && !widgetId) {
                    widgetId = window.turnstile.render(turnstileRef.current, {
                        sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY,
                        callback: (token: string) => {
                            setTurnstileToken(token);
                            setTurnstileError(false);
                        },
                        "error-callback": () => {
                            console.error("Turnstile error-callback triggered");
                            setTurnstileError(true);
                        },
                        theme: "dark",
                    });
                    if (interval) clearInterval(interval);
                }
            } catch (err) {
                console.error("Turnstile render error:", err);
            }
        };

        // Delay initialization until animation roughly finishes (~500ms)
        const timeout = setTimeout(() => {
            initTurnstile();
            if (!widgetId) {
                interval = setInterval(initTurnstile, 1000);
            }
        }, 500);

        return () => {
            clearTimeout(timeout);
            if (interval) clearInterval(interval);
            if (widgetId && window.turnstile) {
                window.turnstile.remove(widgetId);
            }
            setTurnstileToken(null);
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileToken) {
            alert("Please complete the security check.");
            return;
        }

        setStatus("submitting");

        try {
            const templateParams = {
                user_name: formData.name,
                user_email: formData.email,
                user_phone: formData.phone,
                project_type: formData.projectType,
                funding_type: formData.fundingType,
                message: formData.specs,
            };

            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() || "";
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() || "";
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() || "";

            console.log("=== EMAILJS HANDSHAKE INITIATED ===");
            console.log("Service ID parsed length:", serviceId.length);
            console.log("Template ID parsed length:", templateId.length);
            console.log("Public Key parsed length:", publicKey.length);
            console.log("Payload:", templateParams);

            const result = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            console.log("=== EMAILJS RESULT ===", result);

            if (result.status === 200) {
                setStatus("success");
                setTimeout(() => {
                    setStatus("idle");
                    onClose();
                }, 3000);
            } else {
                console.warn("EmailJS returned non-200 status:", result.status);
                setStatus("error");
            }
        } catch (error) {
            console.error("=== EMAILJS HANDSHAKE FAILED ===");
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
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
                        className="relative w-full max-w-lg glass-card p-8 border-fibi-accent/30 overflow-hidden flex flex-col items-center text-center"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 btn-action-close hover:text-red-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {status === "success" ? (
                            <div className="py-12 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="w-12 h-12 text-green-500 animate-bounce" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Request Submitted</h3>
                                <p className="text-slate-400">
                                    We have received your project intake. <br />
                                    Our team will contact you shortly to discuss next steps.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8 w-full">
                                    <h3 className="text-2xl font-bold flex items-center justify-center gap-2 mx-auto">
                                        Start Your <span className="text-gradient">Intake</span>
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-2 mx-auto max-w-md">
                                        Let&apos;s coordinate your Home Accessibility Adaptation project.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6 w-full text-left">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors"
                                                placeholder="Full Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors"
                                                placeholder="guardian@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Phone (Optional)</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors"
                                            placeholder="720-000-0000"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Project Type</label>
                                            <select
                                                value={formData.projectType}
                                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors appearance-none"
                                            >
                                                <option>Sensory Pod</option>
                                                <option>Safety Installation</option>
                                                <option>Wall Padding</option>
                                                <option>Adaptive Storage</option>
                                                <option>Consultation</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Funding Source</label>
                                            <select
                                                value={formData.fundingType}
                                                onChange={(e) => setFormData({ ...formData, fundingType: e.target.value })}
                                                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors appearance-none"
                                            >
                                                <option value="Private Pay">Private Pay</option>
                                                <option value="Unsure / Need Guidance">Unsure / Need Guidance</option>
                                                <option value="CES Waiver" disabled className="text-slate-500 bg-slate-950">CES Waiver</option>
                                                <option value="SLS Waiver" disabled className="text-slate-500 bg-slate-950">SLS Waiver</option>
                                                <option value="CHRP Waiver" disabled className="text-slate-500 bg-slate-950">CHRP Waiver</option>
                                                <option value="HCBS-DD Waiver" disabled className="text-slate-500 bg-slate-950">HCBS-DD Waiver</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Message</label>
                                        <textarea
                                            value={formData.specs}
                                            onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none h-24 resize-none transition-colors"
                                            placeholder="Tell us about your adaptation needs..."
                                        ></textarea>
                                    </div>

                                    {status === "error" && (
                                        <p className="text-red-400 text-sm">Oops we&apos;re having a problem, please contact us directly at Fixitbuilditcolorado@gmail.com 720-515-3348.</p>
                                    )}

                                    <div className="flex flex-col items-center justify-center py-2 min-h-[70px]">
                                        <div ref={turnstileRef}></div>
                                        {turnstileError && (
                                            <p className="text-red-400 text-[10px] mt-2 animate-pulse">
                                                Security check blocked. Please disable VPN or Ad-blocker and refresh.
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="btn-action-primary w-full flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === "submitting" ? (
                                            "Sending..."
                                        ) : (
                                            <>Send <Send className="w-4 h-4" /></>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
