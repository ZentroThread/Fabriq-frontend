import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itemService } from "@/services/item.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import { toast } from "sonner";

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
  return useQuery({
    queryKey: QUERY_KEYS.ITEMS.ALL,
    queryFn: async () => {
      console.log("🔍 TanStack Query: Starting getAllItems fetch");
      try {
        const result = await itemService.getAllItems();
        console.log("✅ TanStack Query: getAllItems success, items:", result.length);
        return result;
      } catch (error) {
        console.error("❌ TanStack Query: getAllItems failed:", error);
        throw error;
      }
    },
    retry: 1,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

// Hook to fetch single item by ID
export const useItem = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ITEMS.BY_ID(id),
    queryFn: () => itemService.getItemById(id),
    enabled: !!id, // Only run query if id exists
  });
};

// Hook to add new item
export const useAddItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itemService.addItem,
    onSuccess: () => {
      // Invalidate and refetch items list
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITEMS.ALL });
      toast.success("Item added successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add item");
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
      // Invalidate both the list and the specific item
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITEMS.ALL });
      await queryClient.refetchQueries({ queryKey: QUERY_KEYS.ITEMS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ITEMS.BY_ID(variables.id),
      });
      toast.success("Item updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update item");
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
      toast.success("Item deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete item");
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
