import { useQuery } from "@tanstack/react-query";
import type { Employee } from "@/types/employee.type";
import { employeeService } from "@/services/employee.service";
import { useAuthStore } from "@/store/user-auth-store";

export function useEmployees() {
  const user = useAuthStore((state) => state.user);
  // Only allow owner to fetch employees
  const hasAccess = user?.role === "owner";

  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: employeeService.getAll,
    enabled: hasAccess, // Only fetch if user has access
  });
}
