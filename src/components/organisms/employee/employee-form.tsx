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

export default function EmployeeForm({
  employee,
  isEditing,
  formData,
  handleChange,
  handleBankChange,
}: EmployeeFormProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:pl-10">

      {/* ================= PROFILE ================= */}
      <div className="w-full lg:w-[280px] order-1 lg:order-2">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-main-bg w-32 h-32 rounded-2xl border border-avatar-border">
            {employee?.imgUrl || formData?.imgUrl ? (
              <img
                src={isEditing ? formData?.imgUrl ?? "" : employee?.imgUrl ?? ""}
                alt="profile"
                className="w-full h-full rounded-2xl object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-position-text">
                No Image
              </div>
            )}
          </div>

          <Button text="Update" width="w-32" />
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="flex-1 order-2 lg:order-1 space-y-10">

        {/* ===== Personal Details ===== */}
        <section>
          <h2 className="text-lg text-style mb-4">Personal Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInputField label="First Name" value={isEditing ? formData?.empFirstName ?? "" : employee?.empFirstName ?? ""} readonly={!isEditing} onChange={(v) => handleChange("empFirstName", v)} />
            <BaseInputField label="Last Name" value={isEditing ? formData?.empLastName ?? "" : employee?.empLastName ?? ""} readonly={!isEditing} onChange={(v) => handleChange("empLastName", v)} />
            <BaseInputField label="NIC" value={isEditing ? formData?.nicNumber ?? "" : employee?.nicNumber ?? ""} readonly={!isEditing} onChange={(v) => handleChange("nicNumber", v)} />
            <BaseInputField label="Mobile Number" value={isEditing ? formData?.mobileNumber ?? "" : employee?.mobileNumber ?? ""} readonly={!isEditing} onChange={(v) => handleChange("mobileNumber", v)} />
            <BaseInputField label="Date of Birth" value={isEditing ? formData?.dateOfBirth ?? "" : employee?.dateOfBirth ?? ""} readonly={!isEditing} placeholder="YYYY-MM-DD" onChange={(v) => handleChange("dateOfBirth", v)} />
            <BaseInputField label="Gender" value={isEditing ? formData?.gender ?? "" : employee?.gender ?? ""} readonly={!isEditing} onChange={(v) => handleChange("gender", v as "MALE" | "FEMALE" | "OTHER")} />
            <BaseInputField label="Age" value={isEditing ? formData?.age ?? "" : employee?.age ?? ""} readonly />
            <BaseInputField label="Address" value={isEditing ? formData?.address ?? "" : employee?.address ?? ""} readonly={!isEditing} onChange={(v) => handleChange("address", v)} />
          </div>
        </section>

        {/* ===== Employment Details ===== */}
        <section>
          <h2 className="text-lg text-style mb-4">Employment Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInputField label="Employee ID" value={isEditing ? formData?.empCode ?? "" : employee?.empCode ?? ""} readonly={!isEditing} onChange={(v) => handleChange("empCode", v)} />
            <BaseInputField label="EPF Number" value={isEditing ? formData?.epfNumber ?? "" : employee?.epfNumber ?? ""} readonly={!isEditing} onChange={(v) => handleChange("epfNumber", v)} />
            <BaseInputField label="Role" value={isEditing ? formData?.role ?? "" : employee?.role ?? ""} readonly={!isEditing} onChange={(v) => handleChange("role", v)} />
            <BaseInputField label="Joined Date" value={isEditing ? formData?.joinedDate ?? "" : employee?.joinedDate ?? ""} readonly={!isEditing} placeholder="YYYY-MM-DD" onChange={(v) => handleChange("joinedDate", v)} />
          </div>
        </section>

        {/* ===== Compensation ===== */}
        <section>
          <h2 className="text-lg text-style mb-4">Compensation</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInputField
              label="Basic Salary (Rs)"
              value={isEditing ? formData?.basicSalary ?? "" : employee?.basicSalary ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("basicSalary", Number(v) || 0)}
            />

            <BaseInputField
              label="Commission Rate (0–10)"
              value={isEditing ? formData?.performancePoints ?? "" : employee?.performancePoints ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("performancePoints", Number(v) || 0)}
            />

            <BaseCheckboxField
              label="Commission Eligible"
              value={isEditing ? formData?.commissionEligible ?? false : employee?.commissionEligible ?? false}
              disabled={!isEditing}
              onChange={(v) => handleChange("commissionEligible", v ?? false)}
            />
          </div>
        </section>

        {/* ===== Bank Details ===== */}
        <section>
          <h2 className="text-lg text-style mb-4">Bank Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInputField label="Account Number" value={isEditing ? formData?.employeeBankDetails?.accountNumber ?? "" : employee?.employeeBankDetails?.accountNumber ?? ""} readonly={!isEditing} onChange={(v) => handleBankChange("accountNumber", v)} />
            <BaseInputField label="Account Holder Name" value={isEditing ? formData?.employeeBankDetails?.accountHolderName ?? "" : employee?.employeeBankDetails?.accountHolderName ?? ""} readonly={!isEditing} onChange={(v) => handleBankChange("accountHolderName", v)} />
            <BaseInputField label="Bank Name" value={isEditing ? formData?.employeeBankDetails?.bankName ?? "" : employee?.employeeBankDetails?.bankName ?? ""} readonly={!isEditing} onChange={(v) => handleBankChange("bankName", v)} />
            <BaseInputField label="Branch Name" value={isEditing ? formData?.employeeBankDetails?.branchName ?? "" : employee?.employeeBankDetails?.branchName ?? ""} readonly={!isEditing} onChange={(v) => handleBankChange("branchName", v)} />
          </div>
        </section>

      </div>
    </div>
  );
}
