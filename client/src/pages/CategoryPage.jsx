import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Products from "../components/ProductGrid";
import ProductSkeleton from "@/components/shop/ProductSkeleton";

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
    <div className="min-h-screen mt-10 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-4 md:py-8">
      {loading ? (
        <ProductSkeleton count={8} />
      ) : error ? (
        <p className="text-center text-danger">No products found</p>
      ) : products.length > 0 ? (
        <Products products={products} innerPage={false} headingText={categoryName} compact />
      ) : (
        <div>
          <Products products={[]} innerPage={false} headingText={categoryName} compact />
          <p className="text-center text-text-muted-2">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
