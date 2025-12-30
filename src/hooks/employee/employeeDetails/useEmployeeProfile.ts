import {  useNavigate, useParams } from "react-router-dom";
import { useEmployee } from "@/hooks/employee/employeeDetails/useEmployee";
import { useUpdateEmployee } from "@/hooks/employee/employeeDetails/useUpdateEmployee";
import {  useState } from "react";
import type { Employee,EmployeeBankDetails } from "@/types/employee.type";

export default function useEmployeeProfile() {

  const navigate = useNavigate();
  const { id } = useParams();
  if(!id) throw new Error("Employee ID is required");
  const empCode = String(id);

  const {data: employee,isLoading,isError} = useEmployee(empCode);
  const { mutate: updateEmployee } = useUpdateEmployee();

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
  if (Object.keys(formData).length === 0 || !empCode) return;
  if (isEditing) {
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
  setIsEditing(true);
}

const showProductionRecords = () => {
    navigate(`/production-overview/${empCode}`);
  };

  const showAdvancePaymentRecords = () => {
    navigate(`/advance-payment-overview/${empCode}`);
  };

  const showSalaryHistory = () => {
    navigate(`/salary-history/${empCode}`);
  };

  const showLeaveHistory = () => {
    navigate(`/leave-history/${empCode}`);
  };

  return({
    states: {employee,
    isEditing,
    formData,
    isLoading,
    isError
  },
    actions: {handleChange,
    handleBankChange,
    handleUpdate,
    startEditing,
    showProductionRecords,
    showAdvancePaymentRecords,
    showSalaryHistory,
    showLeaveHistory,}
  });

}
