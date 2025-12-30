import EmployeeMonthlyPageTemplate from "@/components/templates/employee/employee-monthly-page-template";
import { AdvancePaymentForm } from "@/components/organisms/advance-payment/advance-payment-form";
import AdvancePaymentsTable from "@/components/organisms/advance-payment/advance-payment-table";
import useAdvancePaymentOverview from "@/hooks/employee/advancePayment/useAdvancePaymentOverview";

export default function AdvancePaymentOverviewPage() {

  const data = useAdvancePaymentOverview();

  return (
    <EmployeeMonthlyPageTemplate

      title="Advance Payment Overview"
      description="Manage advance payments for the selected employee."

      form={
        <AdvancePaymentForm
          empName={data.empName}
          formData={data.formData}
          onchange={data.handleChange}
          advancePaymentId={data.advancePaymentId ? data.advancePaymentId : undefined}
          handleAddAdvancePayment={data.handleAddAdvancePayment}
          handleAdvancePaymentUpdate={data.handleAdvancePaymentUpdate}
          isUpdateMode={data.isUpdateMode}
        />
      }
      table={
        <AdvancePaymentsTable 
          data={data.advancePayments || []}
          handleAdvancePaymentDelete={data.handleAdvancePaymentDelete}
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

  )
}