import ReadOnlyField from "@/components/molecules/input/read-only-field";
import type { PayRollResponseType } from "@/types/payroll-type";

type Props = {
  data: PayRollResponseType;
  className?: string;
};

export default function ExtraHolidayCard({ data, className = "" }: Props) {
  return (
    <div
      className={`space-y-6 p-6 bg-card rounded-2xl shadow-md flex flex-col ${className}`}
    >
      <h2 className="text-position-text">Extra Holiday Take</h2>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <ReadOnlyField label="Extra Holiday Take" value={`${data.extraHolidaysTaken}`} />
      </div>
    </div>
  );
}
