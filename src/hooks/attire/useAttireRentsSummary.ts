import { useGetAllAttireRents } from "./useAttireRents";

type AttireRentsSummary = {
  activeRentsCount: number;
  dueReturnsCount: number;
  overdueReturnsCount: number;
  newAttireRentsThisWeek: number;
};

export const useAttireRentsSummary = (): AttireRentsSummary => {
  
  const { data: attireRents } = useGetAllAttireRents();

  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  let activeRentsCount = 0;
  let dueReturnsCount = 0;
  let overdueReturnsCount = 0;
  let newAttireRentsThisWeek = 0;

  attireRents?.forEach((rent) => {
    if (!rent.rentDate) return;
    const rentDate = new Date(rent.rentDate);
    const returnDate = rent.returnDate ? new Date(rent.returnDate) : null;

    // Active Rents
    if (!returnDate || returnDate >= now) {
      activeRentsCount++;
    }

    // Due Returns
    if (returnDate && returnDate >= now) {
      dueReturnsCount++;
    }

    // Overdue Returns
    if (returnDate && returnDate < now) {
      overdueReturnsCount++;
    }

    // New Attire Rents This Week
    if (rentDate >= oneWeekAgo && rentDate <= now) {
      newAttireRentsThisWeek++;
    }
  });

  return {
    activeRentsCount,
    dueReturnsCount,
    overdueReturnsCount,
    newAttireRentsThisWeek,
  };
};