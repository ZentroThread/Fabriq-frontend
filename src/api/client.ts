import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/constants/constdata";
import { useAuthStore } from "@/store/user-auth-store";

/**
 * 🔒 API Client with Axios and HttpOnly Cookie Authentication
 * ✅ JWT token is in HttpOnly cookie - browser sends it automatically
 * ✅ No Authorization header needed
 */

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ CRITICAL: Browser sends HttpOnly cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add tenant ID to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const tenantId = useAuthStore.getState().getTenantId();
    if (tenantId) {
      config.headers["X-Tenant-ID"] = tenantId;
    }
    console.log("🌐 API Request:", config.url, { tenantId });
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("📡 Response status:", response.status);
    console.log("✅ API Response data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);

    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
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
