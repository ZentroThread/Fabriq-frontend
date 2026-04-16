import { useGetAllBills } from "./useBill";
import { useMemo } from "react";
import { getStartDateFromRange } from "@/utils/date";

type MonthlySummary = {
  month: string;
  total: number;
};

export const useMonthlyBillSummary = (monthRange?: string) => {
  const { data: bills } = useGetAllBills();

  const filteredBills = useMemo(() => {
    if (!bills) return [];

    if (!monthRange) return bills;

    const startDate = getStartDateFromRange(monthRange);

    return bills.filter((bill) => {
      if (!bill.billingDate) return false;
      return new Date(bill.billingDate) >= startDate;
    });
  }, [bills, monthRange]);

  const summaryForThisMonth = useMemo(() => {
    if (!bills) return { totalAmount: 0, billCount: 0 };

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthBills = bills.filter((bill) => {
      if (!bill.billingDate) return false;
      const d = new Date(bill.billingDate);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totalAmount = thisMonthBills.reduce(
      (sum, bill) => sum + Number(bill.billingTotal || 0),
      0
    );

    return {
      totalAmount,
      billCount: thisMonthBills.length,
    };
  }, [bills]);

  const summaryForSelectedMonthRange: MonthlySummary[] = useMemo(() => {
    const summaryMap: Record<string, number> = {};

    filteredBills.forEach((bill) => {
      if (!bill.billingDate) return;

      const date = new Date(bill.billingDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;

      summaryMap[key] = (summaryMap[key] ?? 0) + Number(bill.billingTotal || 0);
    });

    return Object.entries(summaryMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total }));
  }, [filteredBills]);

  const totalOrdersByMonthRange = filteredBills.length;

  const billDetailsForSelectedRange = filteredBills;

  const monthlySummary = useMemo(() => {
    if (!bills) return [];

    const summaryMap: Record<string, number> = {};

    const months: string[] = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months.push(key);
      summaryMap[key] = 0;
    }

    bills.forEach((bill) => {
      if (!bill.billingDate) return;

      const date = new Date(bill.billingDate);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (monthYear in summaryMap) {
        summaryMap[monthYear] += bill.billingTotal
          ? parseFloat(bill.billingTotal)
          : 0;
      }
    });

    return months.map((month) => ({
      month,
      total: summaryMap[month],
    }));
  }, [bills]);

  return {
    summaryForThisMonth,
    summaryForSelectedMonthRange,
    totalOrdersByMonthRange,
    billDetailsForSelectedRange,
    monthlySummary,
  };
};
