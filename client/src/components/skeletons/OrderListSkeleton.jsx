import { Skeleton } from "@/components/ui/skeleton";

const OrderListSkeleton = ({ count = 3 }) => (
  <div className="flex flex-col gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary/60 px-5 py-3.5">
          <div className="flex gap-6">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="space-y-1.5">
                <Skeleton className="h-2.5 w-14" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <div className="divide-y divide-border px-5">
          {Array.from({ length: 2 }).map((_, j) => (
            <div key={j} className="flex items-center gap-4 py-4">
              <Skeleton className="size-14 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-4" />
        </div>
      </div>
    ))}
  </div>
);

export default OrderListSkeleton;
