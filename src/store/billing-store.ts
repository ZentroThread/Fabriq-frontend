import { create } from "zustand";
import type {
  AddCustomerPayload,
  BackendCustomerPayload,
} from "@/types/item.types";
import { billingService } from "@/services/billing.service";
import { queryClient } from "@/main";

interface BillingState {
  customers: BackendCustomerPayload[];
  isLoading: boolean;
  error: string | null;

  fetchCustomers: () => Promise<void>;
  addCustomer: (
    payload: AddCustomerPayload
  ) => Promise<BackendCustomerPayload | null>;
  setError: (err: string | null) => void;
}

export const useBillingStore = create<BillingState>((set, get) => ({
  customers: [],
  isLoading: false,
  error: null,

  setError: (err) => set({ error: err }),

  fetchCustomers: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await billingService.getAllCustomers();
      set({ customers: data, isLoading: false });
      // Prime react-query cache
      queryClient.setQueryData(["customers"], data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      set({ error: msg, isLoading: false });
    }
  },

  addCustomer: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const resp = await billingService.addCustomer(payload);
      const created = resp.value ?? null;
      if (created) {
        // update local state
        set((state) => ({ customers: [...state.customers, created] }));
        // invalidate/react-query cache so UI using react-query updates
        await queryClient.invalidateQueries({ queryKey: ["customers"] });
      }
      set({ isLoading: false });
      return created;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      set({ error: msg, isLoading: false });
      return null;
    }
  },
}));

export default useBillingStore;
