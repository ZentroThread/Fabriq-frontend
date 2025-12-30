import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeService } from "@/services/employee.service";
import type { Employee } from "@/types/employee.type";
import { toast } from "sonner";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (empCode: string) =>
      employeeService.deleteEmployee(empCode),

    onSuccess: (_data, empCode) => {
        queryClient.setQueryData<Employee[]>(["employees"], (oldEmployees) =>{
          if (!oldEmployees) return [];
          return oldEmployees.filter(emp => emp.empCode !== empCode);
        }
      );
      toast.success("Employee deleted successfully.");
      console.log("From useDeleteEmployee: Deleted employee with code:", empCode);
    },
  });
}