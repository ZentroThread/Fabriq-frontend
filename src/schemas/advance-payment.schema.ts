import {z} from "zod";

export const AdvancePaymentRequestSchema = z.object({
    amount: z.number().min(1, "Amount must be at least 1"),
    reason: z.string().min(5, "Reason must be at least 5 characters long"),
    date: z.string().nullable(),
    empId: z.number().optional(),
});

export const AdvancePaymentResponseSchema = z.object({
    id: z.number(),
    amount: z.number(),
    reason: z.string(),
    date: z.string().nullable(),
    empId: z.number().optional(),
});