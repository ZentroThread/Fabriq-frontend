import SalarySummary from "@/components/organisms/summaries/salary-summary";
import EmpProductionSummary from "@/components/organisms/summaries/employee-production-summary";
import EmpAdvancePaymentSummary from "@/components/organisms/summaries/advance-payment-summary";
import EarningsCard from "@/components/organisms/salary/earnings-card";
import {type PayRollResponseType } from "@/types/payroll-type";
import DeductionsCard from "@/components/organisms/salary/deductions-card";
import AllowancesCard from "@/components/organisms/salary/allowances-card";
import ExtraHolidayCard from "@/components/organisms/salary/extra-holiday-card";
import OvertimeCard from "@/components/organisms/salary/overtime-card";
import { useParams } from "react-router-dom";

export default function MonthlySalary() {

  const salaryDetails: PayRollResponseType = {
    empId: 2,
    empCode: "E001",
    employeeName: "John Doe",
    month: 6,
    year: 2024,
    basicSalary: 50000,
    totalAllowances: 10000,
    totalDeductions: 8000,
    commission: 5000,
    overtimePay: 2000,
    salaryAdvance: 3000,
    productPay: 4000,
    epfEmployee: 6000,
    epfEmployer: 12000,
    etf: 3000,
    grossSalary: 67000,
    netSalary: 59000,
    calculatedAt: "2024-06-15T10:00:00Z",
  };
  const {id,year,month} = useParams();

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-style mb-4">Monthly Salary Overview</h1>
        <p className="text-position-text">
          This page provides insights into the monthly salary metrics.
        </p>
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
        <ExtraHolidayCard className="lg:col-span-1" />

        {/* Allowances */}
        <AllowancesCard data={salaryDetails} className="lg:col-span-2" />

      </div>

      {/* Salary Summary */}
      <SalarySummary data={salaryDetails} />
    

      {/* Production Summary */}
      <EmpProductionSummary empId={Number(id)} month={Number(month)} year={Number(year)} />
  

      {/* Advance Payment Summary */}
      <EmpAdvancePaymentSummary empId={Number(id)} month={Number(month)} year={Number(year)} />

    </div>
  );
}