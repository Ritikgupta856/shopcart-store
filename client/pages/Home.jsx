import { useEffect, useContext, useState } from "react";
import axios from "axios";
import Herobanner from "@/components/Herobanner";
import Category from "../src/components/Category";
import Products from "../src/components/ProductGrid";
import { AppContext } from "../src/Context/AppContext";
import CategorySkeleton from "../src/components/CategorySkeleton";
import ProductsSkeleton from "../src/components/ProductSkeleton";

const Home = () => {
  const { categories, setCategories, products, setProducts } =
    useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/allcategories`
      );
      setCategories(response.data);
    } catch (error) {
      console.log('"Error fetching Categories:"', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/allproducts`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Herobanner />
      {isLoading ? <CategorySkeleton /> : <Category categories={categories} />}
      {isLoading ? (
        <ProductsSkeleton headingText="Popular Products" />
      ) : (
        <Products products={products} headingText="Popular Products" />
      )}
    </main>
  );
};

export default Home;
