import { Input as InputUI } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { ReactNode, ChangeEvent } from "react";

interface InputProps {
  placeholder?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  placeholder = "Search Items",
  icon = (
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-position-text pointer-events-none" />
  ),
  value,
  onChange,
}: InputProps) {
  return (
    <div className="w-full mr-3 relative">
      {icon}

      <InputUI
        type="text"
        placeholder={placeholder}
        className="pl-10"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
