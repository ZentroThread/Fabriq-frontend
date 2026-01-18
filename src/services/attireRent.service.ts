import { apiClient } from "@/lib/client";

interface AttireRent {
  id: string;
  attireCode: string;
  [key: string]: unknown;
}

export const attireRentService = {
  getAll: async () => {
    return apiClient.request<AttireRent[]>(`/v1/attire-rent/all`);
  },
  getByAttireCode: async (attireCode: string) => {
    return apiClient.request<AttireRent[]>(
      `/v1/attire-rent/by-attire/${encodeURIComponent(attireCode)}`
    );
  },
};
