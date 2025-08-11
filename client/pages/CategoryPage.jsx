import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Products from "../src/components/ProductGrid";
import Loader from "@/components/Loader";

const CategoryGrid = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch products by category slug directly
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/categories/${slug}`
        );
        setProducts(response.data.products || []);
        setCategoryName(response.data.categoryName || slug);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  return (
    <div className="min-h-screen">
      {loading ? (
        <p className="text-center text-xl">
          <Loader />
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length > 0 ? (
        <Products products={products} innerPage={false} headingText={categoryName} />
      ) : (
        <div>
          <Products products={[]} innerPage={false} headingText={categoryName} />
          <p className="text-center text-xl">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
