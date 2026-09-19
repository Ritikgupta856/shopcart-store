import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import Breadcrumb from "@/components/shop/Breadcrumb";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import useCartCalculation from "@/hooks/useCartCalculation";

const Checkout = () => {
  const { cartItems } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [couponCode] = useState(
    () => sessionStorage.getItem("shopcart_coupon") || ""
  );

  const { items, subtotal, discount, shipping, total, coupon } = useCartCalculation(cartItems, couponCode);

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (cartItems.length === 0) {
      navigate("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, cartItems.length]);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/create-checkout-session`, {
        items: cartItems.map((item) => ({
          productId: item._id,
          variantId: item.selectedVariant?._id || null,
          quantity: item.quantity,
        })),
        user: user?._id,
        couponCode: couponCode || undefined,
      });

      if (!res.data.success) {
        toast.error(res.data.message || "Unable to start checkout");
        return;
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user || cartItems.length === 0) return null;

  return (
    <main className="mt-10 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-6 max-w-2xl mx-auto">
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Cart", path: "/cart" }, { label: "Checkout" }]} />

      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-1">Checkout</h1>
      <p className="text-sm text-text-secondary mb-6">Review your order before payment.</p>

      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h2 className="font-semibold text-foreground mb-3">Order Items</h2>
        <div className="flex flex-col divide-y divide-border">
          {items.map((item) => (
            <div key={`${item.productId}-${item.variantId || "base"}`} className="flex items-center gap-3 py-3">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg bg-secondary object-contain p-1" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                {(item.size || item.color) && (
                  <p className="text-xs text-text-muted-2">{[item.size, item.color].filter(Boolean).join(" / ")}</p>
                )}
                <p className="text-xs text-text-secondary">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-medium text-foreground">₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h2 className="font-semibold text-foreground mb-3">Payment Summary</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between text-text-secondary">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount {coupon?.code ? `(${coupon.code})` : ""}</span>
              <span>-₹{discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-text-secondary">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>
        </div>
        <div className="border-t border-border mt-3 pt-3 flex justify-between items-center">
          <span className="font-semibold text-foreground">Total</span>
          <span className="font-semibold text-lg text-foreground">₹{total.toLocaleString()}</span>
        </div>
      </div>

      <Button className="w-full" disabled={loading} onClick={handlePay}>
        {loading ? "Redirecting to payment..." : `Pay ₹${total.toLocaleString()}`}
      </Button>

      <Link to="/cart" className="block text-center text-sm text-text-secondary hover:text-primary mt-4">
        ← Back to Cart
      </Link>
    </main>
  );
};

export default Checkout;
