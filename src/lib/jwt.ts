interface JWTPayloadMinimal {
  tenantId?: string;
  exp?: number;
  [key: string]: unknown;
}

function decodePayload(token: string): JWTPayloadMinimal | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    return decoded as JWTPayloadMinimal;
  } catch {
    return null;
  }
}

export function extractTenantId(token: string): string | null {
  const payload = decodePayload(token);
  return payload && typeof payload.tenantId === "string"
    ? payload.tenantId
    : null;
}
