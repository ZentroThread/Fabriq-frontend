import {useState } from "react";
import useEmployeeStore from "@/store/employee-store";
import {type AdvancePaymentRequest} from "@/types/advance-payment.type";
import { useAddEmployeeAdvancePayment,
        useDeleteEmployeeAdvancePayment,
        useGetAdvanceByEmpAndMonthYear,
        useUpdateEmployeeAdvancePayment } from "@/hooks/employee/advancePayment/useEmployeeAdvance";


export default function useAdvancePaymentOverview() {

  const {selectedEmployee} = useEmployeeStore();
  const empName = selectedEmployee ? selectedEmployee.fullName : "";

  const toDay = new Date();
  const currentMonth = String(toDay.getMonth() + 1).padStart(2, '0'); 
  const currentYear = String(toDay.getFullYear()); 
  const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const [formData, setFormData] = useState<Partial<AdvancePaymentRequest>>({});
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [selectedDay, setSelectedDay] = useState<Date | null>();
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [advancePaymentId, setAdvPaymentId] = useState<number | null>(null);  

  const {mutate: addAdvancePayment} = useAddEmployeeAdvancePayment();
  const {mutate: deleteAdvancePayment} = useDeleteEmployeeAdvancePayment();
  const {mutate: updateAdvancePayment} = useUpdateEmployeeAdvancePayment();
  const {data: advancePayments} = useGetAdvanceByEmpAndMonthYear(
    selectedEmployee ? selectedEmployee.id : 0,
    selectedYear,
    selectedMonth
  );

  const handleSetIsUpdateMode = (id: number) => {
    const recordToEdit = advancePayments?.find((payment) => payment.id === id);
    if (recordToEdit) {
      setAdvPaymentId(id);
      setFormData(recordToEdit);
      setSelectedDay(new Date(recordToEdit.date || ""));
    }
    setIsUpdateMode(true);
  }
  const handleAddAdvancePayment = () =>{
    addAdvancePayment(formData);
    setFormData({});
    setSelectedDay(null);
  }
  const handleAdvancePaymentDelete = (id: number) => {
    if(confirm("Are you sure you want to delete this advance payment record?"))
      deleteAdvancePayment(id);
  }
  const handleAdvancePaymentUpdate = (id: number) => {
    updateAdvancePayment({id, data: formData});
    setFormData({});
    setSelectedDay(null);
    setIsUpdateMode(false);
  }

  const handleChange =<K extends keyof AdvancePaymentRequest> 
  (field: K,value: AdvancePaymentRequest[K]) => {
    setFormData((prev: Partial<AdvancePaymentRequest>) => ({
      ...prev,
      date: selectedDay ? formatDate(selectedDay) : formatDate(toDay),
      empId: selectedEmployee?.id,
      [field]: value,
    }));
  }

  return {
    empName,
    formData,
    setFormData,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    selectedDay,
    setSelectedDay,
    isUpdateMode,
    setIsUpdateMode,
    advancePaymentId,
    setAdvPaymentId,
    advancePayments,
    handleSetIsUpdateMode,
    handleAddAdvancePayment,
    handleAdvancePaymentDelete,
    handleAdvancePaymentUpdate,
    handleChange,
  };
}
