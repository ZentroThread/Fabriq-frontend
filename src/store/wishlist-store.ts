import { create } from "zustand";

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
  currentPage: number;
  rowsPerPage: number;
  searchQuery: string;
  selectedDate: Date | undefined;

  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDate: (date: Date | undefined) => void;
  clearDateFilter: () => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  currentPage: 1,
  rowsPerPage: 10,
  searchQuery: "",
  selectedDate: undefined,

  setCurrentPage: (page) => set({ currentPage: page }),

  setRowsPerPage: (rows) => set({ rowsPerPage: rows, currentPage: 1 }),

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  setSelectedDate: (date) => set({ selectedDate: date, currentPage: 1 }),

  clearDateFilter: () => set({ selectedDate: undefined, currentPage: 1 }),
}));
