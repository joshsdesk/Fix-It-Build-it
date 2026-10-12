import React from "react";
import { WizardState, WizardAction } from "../WizardReducer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Props {
    state: WizardState;
    dispatch: React.Dispatch<WizardAction>;
}

export function Step3Proceed({ state, dispatch }: Props) {
    const handleSelect = (proceed: string) => {
        dispatch({ type: "SET_PROJECT_PROCEED", payload: proceed });
        dispatch({ type: "SET_STEP", payload: 4 });
    };

    return (
        <div className="flex flex-col h-full justify-center space-y-6 animate-in fade-in slide-in-from-bottom-4 p-8">
            <button onClick={() => dispatch({ type: "SET_STEP", payload: 2 })} className="text-slate-400 hover:text-white flex items-center gap-2 self-start text-sm transition-colors mb-2">
                <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h3 className="text-2xl font-bold text-white text-center">How would you like to proceed with your project?</h3>
            <div className="grid grid-cols-1 gap-4">
                <Button
                    variant="wizard-selectable"
                    className="h-auto p-4 flex flex-col items-start gap-2 justify-start border-white/10 hover:border-fibi-accent/50 hover:bg-white/5"
                    onClick={() => handleSelect("Full-Service Turnkey Build")}
                    componentNamespace="wizard" title="Select Full-Service Turnkey Build" elementIdentifier="proceed-turnkey"
                >
                    <span className="font-bold text-lg text-white">Full-Service Turnkey Build</span>
                    <span className="text-sm text-slate-400 font-normal text-left">On-site assessment, custom layout design, hardware procurement, and full precision installation.</span>
                </Button>
                <Button
                    variant="wizard-selectable"
                    className="h-auto p-4 flex flex-col items-start gap-2 justify-start border-white/10 hover:border-fibi-purple/50 hover:bg-white/5"
                    onClick={() => handleSelect("Spatial Blueprint & Spec Package")}
                    componentNamespace="wizard" title="Select Spatial Blueprint and Spec Package" elementIdentifier="proceed-blueprint"
                >
                    <span className="font-bold text-lg text-white">Spatial Blueprint & Spec Package</span>
                    <span className="text-sm text-slate-400 font-normal text-left">Virtual or on-site evaluation providing an itemized equipment bill of materials and DIY mounting guide.</span>
                </Button>
                <Button
                    variant="wizard-selectable"
                    className="h-auto p-4 flex flex-col items-start gap-2 justify-start border-white/10 hover:border-fibi-accent/50 hover:bg-white/5"
                    onClick={() => handleSelect("Equipment Assembly & Mounting Only")}
                    componentNamespace="wizard" title="Select Equipment Assembly and Mounting Only" elementIdentifier="proceed-assembly"
                >
                    <span className="font-bold text-lg text-white">Equipment Assembly & Mounting Only</span>
                    <span className="text-sm text-slate-400 font-normal text-left">Professional assembly and secure joist mounting of client-purchased swings, bars, or sensory equipment.</span>
                </Button>
            </div>
        </div>
    );
}
