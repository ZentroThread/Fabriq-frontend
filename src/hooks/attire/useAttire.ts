import { useQuery } from "@tanstack/react-query";
import {itemService} from "@/services/item.service";

export const useGetAllAttire = () => {
  return useQuery({
    queryKey: ["all-attires"],
    queryFn: () => itemService.getAllItems(),
  });
};