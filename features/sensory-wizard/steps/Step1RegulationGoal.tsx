import React from "react";
import { WizardState, WizardAction } from "../WizardReducer";
import { Button } from "@/components/ui/button";

interface Props {
    state: WizardState;
    dispatch: React.Dispatch<WizardAction>;
}

export function Step1RegulationGoal({ state, dispatch }: Props) {
    const handleSelect = (goal: string) => {
        dispatch({ type: "SET_REGULATION_GOAL", payload: goal });
        dispatch({ type: "SET_STEP", payload: 2 });
    };

    return (
        <div className="flex flex-col h-full justify-center space-y-6 animate-in fade-in slide-in-from-bottom-4 p-8">
            <h3 className="text-2xl font-bold text-white text-center">What is the primary regulation goal?</h3>
            <div className="grid grid-cols-1 gap-4">
                <Button
                    variant="wizard-selectable"
                    className="h-auto p-4 flex flex-col items-start gap-2 justify-start border-white/10 hover:border-fibi-accent/50 hover:bg-white/5"
                    onClick={() => handleSelect("Big Body Play")}
                    componentNamespace="wizard" title="Select Big Body Play" elementIdentifier="goal-big-body-play"
                >
                    <span className="font-bold text-lg text-white">Big Body Play</span>
                    <span className="text-sm text-slate-400 font-normal text-left">High-intensity movement, swings, climbing rungs, and active heavy-work input.</span>
                </Button>
                <Button
                    variant="wizard-selectable"
                    className="h-auto p-4 flex flex-col items-start gap-2 justify-start border-white/10 hover:border-fibi-purple/50 hover:bg-white/5"
                    onClick={() => handleSelect("Battery Recharge")}
                    componentNamespace="wizard" title="Select Battery Recharge" elementIdentifier="goal-battery-recharge"
                >
                    <span className="font-bold text-lg text-white">Battery Recharge</span>
                    <span className="text-sm text-slate-400 font-normal text-left">Quiet retreats, acoustic dampening, tactile walls, and low-stimuli calming nooks.</span>
                </Button>
            </div>
        </div>
    );
}
