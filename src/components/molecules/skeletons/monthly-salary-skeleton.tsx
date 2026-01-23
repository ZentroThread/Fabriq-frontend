import { PageHeaderSkeleton } from "@/components/molecules/skeletons/page-header-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function MonthlySalarySkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <PageHeaderSkeleton />

      {/* Employee Info Card */}
      <div className="space-y-6 p-6 bg-card rounded-2xl shadow-md flex flex-col">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* Salary Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Card - spans 2 columns */}
        <div className="lg:col-span-2 p-6 bg-card rounded-2xl shadow-md space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Deductions Card */}
        <div className="lg:col-span-1 p-6 bg-card rounded-2xl shadow-md space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Overtime Card - spans full width */}
        <div className="lg:col-span-3 p-6 bg-card rounded-2xl shadow-md space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Extra Holiday Card */}
        <div className="lg:col-span-1 p-6 bg-card rounded-2xl shadow-md space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-16" />
        </div>

        {/* Allowances Card */}
        <div className="lg:col-span-2 p-6 bg-card rounded-2xl shadow-md space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Salary Summary */}
      <div className="p-6 bg-card rounded-2xl shadow-md space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex justify-between">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-28" />
            </div>
          ))}
        </div>
      </div>

      {/* Production Summary */}
      <div className="p-6 bg-card rounded-2xl shadow-md space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>

      {/* Advance Payment Summary */}
      <div className="p-6 bg-card rounded-2xl shadow-md space-y-4">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}
