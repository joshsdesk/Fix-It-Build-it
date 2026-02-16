"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        projectType: "Sensory Pod",
        fundingType: "Private Pay",
        specs: "",
        email: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        console.log("Submitting to scrubbed directory (Zeke_02):", formData);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            onClose();
        }, 2500);
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
                        className="relative w-full max-w-lg glass-card p-8 border-fibi-orange/30 overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {isSubmitted ? (
                            <div className="py-12 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="w-12 h-12 text-green-500 animate-bounce" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Manifest Received</h3>
                                <p className="text-slate-400">
                                    Prism Node (Zeke_02) is vetting your request. <br />
                                    We'll handshake soon.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                        Start Your <span className="text-gradient">Intake</span>
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-2">
                                        Let's coordinate your Home Accessibility Adaptation project.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-fibi-orange">Project Type</label>
                                        <select
                                            value={formData.projectType}
                                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-orange outline-none transition-colors appearance-none"
                                        >
                                            <option>Sensory Pod</option>
                                            <option>Safety Installation</option>
                                            <option>Organization / Storage</option>
                                            <option>Consultation</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-fibi-orange">Funding Source</label>
                                        <select
                                            value={formData.fundingType}
                                            onChange={(e) => setFormData({ ...formData, fundingType: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-orange outline-none transition-colors appearance-none"
                                        >
                                            <option>Private Pay</option>
                                            <option>CES Waiver</option>
                                            <option>SLS Waiver</option>
                                            <option>HCBS-DD Waiver</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-fibi-orange">Email / Contact</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus:border-fibi-orange outline-none transition-colors"
                                            placeholder="guardian@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Project Type</label>
                                        <select
                                            value={formData.projectType}
                                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-fibi-accent transition-colors"
                                        >
                                            <option>Sensory Pod</option>
                                            <option>Safety Gate</option>
                                            <option>Wall Padding</option>
                                            <option>Adaptive Storage</option>
                                            <option>Consultation Only</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Funding Source</label>
                                        <select
                                            value={formData.fundingType}
                                            onChange={(e) => setFormData({ ...formData, fundingType: e.target.value })}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-fibi-accent transition-colors"
                                        >
                                            <option>Private Pay</option>
                                            <option>CES Waiver</option>
                                            <option>SLS Waiver</option>
                                            <option>CHRP Waiver</option>
                                            <option>Unsure / Need Guidance</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message</label>
                                        <textarea
                                            value={formData.specs}
                                            onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-fibi-accent h-32 resize-none transition-colors"
                                            placeholder="Tell us about your adaptation needs..."
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-4">
                                        Send Manifest <Send className="w-4 h-4" />
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
