"use client";

import React, { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Mail, Phone } from "lucide-react";

import { Button } from "@/components/Button";
import { FormCard } from "@/components/FormCard";
import { FormInput } from "@/components/FormInput";
import { ModalCard } from "@/components/ModalCard";

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

const PROJECT_TYPE_OPTIONS = {
    residential: RESIDENTIAL_PROJECT_TYPES.map((type) => ({ label: type, value: type })),
    commercial: COMMERCIAL_PROJECT_TYPES.map((type) => ({ label: type, value: type })),
};

const SITE_TYPE_OPTIONS = SITE_TYPES.map((type) => ({ label: type, value: type }));

const FUNDING_OPTIONS = [
    { label: "Private Pay", value: "Private Pay" },
    { label: "Unsure / Need Guidance", value: "Unsure / Need Guidance" },
    { label: "CES Waiver (Coming Soon)", value: "CES Waiver", disabled: true },
    { label: "SLS Waiver (Coming Soon)", value: "SLS Waiver", disabled: true },
    { label: "CHRP Waiver (Coming Soon)", value: "CHRP Waiver", disabled: true },
    { label: "HCBS-DD Waiver (Coming Soon)", value: "HCBS-DD Waiver", disabled: true },
];

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
    const [turnstileError, setTurnstileError] = useState(false);
    const [formData, setFormData] = useState<ContactFormData>(DEFAULT_FORM_DATA);
    const turnstileRef = useRef<HTMLDivElement>(null);
    const previousOpenRef = useRef(false);

    useEffect(() => {
        if (isOpen && !previousOpenRef.current) {
            setFormData({ ...DEFAULT_FORM_DATA, ...prefill });
            setStatus("idle");
            setTurnstileToken(null);
            setTurnstileError(false);
        }

        previousOpenRef.current = isOpen;
    }, [isOpen, prefill]);

    useEffect(() => {
        if (!isOpen || !turnstileRef.current) {
            return;
        }

        let widgetId: string | null = null;
        let interval: ReturnType<typeof setInterval> | undefined;
        let attempts = 0;

        const initTurnstile = () => {
            attempts += 1;

            if (attempts > 15) {
                if (interval) {
                    clearInterval(interval);
                }
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

                    if (interval) {
                        clearInterval(interval);
                    }
                }
            } catch (error) {
                console.error("Turnstile render error:", error);
            }
        };

        const timeout = setTimeout(() => {
            initTurnstile();
            if (!widgetId) {
                interval = setInterval(initTurnstile, 1000);
            }
        }, 500);

        return () => {
            clearTimeout(timeout);
            if (interval) {
                clearInterval(interval);
            }
            if (widgetId && window.turnstile) {
                window.turnstile.remove(widgetId);
            }
            setTurnstileToken(null);
        };
    }, [isOpen]);

    const isResidential = formData.category === "residential";

    const setCategory = (category: LeadCategory) => {
        setFormData((current) => ({
            ...current,
            category,
            projectType: category === "residential" ? RESIDENTIAL_PROJECT_TYPES[0] : COMMERCIAL_PROJECT_TYPES[0],
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

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
                return;
            }

            console.warn("Contact submission failed:", result.error);
            setStatus("error");
        } catch (error) {
            console.error("Contact submission error:", error);
            setStatus("error");
        }
    };

    return (
        <ModalCard
            isOpen={isOpen}
            onClose={onClose}
            componentNamespace="contact-modal"
            elementIdentifier="modal-card"
        >
            {status === "success" ? (
                <div className="py-12 flex flex-col items-center text-center space-y-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                        <CheckCircle2 className="h-12 w-12 animate-bounce text-green-500" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold">Request Submitted</h3>
                        <p className="text-slate-400">
                            We have received your project intake.
                            <br />
                            Our team will contact you shortly to discuss next steps.
                        </p>
                    </div>
                    <Button
                        title="Close"
                        variant="secondary"
                        componentNamespace="contact-modal"
                        elementIdentifier="success-close-button"
                        onClick={onClose}
                    />
                </div>
            ) : status === "error" ? (
                <div className="py-10 flex flex-col items-center text-center space-y-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">
                        <AlertTriangle className="h-12 w-12 text-red-400" />
                    </div>
                    <div className="max-w-md space-y-2">
                        <h3 className="text-2xl font-bold">Looks Like We Hit a Snag</h3>
                        <p className="text-slate-400">
                            Something went wrong sending your request. Please try again or reach out directly.
                        </p>
                    </div>
                    <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                        <a
                            href="mailto:FixitBuilditColorado@gmail.com"
                            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold transition-colors hover:bg-white/10"
                        >
                            <Mail className="h-4 w-4" /> Email Us
                        </a>
                        <a
                            href="tel:7205153348"
                            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold transition-colors hover:bg-white/10"
                        >
                            <Phone className="h-4 w-4" /> Call Us
                        </a>
                    </div>
                    <Button
                        title="Try the form again"
                        variant="secondary"
                        componentNamespace="contact-modal"
                        elementIdentifier="retry-button"
                        onClick={() => setStatus("idle")}
                    />
                </div>
            ) : (
                <FormCard
                    onSubmit={handleSubmit}
                    componentNamespace="contact-modal"
                    elementIdentifier="contact-form"
                >
                    <div className="space-y-2 text-center">
                        <h3 className="text-2xl font-bold">
                            Start Your <span className="text-gradient">Intake</span>
                        </h3>
                        <p className="mx-auto max-w-md text-sm text-slate-400">
                            Let&apos;s coordinate your Home Accessibility Adaptation project.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <Button
                            title="Residential / Family"
                            variant={isResidential ? "primary" : "secondary"}
                            componentNamespace="contact-modal"
                            elementIdentifier="residential-toggle"
                            onClick={() => setCategory("residential")}
                            aria-pressed={isResidential}
                            className="w-full"
                            type="button"
                        />
                        <Button
                            title="Commercial / Business"
                            variant={!isResidential ? "primary" : "secondary"}
                            componentNamespace="contact-modal"
                            elementIdentifier="commercial-toggle"
                            onClick={() => setCategory("commercial")}
                            aria-pressed={!isResidential}
                            className="w-full"
                            type="button"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormInput
                            label={isResidential ? "Name" : "Contact Name"}
                            value={formData.name}
                            onChange={(value) => setFormData({ ...formData, name: value })}
                            required
                            placeholder="Full Name"
                            componentNamespace="contact-modal"
                            elementIdentifier="name"
                        />
                        <FormInput
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(value) => setFormData({ ...formData, email: value })}
                            required
                            placeholder="guardian@example.com"
                            componentNamespace="contact-modal"
                            elementIdentifier="email"
                        />
                    </div>

                    <FormInput
                        label="Phone (Optional)"
                        type="tel"
                        value={formData.phone}
                        onChange={(value) => setFormData({ ...formData, phone: value })}
                        placeholder="720-000-0000"
                        componentNamespace="contact-modal"
                        elementIdentifier="phone"
                    />

                    {!isResidential ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormInput
                                label="Organization"
                                value={formData.organization}
                                onChange={(value) => setFormData({ ...formData, organization: value })}
                                required
                                placeholder="Business / Clinic Name"
                                componentNamespace="contact-modal"
                                elementIdentifier="organization"
                            />
                            <FormInput
                                label="Site Type"
                                as="select"
                                value={formData.siteType}
                                onChange={(value) => setFormData({ ...formData, siteType: value })}
                                options={SITE_TYPE_OPTIONS}
                                componentNamespace="contact-modal"
                                elementIdentifier="site-type"
                            />
                        </div>
                    ) : null}

                    <FormInput
                        label="Project Type"
                        as="select"
                        value={formData.projectType}
                        onChange={(value) => setFormData({ ...formData, projectType: value })}
                        options={PROJECT_TYPE_OPTIONS[formData.category]}
                        componentNamespace="contact-modal"
                        elementIdentifier="project-type"
                    />

                    {isResidential ? (
                        <>
                            <FormInput
                                label="Funding Source"
                                as="select"
                                value={formData.fundingType}
                                onChange={(value) => setFormData({ ...formData, fundingType: value })}
                                options={FUNDING_OPTIONS}
                                componentNamespace="contact-modal"
                                elementIdentifier="funding-source"
                            />

                            <label className="flex items-center gap-3 text-sm text-slate-300" data-component-namespace="contact-modal" data-element-identifier="has-lmn">
                                <input
                                    type="checkbox"
                                    checked={formData.hasLMN}
                                    onChange={(event) => setFormData({ ...formData, hasLMN: event.target.checked })}
                                    className="h-4 w-4 accent-fibi-accent"
                                    style={{ minHeight: "var(--target-min)" }}
                                />
                                <span>I have a Letter of Medical Necessity (LMN) from an OT/therapist</span>
                            </label>
                        </>
                    ) : null}

                    <FormInput
                        label="Message"
                        as="textarea"
                        rows={5}
                        value={formData.specs}
                        onChange={(value) => setFormData({ ...formData, specs: value })}
                        placeholder="Tell us about your adaptation needs..."
                        componentNamespace="contact-modal"
                        elementIdentifier="message"
                    />

                    {status === "submitting" ? (
                        <div className="wait-state-container active" data-component-namespace="contact-modal" data-element-identifier="submission-state">
                            <p className="wait-state-text">Sending your request — no need to refresh, this only takes a moment.</p>
                        </div>
                    ) : null}

                    <div className="flex min-h-[var(--target-min)] flex-col items-center justify-center py-2">
                        <div ref={turnstileRef} data-component-namespace="contact-modal" data-element-identifier="turnstile" />
                        {turnstileError ? (
                            <p className="mt-2 text-[10px] text-red-400 animate-pulse">
                                Security check blocked. Please refresh and try again.
                            </p>
                        ) : null}
                    </div>

                    <Button
                        title="Send"
                        variant="primary"
                        loading={status === "submitting"}
                        disabled={status === "submitting"}
                        componentNamespace="contact-modal"
                        elementIdentifier="submit-button"
                        type="submit"
                        className="w-full"
                    />
                </FormCard>
            )}
        </ModalCard>
    );
}
