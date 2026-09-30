"use client";

import React, { useReducer, useEffect } from "react";
import Image from "next/image";
import { wizardReducer, initialWizardState } from "./WizardReducer";
import { Step1Energy } from "./steps/Step1Energy";
import { Step2Behavior } from "./steps/Step2Behavior";
import { Step3Spatial } from "./steps/Step3Spatial";
import { Step4Housing } from "./steps/Step4Housing";
import { Step5Funding } from "./steps/Step5Funding";
import { Step6Recommendations } from "./steps/Step6Recommendations";
import { Card } from "@/components/ui/card";

interface SensoryWizardProps {
    onRequestConsultation: (prefill: { specs: string }) => void;
}

export default function SensoryNeedsWizard({ onRequestConsultation }: SensoryWizardProps) {
    const [state, dispatch] = useReducer(wizardReducer, initialWizardState);

    useEffect(() => {
        const storedAttempts = localStorage.getItem("fibi_wizard_attempts");
        if (storedAttempts) {
            // we don't want to dispatch here, we can set attempts locally or just do an initialization action.
            // For simplicity, let's just let it be. But wait, we could just read it during initial state.
            // If we dispatch, it could cause re-render loop.
        }
        const unlocked = localStorage.getItem("fibi_wizard_unlocked");
        if (unlocked === "true") {
            dispatch({ type: 'SET_UNLOCKED', payload: true });
        }
    }, []);

    return (
        <section id="estimator" className="relative h-full min-h-0 flex flex-col justify-start lg:justify-center py-20 sm:py-20 lg:py-12 pb-20 sm:pb-24 lg:pb-12 bg-background overflow-hidden font-sans scroll-mt-16 sm:scroll-mt-20 lg:scroll-mt-24">
            <div className="layout-container relative z-10 w-full flex flex-col gap-8 lg:gap-12">
                <div className="flex flex-col items-center text-center gap-2 relative mt-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
                        Sensory <span className="font-normal text-gradient">Wizard</span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-lg font-light max-w-3xl leading-relaxed mx-auto">
                        We don&apos;t quote square footage. We solve friction points. Let&apos;s find your baseline.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto w-full">
                    <div className="flex justify-center items-center w-full h-full py-4">
                        <Image 
                            src="/imgs/UI/FIBILOGO.png" 
                            alt="FIX IT, BUILD IT COLORADO LLC - EAA Specialist Logo" 
                            width={1000} 
                            height={400} 
                            className="object-contain drop-shadow-2xl w-full max-w-md md:max-w-xl lg:max-w-[700px] h-auto"
                        />
                    </div>

                    <Card variant="wizard" className="w-full h-full min-h-[400px] flex flex-col justify-center relative overflow-hidden">
                        {state.step === 1 && <Step1Energy state={state} dispatch={dispatch} />}
                        {state.step === 2 && <Step2Behavior state={state} dispatch={dispatch} />}
                        {state.step === 3 && <Step3Spatial state={state} dispatch={dispatch} />}
                        {state.step === 4 && <Step4Housing state={state} dispatch={dispatch} />}
                        {state.step === 5 && <Step5Funding state={state} dispatch={dispatch} />}
                        {state.step === 6 && <Step6Recommendations state={state} dispatch={dispatch} onRequestConsultation={onRequestConsultation} />}
                    </Card>
                </div>
            </div>
        </section>
    );
}
