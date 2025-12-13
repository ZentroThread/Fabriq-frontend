import { z } from "zod";

// User role enum
export const userRoleSchema = z.enum(["owner", "cashier", "sales_assistant"]);

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  role: userRoleSchema,
  tenantId: z.string(),
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
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  categoryId: z.number().min(1, "Category is required"),
  code: z.string().min(1, "Code is required"),
  status: z.string().min(1, "Status is required"),
  stock: z.string().min(1, {
    message: "Stock quantity is required.",
  }),
  image: z.instanceof(File, { message: "Image is required." }),
});
