import { z } from "zod";
import type {
  addItemFormSchema,
  authResponseSchema,
  loginSchema,
  registerSchema,
  userSchema,
} from "@/schemas/user.schema";

export type AddItemFormValues = z.infer<typeof addItemFormSchema>;
export type User = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
