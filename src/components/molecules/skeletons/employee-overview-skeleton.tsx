import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { DashboardCardSkeleton } from "@/components/molecules/skeletons/dashboard-card-skeleton";
import { TableSkeleton } from "@/components/molecules/skeletons/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function EmployeeOverviewSkeleton() {
  return (
    <div className="p-5 flex flex-col">
      <PageHeaderSkeleton />

      {/* Button Area */}
      <div className="flex gap-2 lg:mr-5 lg:ml-auto sm:ml-0 sm:mr-auto mb-5">
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <DashboardCardSkeleton key={index} />
        ))}
      </div>

      {/* Employee Table */}
      <TableSkeleton rows={8} />
    </div>
  );
}
