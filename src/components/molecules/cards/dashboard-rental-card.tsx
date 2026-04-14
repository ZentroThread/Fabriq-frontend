import { cn } from "@/utils/style";

interface DashboardRentalCardProps {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  date: string;
  isOverdue?: boolean;
  className?: string;
}

export function DashboardRentalCard({
  title,
  subTitle,
  icon,
  date,
  isOverdue = false,
  className,
}: DashboardRentalCardProps) {
  return (
    <div
      className={cn(
        "bg-linear-to-r from-sidebar-button-active-from to-sidebar-button-active-to",
        "shadow-md rounded-lg p-4 flex items-center mt-2",
        className
      )}
    >
      <div className="p-3 bg-( --color-button) rounded-full mr-4">{icon}</div>

      <div className="flex flex-1 items-center justify-between">
        <div>
          <h3 className="text-md font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-(--color-position-text)">{subTitle}</p>
        </div>

        <span
          className={cn(
            "text-xs px-3 py-1 rounded-full bg-white/60 dark:bg-white/10",
            "text-(--color-support-button) border border-avatar-border font-bold",
            isOverdue && "border-red-500"
          )}
        >
          {isOverdue ? "Overdue " : "Due "}
          {date}
        </span>
      </div>
    </div>
  );
}

export default DashboardRentalCard;
