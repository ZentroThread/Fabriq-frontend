import type { LoginInput } from "../types/types";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { authResponseSchema } from "@/schemas/user.schema";
import { apiClient } from "@/api/client";

/**
 * Login service
 */
export const loginService = {
  /**
   * Login user with credentials
   * Backend returns just the JWT token as a string
   */
  login: async (credentials: LoginInput): Promise<{ token: string }> => {
    // Backend returns just the token string, not JSON
    const token = await apiClient.requestText(API_ENDPOINTS.LOGIN.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log("Received token:", token);

    // Validate the response
    const validated = authResponseSchema.parse({ token });
    return validated;
  },
};
