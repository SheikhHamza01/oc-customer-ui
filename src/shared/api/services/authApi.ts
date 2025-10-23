import { api } from '../client/apiClient';

// Auth API types (reused from mobile app)
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}

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
}

export interface AuthStatus {
  isAuthenticated: boolean;
  user: User | null;
  entities: Entity[];
  selectedEntity: Entity | null;
  token: string | null;
  refreshToken: string | null;
}

// Auth API services (adapted from mobile app)
export const authApi = {
  // Login with email/password
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return api.post('/auth/login', credentials);
  },

  // OAuth login (SingPass, Google, etc.)
  oauthLogin: async (provider: string, code: string, state?: string): Promise<LoginResponse> => {
    return api.post('/auth/oauth', { provider, code, state });
  },

  // Refresh access token
  refreshToken: async (refreshToken: string): Promise<{ access_token: string; expires_in: number }> => {
    return api.post('/auth/refresh', { refresh_token: refreshToken });
  },

  // Get user details
  getUserDetails: async (): Promise<User> => {
    return api.get('/auth/user');
  },

  // Get user entities
  getUserEntities: async (): Promise<Entity[]> => {
    return api.get('/auth/entities');
  },

  // Select entity
  selectEntity: async (entityId: string): Promise<{ success: boolean }> => {
    return api.post('/auth/select-entity', { entityId });
  },

  // Logout
  logout: async (): Promise<{ success: boolean }> => {
    return api.post('/auth/logout');
  },

  // Verify email
  verifyEmail: async (token: string): Promise<{ success: boolean }> => {
    return api.post('/auth/verify-email', { token });
  },

  // Resend verification email
  resendVerification: async (): Promise<{ success: boolean }> => {
    return api.post('/auth/resend-verification');
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<{ success: boolean }> => {
    return api.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<{ success: boolean }> => {
    return api.post('/auth/reset-password', { token, newPassword });
  },
};
