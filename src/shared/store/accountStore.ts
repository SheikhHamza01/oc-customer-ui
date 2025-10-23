import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { customerApi, Account, Fund, AccountSetupData, IdentityData, DocumentUpload, BankAccount, CryptoWallet } from '../api/services/customerApi';
import { StorageKey, getStoredData, storeData } from '../storage/storageManager';

interface AccountState {
  // Data
  accounts: Account[];
  currentAccount: Account | null;
  funds: Fund[];
  wizardData: {
    accountSetup?: AccountSetupData;
    identityData?: IdentityData;
    documents: DocumentUpload[];
    bankAccounts: BankAccount[];
    cryptoWallets: CryptoWallet[];
    faceVerification?: {
      selfieImage: string;
      verificationStatus: 'pending' | 'verified' | 'failed';
      confidence: number;
    };
    vcip?: {
      sessionId: string;
      status: 'scheduled' | 'in_progress' | 'completed' | 'failed';
      scheduledTime?: string;
    };
    applicationData?: {
      id: string;
      status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
      submittedAt?: string;
      signature?: string;
    };
  };
  
  // UI state
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadAccounts: () => Promise<void>;
  loadFunds: () => Promise<void>;
  createAccount: (data: AccountSetupData) => Promise<{ success: boolean; error?: string }>;
  updateAccount: (accountId: string, data: Partial<AccountSetupData>) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: (accountId: string) => Promise<{ success: boolean; error?: string }>;
  
  // Wizard actions
  setCurrentStep: (step: number) => void;
  updateWizardData: (data: Partial<AccountState['wizardData']>) => void;
  saveWizardProgress: () => Promise<void>;
  loadWizardProgress: () => Promise<void>;
  clearWizardData: () => void;
  
  // Step-specific actions
  updateAccountSetup: (data: AccountSetupData) => void;
  updateIdentityData: (data: IdentityData) => void;
  addDocument: (document: DocumentUpload) => void;
  removeDocument: (documentId: string) => void;
  addBankAccount: (account: BankAccount) => void;
  removeBankAccount: (accountId: string) => void;
  addCryptoWallet: (wallet: CryptoWallet) => void;
  removeCryptoWallet: (walletId: string) => void;
  updateFaceVerification: (data: AccountState['wizardData']['faceVerification']) => void;
  updateVCIP: (data: AccountState['wizardData']['vcip']) => void;
  updateApplicationData: (data: AccountState['wizardData']['applicationData']) => void;
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      // Initial state
      accounts: [],
      currentAccount: null,
      funds: [],
      wizardData: {
        documents: [],
        bankAccounts: [],
        cryptoWallets: [],
      },
      currentStep: 1,
      totalSteps: 7,
      isLoading: false,
      error: null,

      // Actions
      loadAccounts: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const accounts = await customerApi.getAccounts();
          set({ accounts, isLoading: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Failed to load accounts';
          set({ error: errorMessage, isLoading: false });
        }
      },

      loadFunds: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const funds = await customerApi.getFunds();
          set({ funds, isLoading: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Failed to load funds';
          set({ error: errorMessage, isLoading: false });
        }
      },

