import { Input } from "@/components/ui/input";
import Button from "@/components/atoms/button/add-button";
import { Calendar } from "@/components/ui/calendar";
import { Pencil, Trash2 } from "lucide-react";
import {useState } from "react";
import MonthYearSelect from "@/components/organisms/selection/month-years-select";
import useEmployeeStore from "@/store/employee-store";
import {type AdvancePaymentResponse , type AdvancePaymentRequest} from "@/types/advance-payment.type";

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

  const advancePaymentData: Array<AdvancePaymentResponse> = [
    {
      id: 1,
      empId: selectedEmployee ? selectedEmployee.id : 0,
      reason: "Medical Emergency",
      amount: 500.00,
      date: "2024-06-05",
    },
  ];

  const handleSetIsUpdateMode = (id: number) => {
    const recordToEdit = advancePaymentData?.find((payment) => payment.id === id);
    if (recordToEdit) {
      setFormData(recordToEdit);
      setSelectedDay(new Date(recordToEdit.date || ""));
      // setProdId(id);
    }
    setIsUpdateMode(true);
  }

  const handleAdvancePaymentDelete = (id: number) => {
    console.log("Delete advance payment with ID:", id);
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

  console.log(selectedMonth);
  console.log(selectedYear);
  console.log(selectedDay);
  console.log(formData)

  return (
     <div className="p-4 md:p-6 space-y-6 md:space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-style mb-4">Monthly Advance Payment Overview</h1>
        <p className="text-position-text">
          This page provides insights into the monthly advance payment metrics.
        </p>
      </div>

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
              onClick={() => {}} 
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
                {(advancePaymentData)?.map((payment) => (
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