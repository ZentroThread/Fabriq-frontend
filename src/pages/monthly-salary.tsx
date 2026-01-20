import SalarySummary from "@/components/organisms/summaries/salary-summary";
import EmpProductionSummary from "@/components/organisms/summaries/employee-production-summary";
import EmpAdvancePaymentSummary from "@/components/organisms/summaries/advance-payment-summary";
import EarningsCard from "@/components/organisms/salary/earnings-card";
import DeductionsCard from "@/components/organisms/salary/deductions-card";
import AllowancesCard from "@/components/organisms/salary/allowances-card";
import ExtraHolidayCard from "@/components/organisms/salary/extra-holiday-card";
import OvertimeCard from "@/components/organisms/salary/overtime-card";
import { useParams } from "react-router-dom";
import { useGetPayroll } from "@/hooks/employee/payroll/usePayroll";
import selectedEmployee from "@/store/employee-store";

export default function MonthlySalary() {
  const { id, year, month } = useParams();
  const empName =
    selectedEmployee.getState().selectedEmployee?.fullName || "Employee";
  const {
    data: salaryDetails,
    isLoading,
    isError,
    error,
  } = useGetPayroll(Number(id), Number(month), Number(year));

  if (isLoading) {
    return <div>Loading salary details...</div>;
  }

  if (isError || !salaryDetails) {
    console.error("Error fetching salary details:", error);
    return <div>Failed to load salary details</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-style mb-4">
          Monthly Salary Overview
        </h1>
        <p className="text-position-text">
          This page provides insights into the monthly salary metrics.
        </p>
      </div>

      <div
        className={"space-y-6 p-6 bg-card rounded-2xl shadow-md flex flex-col"}
      >
        <h2 className="text-position-text">
          Salary Details for{" "}
          <span className="text-md text-style">
            {" "}
            {month}/{year}{" "}
          </span>
        </h2>
        <div>
          <span className="text-position-text">Employee Name: </span>
          <span className="text-md text-style">{empName}</span>
        </div>
      </div>

      {/* Salary Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Earnings */}
        <EarningsCard data={salaryDetails} className="lg:col-span-2" />

        {/* Deductions */}
        <DeductionsCard data={salaryDetails} className="lg:col-span-1" />

        {/* Overtime */}
        <OvertimeCard data={salaryDetails} className="lg:col-span-3" />

        {/*Extra Holiday Take*/}
        <ExtraHolidayCard data={salaryDetails} className="lg:col-span-1" />

        {/* Allowances */}
        <AllowancesCard data={salaryDetails} className="lg:col-span-2" />
      </div>

      {/* Salary Summary */}
      <SalarySummary data={salaryDetails} />

      {/* Production Summary */}
      <EmpProductionSummary
        empId={Number(id)}
        month={Number(month)}
        year={Number(year)}
      />

      {/* Advance Payment Summary */}
      <EmpAdvancePaymentSummary
        empId={Number(id)}
        month={Number(month)}
        year={Number(year)}
      />
    </div>
  );
}
