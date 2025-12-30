import { Calendar } from "@/components/ui/calendar";

type DatePickerProps = {
  selectedDay: Date | null;
  onDaySelect: (date: Date | null) => void;
  className?: string;
};

export default function SingleDatePicker({
  selectedDay,
  onDaySelect,
  className = "",
}: DatePickerProps) {
  return (
    <div className={`p-4 bg-card border border-(--color-border) rounded-2xl shadow-md flex items-center justify-center ${className}`}>
      <Calendar
        mode="single"
        className="w-full max-w-xs"
        selected={selectedDay ? new Date(selectedDay) : undefined}
        onSelect={(date) => onDaySelect(date || null)}
        modifiersStyles={calenderStyles}
      />
    </div>
  )
}

const calenderStyles = {
  leave: {
    backgroundColor: "var(--color-light-pink)",
    color: "var(--color-light-black)",
    borderRadius: "6px",
    fontWeight: "bold",
  },
   today: {
    backgroundColor: "var(--color-light-pink)",
    color: "var(--color-accent-foreground)",
    borderRadius: "6px",
    fontWeight: "bold",
  },  
}
