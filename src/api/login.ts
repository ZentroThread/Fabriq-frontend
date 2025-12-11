import type { LoginInput, User } from "../types/types";
import { API_BASE_URL } from "@/constants/constdata";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { authResponseSchema } from "@/schemas/user.schema";

/**
 * Login API call
 * Backend returns just the JWT token as a string
 */
export const loginUser = async (
  credentials: LoginInput
): Promise<{ token: string }> => {
  // Log the payload being sent to backend
  console.log("Login Payload:", credentials);
  console.log("Login Payload (JSON):", JSON.stringify(credentials, null, 2));
  console.log("Login URL:", `${API_BASE_URL}${API_ENDPOINTS.LOGIN.LOGIN}`);

  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  console.log("Login response status:", response.status, response.statusText);
  console.log("Login response ok:", response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Login error response:", errorText);
    throw new Error(errorText || "Login failed");
  }

  // Backend returns just the token string, not JSON
  const token = await response.text();
  console.log("Received token:", token);

  // Validate the response
  const validated = authResponseSchema.parse({ token });
  return validated;
};

// Removed fetchUserDetails - extracting user info from JWT token instead

/**
 * TanStack Query hook for login
 */
