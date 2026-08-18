"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertTriangle, Mail, Phone } from "lucide-react";

export type LeadCategory = "residential" | "commercial";

export interface ContactFormData {
    category: LeadCategory;
    name: string;
    email: string;
    phone: string;
    organization: string;
    siteType: string;
    projectType: string;
    fundingType: string;
    hasLMN: boolean;
    specs: string;
}

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    prefill?: Partial<ContactFormData>;
}

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const RESIDENTIAL_PROJECT_TYPES = [
    "Sensory Sanctuary / Playroom",
    "Vestibular Swing / Climbing Wall",
    "Safety & Padding (Z-Clip) Installation",
    "Quiet / Low-Stimulus Bedroom",
    "Adaptive Storage",
    "General Consultation",
];

const COMMERCIAL_PROJECT_TYPES = [
    "Acoustic Dampening / Quiet Waiting Area",
    "Focus Pod / Recharge Space",
    "Low-Flicker Lighting Retrofit",
    "General Consultation",
];

const SITE_TYPES = [
    "Pediatric / Therapy Clinic",
    "School / Classroom",
    "Office / Workplace",
    "Waiting Room / Lobby",
    "Other",
];

const DEFAULT_FORM_DATA: ContactFormData = {
    category: "residential",
    name: "",
    email: "",
    phone: "",
    organization: "",
    siteType: SITE_TYPES[0],
    projectType: RESIDENTIAL_PROJECT_TYPES[0],
    fundingType: "Private Pay",
    hasLMN: false,
    specs: "",
};

// Declare global for Turnstile
declare global {
    interface Window {
        turnstile: {
            render: (
                container: string | HTMLElement,
                options: {
                    sitekey?: string;
                    callback?: (token: string) => void;
                    "error-callback"?: () => void;
                    theme?: "light" | "dark" | "auto";
                }
            ) => string;
            remove: (widgetId: string) => void;
        };
    }
}