      createAccount: async (data: AccountSetupData) => {
        set({ isLoading: true, error: null });
        
        try {
          const account = await customerApi.createAccount(data);
          const { accounts } = get();
          set({ 
            accounts: [...accounts, account], 
            currentAccount: account,
            isLoading: false 
          });
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Failed to create account';
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      updateAccount: async (accountId: string, data: Partial<AccountSetupData>) => {
        set({ isLoading: true, error: null });
        
        try {
          const updatedAccount = await customerApi.updateAccount(accountId, data);
          const { accounts } = get();
          const updatedAccounts = accounts.map(acc => 
            acc.id === accountId ? updatedAccount : acc
          );
          set({ 
            accounts: updatedAccounts,
            currentAccount: updatedAccount,
            isLoading: false 
          });
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Failed to update account';
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      deleteAccount: async (accountId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          await customerApi.deleteAccount(accountId);
          const { accounts } = get();
          const filteredAccounts = accounts.filter(acc => acc.id !== accountId);
          set({ 
            accounts: filteredAccounts,
            currentAccount: null,
            isLoading: false 
          });
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Failed to delete account';
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Wizard actions
      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },

      updateWizardData: (data: Partial<AccountState['wizardData']>) => {
        const { wizardData } = get();
        const updatedData = { ...wizardData, ...data };
        set({ wizardData: updatedData });
      },

      saveWizardProgress: async () => {
        const { wizardData, currentStep } = get();
        await storeData(StorageKey.WIZARD_PROGRESS, { wizardData, currentStep });
      },

      loadWizardProgress: async () => {
        const progress = await getStoredData<{ wizardData: AccountState['wizardData']; currentStep: number }>(StorageKey.WIZARD_PROGRESS);
        if (progress) {
          set({ 
            wizardData: progress.wizardData, 
            currentStep: progress.currentStep 
          });
        }
      },

      clearWizardData: () => {
        set({ 
          wizardData: {
            documents: [],
            bankAccounts: [],
            cryptoWallets: [],
          },
          currentStep: 1 
        });
      },

      // Step-specific actions
      updateAccountSetup: (data: AccountSetupData) => {
        get().updateWizardData({ accountSetup: data });
      },

      updateIdentityData: (data: IdentityData) => {
        get().updateWizardData({ identityData: data });
      },

      addDocument: (document: DocumentUpload) => {
        const { wizardData } = get();
        const updatedDocuments = [...wizardData.documents, document];
        get().updateWizardData({ documents: updatedDocuments });
      },

      removeDocument: (documentId: string) => {
        const { wizardData } = get();
        const updatedDocuments = wizardData.documents.filter(doc => doc.id !== documentId);
        get().updateWizardData({ documents: updatedDocuments });
      },

      addBankAccount: (account: BankAccount) => {
        const { wizardData } = get();
        const updatedAccounts = [...wizardData.bankAccounts, account];
        get().updateWizardData({ bankAccounts: updatedAccounts });
      },

      removeBankAccount: (accountId: string) => {
        const { wizardData } = get();
        const updatedAccounts = wizardData.bankAccounts.filter(acc => acc.id !== accountId);
        get().updateWizardData({ bankAccounts: updatedAccounts });
      },

      addCryptoWallet: (wallet: CryptoWallet) => {
        const { wizardData } = get();
        const updatedWallets = [...wizardData.cryptoWallets, wallet];
        get().updateWizardData({ cryptoWallets: updatedWallets });
      },

      removeCryptoWallet: (walletId: string) => {
        const { wizardData } = get();
        const updatedWallets = wizardData.cryptoWallets.filter(wallet => wallet.id !== walletId);
        get().updateWizardData({ cryptoWallets: updatedWallets });
      },

      updateFaceVerification: (data: AccountState['wizardData']['faceVerification']) => {
        get().updateWizardData({ faceVerification: data });
      },

      updateVCIP: (data: AccountState['wizardData']['vcip']) => {
        get().updateWizardData({ vcip: data });
      },

      updateApplicationData: (data: AccountState['wizardData']['applicationData']) => {
        get().updateWizardData({ applicationData: data });
      },

      // Utility actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'account-storage',
      partialize: (state) => ({
        accounts: state.accounts,
        currentAccount: state.currentAccount,
        wizardData: state.wizardData,
        currentStep: state.currentStep,
      }),
    }
  )
);

// Selector hooks for better performance
export const useAccounts = () => useAccountStore((state) => state.accounts);
export const useCurrentAccount = () => useAccountStore((state) => state.currentAccount);
export const useFunds = () => useAccountStore((state) => state.funds);
export const useWizardData = () => useAccountStore((state) => state.wizardData);
export const useCurrentStep = () => useAccountStore((state) => state.currentStep);
export const useAccountLoading = () => useAccountStore((state) => state.isLoading);
export const useAccountError = () => useAccountStore((state) => state.error);

export const useAccountActions = () => useAccountStore((state) => ({
  loadAccounts: state.loadAccounts,
  loadFunds: state.loadFunds,
  createAccount: state.createAccount,
  updateAccount: state.updateAccount,
  deleteAccount: state.deleteAccount,
  setCurrentStep: state.setCurrentStep,
  updateWizardData: state.updateWizardData,
  saveWizardProgress: state.saveWizardProgress,
  loadWizardProgress: state.loadWizardProgress,
  clearWizardData: state.clearWizardData,
  updateAccountSetup: state.updateAccountSetup,
  updateIdentityData: state.updateIdentityData,
  addDocument: state.addDocument,
  removeDocument: state.removeDocument,
  addBankAccount: state.addBankAccount,
  removeBankAccount: state.removeBankAccount,
  addCryptoWallet: state.addCryptoWallet,
  removeCryptoWallet: state.removeCryptoWallet,
  updateFaceVerification: state.updateFaceVerification,
  updateVCIP: state.updateVCIP,
  updateApplicationData: state.updateApplicationData,
  setLoading: state.setLoading,
  setError: state.setError,
  clearError: state.clearError,
}));
