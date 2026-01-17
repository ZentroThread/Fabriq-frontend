import { categoryService } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["attire-categories"],
    queryFn: () => {
      return categoryService.getAllCategories();
    },
    retry: false,
  });
};
