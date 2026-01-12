import {useAttireRentsSummary} from "@/hooks/attire/useAttireRentsSummary";
import {DashboardRentalCard} from "@/components/molecules/cards/dashboard-rental-card";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

export const RentDetailsSummary = () => {
  const { rentWithCustomerDetails } = useAttireRentsSummary();
  const [startIndex, setStartIndex] = useState(0);

  const rentSummaryForCurrentWeek = rentWithCustomerDetails?.filter((rent) => {
    if (!rent.returnDate) return false;
    const returnDate = new Date(rent.returnDate);
    const now = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);
    return returnDate >= now && returnDate <= oneWeekFromNow;
  });

  useEffect(() => {
    if (!rentSummaryForCurrentWeek?.length) return;

    const interval = setInterval(() => {
      setStartIndex((prev) =>
        (prev + 3) % rentSummaryForCurrentWeek.length
      );
    }, 5000); // ⏱ 5 seconds

    return () => clearInterval(interval);
  }, [rentSummaryForCurrentWeek]);

  const visibleRents =
    rentSummaryForCurrentWeek?.slice(startIndex, startIndex + 3);

  return (
    <div>
      {visibleRents?.map((rent, index) => (
        <DashboardRentalCard
          key={index}
          title={rent.customerName || "No Name"}
          subTitle={rent.attireName || "No Attire"}
          date={rent.returnDate || "No Return Date"}
          icon={
            rent.isOverdue
              ? <RefreshCcw className="text-(--color-bg-red)" />
              : <RefreshCcw className="text-white" />
          }
        />
      ))}
    </div>
  );
};
