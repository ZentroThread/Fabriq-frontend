import { Frown } from "lucide-react";
import React from "react";

interface ChartProps {
  label: string;
  description: string;
  children?: React.ReactNode;
  height?: string;
}

function Chart({ label, description, children, height = "h-100" }: ChartProps) {
  return (
    <div
      className={`w-full ${height} bg-card flex flex-col rounded-2xl p-5 shadow-md`}
    >
      <div className="text-style text-[20px] font-semibold">{label}</div>
      <div className="text-position-text">{description}</div>
      <div className="mt-4 w-full h-56">
        {children ? (
          children
        ) : (
          <div className="text-muted-foreground p-30 pl-50 text-[14px] flex gap-4 items-center">
            <Frown />
          </div>
        )}
      </div>
    </div>
  );
}

export default Chart;