export default function ContactModal({ isOpen, onClose, prefill }: BaseModalProps) {
    const [status, setStatus] = useState<SubmissionStatus>("idle");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [turnstileError, setTurnstileError] = useState<boolean>(false);
    const [formData, setFormData] = useState<ContactFormData>(DEFAULT_FORM_DATA);
    const [prevIsOpen, setPrevIsOpen] = useState(false);

    const turnstileRef = React.useRef<HTMLDivElement>(null);

    // Reset (and apply any prefill) each time the modal transitions to open
    if (isOpen && !prevIsOpen) {
        setPrevIsOpen(true);
        setFormData({ ...DEFAULT_FORM_DATA, ...prefill });
        setStatus("idle");
    } else if (!isOpen && prevIsOpen) {
        setPrevIsOpen(false);
    }

    // Handle Turnstile render/cleanup
    React.useEffect(() => {
        if (!isOpen) return;
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
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: turnstileToken, ...formData }),
            });

            const result: { success: boolean; error?: string } = await response.json();

            if (result.success) {
                setStatus("success");
                setTimeout(() => {
                    setStatus("idle");
                    onClose();
                }, 3000);
            } else {
                console.warn("Contact submission failed:", result.error);
                setStatus("error");
            }
        } catch (error) {
            console.error("Contact submission error:", error);
            setStatus("error");
        }
    };

    const isResidential = formData.category === "residential";
    const projectTypes = isResidential ? RESIDENTIAL_PROJECT_TYPES : COMMERCIAL_PROJECT_TYPES;

    const setCategory = (category: LeadCategory) => {
        setFormData((prev) => ({
            ...prev,
            category,
            projectType: category === "residential" ? RESIDENTIAL_PROJECT_TYPES[0] : COMMERCIAL_PROJECT_TYPES[0],
        }));
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
                        className="relative w-full max-w-lg glass-card p-8 border-fibi-accent/30 overflow-hidden flex flex-col items-center text-center max-h-[90vh] overflow-y-auto"
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
                        ) : status === "error" ? (
                            <div className="py-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                                    <AlertTriangle className="w-12 h-12 text-red-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Looks Like We Hit a Snag</h3>
                                <p className="text-slate-400 mb-6 max-w-sm">
                                    Something went wrong sending your request. Reach out directly and we&apos;ll get you sorted right away:
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                                    <a
                                        href="mailto:FixitBuilditColorado@gmail.com"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold"
                                    >
                                        <Mail className="w-4 h-4" /> Email Us
                                    </a>
                                    <a
                                        href="tel:7205153348"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold"
                                    >
                                        <Phone className="w-4 h-4" /> Call Us
                                    </a>
                                </div>
                                <p className="text-slate-500 text-xs mt-4">FixitBuilditColorado@gmail.com &nbsp;·&nbsp; 720.515.3348</p>
                                <button
                                    type="button"
                                    onClick={() => setStatus("idle")}
                                    className="mt-6 text-sm text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
                                >
                                    Try the form again
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 w-full">
                                    <h3 className="text-2xl font-bold flex items-center justify-center gap-2 mx-auto">
                                        Start Your <span className="text-gradient">Intake</span>
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-2 mx-auto max-w-md">
                                        Let&apos;s coordinate your Home Accessibility Adaptation project.
                                    </p>
                                </div>

                                <div className="binary-toggle-container" role="group" aria-label="Project category">
                                    <button
                                        type="button"
                                        aria-pressed={isResidential}
                                        onClick={() => setCategory("residential")}
                                        className="binary-toggle-btn"
                                    >
                                        Residential / Family
                                    </button>
                                    <button
                                        type="button"
                                        aria-pressed={!isResidential}
                                        onClick={() => setCategory("commercial")}
                                        className="binary-toggle-btn"
                                    >
                                        Commercial / Business
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6 w-full text-left">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="cf-name" className="text-xs font-bold uppercase tracking-widest text-fibi-accent">
                                                {isResidential ? "Name" : "Contact Name"}
                                            </label>
                                            <input
                                                id="cf-name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors"
                                                placeholder="Full Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="cf-email" className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Email</label>
                                            <input
                                                id="cf-email"
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
                                        <label htmlFor="cf-phone" className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Phone (Optional)</label>
                                        <input
                                            id="cf-phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors"
                                            placeholder="720-000-0000"
                                        />
                                    </div>

                                    {!isResidential && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="cf-organization" className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Organization</label>
                                                <input
                                                    id="cf-organization"
                                                    type="text"
                                                    required
                                                    value={formData.organization}
                                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors"
                                                    placeholder="Business / Clinic Name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="cf-site-type" className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Site Type</label>
                                                <select
                                                    id="cf-site-type"
                                                    value={formData.siteType}
                                                    onChange={(e) => setFormData({ ...formData, siteType: e.target.value })}
                                                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors appearance-none"
                                                >
                                                    {SITE_TYPES.map((type) => (
                                                        <option key={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label htmlFor="cf-project-type" className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Project Type</label>
                                        <select
                                            id="cf-project-type"
                                            value={formData.projectType}
                                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors appearance-none"
                                        >
                                            {projectTypes.map((type) => (
                                                <option key={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {isResidential && (
                                        <>
                                            <div className="space-y-2">
                                                <label htmlFor="cf-funding" className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Funding Source</label>
                                                <select
                                                    id="cf-funding"
                                                    value={formData.fundingType}
                                                    onChange={(e) => setFormData({ ...formData, fundingType: e.target.value })}
                                                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none transition-colors appearance-none"
                                                >
                                                    <option value="Private Pay">Private Pay</option>
                                                    <option value="Unsure / Need Guidance">Unsure / Need Guidance</option>
                                                    <option value="CES Waiver" disabled className="text-slate-500 bg-slate-950">CES Waiver (Coming Soon)</option>
                                                    <option value="SLS Waiver" disabled className="text-slate-500 bg-slate-950">SLS Waiver (Coming Soon)</option>
                                                    <option value="CHRP Waiver" disabled className="text-slate-500 bg-slate-950">CHRP Waiver (Coming Soon)</option>
                                                    <option value="HCBS-DD Waiver" disabled className="text-slate-500 bg-slate-950">HCBS-DD Waiver (Coming Soon)</option>
                                                </select>
                                            </div>

                                            <label htmlFor="cf-has-lmn" className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer">
                                                <input
                                                    id="cf-has-lmn"
                                                    type="checkbox"
                                                    checked={formData.hasLMN}
                                                    onChange={(e) => setFormData({ ...formData, hasLMN: e.target.checked })}
                                                    className="w-4 h-4 accent-fibi-accent"
                                                />
                                                I have a Letter of Medical Necessity (LMN) from an OT/therapist
                                            </label>
                                        </>
                                    )}

                                    <div className="space-y-2">
                                        <label htmlFor="cf-specs" className="text-xs font-bold uppercase tracking-widest text-fibi-accent">Message</label>
                                        <textarea
                                            id="cf-specs"
                                            value={formData.specs}
                                            onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-accent outline-none h-24 resize-none transition-colors"
                                            placeholder="Tell us about your adaptation needs..."
                                        ></textarea>
                                    </div>

                                    {status === "submitting" && (
                                        <div className="wait-state-container active">
                                            <p className="wait-state-text">
                                                Sending your request — no need to refresh, this only takes a moment.
                                            </p>
                                        </div>
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
