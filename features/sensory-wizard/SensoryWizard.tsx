"use client";

import React, { useState } from "react";
import { ArrowRight, Activity, Battery, Shield, Volume2, RefreshCw, Moon, Hammer, Info } from "lucide-react";

export default function SensoryNeedsWizard() {
    const [step, setStep] = useState(1);
    const [energy, setEnergy] = useState<string | null>(null);
    const [sensoryNeed, setSensoryNeed] = useState<string | null>(null);
    const [buildGoal, setBuildGoal] = useState<string | null>(null);

    const reset = () => {
        setStep(1);
        setEnergy(null);
        setSensoryNeed(null);
        setBuildGoal(null);
    };

    const getRecommendation = () => {
        if (energy === 'Big Body') {
            if (sensoryNeed === 'Proprio') return "Structural Integrity Focus: Heavy-duty climbing walls, compression nooks, and impact-resistant mounting.";
            if (sensoryNeed === 'Vestibular') return "Dynamic Movement Zone: Reinforced ceiling mounts for swings, spinners, and suspension hardware.";
        }
        if (energy === 'Recharge') {
            if (sensoryNeed === 'Seeker') return "Acoustic Tuning: Sound-dampening panels with designated audio zones for controlled stimulation.";
            if (sensoryNeed === 'Sensitive') return "Decompression Sanctuary: Blackout capability, sound isolation, and soft-texture finishes.";
        }
        return "Custom Sensory Adaptation: Tailored to unique environmental friction points.";
    };

    return (
        <section id="estimator" className="snap-start min-h-screen relative flex flex-col justify-center py-12 bg-background overflow-hidden font-sans">
            <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col gap-6 items-center">
                    {/* Header Section: Centered Narrative */}
                    <div className="text-center space-y-3">
                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
                                The Sensory <span className="font-normal text-gradient">Wizard</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
                                We don't quote square footage. We solve friction points. Let's find your baseline.
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-fibi-purple/30 text-[10px] text-fibi-purple font-bold w-fit mx-auto uppercase tracking-wider">
                            <Info className="w-3 h-3" />
                            Specialized Adaptations
                        </div>
                    </div>

                    <div className="card-container w-full max-w-2xl p-6 md:p-10 min-h-[350px] flex flex-col justify-center relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">

                        {/* Step 1: Energy Check */}
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                <h3 className="text-2xl font-bold text-white text-center">Step 1: The Energy Check</h3>
                                <p className="text-slate-400 text-center text-sm">What is the primary goal for this space?</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button onClick={() => { setEnergy('Big Body'); setStep(2); }} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-fibi-purple hover:bg-fibi-purple/10 transition-all group text-left">
                                        <Activity className="w-8 h-8 text-fibi-purple mb-4 group-hover:scale-110 transition-transform" />
                                        <div className="font-bold text-white text-lg mb-2">High Energy</div>
                                        <div className="text-sm text-slate-400">"Big Body" Play. Jumping, crashing, climbing.</div>
                                    </button>
                                    <button onClick={() => { setEnergy('Recharge'); setStep(2); }} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-fibi-purple hover:bg-fibi-purple/10 transition-all group text-left">
                                        <Battery className="w-8 h-8 text-fibi-purple mb-4 group-hover:scale-110 transition-transform" />
                                        <div className="font-bold text-white text-lg mb-2">Battery Recharge</div>
                                        <div className="text-sm text-slate-400">Quiet Retreat. Calming, low-stimuli zones.</div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Sensory Needs (Dynamic based on Step 1) */}
                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                <h3 className="text-2xl font-bold text-white text-center">Step 2: Sensory Profile</h3>
                                <p className="text-slate-400 text-center text-sm">
                                    {energy === 'Big Body' ? "How do they interact with the environment?" : "How do they process sound and light?"}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {energy === 'Big Body' ? (
                                        <>
                                            <button onClick={() => { setSensoryNeed('Proprio'); setStep(3); }} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-fibi-purple hover:bg-fibi-purple/10 transition-all group text-left">
                                                <Shield className="w-8 h-8 text-fibi-purple mb-4" />
                                                <div className="font-bold text-white text-lg mb-2">Deep Pressure</div>
                                                <div className="text-sm text-slate-400">Loves tight squeezes, heavy lifting, and big hugs.</div>
                                            </button>
                                            <button onClick={() => { setSensoryNeed('Vestibular'); setStep(3); }} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-fibi-purple hover:bg-fibi-purple/10 transition-all group text-left">
                                                <RefreshCw className="w-8 h-8 text-fibi-purple mb-4" />
                                                <div className="font-bold text-white text-lg mb-2">Constant Motion</div>
                                                <div className="text-sm text-slate-400">Loves to spin, swing, rock, and move constantly.</div>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => { setSensoryNeed('Seeker'); setStep(3); }} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-fibi-purple hover:bg-fibi-purple/10 transition-all group text-left">
                                                <Volume2 className="w-8 h-8 text-fibi-purple mb-4" />
                                                <div className="font-bold text-white text-lg mb-2">Sound Seeker</div>
                                                <div className="text-sm text-slate-400">Loves noise, music, and auditory feedback.</div>
                                            </button>
                                            <button onClick={() => { setSensoryNeed('Sensitive'); setStep(3); }} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-fibi-purple hover:bg-fibi-purple/10 transition-all group text-left">
                                                <Moon className="w-8 h-8 text-fibi-purple mb-4" />
                                                <div className="font-bold text-white text-lg mb-2">Sound Sensitive</div>
                                                <div className="text-sm text-slate-400">Needs quiet, dim lights, and reduced input.</div>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Build Goal */}
                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                <h3 className="text-2xl font-bold text-white text-center">Step 3: The Build Goal</h3>
                                <p className="text-slate-400 text-center text-sm">Where are we focusing?</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {['Safer Bedroom', 'Focused Study', 'Durable Play Zone'].map((g) => (
                                        <button key={g} onClick={() => { setBuildGoal(g); setStep(4); }} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-fibi-purple hover:bg-fibi-purple/10 transition-all text-center">
                                            <div className="font-bold text-white">{g}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Recommendation */}
                        {step === 4 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 text-center">
                                <div className="inline-flex items-center gap-2 text-fibi-purple text-sm font-bold uppercase tracking-wider mb-2">
                                    <Info className="w-4 h-4" />
                                    Recommendation Found
                                </div>

                                <div className="bg-fibi-purple/10 border border-fibi-purple/20 p-8 rounded-xl max-w-2xl mx-auto">
                                    <h4 className="text-2xl font-bold text-white mb-4">Phase 1 Match</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed font-medium">
                                        {getRecommendation()}
                                    </p>
                                </div>

                                <div className="flex justify-center gap-4 pt-4">
                                    <button onClick={reset} className="px-6 py-3 rounded-full border border-white/10 text-slate-400 hover:bg-white/5 transition-colors text-sm font-bold">
                                        Start Over
                                    </button>
                                    <button className="btn-primary flex items-center gap-2">
                                        Request Consultation <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
