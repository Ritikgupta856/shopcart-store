import { useMemo } from "react";
import Herobanner from "@/components/Herobanner";
import TrustFeatures from "@/components/TrustFeatures";
import Category from "@/components/Category";
import ProductGrid from "@/components/ProductGrid";
import LimitedTimeDeal from "@/components/LimitedTimeDeal";
import WhyShopCart from "@/components/WhyShopCart";
import useCategories from "@/hooks/useCategories";
import useProducts from "@/hooks/useProducts";
import { Loader } from "lucide-react";

const LoadingSection = () => (
  <div className="flex justify-center items-center min-h-[400px] py-8">
    <div className="text-center space-y-4">
      <Loader className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
      <p className="text-text-secondary">Loading ...</p>
    </div>
  </div>
);

const Home = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();

  const trendingProducts = useMemo(
    () => products.filter((p) => p.isTrending).slice(0, 8),
    [products]
  );
  const newArrivals = useMemo(
    () => products.filter((p) => p.isNewArrival).slice(0, 8),
    [products]
  );

  return (
    <main>
      <Herobanner />
      <TrustFeatures />
      {categoriesLoading ? <LoadingSection /> : <Category categories={categories} />}
      <LimitedTimeDeal />
      {productsLoading ? (
        <LoadingSection />
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
