import axios from "axios";
import type { LoginInput } from "../types/types";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { API_BASE_URL } from "@/constants/constdata";

/**
 * 🔐 Authentication Service with HttpOnly Cookie (JWT)
 *
 * ✅ BEST PRACTICES IMPLEMENTED:
 * 1. JWT stored in HttpOnly cookie (XSS protection)
 * 2. withCredentials: true sends cookie automatically
 * 3. No token in localStorage/sessionStorage
 * 4. Backend validates JWT from cookie, not Authorization header
 */

const authAxios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ CRITICAL: Allows browser to receive and send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginService = {
  /**
   * Login user with credentials
   * Backend sets JWT token as HttpOnly cookie
   */
  login: async (
    credentials: LoginInput
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await authAxios.post(
        API_ENDPOINTS.LOGIN.LOGIN,
        credentials,
        {
          responseType: "text",
        }
      );

      console.log("✅ Login successful - JWT token set in HttpOnly cookie");
      return { success: true, message: response.data };
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
      await authAxios.post(API_ENDPOINTS.LOGIN.LOGOUT);
      console.log("✅ Logout successful - JWT cookie cleared");
    } catch (error) {
      console.error("Logout request failed, but clearing local state anyway");
    }
    return { success: true };
  },
};
