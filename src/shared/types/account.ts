// Account types - Reused from mobile app
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
  performance?: {
    ytd: number;
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  fees?: {
    managementFee: number;
    performanceFee: number;
    otherFees: number;
  };
}

export interface Account {
  id: string;
  type: 'individual' | 'corporate' | 'joint';
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'active' | 'suspended';
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
  metadata?: Record<string, any>;
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
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
    email: string;
  };
}

export interface DocumentUpload {
  id: string;
  type: 'passport' | 'drivers_license' | 'national_id' | 'utility_bill' | 'bank_statement' | 'other';
  fileName: string;
  fileSize: number;
  mimeType: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
  verificationNotes?: string;
  url?: string;
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
  verificationNotes?: string;
}

export interface CryptoWallet {
  id: string;
  walletType: 'bitcoin' | 'ethereum' | 'other';
  address: string;
  network: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationNotes?: string;
}

export interface FaceVerificationData {
  selfieImage: string;
  verificationStatus: 'pending' | 'verified' | 'failed';
  confidence: number;
  verifiedAt?: string;
  notes?: string;
}

export interface VCIPData {
  sessionId: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'failed';
  scheduledTime?: string;
  completedAt?: string;
  agentId?: string;
  recordingUrl?: string;
  notes?: string;
}

export interface ApplicationData {
  id: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  signature?: string;
  documents: DocumentUpload[];
  notes?: string;
}

export interface WizardData {
  accountSetup?: AccountSetupData;
  identityData?: IdentityData;
  documents: DocumentUpload[];
  faceVerification?: FaceVerificationData;
  vcip?: VCIPData;
  bankAccounts: BankAccount[];
  cryptoWallets: CryptoWallet[];
  applicationData?: ApplicationData;
}

export interface WizardStep {
  id: string;
  number: number;
  label: string;
  heading: string;
  description: string | string[];
  active: boolean;
  completed: boolean;
  required: boolean;
}

export interface AccountStats {
  totalAccounts: number;
  activeAccounts: number;
  pendingAccounts: number;
  draftAccounts: number;
  totalInvestment: number;
  currency: string;
}
