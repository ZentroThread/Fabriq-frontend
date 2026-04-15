import ReadOnlyField from "@/components/molecules/input/read-only-field";
import { type PayRollResponseType } from "@/types/payroll-type";
import { cn } from "@/utils/style";

type Props = {
  data: PayRollResponseType;
  className?: string;
};

export default function DeductionsCard({ data, className }: Props) {
  return (
    <div
      className={cn(
        "space-y-6 p-6 bg-card rounded-2xl shadow-md flex flex-col",
        className
      )}
    >
      <h2 className="text-position-text">Deductions</h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <ReadOnlyField
          label="Advance Payment"
          value={`Rs.${data.salaryAdvance}`}
        />
      </div>
    </div>
  );
}
