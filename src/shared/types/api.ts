// API types - Reused from mobile app
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

export interface RequestConfig {
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface ApiClient {
  get: <T = any>(url: string, config?: RequestConfig) => Promise<T>;
  post: <T = any>(url: string, data?: any, config?: RequestConfig) => Promise<T>;
  put: <T = any>(url: string, data?: any, config?: RequestConfig) => Promise<T>;
  patch: <T = any>(url: string, data?: any, config?: RequestConfig) => Promise<T>;
  delete: <T = any>(url: string, config?: RequestConfig) => Promise<T>;
  upload: <T = any>(
    url: string,
    file: File,
    onProgress?: (progress: UploadProgress) => void,
    config?: RequestConfig
  ) => Promise<T>;
}
