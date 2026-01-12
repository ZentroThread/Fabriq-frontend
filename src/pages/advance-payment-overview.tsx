import EmployeeMonthlyPageTemplate from "@/components/templates/employee/employee-monthly-page-template";
import { AdvancePaymentForm } from "@/components/organisms/advance-payment/advance-payment-form";
import AdvancePaymentsTable from "@/components/organisms/advance-payment/advance-payment-table";
import useAdvancePaymentOverview from "@/hooks/employee/advancePayment/useAdvancePaymentOverview";

export default function AdvancePaymentOverviewPage() {

  const { state, actions } = useAdvancePaymentOverview();

  return (
    <EmployeeMonthlyPageTemplate

      title="Advance Payment Overview"
      description="Manage advance payments for the selected employee."

      form={
        <AdvancePaymentForm
          empName={state.empName}
          formData={state.formData}
          onchange={actions.handleChange}
          advancePaymentId={state.advancePaymentId ? state.advancePaymentId : undefined}
          handleAddAdvancePayment={actions.handleAddAdvancePayment}
          handleAdvancePaymentUpdate={actions.handleAdvancePaymentUpdate}
          isUpdateMode={state.isUpdateMode}
        />
      }
      table={
        <AdvancePaymentsTable 
          data={state.advancePayments || []}
          handleAdvancePaymentDelete={actions.handleAdvancePaymentDelete}
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

  )
}