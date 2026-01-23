import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function ItemsHistorySkeleton() {
  return (
    <div className="p-5 flex flex-col gap-6">
      <PageHeaderSkeleton />

      {/* Search and Filter Section */}
      <div className="rounded-2xl shadow-md p-6 bg-card">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-24 rounded-full" />
        ))}
      </div>

      {/* Table Section */}
      <div className="rounded-2xl shadow-md p-6 bg-card">
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
