import { payrollService } from "@/services/payroll.service";
import { useQuery} from "@tanstack/react-query";
import { type PayRollResponseType } from "@/types/payroll-type";

export const useGetPayroll = (empId: number, month: number, year: number) => {
  return useQuery<PayRollResponseType>({
    queryKey: ["payroll", empId, month, year],
    queryFn: () => payrollService.generatePayroll(empId, month, year),
    enabled: !!empId && !!month && !!year,
  });
};