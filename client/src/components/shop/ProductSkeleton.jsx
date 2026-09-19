const ProductSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="aspect-square w-full animate-pulse bg-secondary" />
          <div className="flex flex-1 flex-col p-3.5">
            <div className="h-4 w-full animate-pulse rounded bg-secondary" />
            <div className="mt-1.5 h-4 w-2/3 animate-pulse rounded bg-secondary" />
            <div className="mt-auto pt-3">
              <div className="h-5 w-1/2 animate-pulse rounded bg-secondary" />
              <div className="mt-3 h-9 w-full animate-pulse rounded-md bg-secondary" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
