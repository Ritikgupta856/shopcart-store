import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { AlertCircle, ArrowLeft, CreditCard, Loader2, Lock, MapPin, Truck } from "lucide-react";
import Breadcrumb from "@/components/shop/Breadcrumb";
import OrderTotals from "@/components/cart/OrderTotals";
import { Button } from "@/components/ui/button";
import {
  PageContainer,
  PageHeader,
  SectionCard,
  SectionCardHeader,
} from "@/components/ui/page-container";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import useCartCalculation from "@/hooks/useCartCalculation";

const Checkout = () => {
  const { cartItems } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState("");
  const [couponCode] = useState(() => sessionStorage.getItem("shopcart_coupon") || "");

  const { items, subtotal, discount, shipping, total, coupon, loading: totalsLoading } =
    useCartCalculation(cartItems, couponCode);

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (cartItems.length === 0) {
      navigate("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, cartItems.length]);

  const hasUnavailable = items.some((i) => i.unavailable);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const disabled = loading || totalsLoading || hasUnavailable;

  const handlePay = async () => {
    setLoading(true);
    setPayError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/create-checkout-session`,
        {
          items: cartItems.map((item) => ({
            productId: item._id,
            variantId: item.selectedVariant?._id || null,
            quantity: item.quantity,
          })),
          user: user?._id,
          couponCode: couponCode || undefined,
        }
      );

      if (!res.data.success) {
        const message = res.data.message || "Unable to start checkout";
        setPayError(message);
        toast.error(message);
        return;
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      setPayError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || cartItems.length === 0) return null;

  return (
    <PageContainer>
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Cart", path: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <PageHeader title="Checkout" description="Review your order and complete payment securely." />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <SectionCard>
            <SectionCardHeader step="1" title="Contact information" description="Order updates are sent here" />
            <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-text-muted-2">Full name</p>
                <p className="mt-1 truncate text-sm font-medium text-foreground">{user.fullname}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted-2">Email address</p>
                <p className="mt-1 truncate text-sm font-medium text-foreground">{user.email}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionCardHeader step="2" title="Delivery" description="Where and how your order ships" />
            <div className="flex flex-col gap-4 px-5 py-4">
              <div className="flex items-start gap-3 rounded-lg bg-secondary px-4 py-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Shipping address</p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    You&apos;ll enter your delivery address on the secure payment page in the next step.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 rounded-lg border border-border px-4 py-3">
                <div className="flex items-start gap-3">
                  <Truck size={16} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Standard delivery</p>
                    <p className="mt-0.5 text-xs text-text-secondary">Arrives in 3–5 business days</p>
                  </div>
                </div>
                <span
                  className={`shrink-0 text-sm font-semibold ${
                    shipping === 0 ? "text-success" : "text-foreground"
                  }`}
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionCardHeader step="3" title="Payment" description="Encrypted and processed by Stripe" />
            <div className="flex flex-col gap-4 px-5 py-4">
              <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-accent px-4 py-3">
                <CreditCard size={16} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-accent-foreground">Card payment</p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    Credit, debit and international cards accepted.
                  </p>
                </div>
              </div>
              <p className="flex items-center gap-2 text-xs text-text-muted-2">
                <Lock size={12} className="shrink-0" />
                Your card details are entered on Stripe&apos;s secure page — we never see or store them.
              </p>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionCardHeader
              step="4"
              title="Order items"
              description={`${itemCount} item${itemCount !== 1 ? "s" : ""} in this order`}
            />
            <div className="divide-y divide-border px-5">
              {totalsLoading && items.length === 0
                ? Array.from({ length: Math.min(cartItems.length, 3) }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-4">
                      <div className="size-16 shrink-0 animate-pulse rounded-lg bg-secondary" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
                        <div className="h-3 w-1/4 animate-pulse rounded bg-secondary" />
                      </div>
                    </div>
                  ))
                : items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantId || "base"}`}
                      className="flex items-center gap-4 py-4"
                    >
                      <div className="size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary p-1.5">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
                          {item.name}
                        </p>
                        {(item.size || item.color) && (
                          <p className="mt-0.5 text-xs text-text-muted-2">
                            {[item.size, item.color].filter(Boolean).join(" / ")}
                          </p>
                        )}
                        <p className="mt-0.5 text-xs text-text-secondary">Qty: {item.quantity}</p>
                        {item.unavailable && (
                          <p className="mt-1 w-fit rounded bg-danger-bg px-1.5 py-0.5 text-xs font-medium text-danger">
                            Unavailable
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-foreground">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
            </div>
          </SectionCard>
        </div>

        <div className="w-full shrink-0 lg:w-[360px]">
          <div className="lg:sticky lg:top-24">
            <SectionCard>
              <SectionCardHeader title="Order Summary" />
              <div className="px-5 py-4">
                <OrderTotals
                  subtotal={subtotal}
                  discount={discount}
                  shipping={shipping}
                  total={total}
                  coupon={coupon}
                  itemCount={itemCount}
                />

                {hasUnavailable && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-danger-bg px-3 py-2.5">
                    <AlertCircle size={14} className="mt-0.5 shrink-0 text-danger" />
                    <p className="text-xs text-danger">
                      Some items are unavailable.{" "}
                      <Link to="/cart" className="font-semibold underline">
                        Update your cart
                      </Link>{" "}
                      to continue.
                    </p>
                  </div>
                )}

                {payError && !hasUnavailable && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-danger-bg px-3 py-2.5">
                    <AlertCircle size={14} className="mt-0.5 shrink-0 text-danger" />
                    <p className="text-xs text-danger">{payError}</p>
                  </div>
                )}

                <Button className="mt-5 w-full" size="lg" disabled={disabled} onClick={handlePay}>
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Redirecting to payment...
                    </>
                  ) : (
                    <>
                      <Lock size={15} />
                      Pay ₹{total.toLocaleString("en-IN")}
                    </>
                  )}
                </Button>

                <p className="mt-3 text-center text-xs text-text-muted-2">
                  By placing this order you agree to our{" "}
                  <Link to="/terms-conditions" className="text-primary hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </SectionCard>

            <Link
              to="/cart"
              className="mt-5 inline-flex items-center gap-2 rounded-md text-sm font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ArrowLeft size={15} />
              Back to cart
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Checkout;
