import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const toDay = new Date();
const currentMonth = String(toDay.getMonth() + 1).padStart(2, "0");
const currentYear = String(toDay.getFullYear());

type MonthYearSelectProps = {
  month?: string;
  year?: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
  yearRange?: number;
};

const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const MonthYearSelect = ({
  month = currentMonth,
  year = currentYear,
  onMonthChange,
  onYearChange,
  yearRange = 5,
}: MonthYearSelectProps) => {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: yearRange }, (_, i) =>
    String(currentYear - i)
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      {/* Month */}
      <Select value={month} onValueChange={onMonthChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent className="bg-card shadow-lg rounded-md">
          {months.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year */}
      <Select value={year} onValueChange={onYearChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent className="bg-card shadow-lg rounded-md">
          {years.map((y) => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthYearSelect;
