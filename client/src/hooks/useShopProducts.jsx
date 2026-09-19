import { useEffect, useState } from "react";
import axios from "axios";

export default function useShopProducts(searchParams) {
  const [data, setData] = useState({ products: [], total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryString = searchParams.toString();

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/products?${queryString}`)
      .then((res) => {
        setData({
          products: res.data.products || [],
          total: res.data.total || 0,
          page: res.data.page || 1,
          totalPages: res.data.totalPages || 1,
        });
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [queryString]);

  return { ...data, loading, error };
}
