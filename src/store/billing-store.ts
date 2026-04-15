import { create } from "zustand";
import { billingService } from "@/services/billing.service";
import { logger } from "@/utils/logger";
import { getErrorMessage } from "@/utils/swal";
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

// Legacy types removed as they are now imported from bill-data.schema

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
  payBilling: (opts: {
    discountPercentage?: number;
    paymentMethod?: string;
  }) => Promise<void>;
  fetchBillings?: () => Promise<void>;
};

const useBillingStore = create<BillingState>((set, get) => ({
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

  billings: [],

  fetchBillings: async () => {
    try {
      const resp = await billingService.getAllBillings();
      const list = (resp as BillingType[]) || [];
      set({ billings: list, error: null });
    } catch (error) {
      const msg = getErrorMessage(error, "Failed to fetch billings");
      logger.error("Failed to fetch billings", error, true);
      set({ billings: [], error: msg });
    }
  },

  clearAll: () => set({ items: [], selectedCustomer: null }),

  payBilling: async ({ discountPercentage = 0, paymentMethod = "cash" }) => {
    // Centralized error handling for billing flow
    try {
      set({ error: null });

      const items = get().items;
      const customer = get().selectedCustomer;

      if (!items || items.length === 0) throw new Error("No items to bill");
      if (!customer) throw new Error("No selected customer");

      const customerRecord = customer as Record<string, unknown>;
      const customerCode =
        customer.custCode ||
        (typeof customerRecord.cust_code === "string"
          ? (customerRecord.cust_code as string)
          : undefined) ||
        (customerRecord.cust_id ? String(customerRecord.cust_id) : undefined);
      if (!customerCode) throw new Error("Customer code is required");

      const payload = {
        customerCode,
        items: items.map((item) => ({
          attireCode: item.itemCode,
          rentDate: item.startDate || new Date().toISOString().split("T")[0],
          returnDate: item.endDate || undefined,
          isCustomItem: item.isCustomItem || false,
          customItemName: item.isCustomItem ? item.name : undefined,
          customPrice: item.isCustomItem ? item.price : undefined,
        })),
        discountPercentage,
        paymentMethod,
      };

      const resp = await billingService.createBillingAndPay(payload);

      const respTyped = resp as
        | { billHtml?: string; billing?: BillingType }
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
        currentBilling:
          respTyped && respTyped.billing ? respTyped.billing : null,
        error: null,
      });

      setTimeout(() => {
        try {
          window.location.reload();
        } catch {
          /* empty */
        }
      }, 1000);
    } catch (error) {
      const msg = getErrorMessage(error, "Failed to complete billing");
      logger.error("payBilling failed", error, true);
      set({ error: msg });
      throw error;
    }
  },
}));

export default useBillingStore;
