import { z } from "zod";
import type {
  addItemFormSchema,
  authResponseSchema,
  loginSchema,
  registerSchema,
  tokenResponseSchema,
  userSchema,
  userRoleSchema,
} from "@/schemas/user.schema";

export type AddItemFormValues = z.infer<typeof addItemFormSchema>;
export type User = z.infer<typeof userSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type TokenResponse = z.infer<typeof tokenResponseSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// JWT Payload structure
