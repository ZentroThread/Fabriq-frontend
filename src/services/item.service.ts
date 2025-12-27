import { API_ENDPOINTS } from "@/constants/api.constants";
import { apiClient } from "@/lib/client";
import { useItemStore } from "@/store/item-store";

import type { Item, BackendItem, AddItemPayload } from "@/types/item.types";

// Helper function to map backend response to frontend Item
const mapBackendItemToItem = (backendItem: BackendItem): Item => ({
  id: backendItem.id,
  code: backendItem.attireCode,
  title: backendItem.attireName,
  description: backendItem.attireDescription || "",
  price: backendItem.attirePrice,
  stock: backendItem.attireStock,
  category: backendItem.category,
  status: backendItem.attireStatus,
  tenantId: backendItem.tenantId,
  image: backendItem.imageUrl,
});

export const itemService = {
  addItem: async (data: AddItemPayload): Promise<Item> => {
    const { setLoading, setError, addItem } = useItemStore.getState();
    try {
      setLoading(true);
      setError(null);

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

      const result = await apiClient.upload<BackendItem>(
        API_ENDPOINTS.ATTIRE.ADD,
        formData
      );

      // Map the response to Item and add to store
      const newItem = mapBackendItemToItem(result);
      addItem(newItem);

      return newItem;
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to add item"
          : "Failed to add item";
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  getAllItems: async (): Promise<Item[]> => {
    const { setLoading, setError, setItems } = useItemStore.getState();

    try {
      setLoading(true);
      setError(null);

      const result = await apiClient.request<BackendItem[]>(
        API_ENDPOINTS.ATTIRE.GET_ALL
      );

      const items = Array.isArray(result)
        ? result.map(mapBackendItemToItem)
        : [];

      // Update Zustand store
      setItems(items);

      return items;
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to fetch items"
          : "Failed to fetch items";
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  getItemById: async (id: string): Promise<Item> => {
    const { setLoading, setError } = useItemStore.getState();

    try {
      setLoading(true);
      setError(null);

      const result = await apiClient.request<BackendItem>(
        `${API_ENDPOINTS.ATTIRE.GET_ALL}/${id}`
      );

      return mapBackendItemToItem(result);
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to fetch item"
          : "Failed to fetch item";
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  updateItem: async (id: string, data: AddItemPayload): Promise<Item> => {
    const { setLoading, setError, updateItem } = useItemStore.getState();

    try {
      setLoading(true);
      setError(null);

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

      const result = await apiClient.uploadPut<BackendItem>(
        API_ENDPOINTS.ATTIRE.UPDATE(Number(id)),
        formData
      );

      // Map and update in store
      const updatedItem = mapBackendItemToItem(result);
      updateItem(Number(id), updatedItem);

      return updatedItem;
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to fetch item"
          : "Failed to fetch item";
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  deleteItem: async (id: number): Promise<void> => {
    const { setLoading, setError, deleteItem } = useItemStore.getState();

    try {
      setLoading(true);
      setError(null);

      await apiClient.request<void>(API_ENDPOINTS.ATTIRE.DELETE(id), {
        method: "DELETE",
      });

      // Remove from Zustand store after successful deletion
      deleteItem(id);
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to fetch item"
          : "Failed to fetch item";
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  },
};
