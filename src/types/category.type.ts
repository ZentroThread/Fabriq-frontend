import { z } from "zod";
import { CategorySchema } from "@/schemas/category.schema";

export type Category = z.infer<typeof CategorySchema>;
