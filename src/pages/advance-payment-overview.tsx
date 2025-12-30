import { Input } from "@/components/ui/input";
import Button from "@/components/atoms/button/add-button";
import { Calendar } from "@/components/ui/calendar";
import { Pencil, Trash2 } from "lucide-react";
import {useState } from "react";
import MonthYearSelect from "@/components/organisms/selection/month-years-select";
import useEmployeeStore from "@/store/employee-store";
import {type AdvancePaymentRequest} from "@/types/advance-payment.type";
import { useAddEmployeeAdvancePayment,
        useDeleteEmployeeAdvancePayment,
        useGetAdvanceByEmpAndMonthYear,
        useUpdateEmployeeAdvancePayment } from "@/hooks/employee/useEmployeeAdvance";
import SectionHeader from "@/components/molecules/header/section-header";

export default function AdvancePaymentOverviewPage() {

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

  return (
     <div className="p-4 md:p-6 space-y-6 md:space-y-8">

      {/* Header */}
      <SectionHeader 
        title="Advance Payment Overview" 
        description="Manage employee advance payments and monthly overview" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Form Section */}
        <div className="space-y-6 p-6 bg-card rounded-2xl shadow-md lg:col-span-2 flex flex-col">

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Employee Name
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={empName}
                  readOnly
                  required 
                />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Reason for Advance Payment
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={formData.reason || ""}
                  onChange={(e) => handleChange("reason", e.target.value)}
                  required 
                />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Amount
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={formData.amount || "0"}        
                  onChange={(e) => handleChange("amount", Number(e.target.value))}
                  required 
                />
          </div>

          <div className="flex justify-end mt-auto pt-4">
            <Button 
              text={
                isUpdateMode ? "Update" : "Add"
              } width="w-32" 
              onClick={() => 
                isUpdateMode ? 
                handleAdvancePaymentUpdate(advancePaymentId || 0) : 
                handleAddAdvancePayment()
              } 
            />
          </div>
        </div>

        {/* Calendar Section */}
        <div className="p-4 bg-card border border-(--color-border) rounded-2xl shadow-md flex items-center justify-center">
          <Calendar
            mode="single"
            className="w-full max-w-xs"
            selected={selectedDay ? new Date(selectedDay) : undefined}
            onSelect={(date) => setSelectedDay(date || null)}
            modifiersStyles={{
              leave: {
                backgroundColor: "var(--color-light-pink)",
                color: "var(--color-light-black)",
                borderRadius: "6px",
                fontWeight: "bold",
              },
              today: {
                backgroundColor: "var(--color-light-pink)",
                color: "var(--color-accent-foreground)",
                borderRadius: "6px",
                fontWeight: "bold",
              },        
            }}
          />
        </div>
      </div>

      {/* Production Table */}

      <div className="space-y-6 p-6 bg-card rounded-2xl shadow-md lg:col-span-2 flex flex-col">
        
            <h2 className="text-style"> Monthly Production Table </h2>

            <MonthYearSelect
              month={selectedMonth}
              year={selectedYear}
              onMonthChange={setSelectedMonth}
              onYearChange={setSelectedYear}
              yearRange={5}
            />

            <table className="w-full text-left overflow-x-auto gap-4">
              <thead>
                <tr className="border-b text-position-text font-extralight">    
                  <th className="py-3">Date</th>
                  <th >Reason for Advance Payment</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
    
              <tbody>
                {(advancePayments)?.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-(--color-border) hover:bg-(--color-hover-bg) transition py-5"    
                  >
                    <td className="text-(--color-text)">{payment.date}</td>  
                    <td className="text-muted-foreground py-5">{payment.reason}</td>
                    <td className="text-(--color-text)">{payment.amount}</td>
    
                    <td className="flex gap-4 text-xl">
                      <div className="flex items-center gap-4 py-5">
                        <Pencil className="text-[#d1a47c] w-5 h-5 cursor-pointer" 
                          onClick={() => handleSetIsUpdateMode(payment.id)} />
                        <Trash2 className="text-[#fa7f83] w-5 h-5 cursor-pointer"  
                          onClick={() => handleAdvancePaymentDelete(payment.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
    </div>
  );
}