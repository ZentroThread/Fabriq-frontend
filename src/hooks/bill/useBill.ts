import { billingService } from "@/services/billing.service";
import type { Bill } from "@/types/bill.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBills = () => {
  return useQuery<Bill[]>({
    queryKey: ["bills"],
    queryFn: () => {
      return billingService.getAllBillings();
    },
    retry: false,
  });
}