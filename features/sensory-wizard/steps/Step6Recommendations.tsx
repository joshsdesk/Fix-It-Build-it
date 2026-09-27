import React, { useState } from "react";
import { Info, Lock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WizardAction, WizardState } from "../WizardReducer";
import { Turnstile } from '@marsidev/react-turnstile';

export function Step6Recommendations({ state, dispatch, onRequestConsultation }: { state: WizardState, dispatch: React.Dispatch<WizardAction>, onRequestConsultation: (prefill: { specs: string }) => void }) {
    const [leadName, setLeadName] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [leadPhone, setLeadPhone] = useState("");
    const [turnstileToken, setTurnstileToken] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getRecommendation = () => {
        const recs = [];
        if (state.behaviorFrictions.includes('Elopement Risk')) recs.push("Tier 3 Safety: Perimeter egress locks and smart-home security integration.");
        if (state.behaviorFrictions.includes('Meltdown Recovery')) recs.push("Tier 2 Sensory: Escape Spaces, Decompression nooks with <50 Lux capability.");
        if (state.behaviorFrictions.includes('Sleep Disruption')) recs.push("Tier 2 Sensory: Light and noise reduction for circadian regulation.");
        if (state.sensoryNeeds.includes('Vestibular')) recs.push("Tier 3 Structural: 1,000 lb dynamic load ceiling joist mounts for swings/spinners.");
        if (state.sensoryNeeds.includes('Proprio')) recs.push("Tier 3 Structural: Heavy-duty climbing holds and deep-pressure compression zones.");
        if (state.sensoryNeeds.includes('Sensitive') || state.sensoryNeeds.includes('Auditory')) recs.push("Tier 2 Sensory: NRC ≥ 0.75 acoustic panels and sound isolation.");
        if (state.environment === 'Renter') recs.push("Tier 1 Baseline: Flat-Pack Solution, Zero-penetration, free-standing structures due to Renter status.");
        
        if (recs.length === 0) return "Custom Sensory Adaptation: Tailored to your unique environmental friction points.";
        return recs.join(" | ");
    };

    const buildIntakeSummary = () => {
        return `Sensory Wizard Results — Energy: ${state.energy}, Sensory Profile: ${state.sensoryNeeds.join(", ")}, Friction: ${state.behaviorFrictions.join(", ")}, Environment: ${state.environment}, Funding: ${state.funding}. Recommendation: ${getRecommendation()}`;
    };

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!turnstileToken) { alert("Please wait for security verification."); return; }
        setIsSubmitting(true);

        const payload = { leadName, leadEmail, leadPhone, turnstileToken, b_website_hp: honeypot, ...state };
        try {
            const res = await fetch("/api/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (res.ok) {
                dispatch({ type: 'SET_UNLOCKED', payload: true });
                localStorage.setItem("fibi_wizard_unlocked", "true");
            } else {
                alert("Something went wrong processing your request.");
            }
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500 text-center">
            {state.attempts >= 3 && !state.hasUnlocked ? (
                <Card variant="gate">
                    <div className="w-12 h-12 bg-fibi-purple/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-fibi-purple/30">
                        <Lock className="w-6 h-6 text-fibi-purple" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Unlock Your Custom Architecture Plan</h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium mb-6">
                        You&apos;ve designed multiple scenarios! To view this final custom recommendation and unlock unlimited Wizard access, please enter your contact info.
                    </p>
                    <form onSubmit={handleUnlock} className="space-y-4 text-left">
                        <div className="hidden" aria-hidden="true"><input type="text" name="b_website_hp" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} /></div>
                        <div><input required type="text" placeholder="Full Name" value={leadName} onChange={e => setLeadName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-fibi-purple transition-colors" /></div>
                        <div><input required type="email" placeholder="Email Address" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-fibi-purple transition-colors" /></div>
                        <div><input required type="tel" placeholder="Phone Number" value={leadPhone} onChange={e => setLeadPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-fibi-purple transition-colors" /></div>
                        <div className="flex justify-center my-2"><Turnstile siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || "1x00000000000000000000AA"} onSuccess={setTurnstileToken} /></div>
                        <Button type="submit" variant="primary-cta" title="Unlock" className="w-full mt-2" disabled={isSubmitting || !turnstileToken} componentNamespace="wizard" elementIdentifier="step6-unlock">
                            {isSubmitting ? "Processing..." : "Unlock My Recommendation"} <Lock className="w-4 h-4 ml-2 opacity-50" />
                        </Button>
                    </form>
                </Card>
            ) : (
                <>
                    <div className="inline-flex items-center gap-2 text-fibi-purple text-sm font-bold uppercase tracking-wider mb-2">
                        <Info className="w-4 h-4" /> Recommendation Found
                    </div>
                    <Card variant="recommendation">
                        <h4 className="text-2xl font-bold text-white mb-4">Phase 1 Match</h4>
                        <p className="text-lg text-slate-300 leading-relaxed font-medium">{getRecommendation()}</p>
                    </Card>
                    <div className="flex justify-center gap-4 pt-4">
                        <Button title="Start Over" onClick={() => dispatch({ type: 'RESET' })} variant="secondary" componentNamespace="wizard" elementIdentifier="step6-reset">Start Over</Button>
                        <Button title="Request Consultation" onClick={() => onRequestConsultation({ specs: buildIntakeSummary() })} variant="primary-cta" componentNamespace="wizard" elementIdentifier="step6-request">
                            Request Consultation <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
