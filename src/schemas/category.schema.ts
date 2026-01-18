import { z } from "zod";

export const CategorySchema = z.object({
  categoryId: z.number().optional(),
  categoryCode: z.string(),
  categoryName: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
