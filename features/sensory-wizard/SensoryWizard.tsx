"use client";

import React, { useReducer } from "react";
import Image from "next/image";
import { wizardReducer, initialWizardState } from "./WizardReducer";
import { Step1RegulationGoal } from "./steps/Step1RegulationGoal";
import { Step2HousingParameter } from "./steps/Step2HousingParameter";
import { Step3Proceed } from "./steps/Step3Proceed";
import { Step4Summary } from "./steps/Step4Summary";
import { Card } from "@/components/ui/card";

interface SensoryWizardProps {
    onRequestConsultation: (prefill: { specs: string }) => void;
}

export default function SensoryNeedsWizard({ onRequestConsultation }: SensoryWizardProps) {
    const [state, dispatch] = useReducer(wizardReducer, initialWizardState);

    return (
        <section id="estimator" className="relative h-full min-h-0 flex flex-col justify-start lg:justify-center py-20 sm:py-20 lg:py-12 pb-20 sm:pb-24 lg:pb-12 bg-background overflow-hidden font-sans scroll-mt-16 sm:scroll-mt-20 lg:scroll-mt-24">
            <div className="layout-container relative z-10 w-full flex flex-col gap-8 lg:gap-12">
                <div className="flex flex-col items-center text-center gap-2 relative mt-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-tight">
                        The Sensory <span className="font-normal text-gradient">Wizard</span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-lg font-light max-w-3xl leading-relaxed mx-auto">
                        Identify your space constraints, sensory goals, and project scope in 3 steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto w-full">
                    <div className="flex justify-center items-center w-full h-full py-4">
                        <Image 
                            src="/imgs/UI/FIBILOGO.png" 
                            alt="Fix-It Build-It Colorado LLC Logo"
                            width={1000} 
                            height={400} 
                            className="object-contain drop-shadow-2xl w-full max-w-md md:max-w-xl lg:max-w-[700px] h-auto"
                        />
                    </div>

                    <Card variant="wizard" className="w-full h-full min-h-[400px] flex flex-col justify-center relative overflow-hidden">
                        {state.step === 1 && <Step1RegulationGoal state={state} dispatch={dispatch} />}
                        {state.step === 2 && <Step2HousingParameter state={state} dispatch={dispatch} />}
                        {state.step === 3 && <Step3Proceed state={state} dispatch={dispatch} />}
                        {state.step === 4 && <Step4Summary state={state} dispatch={dispatch} onRequestConsultation={onRequestConsultation} />}
                    </Card>
                </div>
            </div>
        </section>
    );
}
