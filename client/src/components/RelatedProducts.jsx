import { useEffect, useState } from "react";
import axios from "axios";
import Products from "./ProductGrid";
import ProductSkeleton from "./shop/ProductSkeleton";

const RelatedProducts = ({ productId, categoryId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, categoryId]);

  const fetchRelatedProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products`
      );
      const allProducts = response.data.products;

      const filteredProducts = allProducts.filter(
        (product) => product._id !== productId && product.category._id === categoryId
      );

      const relatedProductsSubset = filteredProducts.slice(0, 4);

      setRelatedProducts(relatedProductsSubset);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Related Products</h2>
        <ProductSkeleton count={4} />
      </div>
    );
  }

  if (relatedProducts.length === 0) return null;

  return (
    <div>
      <Products
        headingText="Related Products"
        products={relatedProducts}
        compact
      />
    </div>
  );
};

export default RelatedProducts;
