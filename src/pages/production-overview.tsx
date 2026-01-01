import EmployeeMonthlyPageTemplate from "@/components/templates/employee/employee-monthly-page-template";
import EmployeeProductionTable from "@/components/organisms/employee-production/employee-production-table";
import { useEmployeeProductionOverview } from "@/hooks/employee/productionRecord/useEmployeeProductionOverview"
import EmployeeProductionForm from "@/components/organisms/employee-production/employee-production-form"

const ProductionOverview = () => {

  const {state,actions} = useEmployeeProductionOverview();
 
  return (
    <EmployeeMonthlyPageTemplate

      title="Production Overview"
      description="Manage production records for the selected employee."

      form={
        <EmployeeProductionForm
          empName={state.empName}
          formData={state.formData}
          onChange={actions.handleChange}
          productionId={state.prodId ? state.prodId : undefined}
          handleAddProduction={actions.handleAddProduction}
          handleProductionUpdate={actions.handleProductionUpdate}
          isUpdateMode={state.isUpdateMode}
        />
      }
      table = {
        <EmployeeProductionTable 
          data={state.prodByDate || []}
          handleProductionDelete={actions.handleProductionDelete}
          handleSetIsUpdateMode={actions.handleSetIsUpdateMode}
        />
      }
      selectedDay={state.selectedDay ?? null}
      onDaySelect={actions.setSelectedDay}
      selectedMonth={state.selectedMonth}
      selectedYear={state.selectedYear}
      onMonthChange={(month) => {
        actions.setSelectedMonth(month);
        actions.setSelectedDay(null);
      }}
      onYearChange={(year) => {
        actions.setSelectedYear(year);
        actions.setSelectedDay(null);
      }}

    />
  );
};

export default ProductionOverview;
