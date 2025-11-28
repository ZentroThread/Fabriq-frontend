import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export function NativeSelectDemo() {
  return (
    <NativeSelect className="text-position-text   bg-card font-light rounded-xl ml-3 ">
      <NativeSelectOption value="">Select status</NativeSelectOption>
      <NativeSelectOption value="last-month">Last Month</NativeSelectOption>
      <NativeSelectOption value="last-3-months">
        Last 3 Months
      </NativeSelectOption>
      <NativeSelectOption value="last-6-months">
        Last 3 Months
      </NativeSelectOption>
      <NativeSelectOption value="last year">Last Year</NativeSelectOption>
    </NativeSelect>
  );
}
