import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function EpfEtfHistorySkeleton() {
  return (
    <div className="space-y-6 p-6 bg-(--color-main-bg) min-h-screen">
      <PageHeaderSkeleton />

      {/* Month & Year Selector Card */}
      <div className="bg-card p-5 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Tabs Card */}
      <div className="bg-card rounded-xl shadow-md">
        {/* Tabs */}
        <div className="flex border-b border-border rounded-t-xl overflow-hidden py-1 px-2 gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>

        {/* Table Container */}
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex gap-4 pb-3 border-b">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex gap-4 py-3 border-b">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
