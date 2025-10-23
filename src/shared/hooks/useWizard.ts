import { useWizardStore } from '../store/wizardStore';
import { useCallback } from 'react';

export const useWizard = () => {
  const {
    currentStep,
    steps,
    wizardData,
    isCompleted,
    setCurrentStep,
    nextStep,
    prevStep,
    updateWizardData,
    completeStep,
    resetWizard,
    isFirstStep,
    isLastStep,
  } = useWizardStore();

  const handleNext = useCallback(() => {
    completeStep(currentStep);
    nextStep();
  }, [currentStep, completeStep, nextStep]);

  const handleBack = useCallback(() => {
    prevStep();
  }, [prevStep]);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, [setCurrentStep]);

  const updateStepData = useCallback((data: Record<string, any>) => {
    updateWizardData(data);
  }, [updateWizardData]);

  const getCurrentStepData = useCallback(() => {
    return steps.find(step => step.id === currentStep);
  }, [steps, currentStep]);

  const getStepProgress = useCallback(() => {
    const completedSteps = steps.filter(step => step.completed).length;
    return (completedSteps / steps.length) * 100;
  }, [steps]);

  return {
    // State
    currentStep,
    steps,
    wizardData,
    isCompleted,
    isFirstStep,
    isLastStep,
    
    // Actions
    handleNext,
    handleBack,
    goToStep,
    updateStepData,
    completeStep,
    resetWizard,
    
    // Computed
    getCurrentStepData,
    getStepProgress,
  };
};
