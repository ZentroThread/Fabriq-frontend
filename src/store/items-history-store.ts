import { create } from "zustand";

// Define types
export interface AttireRent {
  id?: number;
  attireCode?: string;
  custCode?: string;
  billingCode?: string;
  rentDate?: string;
  returnDate?: string;
  rentDuration?: number;
  attire?: {
    attireCode?: string;
    category?: {
      categoryId?: number;
    };
  };
}

export interface AggregatedItem {
  code: string;
  upcomingCount: number;
  previousCount: number;
  totalCount: number;
  rents: string[];
  categoryId?: number;
}

interface ItemsHistoryStore {
  // State
  list: AttireRent[];
  loading: boolean;
  agg: AggregatedItem[];
  error: string | null;
  categoryFilter: string;
  currentPage: number;
  rowsPerPage: number;
  itemQuery: string;
  showSuggestions: boolean;
  categories: number[];
  codes: string[];

  // Actions
  setList: (list: AttireRent[]) => void;
  setLoading: (loading: boolean) => void;
  setAgg: (agg: AggregatedItem[]) => void;
  setError: (error: string | null) => void;
  setCategoryFilter: (filter: string) => void;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  setItemQuery: (query: string) => void;
  setShowSuggestions: (show: boolean) => void;
  setCategories: (categories: number[]) => void;
  setCodes: (codes: string[]) => void;
  resetFilters: () => void;
}

export const useItemsHistoryStore = create<ItemsHistoryStore>((set) => ({
  // Initial state
  list: [],
  loading: true,
  agg: [],
  error: null,
  categoryFilter: "",
  currentPage: 1,
  rowsPerPage: 10,
  itemQuery: "",
  showSuggestions: false,
  categories: [],
  codes: [],

  // Actions
  setList: (list) => set({ list }),
  setLoading: (loading) => set({ loading }),
  setAgg: (agg) => set({ agg }),
  setError: (error) => set({ error }),
  setCategoryFilter: (filter) =>
    set({ categoryFilter: filter, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setRowsPerPage: (rows) => set({ rowsPerPage: rows, currentPage: 1 }),
  setItemQuery: (query) => set({ itemQuery: query, currentPage: 1 }),
  setShowSuggestions: (show) => set({ showSuggestions: show }),
  setCategories: (categories) => set({ categories }),
  setCodes: (codes) => set({ codes }),
  resetFilters: () =>
    set({
      categoryFilter: "",
      itemQuery: "",
      currentPage: 1,
    }),
}));
