import Button from "@/components/atoms/button/add-button";
import { Input } from "@/components/ui/input";
import type { Employee, EmployeeBankDetails } from "@/types/employee.type";

interface EmployeeFormProps {
  employee?: Employee;
  isEditing: boolean;
  formData: Partial<Employee>;
  handleChange: <K extends keyof Employee>(field: K, value: Employee[K]) => void;
  handleBankChange: <K extends keyof EmployeeBankDetails>(
    field: K,
    value: EmployeeBankDetails[K]
  ) => void;
}


export default function EmployeeForm({ employee, isEditing, formData, handleChange, handleBankChange }: EmployeeFormProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:pl-10 gap-6">
          {/* Profile Image - Shows first on mobile */}
          <div className="flex justify-center lg:hidden mb-6">
            <div className="flex flex-col relative items-center">
              <div className="bg-main-bg w-32 h-32 sm:w-35 sm:h-35 rounded-2xl border-avatar-border border-1">
               {employee?.imgUrl || formData?.imgUrl ? (
                  <img
                    src={isEditing ? formData?.imgUrl ?? "" : employee?.imgUrl ?? ""}
                    alt="profile"
                    className="w-full h-full rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl flex items-center justify-center bg-border-card3 text-position-text">
                    No Image
                  </div>
                )}
              </div>
              <Button text="Update" width="w-32 sm:w-35" />
            </div>
          </div>

          {/* Form Fields */}
          
          <div className="w-full lg:flex-1">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl mt-6">Personal Details</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  First Name
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.empFirstName ?? "" : employee?.empFirstName ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("empFirstName", e.target.value)}
                  required 
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Last Name
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.empLastName ?? "" : employee?.empLastName ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("empLastName", e.target.value)} 
                />
              </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Epf Number
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.epfNumber ?? "" : employee?.epfNumber ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("epfNumber", e.target.value)} 
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Employee ID
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.empCode ?? "" : employee?.empCode ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("empCode", e.target.value)} 
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Employee NIC
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.nicNumber ?? "" : employee?.nicNumber ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("nicNumber", e.target.value)} 
                />
              </div>

               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Mobile Number
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.mobileNumber ?? "" : employee?.mobileNumber ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("mobileNumber", e.target.value)} 
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Role
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.role ?? "" : employee?.role ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("role", e.target.value)}
                    />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Basic Salary(Rs)
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.basicSalary ?? "" : employee?.basicSalary ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("basicSalary", parseFloat(e.target.value) || 0)}
                    />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Address
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.address ?? "" : employee?.address ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("address", e.target.value)}
                   /> 
              </div>

              {/* <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  District
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={""}
                  readOnly
                />
              </div> */}

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Date of Birth
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.dateOfBirth ?? "" : employee?.dateOfBirth ?? ""} 
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Age
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                value={isEditing ? formData?.age ?? "" : employee?.age ?? ""} readOnly />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Gender
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.gender ?? "" : employee?.gender ?? ""}  
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("gender", e.target.value as "MALE" | "FEMALE")}
                  />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Joined Date
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.joinedDate ?? "" : employee?.joinedDate ?? ""}  
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("joinedDate", e.target.value)}
                  />
              </div>

              {/* Bank Details */}
              <h2 className="text-lg sm:text-xl  mt-6">Bank Details</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Bank Acc Number
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.employeeBankDetails?.accountNumber ?? "" : employee?.employeeBankDetails?.accountNumber ?? ""}  
                  readOnly={!isEditing}
                  onChange={(e) => handleBankChange("accountNumber", e.target.value)}
                  />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Bank Acc Holder Name
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.employeeBankDetails?.accountHolderName ?? "" : employee?.employeeBankDetails?.accountHolderName ?? ""}  
                  readOnly={!isEditing}
                  onChange={(e) => handleBankChange("accountHolderName", e.target.value)}
                  />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Bank Name
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.employeeBankDetails?.bankName ?? "" : employee?.employeeBankDetails?.bankName ?? ""}  
                  readOnly={!isEditing}
                  onChange={(e) => handleBankChange("bankName", e.target.value)}
                  />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Branch Name
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={isEditing ? formData?.employeeBankDetails?.branchName ?? "" : employee?.employeeBankDetails?.branchName ?? ""}  
                  readOnly={!isEditing}
                  onChange={(e) => handleBankChange("branchName", e.target.value)}
                  />
              </div>
            </div>
          </div>

          {/* Profile Image - Shows on desktop only */}
          <div className="hidden lg:flex justify-end items-start pr-10">
            <div className="flex flex-col relative items-center">
              <div className="bg-main-bg w-35 h-35 rounded-2xl border-avatar-border border-1">
                {employee?.imgUrl || formData?.imgUrl ? (
                  <img
                    src={isEditing ? formData?.imgUrl ?? "" : employee?.imgUrl ?? ""}
                    alt="profile"
                    className="w-full h-full rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl flex items-center justify-center bg-border-card3 text-position-text">
                    No Image
                  </div>
                )}
              </div>
              <Button text="Update" width="w-35" />
            </div>
          </div>
        </div>
  )
}