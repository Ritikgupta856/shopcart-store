import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Products from "./ProductGrid";
import Loader from "@/components/Loader";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/allproducts`
        );

        const filteredProducts = response.data.filter(
          (product) => product.category.toLowerCase() === name.toLowerCase()
        );

        setProducts(filteredProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [name]);

  return (
    <div className="min-h-screen">
      {loading ? (
        <p className="text-center text-xl">
          <Loader />
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length > 0 ? (
        <Products products={products} innerPage={false} headingText={name} />
      ) : (
        <div>
          <Products products={[]} innerPage={false} headingText={name} />
          <p className="text-center text-xl">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
