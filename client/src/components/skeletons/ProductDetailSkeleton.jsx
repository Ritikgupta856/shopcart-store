import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumb from "@/components/shop/Breadcrumb";
import { PageContainer } from "@/components/ui/page-container";

const ProductDetailSkeleton = () => (
  <PageContainer>
    <Breadcrumb
      items={[{ label: "Home", path: "/" }, { label: "Shop", path: "/shop" }, { label: "…" }]}
    />

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <Skeleton className="aspect-square w-full rounded-xl" />

      <div className="flex flex-col">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-3 h-8 w-4/5" />
        <Skeleton className="mt-2 h-8 w-2/5" />
        <Skeleton className="mt-4 h-4 w-40" />

        <div className="mt-5 border-y border-border py-5">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>

        <Skeleton className="mt-5 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-11/12" />
        <Skeleton className="mt-2 h-4 w-3/4" />

        <Skeleton className="mt-6 h-10 w-36" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-11 flex-1 rounded-md" />
          <Skeleton className="h-11 flex-1 rounded-md" />
          <Skeleton className="h-11 rounded-md sm:w-11" />
        </div>

        <Skeleton className="mt-8 h-20 w-full rounded-xl" />
      </div>
    </div>
  </PageContainer>
);

export default ProductDetailSkeleton;
