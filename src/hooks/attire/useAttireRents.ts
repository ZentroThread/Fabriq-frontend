import { billingService } from "@/services/billing.service";
import { useQuery } from "@tanstack/react-query";
import type { AttireRent } from "@/types/attireRent.type";
import { getErrorMessage } from "@/utils/swal";
import { logger } from "@/utils/logger";
import { useAuthStore } from "@/store/user-auth-store";

export const useGetAllAttireRents = () => {
  const user = useAuthStore((state) => state.user);
  const hasAccess = user?.role === "owner" || user?.role === "cashier";

  return useQuery<AttireRent[]>({
    queryKey: ["attire-rents"],
    queryFn: async () => {
      try {
        return await billingService.getAllAttireRents();
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(
          error,
          "Failed to fetch attire rentals"
        );
        logger.error(errorMessage, error, true);
        throw error;
      }
    },
    retry: 1,
    enabled: hasAccess,
  });
};
