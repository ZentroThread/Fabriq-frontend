// item-store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
}

interface ItemStore {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  updateItem: (id: number, item: Item) => void;
  deleteItem: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useItemStore = create<ItemStore>()(
  devtools(
    (set) => ({
      items: [],
      isLoading: false,
      error: null,

      setItems: (items) => 
        set({ items }, false, "setItems"),
      
      addItem: (item) => 
        set(
          (state) => ({ items: [...state.items, item] }), 
          false, 
          "addItem"
        ),
      
      updateItem: (id, updatedItem) =>
        set(
          (state) => ({
            items: state.items.map((item) =>
              item.id === id ? updatedItem : item
            ),
          }),
          false,
          "updateItem"
        ),
      
      deleteItem: (id) =>
        set(
          (state) => ({
            items: state.items.filter((item) => item.id !== id),
          }),
          false,
          "deleteItem"
        ),
      
      setLoading: (loading) => 
        set({ isLoading: loading }, false, "setLoading"),
      
      setError: (error) => 
        set({ error }, false, "setError"),
    }),
    {
      name: "ItemStore", // This name will appear in DevTools
      enabled: import.meta.env.MODE === "development", // Only enable in development
    }
  )
);