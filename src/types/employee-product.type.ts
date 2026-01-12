import { z } from 'zod';
import { EmployeeProductionRequestSchema, EmployeeProductionResponseSchema } from '@/schemas/employee-production.schema';

export type EmployeeProductionRequest = z.infer<typeof EmployeeProductionRequestSchema>;
export type EmployeeProductionResponse = z.infer<typeof EmployeeProductionResponseSchema>;