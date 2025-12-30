import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function RentsAndBillsSkeleton() {
  return (
    <div className="p-5">
      <PageHeaderSkeleton />

      <div className="grid lg:grid-cols-3 gap-6 mt-5">
        {/* Left Column - Customer & Duration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="rounded-2xl shadow-md p-6 bg-card">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Duration */}
          <div className="rounded-2xl shadow-md p-6 bg-card">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Add Items */}
          <div className="rounded-2xl shadow-md p-6 bg-card">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="rounded-2xl shadow-md p-6 bg-card h-fit">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
            <Skeleton className="h-12 w-full mt-4 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Rental Items List */}
      <div className="rounded-2xl shadow-md p-6 bg-card mt-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
