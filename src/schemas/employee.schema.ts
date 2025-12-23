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

  imgUrl: z.string().nullable(),

  empFirstName: z.string(),
  empLastName: z.string(),

  nicNumber: z.string().nullable(),
  mobileNumber: z.string(),

  dateOfBirth: z.string().nullable(),
  role: z.string().nullable(),
  address: z.string().nullable(),

  gender: GenderEnum,

  joinedDate: z.string().nullable(),
  epfNumber: z.string().nullable(),

  basicSalary: z.number().nullable(),
  age: z.number().nullable(),

  employeeBankDetails: EmployeeBankDetailsSchema.nullable(),
});

export const EmployeeCreateSchema = z.object({

  empCode: z.string().optional(),

  imgUrl: z.string().optional(),

  empFirstName: z.string().min(2),
  empLastName: z.string().min(2),

  mobileNumber: z.string().min(10),
  gender: GenderEnum,

  nicNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  role: z.string().optional(),
  address: z.string().optional(),

  joinedDate: z.string().optional(),
  epfNumber: z.string().optional(),

  basicSalary: z.number().optional(),

  employeeBankDetails: EmployeeBankDetailsSchema.optional(),
});

