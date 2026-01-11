import { z } from "zod";
import { AttireRentSchema } from "../schemas/attireRent.schema";

export type AttireRent = z.infer<typeof AttireRentSchema>;