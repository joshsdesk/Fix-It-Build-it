import React from "react";
import { WizardState, WizardAction } from "../WizardReducer";
import { Button } from "@/components/ui/button";

interface Props {
    state: WizardState;
    dispatch: React.Dispatch<WizardAction>;
    onRequestConsultation: (prefill: { specs: string }) => void;
}

export function Step4Summary({ state, dispatch, onRequestConsultation }: Props) {
    const handleRequest = () => {
        const specs = `Sensory Goal: ${state.regulationGoal}\nHousing: ${state.housingParameter}\nProceeding: ${state.projectProceed}`;
        onRequestConsultation({ specs });
    };

    return (
        <div className="flex flex-col h-full justify-center space-y-6 animate-in fade-in slide-in-from-bottom-4 p-8 text-center">
            <h3 className="text-2xl font-bold text-white">Your Project Profile is Ready</h3>
            <div className="glass-card p-6 border-white/10 rounded-xl space-y-4 text-left inline-block w-full">
                <div>
                    <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Goal</span>
                    <span className="font-medium text-white">{state.regulationGoal}</span>
                </div>
                <div>
                    <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Housing</span>
                    <span className="font-medium text-white">{state.housingParameter}</span>
                </div>
                <div>
                    <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Service Level</span>
                    <span className="font-medium text-white">{state.projectProceed}</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button
                    variant="primary"
                    onClick={handleRequest}
                    className="w-full sm:w-auto"
                    componentNamespace="wizard" title="Request Consultation" elementIdentifier="request-consultation"
                >
                    Request Consultation
                </Button>
                <Button
                    variant="wizard-selectable"
                    onClick={() => dispatch({ type: "RESET" })}
                    className="w-full sm:w-auto text-slate-400 hover:text-white"
                    componentNamespace="wizard" title="Start Over" elementIdentifier="start-over"
                >
                    Start Over
                </Button>
            </div>
        </div>
    );
}
