import { Calendar } from "@/components/ui/calendar";
import { calenderStyles } from "@/constants/data";
import { cn } from "@/utils/style";

type DatePickerProps = {
  selectedDay: Date | null;
  onDaySelect: (date: Date | null) => void;
  className?: string;
};

export default function SingleDatePicker({
  selectedDay,
  onDaySelect,
  className,
}: DatePickerProps) {
  return (
    <div
      className={cn(
        "p-4 bg-card border border-(--color-border) rounded-2xl shadow-md flex items-center justify-center",
        className
      )}
    >
      <Calendar
        mode="single"
        className="w-full max-w-xs"
        selected={selectedDay ? new Date(selectedDay) : undefined}
        onSelect={(date) => onDaySelect(date ?? null)}
        modifiersStyles={calenderStyles}
      />
    </div>
  );
}
