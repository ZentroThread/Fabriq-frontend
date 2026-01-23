import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function ItemsWishlistSkeleton() {
  return (
    <div className="p-5 flex flex-col gap-6">
      <PageHeaderSkeleton />

      {/* Search and Date Filter Section */}
      <div className="rounded-2xl shadow-md p-6 bg-card">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-2xl shadow-md p-6 bg-card">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>

      {/* Calendar Section */}
      <div className="rounded-2xl shadow-md p-6 bg-card">
        <Skeleton className="h-64 w-full" />
      </div>

      {/* Table Section */}
      <div className="rounded-2xl shadow-md p-6 bg-card">
        <div className="space-y-3">
          <div className="flex gap-4 pb-3 border-b">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex gap-4 py-3 border-b">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-20" />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-10 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
