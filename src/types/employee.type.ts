import { z } from 'zod';
import { EmployeeBankDetailsSchema,EmployeeSchema } from '@/schemas/employee.schema';

export type Employee = z.infer<typeof EmployeeSchema>;
export type EmployeeBankDetails = z.infer<typeof EmployeeBankDetailsSchema>;