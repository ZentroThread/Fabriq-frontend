import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Employee } from "@/types/employee.type";
import { employeeService } from "@/services/employee.service";

export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: Partial<Employee>) =>
      employeeService.addEmployee(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      alert("Employee added successfully!");
      navigate("/emp");
    },
  });
}