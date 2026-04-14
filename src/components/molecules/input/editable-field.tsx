import { Input } from "@/components/ui/input";

interface Props {
  label: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EditableField({ label, value, onChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
        {label}
      </label>
      <Input
        className="w-full sm:flex-1 max-w-full sm:max-w-80"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
