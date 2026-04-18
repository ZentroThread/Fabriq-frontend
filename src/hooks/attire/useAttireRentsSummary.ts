import { useGetAllAttireRents } from "./useAttireRents";
import { useGetAllCustomers } from "../customer/useCustomer";
import type { BackendCustomerPayload } from "@/types/item.types";

type AttireRentsSummary = {
  activeRentsCount: number;
  dueReturnsCount: number;
  overdueReturnsCount: number;
  newAttireRentsThisWeek: number;
  rentWithCustomerDetails?: AttireRentSummaryWithCustomer[];
};

type AttireRentSummaryWithCustomer = {
  customerName?: string;
  attireName?: string;
  returnDate: string | null;
  isOverdue: boolean;
};

export const useAttireRentsSummary = (): AttireRentsSummary => {
  const { data: attireRents } = useGetAllAttireRents();
  const { data: customers } = useGetAllCustomers();

  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  let activeRentsCount = 0;
  let dueReturnsCount = 0;
  let overdueReturnsCount = 0;
  let newAttireRentsThisWeek = 0;

  const rentWithCustomerDetails: AttireRentSummaryWithCustomer[] = [];

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

    // Rent with Customer Details
    const today = new Date();
    const isOverdue = returnDate ? returnDate < today : false;
    const customer = customers?.find(
      (customer: BackendCustomerPayload) => customer.custCode === rent.custCode
    );
    const customerName = customer?.custName;
    const attireName = rent.attireCode;
    const returnDateStr = returnDate ? returnDate.toLocaleDateString() : null;
    const rentWithCustomerDetail = {
      customerName,
      attireName,
      returnDate: returnDateStr,
      isOverdue,
    };

    rentWithCustomerDetails.push(rentWithCustomerDetail);
  });

  return {
    activeRentsCount,
    dueReturnsCount,
    overdueReturnsCount,
    newAttireRentsThisWeek,
    rentWithCustomerDetails,
  };
};
