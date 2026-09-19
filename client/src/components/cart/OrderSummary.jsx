import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaShieldAlt, FaUndo, FaCertificate, FaShippingFast } from "react-icons/fa";

const trustItems = [
  { icon: FaShieldAlt, label: "Secure Payments" },
  { icon: FaUndo, label: "Easy Returns" },
  { icon: FaCertificate, label: "Genuine Products" },
  { icon: FaShippingFast, label: "Fast Delivery" },
];

const OrderSummary = ({ subtotal, discount, shipping, total, coupon, couponCode, onApplyCoupon, onRemoveCoupon, loading, hasUnavailable }) => {
  const [codeInput, setCodeInput] = useState("");
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    if (!codeInput.trim()) return;
    onApplyCoupon(codeInput.trim());
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h2 className="font-semibold text-foreground mb-4">Order Summary</h2>

      {/* Coupon */}
      <div className="mb-4 pb-4 border-b border-border">
        {couponCode && coupon?.valid ? (
          <div className="flex items-center justify-between bg-success-bg rounded-lg px-3 py-2">
            <div>
              <span className="text-sm font-semibold text-success">{coupon.code}</span>
              <span className="text-xs text-success block">
                {coupon.discountType === "percentage" ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
              </span>
            </div>
            <button onClick={onRemoveCoupon} className="text-xs text-text-secondary hover:text-danger">
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex flex-col gap-2">
            <span className="text-xs text-text-secondary">Have a coupon?</span>
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="h-9 text-sm uppercase"
              />
              <Button type="submit" variant="outline" size="sm" disabled={loading}>
                Apply
              </Button>
            </div>
            {couponCode && coupon && !coupon.valid && (
              <span className="text-xs text-danger">{coupon.message}</span>
            )}
          </form>
        )}
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount</span>
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

      {shipping === 0 && subtotal > 0 && (
        <p className="text-xs text-text-muted-2 mt-1">Free delivery on orders above ₹999</p>
      )}

      <Button
        className="w-full mt-4"
        disabled={loading || hasUnavailable}
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout →
      </Button>

      <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-border">
        {trustItems.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <item.icon size={12} className="text-primary shrink-0" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
