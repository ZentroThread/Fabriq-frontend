import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Employee } from "@/types/employee.type";
import { employeeService } from "@/services/employee.service";
import { swalSuccess, swalError, getErrorMessage } from "@/utils/swal";

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
      swalSuccess("Success", "Employee added successfully.");
      navigate("/emp");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, "Failed to add employee");

      swalError("Failed to add employee", errorMessage);
    },
  });
};
