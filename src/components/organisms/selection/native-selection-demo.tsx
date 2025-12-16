import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

interface NativeSelectDemoProps {
  option: string;
  value1: string;
  value2: string;
  value3: string;
  string1: string;
  string2: string;
  string3: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function NativeSelectDemo({
  option,
  value1,
  value2,
  value3,
  string1,
  string2,
  string3,
  value = "",
  onValueChange,
}: NativeSelectDemoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange?.(e.target.value);
  };
  return (
    <NativeSelect 
      className="text-position-text w-auto bg-card font-light rounded-md border-position-text border-1 ml-3"
      value={value}
      onChange={handleChange}
    >
      <NativeSelectOption value="">{option}</NativeSelectOption>
      <NativeSelectOption value={value1}>{string1}</NativeSelectOption>
      <NativeSelectOption value={value2}>{string2}</NativeSelectOption>
      <NativeSelectOption value={value3}>{string3}</NativeSelectOption>
    </NativeSelect>
  );
}

// Usage example:
// <NativeSelectDemo
//   option="Select status"
//   value1="last-month"
//   value2="last-3-months"
//   value3="last-year"
//   string1="Last Month"
//   string2="Last 3 Months"
//   string3="Last Year"
// />