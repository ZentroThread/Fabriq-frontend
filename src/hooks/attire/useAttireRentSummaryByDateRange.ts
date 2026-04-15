import { getStartDateFromRange } from "@/utils/date";
import { useGetAllAttireRents } from "./useAttireRents";
import { useItems } from "./useItems";
import { useMonthlyBillSummary } from "../bill/useMonthlyBillSummary";

type summaryData = {
  category: "saree" | "nilame" | "jwelary";
  totalRentals: number;
  percentage: number;
};

type TopSellingProduct = {
  productName: string;
  sales: number;
  revenue: number;
};

export const useAttireRentSummaryByDateRange = (
  range?: string
): summaryData[] => {
  const { data: attireRents } = useGetAllAttireRents();
  const { data: items } = useItems();
  const { billDetailsForSelectedRange: bills } = useMonthlyBillSummary(range);

  if (!attireRents || !items || !bills) return [];

  const startDate = getStartDateFromRange(range);

  const filteredRents = attireRents.filter((rent) => {
    if (!rent.rentDate) return false;
    const rentDate = new Date(rent.rentDate);
    return rentDate >= startDate;
  });

  const categoryRentIncome: Partial<Record<summaryData["category"], number>> =
    {};

  filteredRents.forEach((rent) => {
    const item = items.find((itm) => itm.code === rent.attireCode);
    const categoryName = item?.category?.categoryName;

    if (categoryName && ["saree", "nilame", "jwelary"].includes(categoryName)) {
      const billingTotal = rent.billingCode
        ? parseFloat(
            bills.find((bill) => bill.billingCode === rent.billingCode)
              ?.billingTotal ?? "0"
          )
        : 0;
      categoryRentIncome[categoryName as summaryData["category"]] =
        (categoryRentIncome[categoryName as summaryData["category"]] ?? 0) +
        billingTotal;
    }
  });

  const totalIncome = Object.values(categoryRentIncome).reduce(
    (sum, val) => sum + (val ?? 0),
    0
  );

  const summary: summaryData[] = Object.entries(categoryRentIncome).map(
    ([category, totalRentals]) => ({
      category: category as summaryData["category"],
      totalRentals: totalRentals ?? 0,
      percentage: totalIncome ? ((totalRentals ?? 0) / totalIncome) * 100 : 0,
    })
  );

  return summary;
};

export const useTopSellingProductsByDateRange = (
  range?: string
): TopSellingProduct[] => {
  const { data: attireRents } = useGetAllAttireRents();
  const { data: items } = useItems();
  const { billDetailsForSelectedRange: bills } = useMonthlyBillSummary(range);

  if (!attireRents || !items || !bills) return [];

  const startDate = getStartDateFromRange(range);

  const filteredRents = attireRents.filter((rent) => {
    if (!rent.rentDate) return false;
    const rentDate = new Date(rent.rentDate);
    return rentDate >= startDate;
  });

  const productSalesMap: Record<string, { sales: number; revenue: number }> =
    {};

  filteredRents.forEach((rent) => {
    const item = items.find((itm) => itm.code === rent.attireCode);
    if (!item) return;

    const billing = rent.billingCode
      ? bills.find((b) => b.billingCode === rent.billingCode)
      : undefined;
    const revenue = billing?.billingTotal
      ? parseFloat(billing.billingTotal)
      : 0;

    const productName = item.title || item.code;
    if (!productSalesMap[productName]) {
      productSalesMap[productName] = { sales: 0, revenue: 0 };
    }

    productSalesMap[productName].sales += 1;
    productSalesMap[productName].revenue += revenue;
  });

  return Object.entries(productSalesMap)
    .map(([productName, { sales, revenue }]) => ({
      productName,
      sales,
      revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue);
};
