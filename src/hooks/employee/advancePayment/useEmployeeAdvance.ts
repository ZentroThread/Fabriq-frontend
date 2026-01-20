import { employeeAdvanceService } from "@/services/employee-advance.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type AdvancePaymentResponse, type AdvancePaymentRequest } from "@/types/advance-payment.type";
import { swalSuccess, swalError } from "@/utils/swal";

export const useAddEmployeeAdvancePayment = (empId: number, year: string, month: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdvancePaymentRequest>) => employeeAdvanceService.addAdvancePayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-advance-payments", empId, month, year] });
      swalSuccess("Success", "Advance payment added successfully.");
    },
    onError: (error: any) => {
      swalError("Error", error?.response?.data?.message || "Failed to add advance payment.");
    }
  });
};

export const useGetAdvanceByEmpAndMonthYear = (empId: number, year: string, month: string) => {
  return useQuery<AdvancePaymentResponse[]>({
    queryKey: ["employee-advance-payments", empId, month, year],
    queryFn: () => {
      return employeeAdvanceService.getByEmployeeDateRange(empId, year, month);
    },
    enabled: !!empId && !!month && !!year,
  });
};

export const useDeleteEmployeeAdvancePayment = (empId: number, year: string, month: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => employeeAdvanceService.deleteAdvancePayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-advance-payments", empId, month, year] });
      swalSuccess("Success", "Advance payment deleted successfully.");
    },
    onError: (error: any) => {
      swalError("Error", error?.response?.data?.message || "Failed to delete advance payment.");
    }
  });
};

export const useUpdateEmployeeAdvancePayment = (empId: number, year: string, month: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdvancePaymentRequest> }) =>
      employeeAdvanceService.updateAdvancePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-advance-payments", empId, month, year] });
      swalSuccess("Success", "Advance payment updated successfully.");
    },
    onError: (error: any) => {
      swalError("Error", error?.response?.data?.message || "Failed to update advance payment.");
    }
  });
};
