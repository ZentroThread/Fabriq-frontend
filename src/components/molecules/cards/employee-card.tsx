import { cn } from "@/utils/style";

interface DashboardCardProps {
  label: string;
  label1: string;
  width?: string;
  className?: string;
}

function EmployeeCard({ label, label1, width, className }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "h-auto bg-card text-position-text rounded-2xl p-6 pt-5 gap-6 shadow-md flex hover:scale-105",
        width || "w-auto",
        className
      )}
    >
      <div className="flex flex-col w-full">
        <span className="text-[16px] pb-3">{label}</span>
        <span className=" pb-3 text-[26px] text-style">{label1}</span>
      </div>
    </div>
  );
}

export default EmployeeCard;
