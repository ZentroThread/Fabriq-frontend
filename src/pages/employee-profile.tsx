import Button from "@/components/atoms/button/add-button";
import Chart from "@/components/templates/Chart";
import {  useNavigate, useParams } from "react-router-dom";
import { useEmployee } from "@/hooks/employee/useEmployee";
import { useUpdateEmployee } from "@/hooks/employee/useUpdateEmployee";
import {  useState } from "react";
import type { Employee,EmployeeBankDetails } from "../types/employee.type";
import useEmployeeStore from "@/store/employee-store";
import EmployeeForm from "@/pages/employee-form";

export default function EmployeeProfile() {

  const navigate = useNavigate();
  const { id } = useParams();
  const empCode = String(id);

  const {data: employee, isLoading} = useEmployee(empCode);
  const { mutate: updateEmployee } = useUpdateEmployee();
  const {setSelectedEmployee} = useEmployeeStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>({});

  const handleChange =<K extends keyof Employee>
  (field: K, value: Employee[K]) => {
  setFormData((prev: Partial<Employee>) => ({
    ...prev,
    [field]: value,
  }));
};

const handleBankChange = <K extends keyof EmployeeBankDetails>(
  field: K,
  value: EmployeeBankDetails[K]
) => {
  setFormData((prev:Partial<Employee>) => ({
    ...prev,
    employeeBankDetails: {
      ...(prev.employeeBankDetails || {}),
      [field]: value,
    } as EmployeeBankDetails,
  }));
};

const handleUpdate = () => {
  if (formData) {
    updateEmployee(
      {
        code: empCode,data: formData,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setFormData({});
        },
      }
    );
  }
};

const startEditing = () => {
  if (!employee) return;
  setFormData(employee);
  setSelectedEmployee({
    id: employee.id,
    empCode: employee.empCode,
    fullName: employee.empFirstName + " " + employee.empLastName,
  });
  setIsEditing(true);
}

if (isLoading) return <div>Loading...</div>;

const showProductionRecords = (id: string) => {
    navigate(`/production-overview/${id}`);
  };

  const showSalaryHistory = (id: string) => {
    navigate(`/salary-history/${id}`);
  };

  const showLeaveHistory = (id: string) => {
    navigate(`/leave-history/${id}`);
  };

  return (
    <div className="p-3 sm:p-5 flex flex-col">
      <Chart className="h-full flex flex-col justify-between relative md:flex-1">
        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <span className="text-style justify-center text-xl sm:text-2xl flex items-center">
            {employee?.empFirstName ?? ""} {employee?.empLastName ?? ""}
          </span>
          <span className="justify-center flex items-center text-position-text font-light text-sm sm:text-base">
            {employee?.role}
          </span>
        </div>

        {/* Main Content */}
        <EmployeeForm
          employee={employee}
          isEditing={isEditing}
          formData={formData}
          handleChange={handleChange}
          handleBankChange={handleBankChange}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-end mt-6 gap-1 sm:gap-2 lg:pr-10">
          <Button
            bordercolor="border-border-card2"
            bgcolor="bg-bg-card2"
            hovertext="hover:text-background"
            hoverbg="hover:bg-light-brown"
            textcolor="text-black"
            text="Production Records"
            width="w-full sm:w-35"
            onClick={() => showProductionRecords(empCode)}
          />
          <Button
            bordercolor="border-border-card3"
            bgcolor="bg-bg-card3"
            textcolor="text-black"
            hoverbg="hover:bg-red"
            hovertext="hover:text-background"
            text="Salary History"
            width="w-full sm:w-35"
            onClick={() => showSalaryHistory(empCode)}
          />
          <Button
            bordercolor="border-border-card2"
            bgcolor="bg-bg-card2"
            hovertext="hover:text-background"
            hoverbg="hover:bg-light-brown"
            textcolor="text-black"
            text="Leave History"
            width="w-full sm:w-35"
            onClick={() => showLeaveHistory(empCode)}
          />
         <Button
            bordercolor="border-border-add"
            bgcolor="bg-bg-red"
            textcolor="text-black"
            text={isEditing ? "Update" : "Edit"}
            width="w-full sm:w-35"
            onClick={() => {
              if (isEditing) {
                handleUpdate();
              } else {
                startEditing();
              }
            }}
          />

        </div>
      </Chart>
    </div>
  );
}
