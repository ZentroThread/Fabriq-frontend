import { categoryService } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/swal";
import { logger } from "@/utils/logger";

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
        logger.error(errorMessage, error, true);
        throw error;
      }
    },
    retry: 1,
  });
};
