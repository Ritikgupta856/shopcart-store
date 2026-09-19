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
import { PageContainer, PageHeader } from "@/components/ui/page-container";
import useCartStore from "@/store/useCartStore";
import useProducts from "@/hooks/useProducts";
import useCartCalculation from "@/hooks/useCartCalculation";

const Cart = () => {
  const { cartItems } = useCartStore();
  const { products } = useProducts();
  const [couponCode, setCouponCode] = useState(
    () => sessionStorage.getItem("shopcart_coupon") || ""
  );

  const applyCoupon = (code) => {
    setCouponCode(code);
    sessionStorage.setItem("shopcart_coupon", code);
  };

  const removeCoupon = () => {
    setCouponCode("");
    sessionStorage.removeItem("shopcart_coupon");
  };

  const {
    items: calculatedItems,
    subtotal,
    discount,
    shipping,
    total,
    coupon,
    loading,
    error,
    refetch,
  } = useCartCalculation(cartItems, couponCode);

  const getCalculatedItem = (item) =>
    calculatedItems.find(
      (c) =>
        String(c.productId) === String(item._id) &&
        (c.variantId || null) === (item.selectedVariant?._id || null)
    );

  const hasUnavailable = calculatedItems.some((i) => i.unavailable);
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const recommended = useMemo(() => {
    const cartIds = new Set(cartItems.map((i) => i._id));
    return products.filter((p) => !cartIds.has(p._id)).slice(0, 4);
  }, [products, cartItems]);

  if (cartItems.length === 0) {
    return (
      <PageContainer>
        <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Cart" }]} />
        <EmptyCart />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="pb-28 lg:pb-16">
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Cart" }]} />
      <PageHeader
        title="Shopping Cart"
        description={`${itemCount} item${itemCount !== 1 ? "s" : ""} in your cart`}
      />

      {error ? (
        <ShopErrorState onRetry={refetch} />
      ) : loading && calculatedItems.length === 0 ? (
        <CartSkeleton />
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div className="divide-y divide-border rounded-xl border border-border bg-card px-5 py-5 sm:px-6">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.cartKey}
                  item={item}
                  calculatedItem={getCalculatedItem(item)}
                />
              ))}
            </div>

            <Link
              to="/shop"
              className="mt-5 inline-flex items-center gap-2 rounded-md text-sm font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ArrowLeft size={15} />
              Continue shopping
            </Link>
          </div>

          <div className="w-full shrink-0 lg:w-[360px]">
            <div className="lg:sticky lg:top-24">
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                total={total}
                coupon={coupon}
                couponCode={couponCode}
                itemCount={itemCount}
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
        <div className="mt-16">
          <ProductGrid products={recommended} headingText="You May Also Like" compact />
        </div>
      )}

      {!hasUnavailable && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-border bg-card px-4 py-3 shadow-card lg:hidden">
          <div className="min-w-0">
            <span className="block text-xs text-text-muted-2">Total</span>
            <span className="text-lg font-semibold text-foreground">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
          <Link
            to="/checkout"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Checkout
          </Link>
        </div>
      )}
    </PageContainer>
  );
};

export default Cart;
