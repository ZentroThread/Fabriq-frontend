import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardCardSkeleton() {
  return (
    <Card className="bg-card rounded-2xl shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-12 w-12 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}
