import { useQuery } from "@tanstack/react-query";
import { itemService } from "@/services/item.service";
import { getErrorMessage } from "@/utils/swal";
import { logger } from "@/utils/logger";

export const useGetAllAttire = () => {
  return useQuery({
    queryKey: ["all-attires"],
    queryFn: async () => {
      try {
        return await itemService.getAllItems();
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(
          error,
          "Failed to fetch attire items"
        );
        logger.error("Failed to load attire", error, true);
        throw error;
      }
    },
    retry: 1,
  });
};

export const useAttireGetById = (id: string) => {
  return useQuery({
    queryKey: ["attire", id],
    queryFn: async () => {
      try {
        return await itemService.getItemByAttireId(id);
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(
          error,
          "Failed to fetch attire item"
        );
        logger.error("Failed to load attire", error, true);
        throw error;
      }
    },
    retry: 1,
  });
};
