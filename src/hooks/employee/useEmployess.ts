import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "@/api/employee-api";
import type { Employee } from "@/types/employee";

export function useEmployees() {
  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });
}