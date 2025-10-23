// useAccountSetup hook - Reused from mobile app with web adaptations
import { useCallback, useEffect } from 'react';
import { useAccountStore, useAccounts, useFunds, useWizardData, useCurrentStep } from '../store/accountStore';
import { useAccountActions } from '../store/accountStore';
import { Fund, AccountSetupData, Account } from '../api/services/customerApi';

export const useAccountSetup = () => {
  const accounts = useAccounts();
  const funds = useFunds();
  const wizardData = useWizardData();
  const currentStep = useCurrentStep();
  const actions = useAccountActions();

  // Load initial data
  useEffect(() => {
    actions.loadFunds();
    actions.loadAccounts();
  }, [actions]);

  // Create new account
  const createAccount = useCallback(async (data: AccountSetupData) => {
    const result = await actions.createAccount(data);
    if (result.success) {
      actions.updateAccountSetup(data);
    }
    return result;
  }, [actions]);

  // Update account setup data
  const updateAccountSetup = useCallback((data: AccountSetupData) => {
    actions.updateAccountSetup(data);
  }, [actions]);

  // Get fund by ID
  const getFundById = useCallback((fundId: string): Fund | undefined => {
    return funds.find((fund: Fund) => fund.id === fundId);
  }, [funds]);

  // Validate fund selection
  const validateFundSelection = useCallback((fundId: string, investmentAmount: number) => {
    const fund = getFundById(fundId);
    if (!fund) {
      return { isValid: false, error: 'Fund not found' };
    }

    if (investmentAmount < fund.minInvestment) {
      return { 
        isValid: false, 
        error: `Minimum investment amount is ${fund.currency} ${fund.minInvestment.toLocaleString()}` 
      };
    }

    if (investmentAmount > fund.maxInvestment) {
      return { 
        isValid: false, 
        error: `Maximum investment amount is ${fund.currency} ${fund.maxInvestment.toLocaleString()}` 
      };
    }

    return { isValid: true };
  }, [getFundById]);

  // Get account by ID
  const getAccountById = useCallback((accountId: string) => {
    return accounts.find((account: Account) => account.id === accountId);
  }, [accounts]);

  // Get accounts by status
  const getAccountsByStatus = useCallback((status: string) => {
    return accounts.filter((account: Account) => account.status === status);
  }, [accounts]);

  // Get draft accounts
  const getDraftAccounts = useCallback(() => {
    return getAccountsByStatus('draft');
  }, [getAccountsByStatus]);

  // Get active accounts
  const getActiveAccounts = useCallback(() => {
    return getAccountsByStatus('active');
  }, [getAccountsByStatus]);

  // Get pending accounts
  const getPendingAccounts = useCallback(() => {
    return getAccountsByStatus('pending');
  }, [getAccountsByStatus]);

  // Check if account setup is complete
  const isAccountSetupComplete = useCallback(() => {
    return !!wizardData.accountSetup?.fundId && 
           !!wizardData.accountSetup?.investmentAmount &&
           wizardData.accountSetup.investmentAmount > 0;
  }, [wizardData.accountSetup]);

  // Get next step
  const getNextStep = useCallback(() => {
    if (!isAccountSetupComplete()) return 1;
    if (!wizardData.identityData) return 2;
    if (wizardData.documents.length === 0) return 3;
    if (!wizardData.faceVerification) return 4;
    if (!wizardData.vcip) return 5;
    if (wizardData.bankAccounts.length === 0 && wizardData.cryptoWallets.length === 0) return 6;
    if (!wizardData.applicationData) return 7;
    return 8; // Complete
  }, [wizardData, isAccountSetupComplete]);

  // Check if can proceed to next step
  const canProceedToNextStep = useCallback((step: number) => {
    switch (step) {
      case 1:
        return isAccountSetupComplete();
      case 2:
        return !!wizardData.identityData;
      case 3:
        return wizardData.documents.length > 0;
      case 4:
        return wizardData.faceVerification?.verificationStatus === 'verified';
      case 5:
        return wizardData.vcip?.status === 'completed';
      case 6:
        return wizardData.bankAccounts.length > 0 || wizardData.cryptoWallets.length > 0;
      case 7:
        return wizardData.applicationData?.status === 'submitted' || wizardData.applicationData?.status === 'approved';
      default:
        return false;
    }
  }, [wizardData, isAccountSetupComplete]);

  // Get progress percentage
  const getProgressPercentage = useCallback(() => {
    const completedSteps = [
      isAccountSetupComplete(),
      !!wizardData.identityData,
      wizardData.documents.length > 0,
      wizardData.faceVerification?.verificationStatus === 'verified',
      wizardData.vcip?.status === 'completed',
      wizardData.bankAccounts.length > 0 || wizardData.cryptoWallets.length > 0,
      wizardData.applicationData?.status === 'submitted' || wizardData.applicationData?.status === 'approved',
    ].filter(Boolean).length;

    return Math.round((completedSteps / 7) * 100);
  }, [wizardData, isAccountSetupComplete]);

  // Save progress
  const saveProgress = useCallback(async () => {
    await actions.saveWizardProgress();
  }, [actions]);

  // Load progress
  const loadProgress = useCallback(async () => {
    await actions.loadWizardProgress();
  }, [actions]);

  // Clear progress
  const clearProgress = useCallback(() => {
    actions.clearWizardData();
  }, [actions]);

  return {
    // Data
    accounts,
    funds,
    wizardData,
    currentStep,
    
    // Actions
    createAccount,
    updateAccountSetup,
    getFundById,
    validateFundSelection,
    getAccountById,
    getAccountsByStatus,
    getDraftAccounts,
    getActiveAccounts,
    getPendingAccounts,
    
    // Progress
    isAccountSetupComplete,
    getNextStep,
    canProceedToNextStep,
    getProgressPercentage,
    saveProgress,
    loadProgress,
    clearProgress,
    
    // Store actions
    setCurrentStep: actions.setCurrentStep,
    updateWizardData: actions.updateWizardData,
  };
};
