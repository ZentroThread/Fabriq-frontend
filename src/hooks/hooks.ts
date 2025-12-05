import { addItemFormSchema } from "@/schemas/user.schema";
import type { AddItemFormValues } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ThemeProviderContext } from "../providers/theme-provider";

export function useAddItemForm() {
  return useForm<AddItemFormValues>({
    resolver: zodResolver(addItemFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    },
  });
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

