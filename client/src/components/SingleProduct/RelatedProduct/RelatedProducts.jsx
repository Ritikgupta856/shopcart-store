import { useEffect, useState } from "react";
import axios from "axios";
import Products from "../../Products/Products";

const RelatedProducts = ({ productId, category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [productId, category]);

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/allproducts`);
      const allProducts = response.data;

      const filteredProducts = allProducts.filter(
        (product) =>
          product._id !== productId && product.category === category
      );

      const relatedProductsSubset = filteredProducts.slice(0, 4);

      setRelatedProducts(relatedProductsSubset);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Products headingText="Related Products" products={relatedProducts} />
    </div>
  );
};

export default RelatedProducts;
