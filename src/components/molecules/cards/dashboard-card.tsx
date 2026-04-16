import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/style";

interface DashboardCardProps {
  lable: string;
  lable1: string;
  lable2?: string;
  icon?: LucideIcon;
  iconbg?: string;
  width?: string;
}

function DashboardCard({
  lable,
  lable1,
  lable2,
  iconbg,
  width,
  icon: Icon,
  className,
}: DashboardCardProps & { className?: string }) {
  return (
    <div
      className={cn(
        "h-auto bg-card text-position-text rounded-2xl p-6 pt-5 gap-6 shadow-md flex hover:scale-105",
        width || "w-auto",
        className
      )}
    >
      <div className="flex flex-col w-full">
        <span className="text-[16px] pb-3">{lable}</span>
        <span className=" pb-3 text-[26px] text-style">{lable1}</span>
        <span className="text-shadow-text-active text-[14px]">{lable2}</span>
      </div>
      <div
        className="w-14 h-14 bg-support-button rounded-2xl p-3 text-support-button-text "
        style={{ backgroundColor: iconbg }}
      >
        {Icon && <Icon className="w-7 h-7  " />}
      </div>
    </div>
  );
}

export default DashboardCard;
