import axios from "axios";
import type { LoginInput } from "../types/types";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { apiClient } from "@/api/client";

export const loginService = {
  /**
   * Login user with credentials
   * Backend sets JWT token as HttpOnly cookie
   */
  login: async (
    credentials: LoginInput
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.requestText(API_ENDPOINTS.LOGIN.LOGIN, {
        method: "POST",
        data: credentials,
      });

      console.log("✅ Login successful - JWT token set in HttpOnly cookie");
      return { success: true, message: response };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || "Login failed");
      }
      throw error;
    }
  },

  /**
   * Logout user and clear HttpOnly cookie
   */
  logout: async (): Promise<{ success: boolean }> => {
    try {
      await apiClient.request(API_ENDPOINTS.LOGIN.LOGOUT, {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout request failed, but clearing local state anyway");
    }
    return { success: true };
  },
};
