import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { DashboardCardSkeleton } from "@/components/molecules/skeletons/dashboard-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartSkeleton } from "@/components/molecules/skeletons/chart-skeleton";

export function BillsSkeleton() {
  return (
    <div className="p-5 flex flex-col">
      <PageHeaderSkeleton />

      {/* Stats Cards */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6 mt-5 mb-5">
        {Array.from({ length: 2 }).map((_, index) => (
          <DashboardCardSkeleton key={index} />
        ))}
      </div>

      {/* Search/Filter Bar */}
      <div className="rounded-2xl shadow-md p-6 bg-card mb-5">
        <div className="gap-2 flex pr-5 items-center">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Chart */}
      <div className="mb-5">
        <ChartSkeleton />
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-md p-6 bg-card">
        <div className="space-y-3">
          <div className="flex gap-4 pb-3 border-b">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex gap-4 py-3 border-b">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
