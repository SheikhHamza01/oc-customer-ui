import { create } from 'zustand';

export interface WizardStep {
  id: number;
  name: string;
  completed: boolean;
  data?: Record<string, any>;
}

export interface WizardState {
  currentStep: number;
  steps: WizardStep[];
  wizardData: Record<string, any>;
  isCompleted: boolean;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateWizardData: (data: Record<string, any>) => void;
  completeStep: (stepId: number) => void;
  resetWizard: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const initialSteps: WizardStep[] = [
  { id: 1, name: 'Account Setup', completed: false },
  { id: 2, name: 'Identity Setup', completed: false },
  { id: 3, name: 'Document Verification', completed: false },
  { id: 4, name: 'Face Verification', completed: false },
  { id: 5, name: 'VCIP', completed: false },
  { id: 6, name: 'Bank & Wallet', completed: false },
  { id: 7, name: 'Application', completed: false },
  { id: 8, name: 'Summary', completed: false },
];

export const useWizardStore = create<WizardState>((set, get) => ({
  currentStep: 1,
  steps: initialSteps,
  wizardData: {},
  isCompleted: false,
  
  setCurrentStep: (step: number) => {
    const { steps } = get();
    if (step >= 1 && step <= steps.length) {
      set({ currentStep: step });
    }
  },
  
  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length) {
      set({ currentStep: currentStep + 1 });
    }
  },
  
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },
  
  updateWizardData: (data: Record<string, any>) => {
    set((state) => ({
      wizardData: { ...state.wizardData, ...data }
    }));
  },
  
  completeStep: (stepId: number) => {
    set((state) => ({
      steps: state.steps.map(step =>
        step.id === stepId ? { ...step, completed: true } : step
      )
    }));
  },
  
  resetWizard: () => {
    set({
      currentStep: 1,
      steps: initialSteps,
      wizardData: {},
      isCompleted: false,
    });
  },
  
  get isFirstStep() {
    return get().currentStep === 1;
  },
  
  get isLastStep() {
    const { currentStep, steps } = get();
    return currentStep === steps.length;
  },
}));
