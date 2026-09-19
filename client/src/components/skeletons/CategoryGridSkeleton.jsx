import { Skeleton } from "@/components/ui/skeleton";

const CategoryGridSkeleton = ({ count = 5, cols = "grid-cols-2 lg:grid-cols-5" }) => (
  <div className={`grid ${cols} gap-4`}>
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} className="h-[180px] rounded-2xl" />
    ))}
  </div>
);

export default CategoryGridSkeleton;
