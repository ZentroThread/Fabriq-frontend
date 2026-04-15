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
  deleteCustomer: (custCode: string) => Promise<null>;
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
      const deletedRaw = localStorage.getItem("deleted_customers");
      const deleted: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
      const filtered = data.filter((c) => !deleted.includes(c.custCode));
      set({ customers: filtered, isLoading: false });
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
        set((state) => ({ customers: [...state.customers, created] }));
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
      const state = get();
      const target = state.customers.find((c) => c.custCode === custCode);
      if (target && typeof target.custId === "number") {
        await billingService.deleteCustomer(target.custId);
        set((s) => ({
          customers: s.customers.filter((c) => c.custCode !== custCode),
        }));
        const deletedRaw = localStorage.getItem("deleted_customers");
        const deleted: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
        if (!deleted.includes(custCode)) {
          deleted.push(custCode);
          localStorage.setItem("deleted_customers", JSON.stringify(deleted));
        }
        await queryClient.invalidateQueries({ queryKey: ["customers"] });
        set({ isLoading: false });
        return null;
      }

      set((s) => ({
        customers: s.customers.filter((c) => c.custCode !== custCode),
      }));
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
