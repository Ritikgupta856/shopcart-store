import { useEffect, useState } from "react";
import axios from "axios";
import Products from "./ProductGrid";

const RelatedProducts = ({ productId, categoryId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  console.log(categoryId)

  useEffect(() => {
    fetchRelatedProducts();
  }, [productId, categoryId]);

  const fetchRelatedProducts = async () => {
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
    }
  };

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
