import { create } from "zustand";
import type { PersistedEmployee } from "@/types/employee.type";
import { persist } from "zustand/middleware";

interface EmployeeStore {
  selectedEmployee: PersistedEmployee | null;
  setSelectedEmployee: (employee: PersistedEmployee | null) => void;

  searchText: string;
  setSearchText: (text: string) => void;
}

const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set) => ({
      selectedEmployee: null,
      setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),

      searchText: "",
      setSearchText: (text) => set({ searchText: text }),
    }),
    {
      name: "employee-store",
      partialize: (state) => ({
        selectedEmployee: state.selectedEmployee
          ? {
              id: state.selectedEmployee.id,
              empCode: state.selectedEmployee.empCode,
              fullName: state.selectedEmployee.fullName,
            }
          : null,
      }),
    }
  )
);

export default useEmployeeStore;
