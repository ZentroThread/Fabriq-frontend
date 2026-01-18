import { create } from "zustand";
import { attireRentService } from "@/services/attireRent.service";

export interface AttireRent {
  custCode?: string;
  customer?: { custCode?: string };
  billingCode?: string;
  billing?: { billingCode?: string; code?: string };
  attireCode?: string;
  attire?: { attireCode?: string };
  rentDate?: string;
}

interface WishlistStore {
  // State
  list: AttireRent[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  rowsPerPage: number;
  searchQuery: string;
  selectedDate: Date | undefined;

  // Actions
  fetchWishlist: () => Promise<void>;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDate: (date: Date | undefined) => void;
  clearDateFilter: () => void;
  setError: (error: string | null) => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  // Initial state
  list: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  rowsPerPage: 10,
  searchQuery: "",
  selectedDate: undefined,

  // Actions
  fetchWishlist: async () => {
    set({ isLoading: true, error: null });
    try {
      const resp = await attireRentService.getAll();
      const rows = Array.isArray(resp) ? resp : (resp as unknown as { data?: AttireRent[] })?.data || resp || [];
      const today = new Date();
      const future = rows.filter(
        (r: AttireRent) => r.rentDate && new Date(r.rentDate) > today
      );
      set({ list: future, isLoading: false });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      set({ error: msg, isLoading: false, list: [] });
      console.warn(e);
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),

  setRowsPerPage: (rows) => set({ rowsPerPage: rows, currentPage: 1 }),

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  setSelectedDate: (date) => set({ selectedDate: date, currentPage: 1 }),

  clearDateFilter: () => set({ selectedDate: undefined, currentPage: 1 }),

  setError: (error) => set({ error }),
}));
