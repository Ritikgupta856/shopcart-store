import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function useProductReviews(productId) {
  const [data, setData] = useState({ reviews: [], avgRating: 0, count: 0, breakdown: [] });
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(() => {
    if (!productId) return;
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/reviews/product/${productId}`)
      .then((res) => setData(res.data))
      .catch(() => setData({ reviews: [], avgRating: 0, count: 0, breakdown: [] }))
      .finally(() => setLoading(false));
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { ...data, loading, refetch: fetchReviews };
}
