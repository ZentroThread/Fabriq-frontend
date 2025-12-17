import { addItemFormSchema } from "@/schemas/user.schema";
import type { AddItemFormValues } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ThemeProviderContext } from "../providers/theme-provider";
import { useAuthStore } from "@/store/user-auth-store";
import { useMutation } from "@tanstack/react-query";
import type { User } from "../types/types";
import { loginService } from "@/services/login.service";
import { API_BASE_URL } from "@/constants/constdata";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { queryClient } from "@/main";
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
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);

  return useMutation({
    mutationFn: loginService.login,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: async () => {
      try {
        // 🔥 Clear localStorage FIRST to remove old tenant data
        localStorage.removeItem("auth-storage");

        // 🔥 Clear all React Query cache to prevent showing old tenant data
        await queryClient.cancelQueries(); // Cancel any in-flight queries
        queryClient.clear(); // Clear all cache
        // JWT is automatically stored in HttpOnly cookie by browser
        // Now fetch user data from /me endpoint (cookie sent automatically)

        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.LOGIN.GETCURRENTUSER}`,
          {
            credentials: "include", // Send cookie
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();

        // Convert backend Login object to frontend User object
        const user: User = {
          id: userData.id,
          username: userData.username,
          role: userData.role,
          tenantId: userData.tenantId,
        };

        // Store user in Zustand (no token needed)
        setUser(user);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user information");
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

//item page
