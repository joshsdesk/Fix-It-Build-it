"use client";

import React, { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Mail, Phone } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormCard } from "@/components/FormCard";
import { FormInput } from "@/components/FormInput";
import { ModalCard } from "@/components/ModalCard";
import { vcardData } from "@/config/BusinessInfo";

export const contactFormSchema = z.object({
    leadType: z.enum(["Private Pay", "Unmet Needs", "Health First Colorado Medicaid Waiver (CES/SLS)"]),
    privatePaySession: z.enum(["30-minute Video Consultation ($115)", "60-minute On-Site Audit ($250)"]).optional(),
    unmetNeedsApproved: z.boolean().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    contactMethod: z.enum(["Phone", "Email", "Text"]),
    propertyType: z.string().optional(),
    specs: z.string().optional(),
    
    // CMA Details (Optional/Conditional)
    caseManagerName: z.string().optional(),
    cmaAgency: z.enum(["RMHS", "Pathways", "Imagine!", "JeffCo", "Other"]).optional(),
    waiverType: z.enum(["CES", "SLS", "Other"]).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    prefill?: Partial<ContactFormData>;
}

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const DEFAULT_FORM_DATA: ContactFormData = {
    leadType: "Private Pay",
    name: "",
    email: "",
    phone: "",
    contactMethod: "Email",
    propertyType: "",
    specs: "",
    caseManagerName: "",
    cmaAgency: "RMHS",
    waiverType: "CES",
};



export default function ContactModal({ isOpen, onClose, prefill }: BaseModalProps) {
    const [status, setStatus] = useState<SubmissionStatus>("idle");
    const [formData, setFormData] = useState<ContactFormData>(DEFAULT_FORM_DATA);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [submissionError, setSubmissionError] = useState("");
    const previousOpenRef = useRef(false);

    useEffect(() => {
        if (isOpen && !previousOpenRef.current) {
            setFormData({ ...DEFAULT_FORM_DATA, ...prefill });
            setStatus("idle");
            setValidationErrors({});
            setSubmissionError("");
        }
        previousOpenRef.current = isOpen;
    }, [isOpen, prefill]);

    const submitForm = async () => {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let resData: { success: boolean; error?: string };
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                resData = await response.json();
            } else {
                const textData = await response.text();
                console.error("Server returned non-JSON response:", textData);
                throw new Error("Server returned an invalid response. Check server logs.");
            }

            if (resData.success) {
                setStatus("success");
                setSubmissionError("");
                setTimeout(() => {
                    setStatus("idle");
                    onClose();
                }, 3000);
                return;
            }

            console.warn("Contact submission failed:", resData.error);
            setSubmissionError(resData.error || "The email service could not send your message. Please try again.");
            setStatus("error");
        } catch (error) {
            console.error("Contact submission error:", error);
            setSubmissionError("We could not reach the contact service. Check your connection and try again.");
            setStatus("error");
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setValidationErrors({});

        const result = contactFormSchema.safeParse(formData);
        if (!result.success) {
            const errors: Record<string, string> = {};
            (result.error as z.ZodError).issues.forEach(err => {
                if (err.path[0]) errors[err.path[0].toString()] = err.message;
            });
            setValidationErrors(errors);
            return;
        }

        setStatus("submitting");
        await submitForm();
    };

    const isMedicaid = formData.leadType === "Health First Colorado Medicaid Waiver (CES/SLS)";

    return (
        <ModalCard isOpen={isOpen} onClose={onClose} componentNamespace="contact-modal" elementIdentifier="modal-card" className="text-[83.33%]">
            {status === "success" ? (
                <div className="py-12 flex flex-col items-center text-center space-y-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                        <CheckCircle2 className="h-12 w-12 animate-bounce text-green-500" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold">Request Submitted</h3>
                        <p className="text-slate-400">
                            We have received your message.
                            <br />
                            Our team will contact you shortly to discuss next steps.
                        </p>
                    </div>
                    <Button title="Close" variant="secondary" onClick={onClose} componentNamespace="contact-modal" elementIdentifier="close-button" />
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
                        <p role="alert" className="text-sm text-red-300">{submissionError}</p>
                    </div>
                    <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                        <a href={`mailto:${vcardData.email}`} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-fibi-purple px-4 py-3 text-sm font-bold text-white shadow-md shadow-black/20 transition-all hover:brightness-110">
                            <Mail className="h-4 w-4" /> Email Us
                        </a>
                        <a href={`tel:${vcardData.phone}`} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-fibi-purple px-4 py-3 text-sm font-bold text-white shadow-md shadow-black/20 transition-all hover:brightness-110">
                            <Phone className="h-4 w-4" /> Call Us
                        </a>
                    </div>
                    <Button title="Try the form again" variant="secondary" onClick={() => { setSubmissionError(""); setStatus("idle"); }} componentNamespace="contact-modal" elementIdentifier="retry-button" />
                </div>
            ) : (
                <FormCard onSubmit={handleSubmit} componentNamespace="contact-modal" elementIdentifier="contact-form">
                    <div className="space-y-4 text-center mb-6">
                        <h3 className="text-3xl font-bold text-white">
                            Send Us a <span className="text-gradient">Message</span>
                        </h3>
                        <p className="mx-auto max-w-md text-sm text-slate-400">
                            Building Specialized Environments with Precision and Empathy.
                        </p>
                    </div>

                    <FormInput componentNamespace="contact-modal" elementIdentifier="form-input"
                        label="Funding / Intake Path"
                        as="select"
                        value={formData.leadType}
                        onChange={(val) => setFormData({ ...formData, leadType: val as ContactFormData["leadType"] })}
                        options={[
                            { label: "Private Pay", value: "Private Pay" },
                            { label: "Unmet Needs", value: "Unmet Needs" },
                        ]}
                    />

                    {formData.leadType === "Unmet Needs" && (
                        <div className="mt-2 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.unmetNeedsApproved || false}
                                    onChange={(e) => setFormData({ ...formData, unmetNeedsApproved: e.target.checked })}
                                    className="mt-1 w-5 h-5 rounded border-amber-500/50 bg-black/50 text-amber-500 focus:ring-amber-500"
                                />
                                <div className="space-y-1">
                                    <span className="text-sm font-bold text-amber-500">I am already approved for Unmet Needs funding.</span>
                                    <p className="text-xs text-amber-500/70">Note: We do not assist with the approval process. You must be pre-approved to proceed via this path.</p>
                                </div>
                            </label>
                        </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <FormInput componentNamespace="contact-modal" elementIdentifier="form-input"
                                label="Name"
                                value={formData.name}
                                onChange={(val) => setFormData({ ...formData, name: val })}
                            />
                            {validationErrors.name && <p className="text-red-400 text-xs mt-1">{validationErrors.name}</p>}
                        </div>
                        <div>
                            <FormInput componentNamespace="contact-modal" elementIdentifier="form-input"
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(val) => setFormData({ ...formData, email: val })}
                            />
                            {validationErrors.email && <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                        <div>
                            <FormInput componentNamespace="contact-modal" elementIdentifier="form-input"
                                label="Phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(val) => setFormData({ ...formData, phone: val })}
                            />
                            {validationErrors.phone && <p className="text-red-400 text-xs mt-1">{validationErrors.phone}</p>}
                        </div>
                        <FormInput componentNamespace="contact-modal" elementIdentifier="form-input"
                            label="Preferred Contact Method"
                            as="select"
                            value={formData.contactMethod}
                            onChange={(val) => setFormData({ ...formData, contactMethod: val as ContactFormData["contactMethod"] })}
                            options={[
                                { label: "Phone", value: "Phone" },
                                { label: "Email", value: "Email" },
                                { label: "Text", value: "Text" }
                            ]}
                        />
                    </div>

                    {/* Property Type has been removed from the Modal per user request, as it is captured in the Sensory Wizard */}

                    {isMedicaid && (
                        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                            <h4 className="text-white font-bold text-sm">CMA / Case Manager Details</h4>
                            <FormInput componentNamespace="contact-modal" elementIdentifier="form-input"
                                label="Case Manager Name"
                                value={formData.caseManagerName || ""}
                                onChange={(val) => setFormData({ ...formData, caseManagerName: val })}
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormInput componentNamespace="contact-modal" elementIdentifier="form-input"
                                    label="CMA Agency"
                                    as="select"
                                    value={formData.cmaAgency || "RMHS"}
                                    onChange={(val) => setFormData({ ...formData, cmaAgency: val as ContactFormData["cmaAgency"] })}
                                    options={[
                                        { label: "RMHS", value: "RMHS" },
                                        { label: "Pathways", value: "Pathways" },
                                        { label: "Imagine!", value: "Imagine!" },
                                        { label: "JeffCo", value: "JeffCo" },
                                        { label: "Other", value: "Other" }
                                    ]}
                                />
                                <FormInput componentNamespace="contact-modal" elementIdentifier="form-input"
                                    label="Member Waiver Type"
                                    as="select"
                                    value={formData.waiverType || "CES"}
                                    onChange={(val) => setFormData({ ...formData, waiverType: val as ContactFormData["waiverType"] })}
                                    options={[
                                        { label: "CES", value: "CES" },
                                        { label: "SLS", value: "SLS" },
                                        { label: "Other", value: "Other" }
                                    ]}
                                />
                            </div>
                        </div>
                    )}

                    <div className="mt-4">
                        <FormInput componentNamespace="contact-modal" elementIdentifier="form-input"
                            label="Project Scope / Message"
                            as="textarea"
                            rows={2}
                            value={formData.specs || ""}
                            onChange={(val) => setFormData({ ...formData, specs: val })}
                            placeholder="Tell us about your adaptation needs..."
                        />
                    </div>

                    {status === "submitting" && (
                        <div className="wait-state-container active mt-4">
                            <p className="wait-state-text">Sending your request — no need to refresh, this only takes a moment.</p>
                        </div>
                    )}



                    <Button
                        componentNamespace="contact-modal"
                        elementIdentifier="submit-button"
                        title="Send"
                        variant="primary"
                        loading={status === "submitting"}
                        disabled={status === "submitting"}
                        type="submit"
                        className="w-full mt-2"
                    />
                </FormCard>
            )}
        </ModalCard>
    );
}
