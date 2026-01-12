import { z } from "zod";

export const EmployeeProductionRequestSchema = z.object({
  date: z.string().nullable(),
  productionName: z.string().min(2, "Production name must be at least 2 characters long"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  ratePerProduct: z.number().min(1, "Rate must be at least 1"),
  empId:z.number().optional(),
});

export const EmployeeProductionResponseSchema = z.object({
  id: z.number(),
  date: z.string().nullable(),
  productionName: z.string(),
  quantity: z.number(),
  ratePerProduct: z.number(),
  empId: z.number().optional(),
  empCode: z.string().optional(),
  empName: z.string().optional(),
});
