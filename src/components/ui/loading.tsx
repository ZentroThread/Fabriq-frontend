import { Loader2 } from "lucide-react";
import { Skeleton } from "./skeleton";

type Props = {
  label?: string;
  className?: string;
  fullScreen?: boolean;
};

export default function LoadingFallback({
  label = "Loading...",
  className = "",
  fullScreen = false,
}: Props) {
  return (
    <div
      className={`${
        fullScreen ? "min-h-screen flex items-center justify-center" : "p-4"
      } flex flex-col items-center gap-4 ${className}`}
    >
      <div className="inline-flex items-center gap-3 px-4 py-2 bg-main-bg border border-(--color-border) rounded-md">
        <Loader2 className="h-5 w-5 animate-spin text-position-text" />
        <span className="text-position-text">{label}</span>
      </div>

      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="mt-3">
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
}

export { LoadingFallback };
