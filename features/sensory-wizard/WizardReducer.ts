export type WizardState = {
    step: number;
    regulationGoal: string | null;
    housingParameter: string | null;
    projectProceed: string | null;
};

export type WizardAction =
    | { type: "SET_STEP"; payload: number }
    | { type: "SET_REGULATION_GOAL"; payload: string }
    | { type: "SET_HOUSING_PARAMETER"; payload: string }
    | { type: "SET_PROJECT_PROCEED"; payload: string }
    | { type: "RESET" };

export const initialWizardState: WizardState = {
    step: 1,
    regulationGoal: null,
    housingParameter: null,
    projectProceed: null
};

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
    switch (action.type) {
        case "SET_STEP":
            return { ...state, step: action.payload };
        case "SET_REGULATION_GOAL":
            return { ...state, regulationGoal: action.payload };
        case "SET_HOUSING_PARAMETER":
            return { ...state, housingParameter: action.payload };
        case "SET_PROJECT_PROCEED":
            return { ...state, projectProceed: action.payload };
        case "RESET":
            return initialWizardState;
        default:
            return state;
    }
}
