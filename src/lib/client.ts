import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosError,
} from "axios";
import { API_BASE_URL } from "@/constants/constdata";
import { API_ENDPOINTS } from "@/constants/api.constants";

/**
 * 🔒 API Client with Axios and HttpOnly Cookie Authentication
 * ✅ JWT tokens are in HttpOnly cookies - browser sends them automatically
 * ✅ Automatic token refresh on 401 errors
 * ✅ No Authorization header needed
 */

// Track if we're currently refreshing to avoid multiple refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ CRITICAL: Browser sends HttpOnly cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add tenant header
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("🌐 API Request:", config.url);

    // ✅ Get tenantId from localStorage (set it after login)
    const tenantId = localStorage.getItem("tenantId");
    if (tenantId) {
      config.headers = config.headers || {};
      config.headers["X-Tenant-ID"] = tenantId;
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and automatic token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("📡 Response status:", response.status);
    console.log("✅ API Response data:", response.data);
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    console.error("❌ API Error:", error.response?.data || error.message);

    // Handle 401 - Unauthorized (token expired)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Don't retry refresh endpoint or login endpoint
      if (
        originalRequest.url?.includes(API_ENDPOINTS.LOGIN.REFRESH) ||
        originalRequest.url?.includes(API_ENDPOINTS.LOGIN.LOGIN)
      ) {
        // Refresh token expired - redirect to login
        console.error("🚫 Refresh token expired - redirecting to login");

        // Dynamic import to avoid circular dependency
        const { useAuthStore } = await import("@/store/user-auth-store");
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance.request(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        await axiosInstance.post(API_ENDPOINTS.LOGIN.REFRESH);
        console.log("✅ Token refreshed successfully");

        processQueue(null);
        isRefreshing = false;

        // Retry the original request
        return axiosInstance.request(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed");
        processQueue(refreshError as Error);
        isRefreshing = false;

        // Refresh failed - clear auth and redirect to login
        const { useAuthStore } = await import("@/store/user-auth-store");
        useAuthStore.getState().logout();
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      console.error("🚫 Forbidden - insufficient permissions");
    }

    return Promise.reject(error);
  }
);

export const apiClient = {
  async request<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await axiosInstance.request<T>({
      url: endpoint,
      ...options,
    });
    return response.data;
  },

  async requestText(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<string> {
    const response = await axiosInstance.request<string>({
      url: endpoint,
      responseType: "text",
      ...options,
    });
    return response.data;
  },

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const response = await axiosInstance.post<T>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async uploadPut<T>(endpoint: string, formData: FormData): Promise<T> {
    const response = await axiosInstance.put<T>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
