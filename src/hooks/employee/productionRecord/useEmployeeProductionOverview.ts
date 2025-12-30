import {useState } from "react";
import useEmployeeStore from "@/store/employee-store";
import {type EmployeeProductionRequest } from "@/types/employee-product.type";
import { useAddEmployeeProduction,
        useUpdateEmployeeProduction, 
        useDeleteEmployeeProduction,
        useEmployeeProdByEmpAndMonthYear
      } from "@/hooks/employee/productionRecord/useEmployeeProduction";

export const useEmployeeProductionOverview = () => {

  const {selectedEmployee} = useEmployeeStore();
  const empName = selectedEmployee ? selectedEmployee.fullName : "";
  
  const toDay = new Date();
  const currentMonth = String(toDay.getMonth() + 1).padStart(2, '0'); 
  const currentYear = String(toDay.getFullYear()); 

  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [prodId, setProdId] = useState<number>(0);

  const [formData, setFormData] = useState<Partial<EmployeeProductionRequest>>({});

  const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;


  const handleChange =<K extends keyof EmployeeProductionRequest> 
  (field: K,value: EmployeeProductionRequest[K]) => {
    setFormData((prev: Partial<EmployeeProductionRequest>) => ({
      ...prev,
      date: selectedDay ? formatDate(selectedDay) : formatDate(toDay),
      empId: selectedEmployee?.id,
      [field]: value,
    }));
  }

  const { data: prodByDate } = useEmployeeProdByEmpAndMonthYear(
    selectedEmployee?.id || 0,
    selectedMonth || "",
    selectedYear || ""
  );
  
  const params = {empId: selectedEmployee ? selectedEmployee.id : 0, year: selectedYear, month: selectedMonth};
  const { mutate: addProduction } = useAddEmployeeProduction(params.empId, params.month, params.year);
  const { mutate: updateProduction } = useUpdateEmployeeProduction(params.empId, params.month, params.year);
  const { mutate: deleteProduction } = useDeleteEmployeeProduction(params.empId, params.month, params.year);

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
  }

  const handleProductionUpdate = (id : number) => {
      updateProduction({id:id, data: formData});
      setFormData({});
      setSelectedDay(null);
      setIsUpdateMode(false);
  }

  const handleProductionDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this production record?")) {
      deleteProduction(id);
    }
  };

  return ({
    empName,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    selectedDay,
    setSelectedDay,
    isUpdateMode,
    formData,
    prodId,
    handleChange,
    prodByDate,
    handleSetIsUpdateMode,
    handleAddProduction,
    handleProductionUpdate,
    handleProductionDelete,
  });
}