import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  tenantId: z.string().optional(),
});

export const authResponseSchema = z.object({
  token: z.string(),
  user: userSchema,
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
