export function normalizePhoneForProvider(raw?: string) {
  if (!raw) return "";
  const input = String(raw).trim();

  if (/^\+\d[\d\s\-()]*$/.test(input)) {
    const digits = input.replace(/[^\d]/g, "");
    return "+" + digits;
  }

  const digits = input.replace(/\D+/g, "");
  if (!digits) return "";

  // Local Sri Lankan formats
  if (/^0\d{8,}$/.test(digits)) return "+94" + digits.substring(1);

  // Already has country code without + (9477...) -> +9477...
  if (/^94\d{7,}$/.test(digits)) return "+" + digits;

  // Short local number without leading zero (779774885) -> +94...
  if (/^\d{7,9}$/.test(digits))
    return "+94" + (digits.startsWith("0") ? digits.substring(1) : digits);

  // Fallback: prefix with +
  if (/^\d{7,15}$/.test(digits)) return "+" + digits;

  return "";
}
