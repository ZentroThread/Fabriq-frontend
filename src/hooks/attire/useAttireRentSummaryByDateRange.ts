import {getStartDateFromRange} from "@/utils/date";
import { useGetAllAttireRents } from "./useAttireRents";
import { useItems } from "../useItems";
import {useMonthlyBillSummary} from "../bill/useMonthlyBillSummary";

type summaryData = {
  category: "saree" | "nilame" | "jwelary";
  totalRentals: number;
  percentage: number;
};

export const useAttireRentSummaryByDateRange = (range?: string): summaryData[] => {

  const { data: attireRents } = useGetAllAttireRents();
  const { data: items } = useItems();
  const {billDetailsForSelectedRange: bills} = useMonthlyBillSummary(range);

  if (!attireRents || !items || !bills) return [];

  const startDate = getStartDateFromRange(range);

  const filteredRents = attireRents?.filter((rent) => {
    if (!rent.rentDate) return false;
    const rentDate = new Date(rent.rentDate);
    return rentDate >= startDate;
  }) || [];

  const categoryRentIncome: Partial<Record<summaryData["category"], number>> = {};

  filteredRents.forEach((rent) => {
    const item = items?.find((itm) => itm.code === rent.attireCode);
    const categoryName = item?.category?.categoryName;

    if (categoryName && (categoryName === "saree" || categoryName === "nilame" || categoryName === "jwelary")) {
      const billingTotal = rent.billingCode 
        ? parseFloat(bills.find(bill => bill.billingCode === rent.billingCode)?.billingTotal ?? "0") 
        : 0;
      categoryRentIncome[categoryName] = (categoryRentIncome[categoryName] ?? 0) + billingTotal;
    }
  });

  const totalIncome = filteredRents.reduce((sum, rent) => sum + (rent.billingCode ? parseFloat(bills.find(bill => bill.billingCode === rent.billingCode)?.billingTotal ?? "0") : 0), 0);

  const summary: summaryData[] = Object.entries(categoryRentIncome).map(([category, totalRentals]) => ({
    category: category as summaryData["category"],
    totalRentals: totalRentals ?? 0,
    percentage: totalIncome ? ((totalRentals ?? 0) / totalIncome) * 100 : 0,
  }));

  return summary;

}