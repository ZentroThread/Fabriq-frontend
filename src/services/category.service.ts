import type { Category } from "@/types/category.type";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { apiClient } from "@/lib/client";

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const categories = await apiClient.request<Category[]>(
      API_ENDPOINTS.ATTIRE_CATEGORY.GET_ALL
    );
    return categories;
  },
};