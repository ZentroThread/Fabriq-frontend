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

interface AddItemResponse {
  value: Item;
}

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
};
