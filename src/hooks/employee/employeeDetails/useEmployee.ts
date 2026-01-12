import { useQuery } from "@tanstack/react-query";
import type { Employee } from "@/types/employee.type";
import {employeeService} from "@/services/employee.service";

export function useEmployee(empCode: string | undefined) {
  return useQuery<Employee>({
    queryKey: ["employee", empCode],
    queryFn: () => employeeService.getByEmpCode(empCode!),
    enabled: typeof empCode === "string" && empCode.length > 0,
  });
}
