import { useQuery } from "@tanstack/react-query";
import { getEmployeeByCode} from "@/api/employee-api";
import type { Employee } from "@/types/employee";

export function useEmployee(empCode: string | undefined) {
  return useQuery<Employee>({
    queryKey: ["employee", empCode],
    queryFn: () => getEmployeeByCode(empCode!),
    enabled: typeof empCode === "string" && empCode.length > 0,
  });
}
