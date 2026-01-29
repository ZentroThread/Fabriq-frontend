import { billingService } from "@/services/billing.service";
import { useQuery } from "@tanstack/react-query";
import type { AttireRent } from "@/types/attireRent.type";
import { getErrorMessage } from "@/utils/swal";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/user-auth-store";

export const useGetAllAttireRents = () => {
  const user = useAuthStore((state) => state.user);
  // Only allow owner and cashier to fetch attire rentals
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
        console.error("❌ Error fetching attire rentals:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to load rentals",
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
