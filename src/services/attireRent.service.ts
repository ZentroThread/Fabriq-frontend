import { apiClient } from "@/lib/client";

export const attireRentService = {
  getAll: async () => {
    return apiClient.request<any>(`/v1/attire-rent/all`);
  },
  getByAttireCode: async (attireCode: string) => {
    return apiClient.request<any>(
      `/v1/attire-rent/by-attire/${encodeURIComponent(attireCode)}`
    );
  },
};
