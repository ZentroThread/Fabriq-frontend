import { billingService } from "@/services/billing.service";
import { useQuery } from "@tanstack/react-query";
import type { AttireRent } from "@/types/attireRent.type";

export const useGetAllAttireRents = () => {
  return useQuery<AttireRent[]>({
    queryKey: ["attire-rents"],
    queryFn: () => {
      return billingService.getAllAttireRents();
    },
    retry: false,
  });
};
