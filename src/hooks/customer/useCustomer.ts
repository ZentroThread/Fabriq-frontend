import { billingService } from "@/services/billing.service";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/swal";
import Swal from "sweetalert2";

export const FetchCustomers = () => {
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
        console.error("❌ Error fetching customers:", error);
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
  });
};
