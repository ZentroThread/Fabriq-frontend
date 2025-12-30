import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Employee } from "@/types/employee.type";
import { employeeService } from "@/services/employee.service";

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      code,
      data,
    }: {
      code: string;
      data: Partial<Employee>;
    }) => employeeService.updateEmployee(code, data),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["employee", variables.code],
      });
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};
