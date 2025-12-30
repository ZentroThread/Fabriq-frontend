import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ItemCardSkeleton() {
  return (
    <Card className="w-auto overflow-hidden shadow-md bg-card rounded-xl">
      <Skeleton className="w-full h-70" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-5" />
        <div className="flex justify-between items-center w-full mb-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex justify-between items-center w-full gap-x-4 mb-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-8" />
        </div>
        <div className="flex justify-center gap-4 p-3">
          <Skeleton className="h-10 w-25" />
          <Skeleton className="h-10 w-25" />
        </div>
      </CardContent>
    </Card>
  );
}
