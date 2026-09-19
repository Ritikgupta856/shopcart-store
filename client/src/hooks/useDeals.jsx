import { useEffect, useState } from "react";
import axios from "axios";

export default function useDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/deals/active`)
      .then((res) => setDeals(res.data.deals || []))
      .catch(() => setDeals([]))
      .finally(() => setLoading(false));
  }, []);

  return { deals, loading };
}
