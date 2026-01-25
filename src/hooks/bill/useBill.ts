import { billingService } from "@/services/billing.service";
import type { Bill } from "@/types/bill.type";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/swal";
import Swal from "sweetalert2";

export const useGetAllBills = () => {
  return useQuery<Bill[]>({
    queryKey: ["bills"],
    queryFn: async () => {
      try {
        return await billingService.getAllBillings();
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error, "Failed to fetch bills");
        console.error("❌ Error fetching bills:", error);
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
  });
};
