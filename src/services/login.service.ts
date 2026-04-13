import axios from "axios";
import type { LoginInput, TokenResponse, User } from "../types/types";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { apiClient } from "@/lib/client";

const isRecord = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object";

const extractMessage = (
  data: unknown,
  fallback = "Login failed. Try again."
) => {
  if (!data) return fallback;
  if (typeof data === "string") return data;

  if (isRecord(data)) {
    // Common backend shapes
    const errorMessage = data["errorMessage"];
    if (typeof errorMessage === "string") return errorMessage;

    const error_code = data["error_code"];
    if (typeof error_code === "string") return error_code;

    const errorCode = data["errorCode"];
    if (
      typeof errorCode === "string" &&
      typeof data["errorMessage"] === "string"
    )
      return `${errorCode}: ${String(data["errorMessage"])}`;

    const message = data["message"];
    if (typeof message === "string") return message;

    const error = data["error"];
    if (typeof error === "string") return error;

    const errors = data["errors"];
    if (Array.isArray(errors)) {
      return errors
        .map((e) => {
          if (typeof e === "string") return e;
          if (isRecord(e) && typeof e["message"] === "string")
            return String(e["message"]);
          try {
            return JSON.stringify(e);
          } catch {
            return String(e);
          }
        })
        .join(", ");
    }

    try {
      return JSON.stringify(data);
    } catch {
      return String(data);
    }
  }

  return String(data);
};

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
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = extractMessage(error.response?.data, error.message);
        throw new Error(msg);
      }
      throw error;
    }
  },

  /**
   * Get current user profile (validates JWT from HttpOnly cookie)
   */
  getUserProfile: async (options?: {
    _skipAuthRedirect?: boolean;
    _retry?: boolean;
  }): Promise<User> => {
    try {
      const user = await apiClient.request<User>(
        API_ENDPOINTS.LOGIN.GETCURRENTUSER,
        {
          method: "GET",
          // Pass through flags to axios config
          ...(options || {}),
        }
      );
      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = extractMessage(
          error.response?.data,
          "Username or Password Error."
        );
        throw new Error(msg);
      }
      throw error;
    }
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
      return response;
    } catch (error) {
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
    } catch {}
    return { success: true };
  },

  /**
   * Change user password
   */
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string; success: boolean }> => {
    try {
      const response = await apiClient.request<{
        message: string;
        success: boolean;
      }>(API_ENDPOINTS.LOGIN.CHANGE_PASSWORD, {
        method: "POST",
        data,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = extractMessage(
          error.response?.data,
          "Failed to change password. Try again."
        );
        throw new Error(msg);
      }
      throw error;
    }
  },
};
