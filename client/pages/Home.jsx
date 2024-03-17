import { useEffect, useContext, useState } from "react";
import axios from "axios";
import Herobanner from "@/components/HeroBanner/Herobanner";
import Category from "@/components/Category/Category"
import { AppContext } from "@/Context/AppContext";
import Products from "@/components/Products/Products";
import Loader from "@/components/Loader/Loader";

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
        `${import.meta.env.VITE_SERVER_URL}/allcategories`
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
        `${import.meta.env.VITE_SERVER_URL}/allproducts`
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
      {isLoading ? <Loader /> : <Category categories={categories} />}
      {isLoading ? <Loader /> :  <Products products={products} headingText="Popular Products" />}
    </main>
  );
};

export default Home;
