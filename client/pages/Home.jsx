import Herobanner from "@/components/Herobanner";
import Category from "@/components/Category";
import Products from "@/components/ProductGrid";
import useCategories from "@/hooks/useCategories";
import useProducts from "@/hooks/useProducts";
import { Loader } from "lucide-react";

const LoadingSection = () => (
  <div className="flex justify-center items-center min-h-[400px] py-8">
    <div className="text-center space-y-4">
      <Loader className="w-8 h-8 animate-spin text-olive-green mx-auto mb-4" />
      <p className="text-gray-600">Loading ...</p>
    </div>
  </div>
);

const Home = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();

  return (
    <main>
      <Herobanner />
      {categoriesLoading ? <LoadingSection /> : <Category categories={categories} />}
      {productsLoading ? (
        <LoadingSection />
      ) : (
        <Products products={products} headingText="Popular Products" />
      )}
    </main>
  );
};

export default Home;
