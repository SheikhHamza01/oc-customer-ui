import { api } from '../client/apiClient';

// Customer API types (reused from mobile app)
export interface Fund {
  id: string;
  name: string;
  code: string;
  logo?: string;
  description?: string;
  minInvestment: number;
  maxInvestment: number;
  currency: string;
  status: 'active' | 'inactive' | 'closed';
  riskLevel: 'low' | 'medium' | 'high';
  category: string;
}

export interface Account {
  id: string;
  type: 'individual' | 'corporate' | 'joint';
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'active';
  progress: number;
  fundId: string;
  fundName: string;
  fundLogo?: string;
  investmentAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  completedSteps: string[];
  currentStep: string;
}

export interface AccountSetupData {
  fundId: string;
  fundName: string;
  investmentAmount: number;
  currency: string;
  accountType: 'individual' | 'corporate' | 'joint';
}

export interface IdentityData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  phoneNumber: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface DocumentUpload {
  id: string;
  type: 'passport' | 'drivers_license' | 'national_id' | 'utility_bill' | 'bank_statement';
  fileName: string;
  fileSize: number;
  mimeType: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
  verificationNotes?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
  currency: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface CryptoWallet {
  id: string;
  walletType: 'bitcoin' | 'ethereum' | 'other';
  address: string;
  network: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

// Customer API services (adapted from mobile app)
export const customerApi = {
  // Fund management
  getFunds: async (): Promise<Fund[]> => {
    return api.get('/customer/funds');
  },

  getFundById: async (fundId: string): Promise<Fund> => {
    return api.get(`/customer/funds/${fundId}`);
  },

  // Account management
  getAccounts: async (): Promise<Account[]> => {
    return api.get('/customer/accounts');
  },

  getAccountById: async (accountId: string): Promise<Account> => {
    return api.get(`/customer/accounts/${accountId}`);
  },

  createAccount: async (data: AccountSetupData): Promise<Account> => {
    return api.post('/customer/accounts', data);
  },

  updateAccount: async (accountId: string, data: Partial<AccountSetupData>): Promise<Account> => {
    return api.put(`/customer/accounts/${accountId}`, data);
  },

  deleteAccount: async (accountId: string): Promise<{ success: boolean }> => {
    return api.delete(`/customer/accounts/${accountId}`);
  },

  // Account wizard steps
  updateAccountStep: async (accountId: string, step: string, data: any): Promise<{ success: boolean }> => {
    return api.post(`/customer/accounts/${accountId}/steps/${step}`, data);
  },

  // Identity management
  updateIdentity: async (accountId: string, data: IdentityData): Promise<{ success: boolean }> => {
    return api.post(`/customer/accounts/${accountId}/identity`, data);
  },

  // Document management
  uploadDocument: async (accountId: string, file: File, type: string): Promise<DocumentUpload> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    return api.post(`/customer/accounts/${accountId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  getDocuments: async (accountId: string): Promise<DocumentUpload[]> => {
    return api.get(`/customer/accounts/${accountId}/documents`);
  },

  deleteDocument: async (accountId: string, documentId: string): Promise<{ success: boolean }> => {
    return api.delete(`/customer/accounts/${accountId}/documents/${documentId}`);
  },

  // Bank account management
  addBankAccount: async (accountId: string, data: Omit<BankAccount, 'id'>): Promise<BankAccount> => {
    return api.post(`/customer/accounts/${accountId}/bank-accounts`, data);
  },

  getBankAccounts: async (accountId: string): Promise<BankAccount[]> => {
    return api.get(`/customer/accounts/${accountId}/bank-accounts`);
  },

  removeBankAccount: async (accountId: string, bankAccountId: string): Promise<{ success: boolean }> => {
    return api.delete(`/customer/accounts/${accountId}/bank-accounts/${bankAccountId}`);
  },

  // Crypto wallet management
  addCryptoWallet: async (accountId: string, data: Omit<CryptoWallet, 'id'>): Promise<CryptoWallet> => {
    return api.post(`/customer/accounts/${accountId}/crypto-wallets`, data);
  },

  getCryptoWallets: async (accountId: string): Promise<CryptoWallet[]> => {
    return api.get(`/customer/accounts/${accountId}/crypto-wallets`);
  },

  removeCryptoWallet: async (accountId: string, walletId: string): Promise<{ success: boolean }> => {
    return api.delete(`/customer/accounts/${accountId}/crypto-wallets/${walletId}`);
  },

  // Application management
  submitApplication: async (accountId: string): Promise<{ success: boolean; applicationId: string }> => {
    return api.post(`/customer/accounts/${accountId}/submit`);
  },

  getApplicationStatus: async (accountId: string): Promise<{ status: string; progress: number }> => {
    return api.get(`/customer/accounts/${accountId}/status`);
  },

  // Face verification
  submitFaceVerification: async (accountId: string, imageData: string): Promise<{ success: boolean; confidence: number }> => {
    return api.post(`/customer/accounts/${accountId}/face-verification`, { imageData });
  },

  // VCIP (Video Call Identity Process)
  scheduleVCIP: async (accountId: string, preferredTime?: string): Promise<{ sessionId: string; scheduledTime: string }> => {
    return api.post(`/customer/accounts/${accountId}/vcip/schedule`, { preferredTime });
  },

  getVCIPStatus: async (accountId: string): Promise<{ status: string; sessionId?: string; scheduledTime?: string }> => {
    return api.get(`/customer/accounts/${accountId}/vcip/status`);
  },
};
