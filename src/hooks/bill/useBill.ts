import { billingService } from "@/services/billing.service";
import type { Bill } from "@/types/bill.type";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/swal";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/user-auth-store";

export const useGetAllBills = () => {
  const user = useAuthStore((state) => state.user);
  // Only allow owner and cashier to fetch bills
  const hasAccess = user?.role === "owner" || user?.role === "cashier";

  return useQuery<Bill[]>({
    queryKey: ["bills"],
    queryFn: async () => {
      try {
        return await billingService.getAllBillings();
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error, "Failed to fetch bills");

        // Show error to user
        Swal.fire({
          icon: "error",
          title: "Failed to load bills",
          text: errorMessage,
          confirmButtonColor: "#dc2626",
        });
        throw error;
      }
    },
    retry: 1,
    enabled: hasAccess, // Only fetch if user has access
  });
};
