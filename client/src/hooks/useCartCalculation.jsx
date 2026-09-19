import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function useCartCalculation(cartItems, couponCode) {
  const [data, setData] = useState({ items: [], subtotal: 0, discount: 0, shipping: 0, total: 0, coupon: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsKey = cartItems.map((i) => `${i._id}:${i.selectedVariant?._id || ""}:${i.quantity}`).join(",");

  const calculate = useCallback(() => {
    if (cartItems.length === 0) {
      setData({ items: [], subtotal: 0, discount: 0, shipping: 0, total: 0, coupon: null });
      return;
    }
    setLoading(true);
    setError(null);
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/cart/calculate`, {
        items: cartItems.map((item) => ({
          productId: item._id,
          variantId: item.selectedVariant?._id || null,
          quantity: item.quantity,
        })),
        couponCode: couponCode || undefined,
      })
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, couponCode]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return { ...data, loading, error, refetch: calculate };
}
