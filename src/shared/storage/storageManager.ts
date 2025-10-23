// Storage Manager - Web adaptation of mobile AsyncStorage
// This allows 90%+ code reuse from mobile app

export enum StorageKey {
  AUTH_TOKEN = 'auth_token',
  REFRESH_TOKEN = 'refresh_token',
  USER_DATA = 'user_data',
  SELECTED_ENTITY = 'selected_entity',
  ACCOUNT_DATA = 'account_data',
  WIZARD_PROGRESS = 'wizard_progress',
  DOCUMENTS = 'documents',
  BANK_ACCOUNTS = 'bank_accounts',
  CRYPTO_WALLETS = 'crypto_wallets',
  THEME_PREFERENCE = 'theme_preference',
  LANGUAGE_PREFERENCE = 'language_preference',
}

// Encryption utilities (same as mobile app)
const ENCRYPTION_KEY = 'your-encryption-key'; // In production, use environment variable

const encrypt = (text: string): string => {
  // Simple encryption for demo - in production use proper encryption
  return btoa(text);
};

const decrypt = (encryptedText: string): string => {
  // Simple decryption for demo - in production use proper decryption
  try {
    return atob(encryptedText);
  } catch {
    return '';
  }
};

// Storage interface that matches mobile AsyncStorage API
export const storage = {
  // Get item from storage
  getItem: async (key: StorageKey): Promise<string | null> => {
    try {
      const item = localStorage.getItem(key);
      return item ? decrypt(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  },

  // Set item in storage
  setItem: async (key: StorageKey, value: string): Promise<void> => {
    try {
      const encryptedValue = encrypt(value);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      throw error;
    }
  },

  // Remove item from storage
  removeItem: async (key: StorageKey): Promise<void> => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
      throw error;
    }
  },

  // Clear all storage
  clear: async (): Promise<void> => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },

  // Get all keys
  getAllKeys: async (): Promise<string[]> => {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  },

  // Multi-get (get multiple items at once)
  multiGet: async (keys: StorageKey[]): Promise<[string, string | null][]> => {
    try {
      return keys.map(key => [key, localStorage.getItem(key)]);
    } catch (error) {
      console.error('Error multi-getting items:', error);
      return keys.map(key => [key, null]);
    }
  },

  // Multi-set (set multiple items at once)
  multiSet: async (keyValuePairs: [StorageKey, string][]): Promise<void> => {
    try {
      keyValuePairs.forEach(([key, value]) => {
        const encryptedValue = encrypt(value);
        localStorage.setItem(key, encryptedValue);
      });
    } catch (error) {
      console.error('Error multi-setting items:', error);
      throw error;
    }
  },

  // Multi-remove (remove multiple items at once)
  multiRemove: async (keys: StorageKey[]): Promise<void> => {
    try {
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error multi-removing items:', error);
      throw error;
    }
  },
};

// Convenience functions for common operations
export const getStoredData = async <T>(key: StorageKey): Promise<T | null> => {
  try {
    const data = await storage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error getting stored data for ${key}:`, error);
    return null;
  }
};

export const storeData = async <T>(key: StorageKey, data: T): Promise<void> => {
  try {
    const jsonData = JSON.stringify(data);
    await storage.setItem(key, jsonData);
  } catch (error) {
    console.error(`Error storing data for ${key}:`, error);
    throw error;
  }
};

export const removeStoredData = async (key: StorageKey): Promise<void> => {
  try {
    await storage.removeItem(key);
  } catch (error) {
    console.error(`Error removing stored data for ${key}:`, error);
    throw error;
  }
};

export const storeObject = async <T>(key: StorageKey, obj: T): Promise<void> => {
  return storeData(key, obj);
};

// Session storage utilities (for temporary data)
export const sessionStorage = {
  getItem: (key: string): string | null => {
    try {
      return window.sessionStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting session item ${key}:`, error);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting session item ${key}:`, error);
      throw error;
    }
  },

  removeItem: (key: string): void => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing session item ${key}:`, error);
      throw error;
    }
  },

  clear: (): void => {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing session storage:', error);
      throw error;
    }
  },
};
