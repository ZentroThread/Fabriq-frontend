import { API_BASE_URL } from "@/constants/constdata";
import { useAuthStore } from "@/store/user-auth-store";

export const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const { token } = useAuthStore.getState();

    const config: RequestInit = {
      ...options,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Request failed");
    }

    return response.json();
  },

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const { token } = useAuthStore.getState();

    const config: RequestInit = {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
