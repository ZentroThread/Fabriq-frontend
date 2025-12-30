import { Input } from "@/components/ui/input";

type Props = {
  label: string;
  value: string | number;
  readonly?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export default function BaseInputField({ label, value, readonly, onChange, placeholder }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
        {label}
      </label>
      <Input
        className="w-full sm:flex-1 max-w-full sm:max-w-80"
        value={value}
        readOnly={readonly}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

