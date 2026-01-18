import {billingService} from "@/services/billing.service";
import { useQuery } from "@tanstack/react-query";

export const FetchCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const data = await billingService.getAllCustomers();
      return data;
    },
  });
};