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

// Request interceptor - add tenant header (uses Zustand store)
axiosInstance.interceptors.request.use(
  // make interceptor async so we can dynamic-import the store (avoids circular deps)
  async (config) => {
    console.log("🌐 API Request:", config.url);
    console.log("🍪 Cookies being sent:", document.cookie ? "Present" : "None");

    try {
      const { useAuthStore } = await import("@/store/user-auth-store");
      const tenantId = useAuthStore.getState().getTenantId();
      console.log("🔑 Tenant ID from store:", tenantId);
      if (tenantId) {
        config.headers = config.headers || {};
        config.headers["X-Tenant-ID"] = tenantId;
        console.log("✅ Added X-Tenant-ID header:", tenantId);
      } else {
        console.warn("⚠️ No tenant ID found in store");
      }
    } catch (e) {
      // If store import fails for any reason, continue without tenant header
      console.warn("Could not load auth store for tenant header:", e);
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
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _skipAuthRedirect?: boolean; // Add this flag
    };

    // Log richer error information for easier debugging
    const resp = error.response;
    const errInfo = resp
      ? { status: resp.status, statusText: resp.statusText, data: resp.data }
      : { message: error.message };
    try {
      console.error("❌ API Error:", JSON.stringify(errInfo));
    } catch {
      console.error("❌ API Error:", errInfo);
    }

    // Handle 401/403 - Unauthorized (token expired or tenant ID missing)
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Skip refresh logic if this is a silent auth check
      if (originalRequest._skipAuthRedirect) {
        return Promise.reject(error);
      }

      // Don't retry refresh endpoint or login endpoint
      if (
        originalRequest.url?.includes(API_ENDPOINTS.LOGIN.REFRESH) ||
        originalRequest.url?.includes(API_ENDPOINTS.LOGIN.LOGIN)
      ) {
        // Refresh token expired - redirect to login ONLY if not already on login page
        console.error("🚫 Refresh token expired");

        // Check if we should skip redirect (for initial auth check)
        if (
          !originalRequest._skipAuthRedirect &&
          !window.location.pathname.includes("/login")
        ) {
          const { useAuthStore } = await import("@/store/user-auth-store");
          useAuthStore.getState().logout();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
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
        const refreshHeaders: Record<string, string> = {};
        try {
          const { useAuthStore } = await import("@/store/user-auth-store");
          const tenantId = useAuthStore.getState().getTenantId();
          if (tenantId) refreshHeaders["X-Tenant-ID"] = tenantId;
        } catch (e) {
          console.warn("Could not load auth store for refresh header:", e);
        }

        await axiosInstance.post(API_ENDPOINTS.LOGIN.REFRESH, undefined, {
          headers: refreshHeaders,
        });
        console.log("✅ Token refreshed successfully");

        processQueue(null);
        isRefreshing = false;

        return axiosInstance.request(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed");
        processQueue(refreshError as Error);
        isRefreshing = false;

        // Only redirect if not already on login page
        if (!window.location.pathname.includes("/login")) {
          const { useAuthStore } = await import("@/store/user-auth-store");
          useAuthStore.getState().logout();
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

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
