import {type PayRollResponseType} from "@/types/payroll-type";
import {Label} from "@/components/ui/label";
import Button from "@/components/atoms/button/add-button";

 type props = {
    data: PayRollResponseType;
  }

export default function SalarySummary({data}:props) {

  const rows = [
    ["Basic Salary", data.basicSalary],
    ["Allowances", data.totalAllowances],
    ["Production Income", data.productPay],
    ["Sales Commission", data.commission],
    ["Gross Salary", data.grossSalary],
    ["EPF (Employee)", data.epfEmployee],
    ["ETF", data.etf],
    ["Deductions", data.totalDeductions],
    ["Net Salary", data.netSalary],
  ];

  return (
    <div className="mt-6 p-6 rounded-xl shadow bg-card">
      <h2 className="text-xl font-semibold mb-4">Salary Summary</h2>

      <div className="space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between">
            <Label className="text-position-text">{label}</Label>
            <span className=" text-position-text">Rs. {value}</span>
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