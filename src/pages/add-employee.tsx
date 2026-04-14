import EmployeeForm from "@/components/organisms/employee/employee-form";
import Button from "@/components/atoms/button/custom-button";
import type { Employee, EmployeeBankDetails } from "@/types/employee.type";
import { useState } from "react";
import { useAddEmployee } from "@/hooks/employee/employeeDetails/useAddEmployee";

export default function AddEmployee() {
  const isEditing = true;

  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  const { mutate: addEmployee } = useAddEmployee();

  const handleAddEmployee = () => {
    addEmployee({ ...formData, image: imageFile });
  };

  const handleChange = <K extends keyof Employee>(
    field: K,
    value: Employee[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBankChange = <K extends keyof EmployeeBankDetails>(
    field: K,
    value: EmployeeBankDetails[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      employeeBankDetails: {
        ...(prev.employeeBankDetails || {}),
        [field]: value,
      } as EmployeeBankDetails,
    }));
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {/* Employee Form */}
      <EmployeeForm
        isEditing={isEditing}
        formData={formData}
        imagePreview={imagePreview} // pass preview URL
        onImageChange={(file, preview) => {
          setImageFile(file);
          setImagePreview(preview);
        }}
        handleChange={handleChange}
        handleBankChange={handleBankChange}
      />

      <div className="flex justify-end">
        <Button
          bordercolor="border-border-card3"
          bgcolor="bg-bg-card3"
          textcolor="text-black"
          hoverbg="hover:bg-red"
          hovertext="hover:text-background"
          text="Add Employee"
          width="w-full sm:w-35"
          onClick={handleAddEmployee}
        />
      </div>
    </div>
  );
}
