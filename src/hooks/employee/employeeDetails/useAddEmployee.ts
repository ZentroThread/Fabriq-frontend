import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Employee } from "@/types/employee.type";
import { employeeService } from "@/services/employee.service";
import {swalSuccess,swalError} from "@/utils/swal";
import type { AxiosError } from "axios";

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
    onError: (error: AxiosError<{ message: string }>) => {
      swalError("Error", error?.response?.data?.message || "Failed to add employee.");
    },
  });
};
