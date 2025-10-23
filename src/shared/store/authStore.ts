import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, AuthStatus, User, Entity, LoginRequest } from '../api/services/authApi';
import { StorageKey, getStoredData, storeData, removeStoredData } from '../storage/storageManager';

interface AuthState extends AuthStatus {
  // Actions
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  oauthLogin: (provider: string, code: string, state?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  selectEntity: (entityId: string) => Promise<{ success: boolean; error?: string }>;
  updateUser: (user: User) => void;
  clearAuth: () => void;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      entities: [],
      selectedEntity: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.login(credentials);
          
          // Store tokens
          await storeData(StorageKey.AUTH_TOKEN, response.access_token);
          await storeData(StorageKey.REFRESH_TOKEN, response.refresh_token);
          await storeData(StorageKey.USER_DATA, response.user);
          
          // Get user entities
          const entities = await authApi.getUserEntities();
          await storeData(StorageKey.SELECTED_ENTITY, entities[0] || null);
          
          set({
            isAuthenticated: true,
            user: response.user,
            entities,
            selectedEntity: entities[0] || null,
            token: response.access_token,
            refreshToken: response.refresh_token,
            isLoading: false,
            error: null,
          });
          
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      oauthLogin: async (provider: string, code: string, state?: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.oauthLogin(provider, code, state);
          
          // Store tokens
          await storeData(StorageKey.AUTH_TOKEN, response.access_token);
          await storeData(StorageKey.REFRESH_TOKEN, response.refresh_token);
          await storeData(StorageKey.USER_DATA, response.user);
          
          // Get user entities
          const entities = await authApi.getUserEntities();
          await storeData(StorageKey.SELECTED_ENTITY, entities[0] || null);
          
          set({
            isAuthenticated: true,
            user: response.user,
            entities,
            selectedEntity: entities[0] || null,
            token: response.access_token,
            refreshToken: response.refresh_token,
            isLoading: false,
            error: null,
          });
          
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'OAuth login failed';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authApi.logout();
        } catch (error) {
          console.error('Logout API error:', error);
        }
        
        // Clear storage
        await removeStoredData(StorageKey.AUTH_TOKEN);
        await removeStoredData(StorageKey.REFRESH_TOKEN);
        await removeStoredData(StorageKey.USER_DATA);
        await removeStoredData(StorageKey.SELECTED_ENTITY);
        
        set({
          isAuthenticated: false,
          user: null,
          entities: [],
          selectedEntity: null,
          token: null,
          refreshToken: null,
          isLoading: false,
          error: null,
        });
      },

      refreshAuth: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return;
        
        try {
          const response = await authApi.refreshToken(refreshToken);
          
          await storeData(StorageKey.AUTH_TOKEN, response.access_token);
          
          set({
            token: response.access_token,
            error: null,
          });
        } catch (error) {
          console.error('Token refresh failed:', error);
          // If refresh fails, logout user
          get().logout();
        }
      },

      selectEntity: async (entityId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          await authApi.selectEntity(entityId);
          
          const { entities } = get();
          const selectedEntity = entities.find(e => e.id === entityId);
          
          if (selectedEntity) {
            await storeData(StorageKey.SELECTED_ENTITY, selectedEntity);
            set({ selectedEntity, isLoading: false });
            return { success: true };
          } else {
            throw new Error('Entity not found');
          }
        } catch (error: any) {
          const errorMessage = error.message || 'Failed to select entity';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      updateUser: (user: User) => {
        set({ user });
        storeData(StorageKey.USER_DATA, user);
      },

      clearAuth: () => {
        set({
          isAuthenticated: false,
          user: null,
          entities: [],
          selectedEntity: null,
          token: null,
          refreshToken: null,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        entities: state.entities,
        selectedEntity: state.selectedEntity,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

// Selector hooks for better performance
export const useAuth = () => useAuthStore((state) => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
  selectedEntity: state.selectedEntity,
  isLoading: state.isLoading,
  error: state.error,
}));

export const useAuthActions = () => useAuthStore((state) => ({
  login: state.login,
  oauthLogin: state.oauthLogin,
  logout: state.logout,
  selectEntity: state.selectEntity,
  updateUser: state.updateUser,
  clearAuth: state.clearAuth,
}));

export const useAuthStatus = () => useAuthStore((state) => state.isAuthenticated);
export const useUser = () => useAuthStore((state) => state.user);
export const useSelectedEntity = () => useAuthStore((state) => state.selectedEntity);
