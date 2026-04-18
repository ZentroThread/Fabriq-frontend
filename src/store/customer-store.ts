import { create } from "zustand";
import type { BackendCustomerPayload } from "@/types/item.types";

interface CustomerStoreState {
  selectedCustomer: BackendCustomerPayload | null;
  searchQuery: string;
  setSelectedCustomer: (customer: BackendCustomerPayload | null) => void;
  setSearchQuery: (query: string) => void;
  clearState: () => void;
}

export const useCustomerStore = create<CustomerStoreState>((set) => ({
  selectedCustomer: null,
  searchQuery: "",

  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  clearState: () => set({ selectedCustomer: null, searchQuery: "" }),
}));

export default useCustomerStore;
