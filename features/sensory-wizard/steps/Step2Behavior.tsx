import React from "react";
import { Shield, RefreshCw, Volume2, Moon, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WizardAction, WizardState } from "../WizardReducer";

export function Step2Behavior({ state, dispatch }: { state: WizardState, dispatch: React.Dispatch<WizardAction> }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-2xl font-bold text-white text-center">Step 2: Sensory Profile & Behavior</h3>
            <p className="text-slate-400 text-center text-sm">
                Antecedents & Triggers seeding MyKiddo. {state.energy === 'Big Body' ? "How do they interact with the environment?" : "How do they process sound and light?"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {state.energy === 'Big Body' ? (
                    <>
                        <Card 
                            variant={state.sensoryNeeds.includes('Proprio') ? "wizard-selected" : "wizard-selectable"}
                            onClick={() => dispatch({ type: 'TOGGLE_SENSORY_NEED', payload: 'Proprio' })}
                            className="p-6"
                        >
                            <Shield className="w-8 h-8 text-fibi-purple mb-4" />
                            <div className="font-bold text-white text-lg mb-2">Deep Pressure (Proprioceptive)</div>
                            <div className="text-sm text-slate-400">Loves tight squeezes, heavy lifting, and big hugs.</div>
                        </Card>
                        <Card 
                            variant={state.sensoryNeeds.includes('Vestibular') ? "wizard-selected" : "wizard-selectable"}
                            onClick={() => dispatch({ type: 'TOGGLE_SENSORY_NEED', payload: 'Vestibular' })}
                            className="p-6"
                        >
                            <RefreshCw className="w-8 h-8 text-fibi-purple mb-4" />
                            <div className="font-bold text-white text-lg mb-2">Constant Motion (Vestibular)</div>
                            <div className="text-sm text-slate-400">Loves to spin, swing, rock, and move constantly.</div>
                        </Card>
                    </>
                ) : (
                    <>
                        <Card 
                            variant={state.sensoryNeeds.includes('Auditory') ? "wizard-selected" : "wizard-selectable"}
                            onClick={() => dispatch({ type: 'TOGGLE_SENSORY_NEED', payload: 'Auditory' })}
                            className="p-6"
                        >
                            <Volume2 className="w-8 h-8 text-fibi-purple mb-4" />
                            <div className="font-bold text-white text-lg mb-2">Sound Seeker</div>
                            <div className="text-sm text-slate-400">Loves noise, music, and auditory feedback.</div>
                        </Card>
                        <Card 
                            variant={state.sensoryNeeds.includes('Sensitive') ? "wizard-selected" : "wizard-selectable"}
                            onClick={() => dispatch({ type: 'TOGGLE_SENSORY_NEED', payload: 'Sensitive' })}
                            className="p-6"
                        >
                            <Moon className="w-8 h-8 text-fibi-purple mb-4" />
                            <div className="font-bold text-white text-lg mb-2">Visual / Sound Sensitive</div>
                            <div className="text-sm text-slate-400">Needs quiet, dim lights, and reduced input.</div>
                        </Card>
                    </>
                )}
            </div>
            <div className="mt-8 text-center">
                <Button 
                    title="Next Step"
                    onClick={() => dispatch({ type: 'SET_STEP', payload: 3 })} 
                    disabled={state.sensoryNeeds.length === 0} 
                    variant="primary-cta"
                    componentNamespace="wizard"
                    elementIdentifier="step2-next"
                >
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
