import { create } from "zustand";
import type { BillingType, CustomerType } from "@/types/bill.type";

type RentalItem = {
  itemCode: string;
  name: string;
  price: number;
  days: number;
  startDate?: string;
  endDate?: string;
  customerCode?: string;
  isCustomItem?: boolean;
};

export type BillingState = {
  selectedCustomer?: CustomerType | null;
  items: RentalItem[];
  currentBilling?: BillingType | null;
  billings?: BillingType[];
  error?: string | null;
  setError: (msg: string | null) => void;
  setSelectedCustomer: (c: CustomerType | null) => void;
  addItem: (item: Partial<RentalItem>) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
  clearAll: () => void;
};

const useBillingStore = create<BillingState>((set) => ({
  selectedCustomer: null,
  items: [],
  error: null,
  setError: (msg: string | null) => set({ error: msg }),

  setSelectedCustomer: (c) => set({ selectedCustomer: c }),

  addItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          itemCode: item.itemCode || "",
          name: item.name || "",
          price: item.price || 0,
          days: Math.max(0, item.days || 0),
          startDate: item.startDate,
          endDate: item.endDate,
          isCustomItem: item.isCustomItem || false,
        },
      ],
    })),

  removeItem: (index) =>
    set((state) => ({ items: state.items.filter((_, i) => i !== index) })),

  clearItems: () => set({ items: [] }),

  clearAll: () => set({ items: [], selectedCustomer: null }),
}));

export default useBillingStore;
