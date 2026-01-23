import {useTotalSalary} from "../employee/payroll/useTotalSalary";
import {useMonthlyBillSummary} from "../bill/useMonthlyBillSummary";

export const useTotalProfit = (monthRange?: string) => {

  const { summaryForSelectedMonthRange } = useMonthlyBillSummary(monthRange);
  
  const { totalSalary, isLoading: salaryLoading, error: salaryError } = useTotalSalary(monthRange);

  const totalProfit = summaryForSelectedMonthRange.reduce((acc, month) => acc + month.total, 0) - totalSalary;

  const isLoading = salaryLoading; 
  const error = salaryError; 

  return { totalProfit, isLoading, error };
}