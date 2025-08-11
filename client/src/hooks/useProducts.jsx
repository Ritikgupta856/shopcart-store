import { useEffect, useState } from "react";
import axios from "axios";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/products`)
      .then((res) => {
        setProducts(res.data.products || []);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
