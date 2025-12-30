import { Skeleton } from "@/components/ui/skeleton";

export function EmployeeProfileSkeleton() {
  return (
    <div className="p-3 sm:p-5 flex flex-col">
      <div className="rounded-2xl shadow-md p-6 bg-card h-full flex flex-col justify-between relative">
        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <div className="flex justify-center">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="flex justify-center mt-2">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:pl-10 gap-6">
          {/* Profile Image - Mobile */}
          <div className="flex justify-center lg:hidden mb-6">
            <div className="flex flex-col relative items-center">
              <Skeleton className="w-32 h-32 sm:w-35 sm:h-35 rounded-2xl" />
              <Skeleton className="h-10 w-32 sm:w-35 mt-3" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="w-full lg:flex-1 space-y-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
              >
                <Skeleton className="h-5 w-full sm:w-40" />
                <Skeleton className="h-10 w-full sm:flex-1 sm:max-w-80" />
              </div>
            ))}
          </div>

          {/* Profile Image - Desktop */}
          <div className="hidden lg:flex flex-col items-center">
            <Skeleton className="w-35 h-35 rounded-2xl" />
            <Skeleton className="h-10 w-35 mt-3" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 lg:pl-10">
          <Skeleton className="h-12 w-full sm:w-48" />
          <Skeleton className="h-12 w-full sm:w-48" />
          <Skeleton className="h-12 w-full sm:w-48" />
        </div>
      </div>
    </div>
  );
}
