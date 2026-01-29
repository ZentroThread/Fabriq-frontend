import { employeeAdvanceService } from "@/services/employee-advance.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type AdvancePaymentResponse,
  type AdvancePaymentRequest,
} from "@/types/advance-payment.type";
import { swalSuccess, swalError, getErrorMessage } from "@/utils/swal";

export const useAddEmployeeAdvancePayment = (
  empId: number,
  year: string,
  month: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdvancePaymentRequest>) =>
      employeeAdvanceService.addAdvancePayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee-advance-payments", empId, month, year],
      });
      swalSuccess("Success", "Advance payment added successfully.");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(
        error,
        "Failed to add advance payment"
      );
      console.error("❌ Error adding advance payment:", error);
      swalError("Failed to add advance payment", errorMessage);
    },
  });
};

export const useGetAdvanceByEmpAndMonthYear = (
  empId: number,
  year: string,
  month: string
) => {
  return useQuery<AdvancePaymentResponse[]>({
    queryKey: ["employee-advance-payments", empId, month, year],
    queryFn: () => {
      return employeeAdvanceService.getByEmployeeDateRange(empId, year, month);
    },
    enabled: !!empId && !!month && !!year,
  });
};

export const useDeleteEmployeeAdvancePayment = (
  empId: number,
  year: string,
  month: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => employeeAdvanceService.deleteAdvancePayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee-advance-payments", empId, month, year],
      });
      swalSuccess("Success", "Advance payment deleted successfully.");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(
        error,
        "Failed to delete advance payment"
      );
      console.error("❌ Error deleting advance payment:", error);
      swalError("Failed to delete advance payment", errorMessage);
    },
  });
};

export const useUpdateEmployeeAdvancePayment = (
  empId: number,
  year: string,
  month: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<AdvancePaymentRequest>;
    }) => employeeAdvanceService.updateAdvancePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee-advance-payments", empId, month, year],
      });
      swalSuccess("Success", "Advance payment updated successfully.");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(
        error,
        "Failed to update advance payment"
      );
      console.error("❌ Error updating advance payment:", error);
      swalError("Failed to update advance payment", errorMessage);
    },
  });
};
