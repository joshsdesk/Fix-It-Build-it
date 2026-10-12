import React from "react";
import { WizardState, WizardAction } from "../WizardReducer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Props {
    state: WizardState;
    dispatch: React.Dispatch<WizardAction>;
}

export function Step2HousingParameter({ state, dispatch }: Props) {
    const handleSelect = (param: string) => {
        dispatch({ type: "SET_HOUSING_PARAMETER", payload: param });
        dispatch({ type: "SET_STEP", payload: 3 });
    };

    return (
        <div className="flex flex-col h-full justify-center space-y-6 animate-in fade-in slide-in-from-bottom-4 p-8">
            <button onClick={() => dispatch({ type: "SET_STEP", payload: 1 })} className="text-slate-400 hover:text-white flex items-center gap-2 self-start text-sm transition-colors mb-2">
                <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h3 className="text-2xl font-bold text-white text-center">What are your structural and housing parameters?</h3>
            <div className="grid grid-cols-1 gap-4">
                <Button
                    variant="wizard-selectable"
                    className="h-auto p-4 flex flex-col items-start gap-2 justify-start border-white/10 hover:border-fibi-accent/50 hover:bg-white/5"
                    onClick={() => handleSelect("Renter / HOA Friendly")}
                    componentNamespace="wizard" title="Select Renter / HOA Friendly" elementIdentifier="housing-renter"
                >
                    <span className="font-bold text-lg text-white">Renter / HOA Friendly</span>
                    <span className="text-sm text-slate-400 font-normal text-left">Non-invasive floor-to-ceiling tension posts, modular surface cleats, and removable acoustic panels.</span>
                </Button>
                <Button
                    variant="wizard-selectable"
                    className="h-auto p-4 flex flex-col items-start gap-2 justify-start border-white/10 hover:border-fibi-purple/50 hover:bg-white/5"
                    onClick={() => handleSelect("Homeowner / Fixed Mount")}
                    componentNamespace="wizard" title="Select Homeowner / Fixed Mount" elementIdentifier="housing-homeowner"
                >
                    <span className="font-bold text-lg text-white">Homeowner / Fixed Mount</span>
                    <span className="text-sm text-slate-400 font-normal text-left">Structural ceiling joist swing rigging and permanent impact wainscoting.</span>
                </Button>
            </div>
        </div>
    );
}
