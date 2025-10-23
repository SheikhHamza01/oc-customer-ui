// useAuth hook - Reused from mobile app with web adaptations
import { useEffect, useCallback } from 'react';
import { useAuthStore, useAuth, useAuthActions } from '../store/authStore';
import { StorageKey, getStoredData } from '../storage/storageManager';

export const useAuth = () => {
  const authState = useAuth();
  const authActions = useAuthActions();
  const { refreshAuth, clearAuth } = useAuthStore();

  // Auto-refresh token on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getStoredData<string>(StorageKey.AUTH_TOKEN);
        const refreshToken = await getStoredData<string>(StorageKey.REFRESH_TOKEN);
        
        if (token && refreshToken) {
          // Verify token is still valid
          await refreshAuth();
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        clearAuth();
      }
    };

    initializeAuth();
  }, [refreshAuth, clearAuth]);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (!authState.isAuthenticated) return;

    const refreshInterval = setInterval(() => {
      refreshAuth();
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(refreshInterval);
  }, [authState.isAuthenticated, refreshAuth]);

  // Login with email/password
  const login = useCallback(async (email: string, password: string, rememberMe = false) => {
    return authActions.login({ email, password, rememberMe });
  }, [authActions]);

  // OAuth login
  const oauthLogin = useCallback(async (provider: string, code: string, state?: string) => {
    return authActions.oauthLogin(provider, code, state);
  }, [authActions]);

  // Logout
  const logout = useCallback(async () => {
    await authActions.logout();
    // Redirect to login page
    window.location.href = '/login';
  }, [authActions]);

  // Select entity
  const selectEntity = useCallback(async (entityId: string) => {
    return authActions.selectEntity(entityId);
  }, [authActions]);

  // Update user profile
  const updateUser = useCallback((user: any) => {
    authActions.updateUser(user);
  }, [authActions]);

  return {
    ...authState,
    login,
    oauthLogin,
    logout,
    selectEntity,
    updateUser,
  };
};

// OAuth redirect handler
export const useOAuthRedirect = () => {
  const { oauthLogin } = useAuth();

  const handleOAuthCallback = useCallback(async (provider: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (error) {
      throw new Error(`OAuth error: ${error}`);
    }

    if (!code) {
      throw new Error('No authorization code received');
    }

    return oauthLogin(provider, code, state || undefined);
  }, [oauthLogin]);

  return { handleOAuthCallback };
};

// Entity selection hook
export const useEntitySelection = () => {
  const { entities, selectedEntity, selectEntity, isLoading } = useAuth();

  const switchEntity = useCallback(async (entityId: string) => {
    if (selectedEntity?.id === entityId) return { success: true };
    
    return selectEntity(entityId);
  }, [selectedEntity, selectEntity]);

  const getEntityById = useCallback((entityId: string) => {
    return entities.find(entity => entity.id === entityId);
  }, [entities]);

  const getPrimaryEntity = useCallback(() => {
    return entities.find(entity => entity.isPrimary);
  }, [entities]);

  return {
    entities,
    selectedEntity,
    switchEntity,
    getEntityById,
    getPrimaryEntity,
    isLoading,
  };
};
