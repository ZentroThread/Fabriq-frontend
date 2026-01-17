import { z } from "zod";
import {
  EmployeeBankDetailsSchema,
  EmployeeSchema,
} from "@/schemas/employee.schema";

export type Employee = z.infer<typeof EmployeeSchema>;
export type EmployeeBankDetails = z.infer<typeof EmployeeBankDetailsSchema>;
export type EmployeeCreateInput = z.infer<typeof EmployeeSchema>;

export type PersistedEmployee = {
  id: number;
  empCode: string;
  fullName: string;
  imgUrl?: string;
};
