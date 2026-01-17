import { useQuery } from "@tanstack/react-query";
import type { Employee } from "@/types/employee.type";
import { employeeService } from "@/services/employee.service";

export function useEmployees() {
  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: employeeService.getAll,
  });
}
