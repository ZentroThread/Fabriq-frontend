import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { DashboardCardSkeleton } from "@/components/molecules/skeletons/dashboard-card-skeleton";
import { ItemCardSkeleton } from "@/components/molecules/skeletons/item-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function ItemsSkeleton() {
  return (
    <div className="p-5 flex flex-col">
      <PageHeaderSkeleton />

      {/* Button Area */}
      <div className="flex gap-2 lg:mr-5 lg:ml-auto sm:ml-0 sm:mr-auto mb-5">
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Stats Cards */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-5 mb-5">
        {Array.from({ length: 3 }).map((_, index) => (
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

      {/* Item Cards Grid */}
      <div className="pt-5 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ItemCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
