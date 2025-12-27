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
  updateCustomer: (
    custCode: string,
    payload: Partial<BackendCustomerPayload>
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
      // Filter out locally-deleted customers persisted in localStorage
      const deletedRaw = localStorage.getItem("deleted_customers");
      const deleted: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
      const filtered = data.filter((c) => !deleted.includes(c.custCode));
      set({ customers: filtered, isLoading: false });
      // Prime react-query cache
      queryClient.setQueryData(["customers"], filtered);
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
  updateCustomer: async (custCode, payload) => {
    set({ isLoading: true, error: null });
    try {
      // Update local state only (no backend update endpoint available)
      let updated: BackendCustomerPayload | null = null;
      set((state) => {
        const idx = state.customers.findIndex((c) => c.custCode === custCode);
        if (idx === -1) return state;
        const merged = {
          ...state.customers[idx],
          ...payload,
        } as BackendCustomerPayload;
        const customers = [...state.customers];
        customers[idx] = merged;
        updated = merged;
        return { customers };
      });
      // invalidate react-query cache
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
      set({ isLoading: false });
      return updated;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      set({ error: msg, isLoading: false });
      return null;
    }
  },
  deleteCustomer: async (custCode: string) => {
    set({ isLoading: true, error: null });
    try {
      // Remove locally (no backend delete endpoint available)
      set((state) => {
        const customers = state.customers.filter(
          (c) => c.custCode !== custCode
        );
        return { customers };
      });
      // Persist deletion so it survives reloads
      const deletedRaw = localStorage.getItem("deleted_customers");
      const deleted: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
      if (!deleted.includes(custCode)) {
        deleted.push(custCode);
        localStorage.setItem("deleted_customers", JSON.stringify(deleted));
      }
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
      set({ isLoading: false });
      return null;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      set({ error: msg, isLoading: false });
      return null;
    }
  },
}));

export default useBillingStore;
