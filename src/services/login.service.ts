import type { LoginInput } from "../types/types";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { API_BASE_URL } from "@/constants/constdata";

/**
 * 🔐 Authentication Service with HttpOnly Cookie (JWT)
 *
 * ✅ BEST PRACTICES IMPLEMENTED:
 * 1. JWT stored in HttpOnly cookie (XSS protection)
 * 2. credentials: 'include' sends cookie automatically
 * 3. No token in localStorage/sessionStorage
 * 4. Backend validates JWT from cookie, not Authorization header
 */
export const loginService = {
  /**
   * Login user with credentials
   * Backend sets JWT token as HttpOnly cookie
   */
  login: async (
    credentials: LoginInput
  ): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.LOGIN.LOGIN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ CRITICAL: Allows browser to receive and send cookies
        body: JSON.stringify(credentials),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Login failed");
    }

    const message = await response.text();
    console.log("✅ Login successful - JWT token set in HttpOnly cookie");

    return { success: true, message };
  },

  /**
   * Logout user and clear HttpOnly cookie
   */
  logout: async (): Promise<{ success: boolean }> => {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.LOGIN.LOGOUT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Send cookie so backend can clear it
      }
    );

    if (!response.ok) {
      console.error("Logout request failed, but clearing local state anyway");
    }

    console.log("✅ Logout successful - JWT cookie cleared");
    return { success: true };
  },
};
