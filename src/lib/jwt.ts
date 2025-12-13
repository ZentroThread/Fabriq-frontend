import type { User, UserRole } from "@/types/types";

export interface JWTPayload {
  sub: string; // username
  userId: string;
  role: string;
  tenantId: string;
  iat: number;
  exp: number;
}

/**
 * Decode JWT token without verification (client-side)
 * Note: This doesn't validate the token, only decodes it
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));

    return decoded as JWTPayload;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

/**
 * Extract username from JWT token
 */
export function extractUsername(token: string): string | null {
  const payload = decodeJWT(token);
  return payload?.sub || null;
}

/**
 * Extract tenant ID from JWT token
 */
export function extractTenantId(token: string): string | null {
  const payload = decodeJWT(token);
  return payload?.tenantId || null;
}

/**
 * Extract user ID from JWT token
 */
export function extractUserId(token: string): string | null {
  const payload = decodeJWT(token);
  return payload?.userId || null;
}

/**
 * Extract role from JWT token
 */
export function extractRole(token: string): string | null {
  const payload = decodeJWT(token);
  return payload?.role || null;
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return true;
  }

  // exp is in seconds, Date.now() is in milliseconds
  return payload.exp * 1000 < Date.now();
}

/**
 * Get token expiration time
 */
export function getTokenExpiration(token: string): Date | null {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return null;
  }

  return new Date(payload.exp * 1000);
}

/**
 * Extract user information from token and role from backend
 * Since backend doesn't include role in JWT, we need to fetch it separately
 */
export function extractUserFromToken(
  token: string,
  role: UserRole,
  userId: number
): User | null {
  const username = extractUsername(token);
  const tenantId = extractTenantId(token);

  if (!username || !tenantId) {
    return null;
  }

  return {
    id: userId,
    username,
    role,
    tenantId,
  };
}
