import { billingService } from "@/services/billing.service";
import type { Bill } from "@/types/bill.type";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/swal";
import { logger } from "@/utils/logger";
import { useAuthStore } from "@/store/user-auth-store";

export const useGetAllBills = () => {
  const user = useAuthStore((state) => state.user);
  const hasAccess = user?.role === "owner" || user?.role === "cashier";

  return useQuery({
    queryKey: ["bills"],
    queryFn: async (): Promise<Bill[]> => {
      try {
        const data = await billingService.getAllBillings();
        return data.map((bill) => ({
          ...bill,
          billingTotal: String(bill.billingTotal),
          custCode: bill.customer?.custCode,
          customer: undefined,
        })) as Bill[];
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error, "Failed to fetch bills");
        logger.error(errorMessage, error, true);
        throw error;
      }
    },
    retry: 1,
    enabled: !!hasAccess,
  });
};
