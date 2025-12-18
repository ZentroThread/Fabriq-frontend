import { z } from "zod";

export const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

export const EmployeeBankDetailsSchema = z.object({
  id: z.number(),
  bankName: z.string().min(3, "Bank name must be at least 3 characters long"),
  branchName: z.string().min(3, "Branch name must be at least 3 characters long"),
  accountNumber: z.string().min(5, "Account number must be at least 5 characters long"),
  accountHolderName: z.string(),
});

export const EmployeeSchema = z.object({
  id: z.number(),
  empCode: z.string(),
  empFirstName: z.string().min(2, "First name must be at least 2 characters long"),
  empLastName: z.string().min(2, "Last name must be at least 2 characters long"),
  nicNumber: z.string(),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 characters long"),
  dateOfBirth: z.string(), 
  role: z.string(),
  address: z.string(),
  gender: GenderEnum,
  joinedDate: z.string(), 
  epfNumber: z.string(),
  basicSalary: z.number(),
  age: z.number().optional(), 
  employeeBankDetails: EmployeeBankDetailsSchema.optional(),
});
