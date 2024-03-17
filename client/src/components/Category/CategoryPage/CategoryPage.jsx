import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Product from "@/Products/Product/Product";
import axios from 'axios';

const CategoryPage = () => {

  const [products, setProducts] = useState([]);
    const {name} = useParams();

    console.log(name)


    useEffect(() => {
      fetchProduct();
    }, []);
  
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/allproducts`);
        const selectedProducts = response.data.filter((items) => items.category === name);
        setProducts(selectedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    console.log(products)

  

  return (
    <div>
       <h1>{products}</h1>
      <Product product={products} innerPage={true}/>
    </div>
  )
}

export default CategoryPage
