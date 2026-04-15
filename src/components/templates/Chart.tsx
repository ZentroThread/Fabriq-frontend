import { Frown } from "lucide-react";
import React from "react";
import { cn } from "@/utils/style";

interface ChartProps {
  label?: string;
  description?: string;
  children?: React.ReactNode;
  height?: string;
  padding?: string;
  className?: string;
}

function Chart({
  label,
  description,
  children,
  height = "h-auto",
  padding = "p-5",
  className,
}: ChartProps) {
  return (
    <div
      className={cn(
        "mt-5 w-full bg-card flex flex-col rounded-2xl shadow-md",
        height,
        padding,
        className
      )}
    >
      <div className={cn("text-style text-[20px] font-semibold", className)}>
        {label}
      </div>
      <div className={cn("text-position-text", className)}>{description}</div>
      <div className="mt-4 w-full ">
        {children ? (
          children
        ) : (
          <div className="text-muted-foreground text-[14px] flex justify-center items-center h-full w-full">
            <Frown />
          </div>
        )}
      </div>
    </div>
  );
}

export default Chart;
