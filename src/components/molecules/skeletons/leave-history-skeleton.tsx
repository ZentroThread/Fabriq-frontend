import { Skeleton } from "@/components/ui/skeleton";

export function LeaveHistorySkeleton() {
  return (
    <div className="flex gap-10">
      {/* Leave Records Section */}
      <div className="rounded-2xl shadow-md p-6 bg-card w-2/3">
        <Skeleton className="h-8 w-48 mb-6" />

        <div className="flex flex-col gap-6 px-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Calendar Section */}
      <div className="w-1/3 flex flex-col mt-5 items-center space-y-6">
        <Skeleton className="h-10 w-35" />
        <Skeleton className="h-80 w-full rounded-md" />
      </div>
    </div>
  );
}
