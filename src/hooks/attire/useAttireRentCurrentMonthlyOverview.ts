import { useGetAllAttireRents } from "./useAttireRents";
import { useItems } from "../useItems";

export type CategoryType = "saree" | "nilame" | "jwelary";

type CurrentMonthlyOverview = {
  category: CategoryType;
  value: number;
  percentage: number;
};

const isCategoryType = (value: string): value is CategoryType =>
  value === "saree" || value === "nilame" || value === "jwelary";

export const useAttireRentCurrentMonthlyOverview =
  (): CurrentMonthlyOverview[] => {
    const { data: attireRents } = useGetAllAttireRents();
    const { data: items } = useItems();

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const rentsThisMonth =
      attireRents?.filter((rent) => {
        if (!rent.rentDate) return false;
        const rentDate = new Date(rent.rentDate);
        return (
          rentDate.getMonth() === currentMonth &&
          rentDate.getFullYear() === currentYear
        );
      }) || [];

    const categoryRentCounts: Partial<Record<CategoryType, number>> = {};

    rentsThisMonth.forEach((rent) => {
      const item = items?.find((itm) => itm.code === rent.attireCode);
      const categoryName = item?.category?.categoryName;

      if (categoryName && isCategoryType(categoryName)) {
        categoryRentCounts[categoryName] =
          (categoryRentCounts[categoryName] ?? 0) + 1;
      }
    });

    const totalRents = rentsThisMonth.length;

    const overview: CurrentMonthlyOverview[] = Object.entries(
      categoryRentCounts
    ).map(([category, rentCount]) => ({
      category: category as CategoryType,
      value: rentCount ?? 0,
      percentage: totalRents ? ((rentCount ?? 0) / totalRents) * 100 : 0,
    }));

    return overview;
  };
