import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Employee } from "@/types/employee.type";
import { employeeService } from "@/services/employee.service";
import type { AxiosError } from "axios";
import {swalSuccess,swalError} from "@/utils/swal";

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
      swalSuccess("Success", "Employee updated successfully.");
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      swalError("Error", error?.response?.data?.message || "Failed to update employee.");
    },
  });
};
