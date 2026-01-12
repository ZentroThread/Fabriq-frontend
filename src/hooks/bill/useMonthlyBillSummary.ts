import { useGetAllBills } from "./useBill";
import { useMemo } from "react";

export const useMonthlyBillSummary = () => {
  const { data: bills } = useGetAllBills();

  const monthlySummary = useMemo(() => {
    if (!bills) return [];

    const summaryMap: Record<string, number> = {};

    bills.forEach((bill) => {
      const date = new Date(bill.billingDate || "");
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!summaryMap[monthYear]) {
        summaryMap[monthYear] = 0;
      }
      summaryMap[monthYear] += bill.billingTotal ? parseFloat(bill.billingTotal) : 0;
    });

    const summaryArray = Object.entries(summaryMap).map(([month, total]) => ({
      month,
      total,
    }));

    summaryArray.sort((a, b) => (a.month > b.month ? 1 : -1));

    return summaryArray;
  }, [bills]);

  return { monthlySummary };
};