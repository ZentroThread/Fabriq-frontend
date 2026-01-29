import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Employee } from "@/types/employee.type";
import { employeeService } from "@/services/employee.service";
import { swalSuccess, swalError, getErrorMessage } from "@/utils/swal";

type UpdateEmployeeData = {
  code: string;
  data: Partial<Employee>;
  image?: File;
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

    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, "Failed to update employee");
      console.error("❌ Error updating employee:", error);
      swalError("Failed to update employee", errorMessage);
    },
  });
};
