import React from "react";
import { cn } from "../../../utils/style";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  containerClassName?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, containerClassName, type, icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-12 items-center gap-2 rounded-xl border border-input-border bg-white px-3 py-3 focus-within:border-input-active-border focus-within:ring-1 focus-within:ring-input-active-border",
          containerClassName
        )}
      >
        {icon && (
          <span className="text-mount-foreground flex-shrink-0">{icon}</span>
        )}
        <input
          type={type}
          className={cn("w-full flex-1 bg-transparent outline-none", className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
TextInput.displayName = "TextInput";

export default TextInput;
