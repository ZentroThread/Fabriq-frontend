import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartSkeleton } from "@/components/molecules/skeletons/chart-skeleton";

export function AdvancePaymentSkeleton() {
  return (
    <div className="p-5 flex flex-col gap-6">
      <PageHeaderSkeleton />

      {/* Month/Year Selector */}
      <div className="rounded-2xl shadow-md p-6 bg-card">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      {/* Form Section */}
      <div className="rounded-2xl shadow-md p-6 bg-card">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl shadow-md p-6 bg-card">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-3">
          <div className="flex gap-4 pb-3 border-b">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-4 py-3 border-b">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Section */}
      <ChartSkeleton />
    </div>
  );
}
