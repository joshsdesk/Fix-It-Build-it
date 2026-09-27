import React from "react";
import { Activity, Battery } from "lucide-react";
import { Card } from "@/components/ui/card";
import { WizardAction, WizardState } from "../WizardReducer";

export function Step1Energy({ state, dispatch }: { state: WizardState, dispatch: React.Dispatch<WizardAction> }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-2xl font-bold text-white text-center">Step 1: The Energy Check</h3>
            <p className="text-slate-400 text-center text-sm">Winnie Dunn Quadrants & 6 Modalities. What is the primary goal?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card 
                    variant={state.energy === 'Big Body' ? "wizard-selected" : "wizard-selectable"}
                    onClick={() => { dispatch({ type: 'SET_ENERGY', payload: 'Big Body' }); dispatch({ type: 'SET_STEP', payload: 2 }); }}
                    className="p-6"
                >
                    <Activity className="w-8 h-8 text-fibi-purple mb-4" />
                    <div className="font-bold text-white text-lg mb-2">High Energy</div>
                    <div className="text-sm text-slate-400">&quot;Big Body&quot; Play. Jumping, crashing, climbing.</div>
                </Card>
                <Card 
                    variant={state.energy === 'Recharge' ? "wizard-selected" : "wizard-selectable"}
                    onClick={() => { dispatch({ type: 'SET_ENERGY', payload: 'Recharge' }); dispatch({ type: 'SET_STEP', payload: 2 }); }}
                    className="p-6"
                >
                    <Battery className="w-8 h-8 text-fibi-purple mb-4" />
                    <div className="font-bold text-white text-lg mb-2">Battery Recharge</div>
                    <div className="text-sm text-slate-400">Quiet Retreat. Calming, low-stimuli zones.</div>
                </Card>
            </div>
        </div>
    );
}
