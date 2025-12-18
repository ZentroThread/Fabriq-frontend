import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "@/api/employee-api";
import type { Employee } from "@/types/employee.type";

export const useUpdateEmployee = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ code, data }: { code: string; data: Partial<Employee> | undefined }) =>
      updateEmployee(code, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },

  });

};
