import { z } from "zod";

// User role enum
export const userRoleSchema = z.enum(["owner", "cashier", "sales_assistant"]);

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  role: userRoleSchema,
  tenantId: z.string(),
});

// Token response from backend
export const tokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  accessTokenExpiresIn: z.number(),
  refreshTokenExpiresIn: z.number(),
});

// Backend returns just the JWT token as a string
export const authResponseSchema = z.object({
  response: z.string(),
});

export const loginSchema = z.object({
  username: z.string().min(1, "*Username is Required"),
  password: z.string().min(1, "*Password is Required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//add items table
export const addItemFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  categoryId: z.number().min(1, "Category is required"),
  code: z.string().min(1, "Code is required"),
  status: z.string().min(1, "Status is required"),
  stock: z.string().min(1, {
    message: "Stock quantity is required.",
  }),
  image: z.instanceof(File, { message: "Image is required." }).optional(),
});

// Add customer schema
export const addCustomerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .regex(
      /^(07\d{8}|\+947\d{8})$/,
      "Mobile number must be in the format 07xxxxxxxx or +947xxxxxxxx"
    ),
  landline: z.string().optional(),
  whatsapp: z
    .string()
    .min(1, "WhatsApp number is required")
    .regex(
      /^(07\d{8}|\+947\d{8})$/,
      "WhatsApp number must be in the format 07xxxxxxxx or +947xxxxxxxx"
    ),
  email: z
    .union([z.string().email("Invalid email address"), z.literal("")])
    .optional(),
});
