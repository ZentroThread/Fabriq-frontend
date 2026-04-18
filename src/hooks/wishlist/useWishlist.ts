import { useQuery } from "@tanstack/react-query";
import { attireRentService } from "@/services/attireRent.service";
import type { AttireRent } from "@/store/wishlist-store";
import { getErrorMessage } from "@/utils/swal";
import { logger } from "@/utils/logger";

export const useGetAllWishlist = () => {
  return useQuery<AttireRent[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      try {
        const resp = await attireRentService.getAll();
        const rows = Array.isArray(resp)
          ? resp
          : (resp as unknown as { data?: AttireRent[] })?.data || resp || [];
        const today = new Date();
        const future = rows.filter(
          (r: AttireRent) => r.rentDate && new Date(r.rentDate) > today
        );
        return future;
      } catch (error: unknown) {
        const msg = getErrorMessage(error, "Failed to fetch wishlist");
        logger.error(msg, error, true);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};
