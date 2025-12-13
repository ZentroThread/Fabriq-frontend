import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { ChartSkeleton } from "@/components/molecules/skeletons/chart-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function AttendanceSkeleton() {
  return (
    <div className="p-5 flex flex-col">
      <PageHeaderSkeleton />

      <div className="lg:flex lg:flex-3 gap-6 mt-5 mb-5">
        {/* Fingerprint Scanner Card */}
        <div className="flex flex-3/5 sm:mb-6 mb-6">
          <div className="rounded-2xl shadow-md p-6 bg-card h-120 w-full">
            <div className="space-y-2 mb-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex justify-center items-center my-8">
              <Skeleton className="w-60 h-60 rounded-full" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="h-14 w-48 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="rounded-2xl shadow-md p-6 bg-card h-120">
          <div className="space-y-2 mb-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="space-y-4 mt-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="rounded-2xl shadow-md p-6 bg-card mt-5">
        <div className="flex mb-6 justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex gap-4 pb-3 border-b">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-24" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-4 py-3 border-b">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
