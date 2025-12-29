import { create } from "zustand";
import { apiClient } from "@/lib/client";

type RentalItem = {
  itemCode: string;
  name: string;
  price: number;
  days: number;
  startDate?: string;
  endDate?: string;
};

type Customer = {
  cust_id?: number | string;
  [key: string]: any;
};

export type BillingState = {
  selectedCustomer?: Customer | null;
  items: RentalItem[];
  setSelectedCustomer: (c: Customer | null) => void;
  addItem: (item: Partial<RentalItem>) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
  confirmOrder: () => Promise<any>;
};

const useBillingStore = create<BillingState>((set, get) => ({
  selectedCustomer: null,
  items: [],

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
        },
      ],
    })),

  removeItem: (index) =>
    set((state) => ({ items: state.items.filter((_, i) => i !== index) })),

  clearItems: () => set({ items: [] }),

  confirmOrder: async () => {
    const { selectedCustomer, items } = get();
    if (!selectedCustomer) throw new Error("No selected customer");
    if (!items || items.length === 0) throw new Error("No items to confirm");

    const payload = {
      customerId: selectedCustomer.cust_id,
      items: items.map((it) => ({
        itemCode: it.itemCode,
        pricePerDay: it.price,
        days: it.days,
        startDate: it.startDate,
        endDate: it.endDate,
      })),
    };

    try {
      const resp = await apiClient.request<any>(`/v1/attire-rent/add`, {
        method: "POST",
        data: payload,
      });
      set({ items: [] });
      return resp;
    } catch (err) {
      throw err;
    }
  },
}));

export default useBillingStore;
