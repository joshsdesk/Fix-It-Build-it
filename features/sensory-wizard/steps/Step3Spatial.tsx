import React from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WizardAction, WizardState } from "../WizardReducer";

export function Step3Spatial({ state, dispatch }: { state: WizardState, dispatch: React.Dispatch<WizardAction> }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-2xl font-bold text-white text-center">Step 3: Spatial (ASPECTSS Room Friction)</h3>
            <p className="text-slate-400 text-center text-sm">What is the primary challenge in the home?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Meltdown Recovery', 'Sleep Disruption', 'Property Damage', 'Elopement Risk'].map((f) => (
                    <Card 
                        key={f}
                        variant={state.behaviorFrictions.includes(f) ? "wizard-selected" : "wizard-selectable"}
                        onClick={() => dispatch({ type: 'TOGGLE_BEHAVIOR_FRICTION', payload: f })}
                        className="p-4 text-center"
                    >
                        <div className="font-bold text-white">{f}</div>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center">
                <Button 
                    title="Next Step"
                    onClick={() => dispatch({ type: 'SET_STEP', payload: 4 })} 
                    disabled={state.behaviorFrictions.length === 0} 
                    variant="primary-cta"
                    componentNamespace="wizard"
                    elementIdentifier="step3-next"
                >
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
