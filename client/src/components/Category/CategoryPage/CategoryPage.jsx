import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Products from "../../Products/Products";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const {name} = useParams();

  useEffect(() => {
    fetchProduct();
  }, [name]);



  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/allproducts`)

        const allProducts = response.data;

        const filteredProducts = allProducts.filter(
          (product) =>
            product.category.toLowerCase() === name
        );
      
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <Products products={products} innerPage={false} headingText={name} />
    </div>
  );
};

export default CategoryPage;
