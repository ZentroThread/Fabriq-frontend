import { Skeleton } from "@/components/ui/skeleton";

export function AddEmployeeSkeleton() {
  return (
    <div className="p-5 flex flex-col gap-5">
      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Form Section */}
      <div className="rounded-2xl shadow-md p-6 bg-card">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-6">
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>

        {/* Bank Details Section */}
        <div className="mt-6 pt-6 border-t">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Skeleton className="h-12 w-40" />
      </div>
    </div>
  );
}
