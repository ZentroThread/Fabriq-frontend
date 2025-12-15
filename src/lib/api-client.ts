import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { API_BASE_URL } from "@/constants/constdata";
import { useAuthStore } from "@/store/user-auth-store";

/**
 * API Client using Axios with HttpOnly Cookie authentication
 * 🔒 JWT token is stored in HttpOnly cookie (secure, XSS-proof)
 * 🍪 Browser automatically sends cookie with every request (withCredentials: true)
 */

interface RequestOptions extends AxiosRequestConfig {
  params?: Record<string, string>;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true, // ✅ Include cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor - Add tenant ID
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const tenantId = useAuthStore.getState().getTenantId();
        if (tenantId) {
          config.headers["X-Tenant-ID"] = tenantId;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - Handle errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle 401 - Unauthorized (token expired or invalid)
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
          window.location.href = "/login";
          return Promise.reject(
            new Error("Session expired. Please login again.")
          );
        }

        // Handle 403 - Forbidden (insufficient permissions)
        if (error.response?.status === 403) {
          return Promise.reject(
            new Error("Access denied. You don't have permission.")
          );
        }

        // Handle other errors
        const errorMessage =
          error.response?.data || error.message || "Request failed";
        return Promise.reject(new Error(errorMessage as string));
      }
    );
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, options);
    return response.data;
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, options);
    return response.data;
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, options);
    return response.data;
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data, options);
    return response.data;
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, options);
    return response.data;
  }

  // For file uploads with FormData
  async postForm<T>(
    endpoint: string,
    formData: FormData,
    options: RequestOptions = {}
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, formData, {
      ...options,
      headers: {
        "Content-Type": "multipart/form-data",
        ...options.headers,
      },
    });
    return response.data;
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export class for testing
export default ApiClient;
