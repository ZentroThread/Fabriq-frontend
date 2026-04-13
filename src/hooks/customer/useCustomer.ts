import { billingService } from "@/services/billing.service";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/swal";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/user-auth-store";

export const FetchCustomers = () => {
  const user = useAuthStore((state) => state.user);
  // Only allow owner and cashier to fetch customers
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

        // Show error to user
        Swal.fire({
          icon: "error",
          title: "Failed to load customers",
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
