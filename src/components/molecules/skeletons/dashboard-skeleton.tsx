import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { DashboardCardSkeleton } from "@/components/molecules/skeletons/dashboard-card-skeleton";
import { ChartSkeleton } from "@/components/molecules/skeletons/chart-skeleton";

export function DashboardSkeleton() {
  return (
    <div className="p-5 flex flex-col">
      <PageHeaderSkeleton />

      {/* Dashboard Cards Grid */}
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

      {/* Bottom Section */}
      <div className="lg:flex lg:flex-3 gap-6 mt-5 mb-5">
        <div className="flex flex-3/5 sm:mb-6 mb-6">
          <ChartSkeleton />
        </div>
        <ChartSkeleton />
      </div>
    </div>
  );
}
