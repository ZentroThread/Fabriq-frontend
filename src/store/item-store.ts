import { create } from "zustand";

interface Item {
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
  addItem: (item: Item) => void;
  setItems: (items: Item[]) => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  setItems: (items) => set({ items }),
}));
