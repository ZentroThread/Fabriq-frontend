import { addItemFormSchema } from "@/schemas/user.schema";
import type { AddItemFormValues } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ThemeProviderContext } from "../providers/theme-provider";
import { useAuthStore } from "@/store/user-auth-store";
import { useMutation } from "@tanstack/react-query";
import { extractUserFromToken } from "@/lib/jwt";
import type { User } from "../types/types";
import { loginUser } from "@/api/login";
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

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);

  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data: { token: string }) => {
      try {
        // Decode JWT token to extract role and userId
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        const role = payload.role;
        const userId = payload.userId || payload.id;

        if (!role || !userId) {
          throw new Error("Invalid token: missing role or user ID");
        }

        // Extract user details from JWT token
        const userDetails = extractUserFromToken(data.token, role, userId);

        if (!userDetails || !userDetails.id || !userDetails.role) {
          throw new Error("Invalid token: missing user information");
        }

        // Store auth data in Zustand
        setAuth(userDetails as User, data.token);
        setLoading(false);
      } catch (error) {
        setError("Failed to decode user information from token");
        setLoading(false);
        throw error;
      }
    },
    onError: (error: Error) => {
      setError(error.message || "Login failed");
      setLoading(false);
    },
  });
};
