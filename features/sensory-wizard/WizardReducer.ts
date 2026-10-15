export type WizardState = {
    step: number;
    energy: string | null;
    sensoryNeeds: string[];
    behaviorFrictions: string[];
    environment: string | null;
    buildGoals: string[];
    funding: string | null;
    attempts: number;
    hasUnlocked: boolean;
};

export type WizardAction =
    | { type: "SET_STEP"; payload: number }
    | { type: "SET_ENERGY"; payload: string }
    | { type: "TOGGLE_SENSORY_NEED"; payload: string }
    | { type: "TOGGLE_BEHAVIOR_FRICTION"; payload: string }
    | { type: "SET_ENVIRONMENT"; payload: string }
    | { type: "TOGGLE_BUILD_GOAL"; payload: string }
    | { type: "SET_FUNDING"; payload: string }
    | { type: "INCREMENT_ATTEMPTS" }
    | { type: "SET_UNLOCKED"; payload: boolean }
    | { type: "RESET" };

export const initialWizardState: WizardState = {
    step: 1,
    energy: null,
    sensoryNeeds: [],
    behaviorFrictions: [],
    environment: null,
    buildGoals: [],
    funding: null,
    attempts: 0,
    hasUnlocked: false,
};

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
    switch (action.type) {
        case "SET_STEP":
            return { ...state, step: action.payload };
        case "SET_ENERGY":
            return { ...state, energy: action.payload };
        case "TOGGLE_SENSORY_NEED":
            return {
                ...state,
                sensoryNeeds: state.sensoryNeeds.includes(action.payload)
                    ? state.sensoryNeeds.filter((i) => i !== action.payload)
                    : [...state.sensoryNeeds, action.payload],
            };
        case "TOGGLE_BEHAVIOR_FRICTION":
            return {
                ...state,
                behaviorFrictions: state.behaviorFrictions.includes(action.payload)
                    ? state.behaviorFrictions.filter((i) => i !== action.payload)
                    : [...state.behaviorFrictions, action.payload],
            };
        case "SET_ENVIRONMENT":
            return { ...state, environment: action.payload };
        case "TOGGLE_BUILD_GOAL":
            return {
                ...state,
                buildGoals: state.buildGoals.includes(action.payload)
                    ? state.buildGoals.filter((i) => i !== action.payload)
                    : [...state.buildGoals, action.payload],
            };
        case "SET_FUNDING":
            return { ...state, funding: action.payload };
        case "INCREMENT_ATTEMPTS":
            return { ...state, attempts: state.attempts + 1 };
        case "SET_UNLOCKED":
            return { ...state, hasUnlocked: action.payload };
        case "RESET":
            return { ...initialWizardState, attempts: state.attempts + 1, hasUnlocked: state.hasUnlocked };
        default:
            return state;
    }
}
