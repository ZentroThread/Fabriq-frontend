import { useGetAllBills } from "./useBill";
import { useMemo } from "react";
import {getStartDateFromRange} from "@/utils/date";

export const useMonthlyBillSummary = (monthRange?: string) => {

  const { data: bills } = useGetAllBills();

  const summaryForThisMonth = useMemo(() => {

    if (!bills) return { totalAmount: 0, billCount: 0 };

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const billsThisMonth = bills.filter((bill) => {
      if (!bill.billingDate) return false;
      const billDate = new Date(bill.billingDate);
      return (
        billDate.getMonth() === currentMonth &&
        billDate.getFullYear() === currentYear
      );
    });

    const totalAmount = billsThisMonth.reduce((sum, bill) => {
      return sum + (bill.billingTotal ? parseFloat(bill.billingTotal) : 0);
    }, 0);

    return {
      totalAmount,
      billCount: billsThisMonth.length,
    };
  }, [bills]);

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

  const summaryForSelectedMonthRange = useMemo(() => {
    
    if (!monthRange) return monthlySummary;

    const startDate = getStartDateFromRange(monthRange);
    const startTime = startDate.getTime();

    return monthlySummary.filter(({ month }) => {
      const [year, monthIndex] = month.split("-").map(Number);
      const monthDate = new Date(year, monthIndex - 1, 1);
      return monthDate.getTime() >= startTime;
    });
  }, [monthRange, monthlySummary]);

  const totalOrdersByMonthRange = summaryForSelectedMonthRange.length;

  const billDetailsForSelectedRange = useMemo(() => {
    if (!bills) return [];
    if (!monthRange) return bills;

    const startDate = getStartDateFromRange(monthRange);
    const startTime = startDate.getTime();
    return bills.filter((bill) => {
      if (!bill.billingDate) return false;
      const billDate = new Date(bill.billingDate);
      return billDate.getTime() >= startTime;
    });
  }, [bills, monthRange]);

  return { monthlySummary, summaryForThisMonth, summaryForSelectedMonthRange, totalOrdersByMonthRange, billDetailsForSelectedRange };
};