import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { DashboardCardSkeleton } from "@/components/molecules/skeletons/dashboard-card-skeleton";
import { ChartSkeleton } from "@/components/molecules/skeletons/chart-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function ReportsSkeleton() {
  return (
    <div className="p-5 flex flex-col">
      <PageHeaderSkeleton />

      {/* Export Button Area */}
      <div className="flex gap-2 lg:mr-5 lg:ml-auto mt-5 sm:ml-0 sm:mr-auto">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 mb-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <DashboardCardSkeleton key={index} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-5 mb-5">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      {/* Full Width Chart */}
      <div className="mb-5">
        <ChartSkeleton />
      </div>

      {/* Bottom Charts Grid */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-5 mb-5">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
}
