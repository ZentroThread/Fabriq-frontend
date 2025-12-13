import { API_BASE_URL } from "@/constants/constdata";
import { useAuthStore } from "@/store/user-auth-store";

/**
 * API Client using native fetch with HttpOnly Cookie authentication
 * 🔒 JWT token is stored in HttpOnly cookie (secure, XSS-proof)
 * 🍪 Browser automatically sends cookie with every request (credentials: 'include')
 */

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // ✅ NO MORE Authorization header - JWT is in HttpOnly cookie!
    // The browser automatically sends the cookie with credentials: 'include'

    // Add tenant ID if available (still needed for multi-tenancy)
    const tenantId = useAuthStore.getState().getTenantId();
    if (tenantId) {
      headers["X-Tenant-ID"] = tenantId;
    }

    return headers;
  }

  private buildURL(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseURL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    // Handle 401 - Unauthorized (token expired or invalid)
    if (response.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }

    // Handle 403 - Forbidden (insufficient permissions)
    if (response.status === 403) {
      throw new Error("Access denied. You don't have permission.");
    }

    // Handle other error statuses
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      return text as T;
    }

    return response.json();
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options;
    const url = this.buildURL(endpoint, params);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
      credentials: "include", // Include cookies
      ...fetchOptions,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;
    const url = this.buildURL(endpoint, params);

    const response = await fetch(url, {
      method: "POST",
      headers: this.getHeaders(),
      credentials: "include", // Include cookies
      body: JSON.stringify(data),
      ...fetchOptions,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;
    const url = this.buildURL(endpoint, params);

    const response = await fetch(url, {
      method: "PUT",
      headers: this.getHeaders(),
      credentials: "include", // Include cookies
      body: JSON.stringify(data),
      ...fetchOptions,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;
    const url = this.buildURL(endpoint, params);

    const response = await fetch(url, {
      method: "PATCH",
      headers: this.getHeaders(),
      credentials: "include", // Include cookies
      body: JSON.stringify(data),
      ...fetchOptions,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options;
    const url = this.buildURL(endpoint, params);

    const response = await fetch(url, {
      method: "DELETE",
      headers: this.getHeaders(),
      credentials: "include", // Include cookies
      ...fetchOptions,
    });

    return this.handleResponse<T>(response);
  }

  // For file uploads with FormData
  async postForm<T>(
    endpoint: string,
    formData: FormData,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;
    const url = this.buildURL(endpoint, params);

    // Don't set Content-Type for FormData, browser will set it with boundary
    const tenantId = useAuthStore.getState().getTenantId();

    const headers: HeadersInit = {};
    // ✅ NO Authorization header - JWT is in HttpOnly cookie!
    if (tenantId) headers["X-Tenant-ID"] = tenantId;

    const response = await fetch(url, {
      method: "POST",
      headers,
      credentials: "include", // ✅ Include cookies (JWT token)
      body: formData,
      ...fetchOptions,
    });

    return this.handleResponse<T>(response);
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export class for testing
export default ApiClient;
