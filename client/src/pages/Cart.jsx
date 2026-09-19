import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Breadcrumb from "@/components/shop/Breadcrumb";
import CartItemRow from "@/components/cart/CartItemRow";
import OrderSummary from "@/components/cart/OrderSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import CartSkeleton from "@/components/cart/CartSkeleton";
import ShopErrorState from "@/components/shop/ShopErrorState";
import ProductGrid from "@/components/ProductGrid";
import useCartStore from "@/store/useCartStore";
import useProducts from "@/hooks/useProducts";
import useCartCalculation from "@/hooks/useCartCalculation";

const Cart = () => {
  const { cartItems } = useCartStore();
  const { products } = useProducts();
  const [couponCode, setCouponCode] = useState(() => sessionStorage.getItem("shopcart_coupon") || "");

  const applyCoupon = (code) => {
    setCouponCode(code);
    sessionStorage.setItem("shopcart_coupon", code);
  };

  const removeCoupon = () => {
    setCouponCode("");
    sessionStorage.removeItem("shopcart_coupon");
  };

  const { items: calculatedItems, subtotal, discount, shipping, total, coupon, loading, error, refetch } =
    useCartCalculation(cartItems, couponCode);

  const getCalculatedItem = (item) =>
    calculatedItems.find(
      (c) => String(c.productId) === String(item._id) && (c.variantId || null) === (item.selectedVariant?._id || null)
    );

  const hasUnavailable = calculatedItems.some((i) => i.unavailable);

  const recommended = useMemo(() => {
    const cartIds = new Set(cartItems.map((i) => i._id));
    return products.filter((p) => !cartIds.has(p._id)).slice(0, 4);
  }, [products, cartItems]);

  if (cartItems.length === 0) {
    return (
      <main className="mt-10 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-6">
        <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Cart" }]} />
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="mt-10 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-6 pb-24 lg:pb-6">
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Cart" }]} />

      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Your Cart</h1>
          <p className="text-sm text-text-secondary mt-1">Review your items before checkout.</p>
        </div>
        <span className="text-sm text-text-secondary shrink-0">
          {cartItems.length} Item{cartItems.length !== 1 ? "s" : ""}
        </span>
      </div>

      {error ? (
        <ShopErrorState onRetry={refetch} />
      ) : loading && calculatedItems.length === 0 ? (
        <CartSkeleton />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl border border-border bg-card p-5">
              {cartItems.map((item) => (
                <CartItemRow key={item.cartKey} item={item} calculatedItem={getCalculatedItem(item)} />
              ))}
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mt-4"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          <div className="w-full lg:w-[340px] shrink-0">
            <div className="lg:sticky lg:top-24">
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                total={total}
                coupon={coupon}
                couponCode={couponCode}
                onApplyCoupon={applyCoupon}
                onRemoveCoupon={removeCoupon}
                loading={loading}
                hasUnavailable={hasUnavailable}
              />
            </div>
          </div>
        </div>
      )}

      {recommended.length > 0 && (
        <div className="mt-10">
          <ProductGrid products={recommended} headingText="You May Also Like" />
        </div>
      )}

      {/* Mobile sticky checkout bar */}
      {!hasUnavailable && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border p-4 flex items-center justify-between shadow-soft">
          <div>
            <span className="text-xs text-text-muted-2 block">Total</span>
            <span className="font-semibold text-foreground">₹{total.toLocaleString()}</span>
          </div>
          <Link
            to="/checkout"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium"
          >
            Checkout →
          </Link>
        </div>
      )}
    </main>
  );
};

export default Cart;
