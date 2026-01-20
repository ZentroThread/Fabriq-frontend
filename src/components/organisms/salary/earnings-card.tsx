import ReadOnlyField from "@/components/molecules/input/read-only-field";
import { type PayRollResponseType } from "@/types/payroll-type";

type Props = {
  data: PayRollResponseType;
  className?: string;
};

export default function EarningsCard({ data, className }: Props) {
  return (
    <div
      className={`space-y-6 p-6 bg-card rounded-2xl shadow-md flex flex-col ${className}`}
    >
      <h2 className="text-position-text">Earnings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="space-y-3">
          <ReadOnlyField
            label="Basic Salary"
            value={`Rs.${data.basicSalary}`}
          />
        </div>

        <div className="space-y-3">
          <ReadOnlyField
            label="Production Bonus"
            value={`Rs.${data.productPay}`}
          />
          <ReadOnlyField label="Commission" value={`Rs.${data.commission}`} />
        </div>
      </div>
    </div>
  );
}
