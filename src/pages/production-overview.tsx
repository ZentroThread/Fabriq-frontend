import { Input } from "@/components/ui/input";
import Button from "@/components/atoms/button/add-button";
import { Calendar } from "@/components/ui/calendar";
import { Pencil, Trash2 } from "lucide-react";
import {useState } from "react";
import MonthYearSelect from "@/components/organisms/selection/month-years-select";
import useEmployeeStore from "@/store/employee-store";
import {type EmployeeProductionRequest } from "@/types/employee-product.type";
import { useAddEmployeeProduction,
        useUpdateEmployeeProduction, 
        useDeleteEmployeeProduction,
        useEmployeeProdByEmpAndMonthYear
      } from "@/hooks/employee/useEmployeeProduction";

import {getMonthDateRange} from "@/utils/date";

export const ProductionOverview = () => {

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
  const total = (formData.quantity || 0) * (formData.ratePerProduct || 0);

  const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;


  const handleChange =<K extends keyof EmployeeProductionRequest> 
  (field: K,value: EmployeeProductionRequest[K]) => {
    setFormData((prev: Partial<EmployeeProductionRequest>) => ({
      ...prev,
      date: selectedDay ? formatDate(selectedDay) : undefined,
      empId: selectedEmployee?.id,
      [field]: value,
    }));
  }

  const { data: prodByDate } = useEmployeeProdByEmpAndMonthYear(
    selectedEmployee?.id || 0,
    selectedMonth || "",
    selectedYear || ""
  );
  const { mutate: addProduction } = useAddEmployeeProduction();
  const { mutate: updateProduction } = useUpdateEmployeeProduction();
  const { mutate: deleteProduction } = useDeleteEmployeeProduction();

  const handleSetIsUpdateMode = (id: number) => {
    const recordToEdit = prodByDate?.find((prod) => prod.id === id);
    if (recordToEdit) {
      setFormData(recordToEdit);
      setProdId(id);
      setSelectedDay(new Date(recordToEdit.date || ""));
      setIsUpdateMode(true);
    }
  };

  const addProductionRecord = () => {
    addProduction(formData);
    setFormData({});
    setSelectedDay(null);
  }

  const updateProductionRecord = (id : number) => {
      updateProduction({id:id, data: formData});
      setFormData({});
      setSelectedDay(null);
      setIsUpdateMode(false);
  }

  const handleProductDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this production record?")) {
      deleteProduction(id);
    }
  };

console.log("Selected Month:", selectedMonth);
console.log("Selected Year:", selectedYear);
console.log(getMonthDateRange(Number(selectedYear), Number(selectedMonth)).startDate);
console.log(getMonthDateRange(Number(selectedYear), Number(selectedMonth)).endDate);
console.log(prodByDate);

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-style mb-4">Monthly Production Overview</h1>
        <p className="text-position-text">
          This page provides insights into the monthly production metrics.
        </p>
      </div>

      {/* Main Grid */}
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
                  Product Name
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={formData.productionName || ""}
                  onChange={(e) => handleChange("productionName", e.target.value)}
                  required 
                />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Quantity
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={formData.quantity || 0}            
                  onChange={(e) => handleChange("quantity", Number(e.target.value))}
                  required 
                />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Rate
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={formData.ratePerProduct || 0}            
                  onChange={(e) => handleChange("ratePerProduct", Number(e.target.value))}
                  required 
                />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Total
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" 
                  value={total}
                  readOnly
                  required 
                />
          </div>

          <div className="flex justify-end mt-auto pt-4">
            <Button 
              text={isUpdateMode ? "Update" : "Add Record"} width="w-32" 
              onClick={isUpdateMode ? () => updateProductionRecord(prodId) : addProductionRecord} 
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
                          <th className="py-3">Product Name</th>
                          <th>Date</th>
                          <th>Quantity</th>
                          <th>Rate</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
            
                      <tbody>
                        {(prodByDate)?.map((prod) => (
                          <tr
                            key={prod.productionName + prod.date}
                            className="border-b border-(--color-border) hover:bg-(--color-hover-bg) transition py-5"    
                          >
                            
            
                            <td className="text-muted-foreground py-5">{prod.productionName}</td>
                            <td className="text-(--color-text)">{prod.date}</td>
                            <td className="text-(--color-text)">{prod.quantity}</td>
                            <td className="text-(--color-text)">{prod.ratePerProduct}</td>
                            <td className="text-(--color-text)">{prod.quantity * prod.ratePerProduct}</td>
            
                            <td className="flex gap-4 text-xl">
                              <div className="flex items-center gap-4 py-5">
                                <Pencil className="text-[#d1a47c] w-5 h-5 cursor-pointer" 
                                  onClick={() => handleSetIsUpdateMode(prod.id)} />
                                <Trash2 className="text-[#fa7f83] w-5 h-5 cursor-pointer"  
                                  onClick={() => handleProductDelete(prod.id)}
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
};

export default ProductionOverview;
