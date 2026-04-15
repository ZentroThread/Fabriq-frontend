import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  label: string;
  value?: boolean;
  disabled?: boolean;
  onChange?: (value?: boolean) => void;
}

export default function BaseCheckboxField({
  label,
  value,
  disabled,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
        {label}
      </label>

      <Checkbox
        checked={value ?? false}
        disabled={disabled}
        onCheckedChange={(checked) => {
          if (checked === "indeterminate") {
            onChange?.(undefined);
          } else {
            onChange?.(checked);
          }
        }}
      />
    </div>
  );
}
