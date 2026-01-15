import { create } from "zustand";

interface Item {
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
  image?: File | string;
  // optional fields used by real-time updates
  attire_stock?: number;
  availableQty?: number;
  quantity?: number;
}

interface ItemStore {
  items: Item[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  updateItem: (id: number, item: Item) => void;
  deleteItem: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateItemStock: (attireCode: string, newStock: number) => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  setItems: (items) => set({ items }),

  updateItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? updatedItem : item)),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  updateItemStock: (attireCode: string, newStock: number) =>
    set((state) => {
      console.log(`🔄 [STORE] Updating stock for ${attireCode}: ${newStock}`);
      const updatedItems = state.items.map((item) =>
        item.code === attireCode
          ? {
              ...item,
              stock: newStock,
              attire_stock: newStock,
              availableQty: newStock,
              quantity: newStock,
            }
          : item
      );
      console.log(`✅ [STORE] Stock updated for ${attireCode}`);
      return { items: updatedItems };
    }),
}));
