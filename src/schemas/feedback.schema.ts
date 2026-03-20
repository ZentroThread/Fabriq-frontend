import {z} from "zod";

  export const FeedbackSchema = z.object({
    id: z.number().int().optional(),
    message: z.string(),
    rating: z.number().int().min(1).max(5),
    userEmail: z.string().email(),
    approved: z.boolean().optional(),
    createdAt: z.string().optional(), 
  });

  export type Feedback = z.infer<typeof FeedbackSchema>;

  export const FeedbackCreateSchema = z.object({
    message: z.string(),
    rating: z.number().int().min(1).max(5),
  });

  export type FeedbackCreate = z.infer<typeof FeedbackCreateSchema>;