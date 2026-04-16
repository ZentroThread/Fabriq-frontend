import { type ReactNode } from "react";
import { cn } from "@/utils/style";
interface AttendanceCardProps {
  label: string;
  icon?: ReactNode;
  label1?: string;
  bgcolor?: string;
  iconcolor?: string;
  bordercolor?: string;
}
function AttendanceCard({
  label,
  icon,
  label1,
  bgcolor = "var(--color-light-pie-2)",
  iconcolor = "var(--color-light-pie-2)",
  bordercolor = "var(--color-light-pie-2)",
}: AttendanceCardProps) {
  return (
    <div
      style={{ backgroundColor: bgcolor, borderColor: bordercolor }}
      className={cn(
        "w-auto h-auto flex p-3 rounded-2xl border-2 gap-10 items-center hover:scale-105"
      )}
    >
      <span style={{ color: iconcolor }}>{icon}</span>
      <span className={cn("text-[#615758] text-[20px]")}>{label}</span>
      <span
        style={{ fontFamily: "Bodoni Moda" }}
        className={cn("text-[25px] ml-auto mr-5")}
      >
        {label1}
      </span>
    </div>
  );
}

export default AttendanceCard;
