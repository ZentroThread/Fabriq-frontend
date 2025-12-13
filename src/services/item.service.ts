import { API_ENDPOINTS } from "@/constants/api.constants";
import { apiClient } from "@/api/client";

interface AddItemPayload {
  code: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: number;
  status: string;
  image?: File | string;
}

interface Item {
  code: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: number;
  status: string;
  tenantId: string;
  image?: File | string;
}

// Backend response structure (what API actually returns)
interface BackendItem {
  id: number;
  tenantId: string;
  attireCode: string;
  attireName: string;
  attireDescription: string | null;
  attirePrice: number;
  attireStock: number;
  categoryId: number;
  attireStatus: string;
  imageUrl?: string;
}

interface AddItemResponse {
  value: Item;
}

// Helper function to map backend response to frontend Item
const mapBackendItemToItem = (backendItem: BackendItem): Item => ({
  code: backendItem.attireCode,
  title: backendItem.attireName,
  description: backendItem.attireDescription || "",
  price: backendItem.attirePrice,
  stock: backendItem.attireStock,
  category: backendItem.categoryId,
  status: backendItem.attireStatus,
  tenantId: backendItem.tenantId,
  image: backendItem.imageUrl,
});

export const itemService = {
  addItem: async (data: AddItemPayload): Promise<AddItemResponse> => {
    const formData = new FormData();

    formData.append("attireCode", data.code);
    formData.append("attireName", data.title);
    formData.append("attireDescription", data.description);
    formData.append("attireStatus", data.status);
    formData.append("attirePrice", data.price.toString()); //always expect string or
    formData.append("categoryId", data.category.toString());
    formData.append("attireStock", data.stock.toString());

    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }

    const result = await apiClient.upload<AddItemResponse>(
      API_ENDPOINTS.ATTIRE.ADD,
      formData
    );

    return result;
  },

  getAllItems: async (): Promise<Item[]> => {
    // Backend returns items directly as an array, not wrapped in {value: [...]}
    const result = await apiClient.request<BackendItem[]>(
      API_ENDPOINTS.ATTIRE.GET_ALL
    );
    console.log("🔍 API Response:", result);
    // Map backend response to frontend Item structure
    return Array.isArray(result) ? result.map(mapBackendItemToItem) : [];
  },

  getItemById: async (id: string): Promise<Item> => {
    const result = await apiClient.request<{ value: Item }>(
      `${API_ENDPOINTS.ATTIRE.GET_ALL}/${id}`
    );
    return result.value;
  },

  updateItem: async (
    id: string,
    data: AddItemPayload
  ): Promise<AddItemResponse> => {
    const formData = new FormData();

    formData.append("attireCode", data.code);
    formData.append("attireName", data.title);
    formData.append("attireDescription", data.description);
    formData.append("attireStatus", data.status);
    formData.append("attirePrice", data.price.toString());
    formData.append("categoryId", data.category.toString());
    formData.append("attireStock", data.stock.toString());

    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }

    const result = await apiClient.upload<AddItemResponse>(
      `${API_ENDPOINTS.ATTIRE.ADD}/${id}`,
      formData
    );

    return result;
  },

  deleteItem: async (id: string): Promise<void> => {
    await apiClient.request<void>(`${API_ENDPOINTS.ATTIRE.GET_ALL}/${id}`, {
      method: "DELETE",
    });
  },
};
