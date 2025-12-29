import {type PayRollResponseType} from "@/types/payroll-type";
import {Label} from "@/components/ui/label";
import Button from "@/components/atoms/button/add-button";

 type props = {
    data: PayRollResponseType;
  }

export default function SalarySummary({data}:props) {

  const rows = [
    ["Basic Salary", data.basicSalary],
    ["Single OT", data.singleOTAmount],
    ["Double OT", data.doubleOTAmount],
    ["Attendance Allowances", data.totalAllowances],
    ["Production Income", data.productPay],
    ["Sales Commission", data.commission],
    ["Gross Salary", data.grossSalary],
    ["EPF (8%)", data.epfEmployee],
    ["Salary Advance", data.salaryAdvance],
    ["Net Salary", data.netSalary],
    ["ETF", data.etf],
    ["Employer EPF (12%)", data.epfEmployer],
    ["Net Benefit",data.netSalary+ data.etf + data.epfEmployer],
  ];

  return (
    <div className="mt-6 p-6 rounded-xl shadow bg-card">
      <h2 className="text-xl font-semibold mb-4">Salary Summary</h2>

      <div className="space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between">
           {label === "Gross Salary" || label === "Net Salary" || label === "Net Benefit" ? (
              <Label className="text-md font-medium ">{label}</Label>
            ) : (
              <span className="text-position-text">{label}</span>
            )}
            <span className={label === "Gross Salary" || label === "Net Salary" || label === "Net Benefit" ? "text-md font-medium underline underline-offset-4" : "text-position-text"}>
              Rs.{value}
            </span>
          </div>
        ))}
      </div>

      <Button 
      bordercolor="border-border-card2"
            bgcolor="bg-bg-card2"
            hovertext="hover:text-background"
            hoverbg="hover:bg-light-brown"
            textcolor="text-black"
            text="Generate Payslip"
            width="w-full"/>
    </div>
  );
}