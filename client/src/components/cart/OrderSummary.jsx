import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaShieldAlt, FaUndo, FaCertificate, FaShippingFast } from "react-icons/fa";
import OrderTotals from "./OrderTotals";

const trustItems = [
  { icon: FaShieldAlt, label: "Secure payments" },
  { icon: FaUndo, label: "Easy returns" },
  { icon: FaCertificate, label: "Genuine products" },
  { icon: FaShippingFast, label: "Fast delivery" },
];

const OrderSummary = ({
  subtotal,
  discount,
  shipping,
  total,
  coupon,
  couponCode,
  itemCount,
  onApplyCoupon,
  onRemoveCoupon,
  loading,
  hasUnavailable,
}) => {
  const [codeInput, setCodeInput] = useState("");
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    if (!codeInput.trim()) return;
    onApplyCoupon(codeInput.trim());
    setCodeInput("");
  };

  const couponApplied = couponCode && coupon?.valid;

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">Order Summary</h2>
      </div>

      <div className="px-5 py-4">
        {couponApplied ? (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-success-bg px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <Tag size={14} className="shrink-0 text-success" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-success">{coupon.code}</p>
                <p className="text-xs text-success">
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}% off applied`
                    : `₹${coupon.discountValue} off applied`}
                </p>
              </div>
            </div>
            <button
              onClick={onRemoveCoupon}
              aria-label="Remove coupon"
              className="shrink-0 rounded-md p-1 text-success transition-colors hover:bg-success/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply}>
            <label htmlFor="coupon" className="text-xs font-medium text-text-secondary">
              Have a coupon?
            </label>
            <div className="mt-1.5 flex gap-2">
              <Input
                id="coupon"
                placeholder="Enter code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="h-10 text-sm uppercase"
              />
              <Button type="submit" variant="outline" disabled={loading || !codeInput.trim()}>
                Apply
              </Button>
            </div>
            {couponCode && coupon && !coupon.valid && (
              <p className="mt-2 text-xs text-danger">{coupon.message}</p>
            )}
          </form>
        )}
      </div>

      <div className="border-t border-border px-5 py-4">
        <OrderTotals
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          total={total}
          coupon={coupon}
          itemCount={itemCount}
        />

        <Button
          className="mt-5 w-full"
          size="lg"
          disabled={loading || hasUnavailable}
          onClick={() => navigate("/checkout")}
        >
          {loading ? "Updating..." : "Proceed to Checkout"}
          {!loading && <ArrowRight size={16} />}
        </Button>

        {hasUnavailable && (
          <p className="mt-2 text-center text-xs text-danger">
            Remove unavailable items to continue
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-2.5 border-t border-border px-5 py-4">
        {trustItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-text-secondary">
            <item.icon size={12} className="shrink-0 text-primary" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
