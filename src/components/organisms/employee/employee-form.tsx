import Button from "@/components/atoms/button/add-button";
import BaseInputField from "@/components/molecules/input/base-input-field"; 
import BaseCheckboxField from "@/components/molecules/input/base-check-box-field";
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

              <BaseInputField label="First Name" value={isEditing ? formData?.empFirstName ?? "" : employee?.empFirstName ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("empFirstName", value)} />

              <BaseInputField label="Last Name" value={isEditing ? formData?.empLastName ?? "" : employee?.empLastName ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("empLastName", value)} />

              <BaseInputField label="Epf Number" value={isEditing ? formData?.epfNumber ?? "" : employee?.epfNumber ?? ""} readonly={!isEditing} onChange={(value) => handleChange("epfNumber", value)} />

              <BaseInputField label="Employee ID" value={isEditing ? formData?.empCode ?? "" : employee?.empCode ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("empCode", value)} />

              <BaseInputField label="Employee NIC" value={isEditing ? formData?.nicNumber ?? "" : employee?.nicNumber ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("nicNumber", value)} />

              <BaseInputField label="Mobile Number" value={isEditing ? formData?.mobileNumber ?? "" : employee?.mobileNumber ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("mobileNumber", value)} />

              <BaseInputField label="Role" value={isEditing ? formData?.role ?? "" : employee?.role ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("role", value)} />

              <BaseInputField label="Basic Salary(Rs)" value={isEditing ? formData?.basicSalary ?? "" : employee?.basicSalary ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("basicSalary", parseFloat(value) || 0)} />

              <BaseInputField label="Address" value={isEditing ? formData?.address ?? "" : employee?.address ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("address", value)} />

              <BaseInputField label="Date of Birth" value={isEditing ? formData?.dateOfBirth ?? "" : employee?.dateOfBirth ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("dateOfBirth", value)} placeholder="xxxx-xx-xx" />

              <BaseInputField
                label="Gender"
                placeholder="MALE, FEMALE, or OTHER"
                value={
                  isEditing
                    ? (formData?.gender ?? "")
                    : (employee?.gender ?? "")
                }
                readonly={!isEditing}
                onChange={(value) =>
                  handleChange(
                    "gender",
                    value as "MALE" | "FEMALE" | "OTHER"
                  )
                }
              />
 
              <BaseInputField label="Age" value={isEditing ? formData?.age ?? "" : employee?.age ?? ""} 
              readonly={true} />

              <BaseInputField label="Joined Date" value={isEditing ? formData?.joinedDate ?? "" : employee?.joinedDate ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("joinedDate", value)} placeholder="xxxx-xx-xx" />

              <BaseInputField label="Commission Rate Point (out of 10)" value={isEditing ? formData?.performancePoints ?? "" : employee?.performancePoints ?? ""} 
              readonly={!isEditing} onChange={(value) => handleChange("performancePoints", parseFloat(value) || 0)} placeholder="0-10" />

              <BaseCheckboxField label="Commission Eligible" value={isEditing ? formData?.commissionEligible ?? false : employee?.commissionEligible ?? false} 
              disabled={!isEditing} onChange={(value?: boolean) => handleChange("commissionEligible", value ?? false)} />

              {/* Bank Details */}
              <h2 className="text-lg sm:text-xl  mt-6">Bank Details</h2>
           
              <BaseInputField label="Bank Acc Number" value={isEditing ? formData?.employeeBankDetails?.accountNumber ?? "" : employee?.employeeBankDetails?.accountNumber ?? ""} 
              readonly={!isEditing} onChange={(value) => handleBankChange("accountNumber", value)} />

              <BaseInputField label="Bank Acc Holder Name" value={isEditing ? formData?.employeeBankDetails?.accountHolderName ?? "" : employee?.employeeBankDetails?.accountHolderName ?? ""} 
              readonly={!isEditing} onChange={(value) => handleBankChange("accountHolderName", value)} />

             
              <BaseInputField label="Bank Name" value={isEditing ? formData?.employeeBankDetails?.bankName ?? "" : employee?.employeeBankDetails?.bankName ?? ""} 
              readonly={!isEditing} onChange={(value) => handleBankChange("bankName", value)} />

            
              <BaseInputField label="Branch Name" value={isEditing ? formData?.employeeBankDetails?.branchName ?? "" : employee?.employeeBankDetails?.branchName ?? ""} 
              readonly={!isEditing} onChange={(value) => handleBankChange("branchName", value)} />

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