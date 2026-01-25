import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itemService } from "@/services/item.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import Swal from "sweetalert2";
import { getErrorMessage } from "@/utils/swal";

export interface Item {
  id: number;
  code: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: {
    tenantId: string;
    categoryId: number;
    categoryCode: string;
    categoryName: string;
  };
  status: string;
  tenantId: string;
  image?: string;
}

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

export const useItems = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.ITEMS.ALL,
    queryFn: async () => {
      console.log("🔍 TanStack Query: Starting getAllItems fetch");
      try {
        const result = await itemService.getAllItems();
        console.log(
          "✅ TanStack Query: getAllItems success, items:",
          result.length
        );
        return result;
      } catch (error) {
        console.error("❌ TanStack Query: getAllItems failed:", error);
        throw error;
      }
    },
    retry: 1,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  return query;
};

// Hook to fetch single item by ID
export const useItem = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ITEMS.BY_ID(id),
    queryFn: () => itemService.getItemById(id),
    enabled: !!id,
  });
};

// Hook to add new item
export const useAddItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itemService.addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITEMS.ALL });
      Swal.fire({
        icon: "success",
        title: "Item added successfully!",
        timer: 1600,
        showConfirmButton: false,
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, "Failed to add item");
      console.error("❌ Error adding item:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add item",
        text: errorMessage,
        confirmButtonColor: "#dc2626",
      });
    },
  });
};

// Hook to update item
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddItemPayload }) =>
      itemService.updateItem(id, data),
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITEMS.ALL });
      await queryClient.refetchQueries({ queryKey: QUERY_KEYS.ITEMS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ITEMS.BY_ID(variables.id),
      });
      // Success handling (UI notifications) should be handled by the
      // component that triggers the mutation so it can also close dialogs.
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, "Failed to update item");
      console.error("❌ Error updating item:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update item",
        text: errorMessage,
        confirmButtonColor: "#dc2626",
      });
    },
  });
};

// Hook to delete item
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itemService.deleteItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITEMS.ALL });
      await queryClient.refetchQueries({ queryKey: QUERY_KEYS.ITEMS.ALL });
      Swal.fire({
        icon: "success",
        title: "Item deleted successfully!",
        timer: 1600,
        showConfirmButton: false,
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, "Failed to delete item");
      console.error("❌ Error deleting item:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete item",
        text: errorMessage,
        confirmButtonColor: "#dc2626",
      });
    },
  });
};

// Custom hook with search functionality
export const useFilteredItems = (searchQuery: string) => {
  const { data: items = [], ...queryResult } = useItems();

  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    const title = item.title?.toLowerCase() || "";
    const description = item.description?.toLowerCase() || "";
    const code = item.code?.toLowerCase() || "";

    return (
      title.includes(searchLower) ||
      description.includes(searchLower) ||
      code.includes(searchLower)
    );
  });

  return {
    items: filteredItems,
    allItems: items,
    ...queryResult,
  };
};
