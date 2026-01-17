import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Employee } from "@/types/employee.type";
import { employeeService } from "@/services/employee.service";
import { toast } from "sonner";

type AddEmployeeData = Partial<Employee> & { image?: File };

export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: AddEmployeeData) =>
      employeeService.addEmployee(data, data.image),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      toast.success("Employee added successfully.");
      navigate("/emp");
    },
  });
};
