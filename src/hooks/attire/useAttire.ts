import { useQuery } from "@tanstack/react-query";
import { itemService } from "@/services/item.service";
import { getErrorMessage } from "@/utils/swal";
import Swal from "sweetalert2";

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

        Swal.fire({
          icon: "error",
          title: "Failed to load attire",
          text: errorMessage,
          confirmButtonColor: "#dc2626",
        });
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

        Swal.fire({
          icon: "error",
          title: "Failed to load attire",
          text: errorMessage,
          confirmButtonColor: "#dc2626",
        });
        throw error;
      }
    },
    retry: 1,
  });
};
