import { create } from "zustand";
import { billingService } from "@/services/billing.service";

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
  custCode?: string;
  cust_code?: string;
};

type AttireRentAddDto = {
  customerCode?: string;
  attireCode: string;
  rentDate?: string;
  returnDate?: string;
};

export type BillingState = {
  selectedCustomer?: Customer | null;
  items: RentalItem[];
  setSelectedCustomer: (c: Customer | null) => void;
  addItem: (item: Partial<RentalItem>) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
  confirmOrder: () => Promise<unknown>;
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

    // Build payload matching backend's AttireRentAddDto
    const first = items[0];
    const sc = selectedCustomer;
    const customerCode =
      sc.custCode ||
      sc.cust_code ||
      (selectedCustomer.cust_id ? String(selectedCustomer.cust_id) : undefined);

    const payload: AttireRentAddDto = {
      customerCode,
      attireCode: first.itemCode,
      rentDate: first.startDate,
      returnDate: first.endDate,
    };

    const resp = await billingService.addAttireRent(payload);
    set({ items: [] });
    return resp;
  },
}));

export default useBillingStore;
