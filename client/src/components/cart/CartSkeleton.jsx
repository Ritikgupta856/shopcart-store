const CartSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
    <div className="flex-1 rounded-2xl border border-border bg-card p-5 space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-24 h-24 rounded-lg bg-secondary" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/2 bg-secondary rounded" />
            <div className="h-3 w-1/4 bg-secondary rounded" />
            <div className="h-4 w-1/3 bg-secondary rounded" />
          </div>
        </div>
      ))}
    </div>
    <div className="w-full lg:w-[340px] shrink-0 rounded-2xl border border-border bg-card p-5 space-y-3">
      <div className="h-4 w-1/2 bg-secondary rounded" />
      <div className="h-3 w-full bg-secondary rounded" />
      <div className="h-3 w-full bg-secondary rounded" />
      <div className="h-8 w-full bg-secondary rounded mt-4" />
    </div>
  </div>
);

export default CartSkeleton;
