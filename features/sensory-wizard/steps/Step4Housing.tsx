import React from "react";
import { Card } from "@/components/ui/card";
import { WizardAction, WizardState } from "../WizardReducer";

export function Step4Housing({ state, dispatch }: { state: WizardState, dispatch: React.Dispatch<WizardAction> }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-2xl font-bold text-white text-center">Step 4: Housing Constraints</h3>
            <p className="text-slate-400 text-center text-sm">What type of residence is this?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                    variant={state.environment === 'Renter' ? "wizard-selected" : "wizard-selectable"}
                    onClick={() => { dispatch({ type: 'SET_ENVIRONMENT', payload: 'Renter' }); dispatch({ type: 'SET_STEP', payload: 5 }); }}
                    className="p-4"
                >
                    <div className="font-bold text-white text-lg mb-2">Renter</div>
                    <div className="text-xs text-slate-400">Requires landlord approval. Zero-penetration solutions.</div>
                </Card>
                <Card 
                    variant={state.environment === 'Homeowner (No HOA)' ? "wizard-selected" : "wizard-selectable"}
                    onClick={() => { dispatch({ type: 'SET_ENVIRONMENT', payload: 'Homeowner (No HOA)' }); dispatch({ type: 'SET_STEP', payload: 5 }); }}
                    className="p-4"
                >
                    <div className="font-bold text-white text-lg mb-2">Homeowner (No HOA)</div>
                    <div className="text-xs text-slate-400">Full structural freedom for custom anchored builds.</div>
                </Card>
                <Card 
                    variant={state.environment === 'Homeowner (HOA)' ? "wizard-selected" : "wizard-selectable"}
                    onClick={() => { dispatch({ type: 'SET_ENVIRONMENT', payload: 'Homeowner (HOA)' }); dispatch({ type: 'SET_STEP', payload: 5 }); }}
                    className="p-4"
                >
                    <div className="font-bold text-white text-lg mb-2">Homeowner (HOA)</div>
                    <div className="text-xs text-slate-400">Custom builds, may require architectural review.</div>
                </Card>
            </div>
        </div>
    );
}
