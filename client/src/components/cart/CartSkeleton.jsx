const CartSkeleton = () => (
  <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
    <div className="min-w-0 flex-1 divide-y divide-border rounded-xl border border-border bg-card px-5 py-5 sm:px-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-5 py-5 first:pt-0 last:pb-0">
          <div className="size-24 shrink-0 animate-pulse rounded-lg bg-secondary sm:size-28" />
          <div className="flex-1 space-y-2.5">
            <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
            <div className="h-3 w-1/4 animate-pulse rounded bg-secondary" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
            <div className="h-9 w-28 animate-pulse rounded-md bg-secondary" />
          </div>
        </div>
      ))}
    </div>

    <div className="w-full shrink-0 space-y-4 rounded-xl border border-border bg-card p-5 lg:w-[360px]">
      <div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
      <div className="h-10 w-full animate-pulse rounded-md bg-secondary" />
      <div className="h-3 w-full animate-pulse rounded bg-secondary" />
      <div className="h-3 w-full animate-pulse rounded bg-secondary" />
      <div className="h-6 w-1/2 animate-pulse rounded bg-secondary" />
      <div className="h-11 w-full animate-pulse rounded-md bg-secondary" />
    </div>
  </div>
);

export default CartSkeleton;
