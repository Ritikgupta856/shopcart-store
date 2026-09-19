import { Skeleton } from "@/components/ui/skeleton";

const BannerSkeleton = ({ height = "h-[280px] sm:h-[380px] md:h-[420px]" }) => (
  <div className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-8">
    <Skeleton className={`w-full ${height} rounded-2xl`} />
  </div>
);

export default BannerSkeleton;
