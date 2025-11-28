import { Input as InputUI } from "@/components/ui/input";
import { Search } from "lucide-react";

interface InputProps {
  placeholder ?:string;
}


export function Input({placeholder = "Search Items"}:InputProps) {
  return (
    <div className="w-full mr-3 relative">
      {/* Icon inside input */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-position-text  pointer-events-none" />

      <InputUI 
        type="text"
        placeholder={placeholder}
        className="pl-10" // pushes text so it doesn’t overlap icon
      />
    </div>
  );
}
