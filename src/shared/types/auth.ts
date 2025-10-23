// Auth types - Reused from mobile app
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Entity {
  id: string;
  name: string;
  type: 'individual' | 'corporate' | 'joint';
  status: 'active' | 'inactive' | 'pending';
  isPrimary: boolean;
  permissions: string[];
  metadata?: Record<string, any>;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface OAuthProvider {
  name: string;
  displayName: string;
  icon: string;
  color: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  entities: Entity[];
  selectedEntity: Entity | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  oauthLogin: (provider: string, code: string, state?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  selectEntity: (entityId: string) => Promise<{ success: boolean; error?: string }>;
  updateUser: (user: User) => void;
  clearAuth: () => void;
}
