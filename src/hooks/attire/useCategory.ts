import { categoryService } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/swal";
import Swal from "sweetalert2";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["attire-categories"],
    queryFn: async () => {
      try {
        return await categoryService.getAllCategories();
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(
          error,
          "Failed to fetch categories"
        );
        console.error("❌ Error fetching categories:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to load categories",
          text: errorMessage,
          confirmButtonColor: "#dc2626",
        });
        throw error;
      }
    },
    retry: 1,
  });
};
