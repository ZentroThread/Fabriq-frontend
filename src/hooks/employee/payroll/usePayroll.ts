import { payrollService } from "@/services/payroll.service";
import { useQuery,useMutation, useQueryClient} from "@tanstack/react-query";
import { type PayrollRecordResponseType, type PayRollResponseType } from "@/types/payroll-type";
import { toast } from "sonner";

export const useGetPayroll = (empId: number, month: number, year: number) => {
  return useQuery<PayRollResponseType>({
    queryKey: ["payroll", empId, month, year],
    queryFn: () => payrollService.generatePayroll(empId, month, year),
    enabled: !!empId && !!month && !!year,
  });
}

  export const useGetPayrollRecord = (empId: number, year: number) => {
    return useQuery<PayrollRecordResponseType[]>({
      queryKey: ["payroll-record", empId, year],
      queryFn: () => payrollService.getPayrollRecord(empId, year),
      enabled: !!empId && !!year,
    });
  };

  export const useConfirmPayroll = (empId: number, month: number, year: number) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => payrollService.confirmPayroll(empId, month, year),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["payroll-record", empId, year] });
        toast.success("Payroll confirmed successfully.");
      },
    });
  };