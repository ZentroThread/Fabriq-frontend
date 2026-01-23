import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeService } from "@/services/employee.service";
import type { Employee } from "@/types/employee.type";
import {swalSuccess,swalError} from "@/utils/swal";
import type { AxiosError } from "axios";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (empCode: string) => employeeService.deleteEmployee(empCode),

    onSuccess: (_data, empCode) => {
        queryClient.setQueryData<Employee[]>(["employees"], (oldEmployees) =>{
          if (!oldEmployees) return [];
          return oldEmployees.filter(emp => emp.empCode !== empCode);
        }
      );
      swalSuccess("Success", "Employee deleted successfully.");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      swalError("Error", error?.response?.data?.message || "Failed to delete employee.");
    },
  });
};
