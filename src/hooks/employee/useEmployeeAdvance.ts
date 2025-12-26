import { employeeAdvanceService } from "@/services/employee-advance.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdvancePaymentRequest } from "@/types/advance-payment.type";

export const useAddEmployeeAdvancePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdvancePaymentRequest>) => employeeAdvanceService.addAdvancePayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-advance-payments"] });
      alert("Advance payment added successfully.");
    },
  });
};