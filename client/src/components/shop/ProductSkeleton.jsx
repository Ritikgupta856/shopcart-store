const ProductSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
          <div className="w-full h-56 sm:h-64 bg-secondary" />
          <div className="p-3 space-y-2">
            <div className="h-3 w-1/3 bg-secondary rounded" />
            <div className="h-4 w-3/4 bg-secondary rounded" />
            <div className="h-5 w-1/2 bg-secondary rounded" />
          </div>
          <div className="px-3 pb-3">
            <div className="h-9 w-full bg-secondary rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
