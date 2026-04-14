import { create } from "zustand";

interface ItemFilterState {
  searchValue: string;
  showSuggestions: boolean;
  setSearchValue: (value: string) => void;
  setShowSuggestions: (show: boolean) => void;
  clearSearch: () => void;
}

export const useItemFilterStore = create<ItemFilterState>((set) => ({
  searchValue: "",
  showSuggestions: false,
  setSearchValue: (value) => set({ searchValue: value, showSuggestions: true }),
  setShowSuggestions: (show) => set({ showSuggestions: show }),
  clearSearch: () => set({ searchValue: "", showSuggestions: false }),
}));
