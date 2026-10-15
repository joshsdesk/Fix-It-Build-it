import React from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WizardAction, WizardState } from "../WizardReducer";
import { MEDICAID_CERTIFIED } from "@/lib/businessinfo";

export function Step5Funding({ state, dispatch }: { state: WizardState, dispatch: React.Dispatch<WizardAction> }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-2xl font-bold text-white text-center">Step 5: Funding Pathway</h3>
            <p className="text-slate-400 text-center text-sm">How will this project be funded?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                    variant={state.funding === 'Private Pay' ? "wizard-selected" : "wizard-selectable"}
                    onClick={() => dispatch({ type: 'SET_FUNDING', payload: 'Private Pay' })}
                    className="p-4 text-center"
                >
                    <div className="font-bold text-white">Private Pay</div>
                </Card>
                <Card 
                    variant={state.funding === 'Waiver/Medicaid' ? "wizard-selected" : "wizard-selectable"}
                    onClick={() => {
                        if (MEDICAID_CERTIFIED) {
                            dispatch({ type: 'SET_FUNDING', payload: 'Waiver/Medicaid' });
                        }
                    }}
                    className={`p-4 text-center ${!MEDICAID_CERTIFIED ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <div className="font-bold text-white">Waiver / Medicaid HAA</div>
                    {!MEDICAID_CERTIFIED && <div className="text-xs text-red-400 mt-2">Currently not accepting Medicaid</div>}
                </Card>
            </div>
            
            <div className="mt-8 text-center">
                <Button 
                    title="Generate Recommendation"
                    onClick={() => dispatch({ type: 'SET_STEP', payload: 6 })} 
                    disabled={state.funding === null} 
                    variant="primary-cta"
                    componentNamespace="wizard"
                    elementIdentifier="step5-next"
                >
                    Generate Recommendation <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
