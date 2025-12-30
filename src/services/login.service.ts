import axios from "axios";
import type { LoginInput, TokenResponse, User } from "../types/types";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { apiClient } from "@/lib/client";

export const loginService = {
  /**
   * Login user with credentials
   * Backend sets JWT tokens as HttpOnly cookies
   */
  login: async (credentials: LoginInput): Promise<TokenResponse> => {
    try {
      const response = await apiClient.request<TokenResponse>(
        API_ENDPOINTS.LOGIN.LOGIN,
        {
          method: "POST",
          data: credentials,
        }
      );

      console.log(
        "✅ Login successful - Access & Refresh tokens set in HttpOnly cookies"
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || "Login failed. Try again.");
      }
      throw error;
    }
  },

  /**
   * Get current user profile (validates JWT from HttpOnly cookie)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUserProfile: async (_p0: unknown): Promise<User> => {
    const user = await apiClient.request<User>(
      API_ENDPOINTS.LOGIN.GETCURRENTUSER,
      {
        method: "GET",
      }
    );
    return user;
  },

  /**
   * Refresh access token using refresh token
   */
  refreshToken: async (): Promise<TokenResponse> => {
    try {
      const response = await apiClient.request<TokenResponse>(
        API_ENDPOINTS.LOGIN.REFRESH,
        {
          method: "POST",
        }
      );
      console.log("🔄 Tokens refreshed successfully");
      return response;
    } catch (error) {
      console.error("❌ Token refresh failed:", error);
      throw error;
    }
  },

  /**
   * Logout user and clear HttpOnly cookies
   */
  logout: async (): Promise<{ success: boolean }> => {
    try {
      await apiClient.request(API_ENDPOINTS.LOGIN.LOGOUT, {
        method: "POST",
      });
    } catch {
      console.error("Logout request failed, but clearing local state anyway");
    }
    return { success: true };
  },
};
