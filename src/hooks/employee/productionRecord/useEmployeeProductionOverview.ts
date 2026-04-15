import { useState } from "react";
import useEmployeeStore from "@/store/employee-store";
import { type EmployeeProductionRequest } from "@/types/employee-product.type";
import {
  useAddEmployeeProduction,
  useUpdateEmployeeProduction,
  useDeleteEmployeeProduction,
  useEmployeeProdByEmpAndMonthYear,
} from "@/hooks/employee/productionRecord/useEmployeeProduction";
import { currentMonth, currentYear, today } from "@/utils/date";
import { swalConfirm } from "@/utils/swal";

export const useEmployeeProductionOverview = () => {
  const { selectedEmployee } = useEmployeeStore();
  const empName = selectedEmployee ? selectedEmployee.fullName : "";

  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [prodId, setProdId] = useState<number>(0);

  const [formData, setFormData] = useState<Partial<EmployeeProductionRequest>>(
    {}
  );

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const handleChange = <K extends keyof EmployeeProductionRequest>(
    field: K,
    value: EmployeeProductionRequest[K]
  ) => {
    setFormData((prev: Partial<EmployeeProductionRequest>) => ({
      ...prev,
      date: selectedDay ? formatDate(selectedDay) : formatDate(today),
      empId: selectedEmployee?.id,
      [field]: value,
    }));
  };

  const { data: prodByDate, isLoading } = useEmployeeProdByEmpAndMonthYear(
    selectedEmployee?.id || 0,
    selectedMonth || "",
    selectedYear || ""
  );

  const params = {
    empId: selectedEmployee ? selectedEmployee.id : 0,
    year: selectedYear,
    month: selectedMonth,
  };
  const { mutate: addProduction } = useAddEmployeeProduction(
    params.empId,
    params.month,
    params.year
  );
  const { mutate: updateProduction } = useUpdateEmployeeProduction(
    params.empId,
    params.month,
    params.year
  );
  const { mutate: deleteProduction } = useDeleteEmployeeProduction(
    params.empId,
    params.month,
    params.year
  );

  const handleSetIsUpdateMode = (id: number) => {
    const recordToEdit = prodByDate?.find((prod) => prod.id === id);
    if (recordToEdit) {
      setFormData(recordToEdit);
      setProdId(id);
      setSelectedDay(new Date(recordToEdit.date || ""));
      setIsUpdateMode(true);
    }
  };

  const handleAddProduction = () => {
    addProduction(formData);
    setFormData({});
    setSelectedDay(null);
  };

  const handleProductionUpdate = (id: number) => {
    if (!selectedEmployee) return;

    const updateData: Partial<EmployeeProductionRequest> = {
      ...formData,
      date: selectedDay ? formatDate(selectedDay) : formatDate(today),
      empId: selectedEmployee.id,
    };

    updateProduction({ id, data: updateData });
  };

  const handleProductionDelete = async (id: number) => {
    if (
      await swalConfirm("Are you sure?", "You won't be able to revert this!")
    ) {
      deleteProduction(id);
    }
  };

  return {
    state: {
      empName,
      selectedMonth,
      selectedYear,
      selectedDay,
      isUpdateMode,
      formData,
      prodId,
      prodByDate,
      isLoading,
    },
    actions: {
      setSelectedMonth,
      setSelectedYear,
      setSelectedDay,
      handleChange,
      handleSetIsUpdateMode,
      handleAddProduction,
      handleProductionUpdate,
      handleProductionDelete,
    },
  };
};
