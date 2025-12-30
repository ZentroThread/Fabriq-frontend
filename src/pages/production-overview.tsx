import EmployeeMonthlyPageTemplate from "@/components/templates/employee/employee-monthly-page-template";
import EmployeeProductionTable from "@/components/organisms/employee-production/employee-production-table";
import { useEmployeeProductionOverview } from "@/hooks/employee/productionRecord/useEmployeeProductionOverview"
import EmployeeProductionForm from "@/components/organisms/employee-production/employee-production-form"

const ProductionOverview = () => {

  const data = useEmployeeProductionOverview();
 
  return (
    <EmployeeMonthlyPageTemplate

      title="Production Overview"
      description="Manage production records for the selected employee."

      form={
        <EmployeeProductionForm
          empName={data.empName}
          formData={data.formData}
          onChange={data.handleChange}
          productionId={data.prodId ? data.prodId : undefined}
          handleAddProduction={data.handleAddProduction}
          handleProductionUpdate={data.handleProductionUpdate}
          isUpdateMode={data.isUpdateMode}
        />
      }
      table = {
        <EmployeeProductionTable 
          data={data.prodByDate || []}
          handleProductionDelete={data.handleProductionDelete}
          handleSetIsUpdateMode={data.handleSetIsUpdateMode}
        />
      }
      selectedDay={data.selectedDay ?? null}
      onDaySelect={data.setSelectedDay}
      selectedMonth={data.selectedMonth}
      selectedYear={data.selectedYear}
      onMonthChange={(month) => {
        data.setSelectedMonth(month);
        data.setSelectedDay(null);
      }}
      onYearChange={(year) => {
        data.setSelectedYear(year);
        data.setSelectedDay(null);
      }}

    />
  );
};

export default ProductionOverview;
