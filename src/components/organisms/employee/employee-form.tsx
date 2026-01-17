import BaseInputField from "@/components/molecules/input/base-input-field";
import BaseCheckboxField from "@/components/molecules/input/base-check-box-field";
import ProfileImageUploader from "@/components/molecules/input/profile-image-uploader";
import type { Employee, EmployeeBankDetails } from "@/types/employee.type";

interface EmployeeFormProps {
  employee?: Employee;
  isEditing: boolean;
  formData: Partial<Employee>;
  imagePreview?: string;
  onImageChange?: (file: File, previewUrl: string) => void;
  handleChange: <K extends keyof Employee>(
    field: K,
    value: Employee[K]
  ) => void;
  handleBankChange: <K extends keyof EmployeeBankDetails>(
    field: K,
    value: EmployeeBankDetails[K]
  ) => void;
}

export default function EmployeeForm({
  employee,
  isEditing,
  formData,
  imagePreview,
  onImageChange,
  handleChange,
  handleBankChange,
}: EmployeeFormProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:pl-10">
      <div className="w-full lg:w-[280px] order-1 lg:order-2">
        <ProfileImageUploader
          imageUrl={imagePreview ?? formData?.imgUrl ?? employee?.imgUrl ?? ""}
          editable={isEditing}
          onImageChange={(file, previewUrl) => {
            onImageChange?.(file, previewUrl);
          }}
        />
      </div>

      <div className="flex-1 order-2 lg:order-1 space-y-10">
        <section>
          <h2 className="text-lg text-style mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInputField
              label="First Name"
              value={formData?.empFirstName ?? employee?.empFirstName ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("empFirstName", v)}
            />
            <BaseInputField
              label="Last Name"
              value={formData?.empLastName ?? employee?.empLastName ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("empLastName", v)}
            />
            <BaseInputField
              label="NIC"
              value={formData?.nicNumber ?? employee?.nicNumber ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("nicNumber", v)}
            />
            <BaseInputField
              label="Mobile Number"
              value={formData?.mobileNumber ?? employee?.mobileNumber ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("mobileNumber", v)}
            />
            <BaseInputField
              label="Date of Birth"
              value={formData?.dateOfBirth ?? employee?.dateOfBirth ?? ""}
              readonly={!isEditing}
              placeholder="YYYY-MM-DD"
              onChange={(v) => handleChange("dateOfBirth", v)}
            />
            <BaseInputField
              label="Gender"
              value={formData?.gender ?? employee?.gender ?? ""}
              readonly={!isEditing}
              onChange={(v) =>
                handleChange("gender", v as "MALE" | "FEMALE" | "OTHER")
              }
            />
            <BaseInputField
              label="Age"
              value={formData?.age ?? employee?.age ?? ""}
              readonly
            />
            <BaseInputField
              label="Address"
              value={formData?.address ?? employee?.address ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("address", v)}
            />
          </div>
        </section>

        <section>
          <h2 className="text-lg text-style mb-4">Employment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInputField
              label="Employee ID"
              value={formData?.empCode ?? employee?.empCode ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("empCode", v)}
            />
            <BaseInputField
              label="EPF Number"
              value={formData?.epfNumber ?? employee?.epfNumber ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("epfNumber", v)}
            />
            <BaseInputField
              label="Role"
              value={formData?.role ?? employee?.role ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("role", v)}
            />
            <BaseInputField
              label="Joined Date"
              value={formData?.joinedDate ?? employee?.joinedDate ?? ""}
              readonly={!isEditing}
              placeholder="YYYY-MM-DD"
              onChange={(v) => handleChange("joinedDate", v)}
            />
          </div>
        </section>

        <section>
          <h2 className="text-lg text-style mb-4">Compensation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInputField
              label="Basic Salary (Rs)"
              value={formData?.basicSalary ?? employee?.basicSalary ?? ""}
              readonly={!isEditing}
              onChange={(v) => handleChange("basicSalary", Number(v) || 0)}
            />
            <BaseInputField
              label="Commission Rate (0–10)"
              value={
                formData?.performancePoints ?? employee?.performancePoints ?? ""
              }
              readonly={!isEditing}
              onChange={(v) => {
                if (v === "") {
                  handleChange("performancePoints", 0);
                } else {
                  handleChange("performancePoints", Number(v));
                }
              }}
            />
            <BaseCheckboxField
              label="Commission Eligible"
              value={
                formData?.commissionEligible ??
                employee?.commissionEligible ??
                false
              }
              disabled={!isEditing}
              onChange={(v) => handleChange("commissionEligible", v ?? false)}
            />
          </div>
        </section>

        <section>
          <h2 className="text-lg text-style mb-4">Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInputField
              label="Account Number"
              value={
                formData?.employeeBankDetails?.accountNumber ??
                employee?.employeeBankDetails?.accountNumber ??
                ""
              }
              readonly={!isEditing}
              onChange={(v) => handleBankChange("accountNumber", v)}
            />
            <BaseInputField
              label="Account Holder Name"
              value={
                formData?.employeeBankDetails?.accountHolderName ??
                employee?.employeeBankDetails?.accountHolderName ??
                ""
              }
              readonly={!isEditing}
              onChange={(v) => handleBankChange("accountHolderName", v)}
            />
            <BaseInputField
              label="Bank Name"
              value={
                formData?.employeeBankDetails?.bankName ??
                employee?.employeeBankDetails?.bankName ??
                ""
              }
              readonly={!isEditing}
              onChange={(v) => handleBankChange("bankName", v)}
            />
            <BaseInputField
              label="Branch Name"
              value={
                formData?.employeeBankDetails?.branchName ??
                employee?.employeeBankDetails?.branchName ??
                ""
              }
              readonly={!isEditing}
              onChange={(v) => handleBankChange("branchName", v)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
