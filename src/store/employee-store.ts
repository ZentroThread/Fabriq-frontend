import { create } from 'zustand';
import type  { Employee } from '@/types/employee.type';

interface EmployeeStore{

  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;

  searchText: string;
  setSearchText: (text: string) => void;

}

const useEmployeeStore = create<EmployeeStore>((set) => ({
  selectedEmployee: null,
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),

  searchText: '',
  setSearchText: (text) => set({ searchText: text }),
}));

export default useEmployeeStore;