"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { X, AlertTriangle, CreditCard, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEDICAID_CERTIFIED, WaiverInfo } from "@/lib/businessinfo";

// Initialize Stripe outside component to avoid recreation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (method: 'private_pay' | 'unmet_needs') => void;
    bookingUid?: string;
}

function CheckoutForm({ onSuccess, bookingUid }: { onSuccess: () => void, bookingUid?: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setError(submitError.message || "An error occurred");
            setIsProcessing(false);
            return;
        }

        // We would normally confirm the PaymentIntent here using stripe.confirmPayment
        // and then call our backend to confirm the Cal.com booking.
        if (bookingUid) {
            await fetch("/api/confirm-booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingUid, status: "ACCEPTED", method: "private_pay" })
            });
        }
        
        setIsProcessing(false);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <Button type="submit" disabled={!stripe || isProcessing} className="w-full" title="Pay & Confirm Consultation" componentNamespace="payment" elementIdentifier="pay-submit">
                {isProcessing ? "Processing..." : "Pay & Confirm Consultation"}
            </Button>
        </form>
    );
}

export default function PaymentModal({ isOpen, onClose, onSuccess, bookingUid }: PaymentModalProps) {
    const [path, setPath] = useState<'selection' | 'stripe' | 'unmet_needs'>('selection');
    const [cmaName, setCmaName] = useState("");
    const [isPreapproved, setIsPreapproved] = useState(false);
    const [isSubmittingUnmet, setIsSubmittingUnmet] = useState(false);



// Dummy client secret for UI rendering of Stripe Elements
const options = {
    mode: 'payment' as const,
    amount: 15000, // $150.00
    currency: 'usd',
};

if (!isOpen) return null;

const handleUnmetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPreapproved || !cmaName) return;
    
    setIsSubmittingUnmet(true);
    
    if (bookingUid) {
        await fetch("/api/confirm-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingUid, status: "ACCEPTED", method: "unmet_needs", cmaName })
        });
    }
    
    setIsSubmittingUnmet(false);
    onSuccess('unmet_needs');
};

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-2xl bg-background border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                <h2 className="text-xl font-bold text-white">Select Path</h2>
                <button 
                    onClick={onClose}
                    className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
                
                {path === 'selection' && (
                    <div className="space-y-6">
                        <button 
                            onClick={() => setPath('stripe')}
                            className="w-full text-left p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-fibi-purple transition-all group flex items-start gap-4"
                        >
                            <div className="p-3 bg-fibi-purple/20 rounded-lg shrink-0">
                                <CreditCard className="w-6 h-6 text-fibi-purple" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Path A: Private Pay</h3>
                                <p className="text-sm text-slate-400">Credit Card, Apple Pay, Google Pay. Instant booking for 30-min Virtual Consult.</p>
                            </div>
                        </button>

                        {MEDICAID_CERTIFIED && (
                            <button 
                                onClick={() => setPath('unmet_needs')}
                                className="w-full text-left p-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all group flex items-start gap-4"
                            >
                                <div className="p-3 bg-yellow-500/20 rounded-lg shrink-0">
                                    <FileCheck className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Path B: {WaiverInfo.title}</h3>
                                    <p className="text-sm text-slate-400">{WaiverInfo.description}</p>
                                </div>
                            </button>
                        )}
                    </div>
                )}

                {path === 'stripe' && (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                        <button onClick={() => setPath('selection')} className="text-sm text-fibi-purple hover:underline mb-4">
                            ← Back to options
                        </button>
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm onSuccess={() => onSuccess('private_pay')} bookingUid={bookingUid} />
                        </Elements>
                    </div>
                )}

                {path === 'unmet_needs' && (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                        <button onClick={() => setPath('selection')} className="text-sm text-fibi-purple hover:underline mb-4">
                            ← Back to options
                        </button>
                        
                        {/* Von Restorff Effect High-Contrast Box */}
                        <div className="bg-yellow-500/20 border-2 border-yellow-500 p-6 rounded-xl">
                            <div className="flex items-start gap-3 mb-4">
                                <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                                <p className="text-white font-bold leading-relaxed">
                                    &quot;{WaiverInfo.warningMessage}&quot;
                                </p>
                            </div>
                            
                            <form onSubmit={handleUnmetSubmit} className="space-y-6 mt-6 border-t border-yellow-500/30 pt-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">{WaiverInfo.cmaLabel}</label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder={WaiverInfo.cmaPlaceholder}
                                        value={cmaName}
                                        onChange={e => setCmaName(e.target.value)}
                                        className="w-full bg-black/40 border border-yellow-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" 
                                    />
                                </div>
                                
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input 
                                        required
                                        type="checkbox" 
                                        checked={isPreapproved}
                                        onChange={e => setIsPreapproved(e.target.checked)}
                                        className="w-5 h-5 mt-0.5 rounded border-yellow-500/50 bg-black/40 text-yellow-500 focus:ring-yellow-500/50" 
                                    />
                                    <span className="text-sm text-slate-300 leading-relaxed">
                                        {WaiverInfo.confirmationText}
                                    </span>
                                </label>

                                <Button type="submit" disabled={!isPreapproved || !cmaName || isSubmittingUnmet} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold" title="Bypass Payment" componentNamespace="payment" elementIdentifier="bypass-submit">
                                    {isSubmittingUnmet ? "Processing..." : "Bypass Payment & Schedule Consult"}
                                </Button>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
);
}
