import { create } from "zustand";
import { billingService } from "@/services/billing.service";

type RentalItem = {
  itemCode: string;
  name: string;
  price: number;
  days: number;
  startDate?: string;
  endDate?: string;
  customerCode?: string;
};

type Customer = {
  cust_id?: number | string;
  custCode?: string;
  cust_code?: string;
};

type Billing = {
  billingCode?: string;
  [key: string]: unknown;
};

export type BillingState = {
  selectedCustomer?: Customer | null;
  items: RentalItem[];
  currentBilling?: Billing | null;
  billings?: Billing[];
  setSelectedCustomer: (c: Customer | null) => void;
  addItem: (item: Partial<RentalItem>) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
  clearAll: () => void;
  confirmOrder: () => Promise<unknown>;
  payBilling: (opts: {
    discountPercentage?: number;
    paymentMethod?: string;
  }) => Promise<void>;
  fetchBillings?: () => Promise<void>;
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

  billings: [],

  fetchBillings: async () => {
    try {
      const resp = await billingService.getAllBillings();
      const list = (resp as Billing[]) || [];
      set({ billings: list });
    } catch (e) {
      console.warn("fetchBillings failed", e);
      set({ billings: [] });
    }
  },

  confirmOrder: async () => {
    const items = get().items;
    const customer = get().selectedCustomer;

    if (!items.length || !customer) return;

    const customerCode =
      customer.custCode ||
      customer.cust_code ||
      (customer.cust_id !== undefined && customer.cust_id !== null
        ? String(customer.cust_id)
        : undefined);

    if (!customerCode) throw new Error("Customer code is required");

    // ✅ Use item.startDate and item.endDate from the selected dates
    const payload = {
      customerCode,
      items: items.map((item) => ({
        attireCode: item.itemCode,
        rentDate: item.startDate || new Date().toISOString().split("T")[0],
        returnDate: item.endDate || undefined,
      })),
    };

    console.log("📤 Sending payload:", payload);
    const resp = await billingService.createBillingWithRentals(payload);

    try {
      const createdBilling = resp as Billing;
      set({ currentBilling: createdBilling });
    } catch (e) {
      console.warn("could not store billing response", e);
    }
  },

  clearAll: () => set({ items: [], selectedCustomer: null }),

  payBilling: async ({ discountPercentage = 0, paymentMethod = "cash" }) => {
    let billing = get().currentBilling;

    if (!billing || !billing.billingCode) {
      const items = get().items;
      const customer = get().selectedCustomer;
      if (!items || items.length === 0) throw new Error("No items to bill");
      if (!customer) throw new Error("No selected customer");

      const customerCode =
        customer.custCode ||
        customer.cust_code ||
        (customer.cust_id ? String(customer.cust_id) : undefined);
      if (!customerCode) throw new Error("Customer code is required");

      // ✅ Use item.startDate and item.endDate from the selected dates
      const payload = {
        customerCode,
        items: items.map((item) => ({
          attireCode: item.itemCode,
          rentDate: item.startDate || new Date().toISOString().split("T")[0],
          returnDate: item.endDate || undefined,
        })),
      };

      const created = await billingService.createBillingWithRentals(payload);
      const createdBilling = created as Billing;
      billing = createdBilling;
      set({ currentBilling: createdBilling });
    }

    const resp = await billingService.payBilling({
      billingCode: billing.billingCode!,
      discountPercentage,
      paymentMethod,
    });

    const respTyped = resp as
      | { billHtml?: string; billing?: Billing }
      | undefined;

    if (respTyped && respTyped.billHtml) {
      const w = window.open("");
      if (w) {
        w.document.write(respTyped.billHtml);
        w.document.close();
        w.focus();
        setTimeout(() => {
          w.print();
          w.close();
        }, 300);
      }
    }

    set({
      items: [],
      currentBilling: respTyped && respTyped.billing ? respTyped.billing : null,
    });

    setTimeout(() => {
      try {
        window.location.reload();
      } catch (e) {
        console.warn("reload failed", e);
      }
    }, 1000);
  },
}));

export default useBillingStore;
