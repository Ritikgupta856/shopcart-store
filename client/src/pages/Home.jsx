import { useMemo } from "react";
import Herobanner from "@/components/Herobanner";
import Category from "@/components/Category";
import ProductGrid from "@/components/ProductGrid";
import LimitedTimeDeal from "@/components/LimitedTimeDeal";
import WhyShopCart from "@/components/WhyShopCart";
import CategoryGridSkeleton from "@/components/skeletons/CategoryGridSkeleton";
import ProductSkeleton from "@/components/shop/ProductSkeleton";
import useCategories from "@/hooks/useCategories";
import useProducts from "@/hooks/useProducts";

const Home = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();

  const trendingProducts = useMemo(
    () => products.filter((p) => p.isTrending).slice(0, 4),
    [products]
  );
  const newArrivals = useMemo(
    () => products.filter((p) => p.isNewArrival).slice(0, 4),
    [products]
  );

  return (
    <main>
      <Herobanner />
      {categoriesLoading ? (
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-8 md:py-12">
          <CategoryGridSkeleton />
        </div>
      ) : (
        <Category categories={categories} />
      )}
      <LimitedTimeDeal />
      {productsLoading ? (
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-4 md:py-8">
          <ProductSkeleton count={8} />
        </div>
      ) : (
        <>
          {trendingProducts.length > 0 && (
            <ProductGrid products={trendingProducts} headingText="Trending Now" viewAllLink="/shop?collection=trending" />
          )}
          {newArrivals.length > 0 && (
            <ProductGrid products={newArrivals} headingText="New Arrivals" viewAllLink="/shop?collection=new-arrivals" />
          )}
        </>
      )}
      <WhyShopCart />
    </main>
  );
};

export default Home;
