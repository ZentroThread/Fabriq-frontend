import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function SalaryHistorySkeleton() {
  return (
    <div className="p-5 flex flex-col">
      <PageHeaderSkeleton />

      <div className="rounded-2xl shadow-md p-6 bg-card">
        <div className="space-y-2 mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Employee Info */}
        <div className="flex flex-col items-center mb-6 md:flex-row md:items-start md:gap-4 mt-5">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="mt-4 md:mt-0 space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Year Selector */}
        <div className="mb-4">
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        {/* Table */}
        <div className="mt-5 mb-5">
          <div className="space-y-3">
            {/* Table Header */}
            <div className="flex gap-4 pb-3 border-b">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>
            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex gap-4 py-4 border-b">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
