import { useMonthlyBillSummary } from "../bill/useMonthlyBillSummary";
import { useTotalSalary } from "../employee/payroll/useTotalSalary";
import { useMemo } from "react";

export const useMonthlyProfitRevenue = (monthRange?: string) => {
  const { summaryForSelectedMonthRange } = useMonthlyBillSummary(monthRange);

  const {
    totalSalary,
    isLoading: salaryLoading,
    error: salaryError,
  } = useTotalSalary(monthRange);

  const chartData = useMemo(() => {
    if (!summaryForSelectedMonthRange) return [];

    return summaryForSelectedMonthRange.map((monthData) => {
      const revenue = monthData.total;
      const profit =
        revenue - totalSalary / summaryForSelectedMonthRange.length;

      const [year, month] = monthData.month.split("-").map(Number);
      const date = new Date(year, month - 1, 1);
      const monthLabel = date.toLocaleString("default", { month: "short" });

      return {
        month: monthLabel,
        revenue,
        profit,
      };
    });
  }, [summaryForSelectedMonthRange, totalSalary]);

  const isLoading = salaryLoading;
  const error = salaryError;

  return { chartData, isLoading, error };
};
