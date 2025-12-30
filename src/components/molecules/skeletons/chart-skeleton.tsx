import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton({ height = "h-80" }: { height?: string }) {
  return (
    <div className={`rounded-2xl shadow-md p-6 bg-card ${height}`}>
      <div className="space-y-2 mb-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  );
}
