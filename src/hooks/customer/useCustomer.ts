import { billingService } from "@/services/billing.service";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/swal";
import { logger } from "@/utils/logger";
import { useAuthStore } from "@/store/user-auth-store";

export const FetchCustomers = () => {
  const user = useAuthStore((state) => state.user);
  const hasAccess = user?.role === "owner" || user?.role === "cashier";

  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      try {
        const data = await billingService.getAllCustomers();
        return data;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(
          error,
          "Failed to fetch customers"
        );
        logger.error(errorMessage, error, true);
        throw error;
      }
    },
    retry: 1,
    enabled: hasAccess,
  });
};
