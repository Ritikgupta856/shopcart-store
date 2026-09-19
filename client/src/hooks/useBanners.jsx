import { useEffect, useState } from "react";
import axios from "axios";

export default function useBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/banners/active`)
      .then((res) => setBanners(res.data.banners || []))
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, []);

  return { banners, loading };
}
