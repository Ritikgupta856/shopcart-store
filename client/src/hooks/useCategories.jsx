import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/categories`)
      .then((res) => {
        setCategories(res.data.categories || []);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
