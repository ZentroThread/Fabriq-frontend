import { employeeProductionService } from "@/services/employee-production.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  EmployeeProductionRequest,
  EmployeeProductionResponse,
} from "@/types/employee-product.type";
import { swalSuccess, swalError } from "@/utils/swal";
import type { AxiosError } from "axios";

export const useEmployeeProductionsByEmployee = (employeeId: number) => {
  return useQuery<EmployeeProductionResponse[]>({
    queryKey: ["employee-productions", employeeId],
    queryFn: () => employeeProductionService.getByEmployee(employeeId),
    enabled: !!employeeId,
  });
};
export const useAddEmployeeProduction = (
  employeeId: number,
  month: string,
  year: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<EmployeeProductionRequest>) =>
      employeeProductionService.addProductionRecord(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee-productions", employeeId, month, year],
      });
      swalSuccess("Success", "Production record added successfully.");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      swalError(
        "Error",
        error?.response?.data?.message || "Failed to add production record."
      );
    },
  });
};

export const useUpdateEmployeeProduction = (
  employeeId: number,
  month: string,
  year: string
) => {
  const queryClient = useQueryClient();

  return useMutation<
    EmployeeProductionResponse,
    AxiosError<{ message: string }>,
    { id: number; data: Partial<EmployeeProductionRequest> }
  >({
    mutationFn: ({ id, data }) =>
      employeeProductionService.updateProductionRecord(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee-productions", employeeId, month, year],
      });
      swalSuccess("Success", "Production record updated successfully.");
    },
    onError: (error) => {
      swalError(
        "Error",
        error?.response?.data?.message || "Failed to update production record."
      );
    },
  });
};

export const useDeleteEmployeeProduction = (
  employeeId: number,
  month: string,
  year: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      employeeProductionService.deleteProductionRecord(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee-productions", employeeId, month, year],
      });
      swalSuccess("Success", "Production record deleted successfully.");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      swalError(
        "Error",
        error?.response?.data?.message || "Failed to delete production record."
      );
    },
  });
};

export const useEmployeeProdByEmpAndMonthYear = (
  employeeId: number,
  month: string,
  year: string
) => {
  return useQuery<EmployeeProductionResponse[]>({
    queryKey: ["employee-productions", employeeId, month, year],
    queryFn: () => {
      return employeeProductionService.getByDateRangeAndEmployee(
        employeeId,
        year,
        month
      );
    },
    enabled: !!employeeId && !!month && !!year,
  });
};
