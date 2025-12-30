import {  useNavigate, useParams } from "react-router-dom";
import { useEmployee } from "@/hooks/employee/employeeDetails/useEmployee";
import { useUpdateEmployee } from "@/hooks/employee/employeeDetails/useUpdateEmployee";
import {  useState } from "react";
import type { Employee,EmployeeBankDetails } from "@/types/employee.type";
import useEmployeeStore from "@/store/employee-store";

export default function useEmployeeProfile() {

  const navigate = useNavigate();
  const { id } = useParams();
  if(!id) throw new Error("Employee ID is required");
  const empCode = String(id);

  const {data: employee,isLoading,isError} = useEmployee(empCode);
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
  setSelectedEmployee({
    id: employee.id,
    empCode: employee.empCode,
    fullName: employee.empFirstName + " " + employee.empLastName,
  });
  setIsEditing(true);
}

const showProductionRecords = (id: string) => {
    navigate(`/production-overview/${id}`);
  };

  const showAdvancePaymentRecords = (id: string) => {
    navigate(`/advance-payment-overview/${id}`);
  };

  const showSalaryHistory = (id: string) => {
    navigate(`/salary-history/${id}`);
  };

  const showLeaveHistory = (id: string) => {
    navigate(`/leave-history/${id}`);
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
