import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Employee } from "@/types/employee.type";
import { employeeService } from "@/services/employee.service";
import { toast } from "sonner";
import type { AxiosError } from "axios";

type UpdateEmployeeData = {
  code: string;
  data: Partial<Employee>;
  image?: File;
};

type ApiErrorResponse = {
  message?: string;
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ code, data, image }: UpdateEmployeeData) => 
      employeeService.updateEmployee(code, data, image),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["employee", variables.code] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee updated successfully.");
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Failed to update employee.");
    },
  });
};
