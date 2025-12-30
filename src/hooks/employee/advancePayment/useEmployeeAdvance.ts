import { employeeAdvanceService } from "@/services/employee-advance.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type AdvancePaymentResponse, type AdvancePaymentRequest } from "@/types/advance-payment.type";

export const useAddEmployeeAdvancePayment = (empId: number, year: string, month: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdvancePaymentRequest>) => employeeAdvanceService.addAdvancePayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-advance-payments", empId, month, year] });
      alert("Advance payment added successfully.");
    },
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
      alert("Advance payment deleted successfully.");
    },
  });
};

export const useUpdateEmployeeAdvancePayment = (empId: number, year: string, month: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdvancePaymentRequest> }) =>
      employeeAdvanceService.updateAdvancePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-advance-payments", empId, month, year] });
      alert("Advance payment updated successfully.");
    },
  });
};
