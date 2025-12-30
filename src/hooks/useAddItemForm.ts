import { addItemFormSchema } from "@/schemas/user.schema";
import type { AddItemFormValues } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//useForm hook for additems
export function useAddItemForm() {
  return useForm<AddItemFormValues>({
    resolver: zodResolver(addItemFormSchema),
    defaultValues: {
      title: "",
      code: "",
      description: "",
      price: "",
      stock: "",
      categoryId: undefined,
      status: "",
      image: undefined,
    },
  });
}
