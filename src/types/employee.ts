export interface EmployeeBankDetails {
  id: number;
  bankNumber: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface Employee {
  id: number;
  empCode: string;
  empFirstName: string;
  empLastName: string;
  nicNumber: string;
  mobileNumber: string;
  dateOfBirth: number;     
  role: string;
  address: string;
  gender: "MALE" | "FEMALE";
  joinedDate: string;
  epfNumber: string;
  basicSalary: number;
  age: number;
  employeeBankDetails: EmployeeBankDetails;
}