import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itemService } from "@/services/item.service";
import Swal from "sweetalert2";
import { getErrorMessage } from "@/utils/swal";
import { logger } from "@/utils/logger";

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
    queryKey: ["items"],
    queryFn: async () => {
      try {
        const result = await itemService.getAllItems();
        return result;
      } catch (error) {
        logger.error("Failed to fetch items", error);
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
    queryKey: ["items", id],
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
      queryClient.invalidateQueries({ queryKey: ["items"] });
      Swal.fire({
        icon: "success",
        title: "Item added successfully!",
        timer: 1600,
        showConfirmButton: false,
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, "Failed to add item");
      logger.error(errorMessage, error, true);
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
      queryClient.invalidateQueries({ queryKey: ["items"] });
      await queryClient.refetchQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({
        queryKey: ["items", variables.id],
      });
      // Success handling (UI notifications) should be handled by the
      // component that triggers the mutation so it can also close dialogs.
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, "Failed to update item");
      logger.error(errorMessage, error, true);
    },
  });
};

// Hook to delete item
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itemService.deleteItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      await queryClient.refetchQueries({ queryKey: ["items"] });
      Swal.fire({
        icon: "success",
        title: "Item deleted successfully!",
        timer: 1600,
        showConfirmButton: false,
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, "Failed to delete item");
      logger.error(errorMessage, error, true);
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
