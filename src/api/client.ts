import { API_BASE_URL } from "@/constants/constdata";
import { useAuthStore } from "@/store/user-auth-store";

/**
 * 🔒 API Client with HttpOnly Cookie Authentication
 * ✅ JWT token is in HttpOnly cookie - browser sends it automatically
 * ✅ No Authorization header needed
 */
export const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Get tenant ID from store (still needed for multi-tenancy)
    const tenantId = useAuthStore.getState().getTenantId();

    const config: RequestInit = {
      credentials: "include", // ✅ CRITICAL: Browser sends HttpOnly cookie
      ...options,
      headers: {
        ...(tenantId ? { "X-Tenant-ID": tenantId } : {}),
        ...options.headers,
      },
    };

    console.log("🌐 API Request:", `${API_BASE_URL}${endpoint}`, { tenantId });
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      throw new Error(errorText || "Request failed");
    }

    const data = await response.json();
    console.log("✅ API Response data:", data);
    return data;
  },

  async requestText(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<string> {
    const tenantId = useAuthStore.getState().getTenantId();

    const config: RequestInit = {
      credentials: "include", // ✅ Browser sends HttpOnly cookie
      ...options,
      headers: {
        ...(tenantId ? { "X-Tenant-ID": tenantId } : {}),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Request failed");
    }

    return response.text();
  },

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const tenantId = useAuthStore.getState().getTenantId();

    const config: RequestInit = {
      method: "POST",
      credentials: "include", // ✅ Browser sends HttpOnly cookie
      headers: {
        ...(tenantId ? { "X-Tenant-ID": tenantId } : {}),
      },
      body: formData,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Upload failed");
    }

    return response.json();
  },
};
