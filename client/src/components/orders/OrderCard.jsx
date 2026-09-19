import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import OrderTotals from "@/components/cart/OrderTotals";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const OrderCard = ({ order }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const itemCount = order.products.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/60 px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-text-muted-2">Order</p>
            <p className="text-sm font-semibold text-foreground">#{order._id.slice(-8)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-text-muted-2">Placed on</p>
            <p className="text-sm font-medium text-foreground">{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-text-muted-2">Total</p>
            <p className="text-sm font-semibold text-foreground">
              ₹{order.totalAmount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </header>

      <div className="divide-y divide-border px-5">
        {order.products.map((item, i) => {
          const slug = item.product?.slug;
          const content = (
            <>
              <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary p-1.5">
                <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-medium text-foreground">{item.name}</p>
                {(item.size || item.color) && (
                  <p className="mt-0.5 text-xs text-text-muted-2">
                    {[item.size, item.color].filter(Boolean).join(" / ")}
                  </p>
                )}
                <p className="mt-0.5 text-xs text-text-secondary">
                  Qty: {item.quantity} · ₹{Number(item.price).toLocaleString("en-IN")} each
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-foreground">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
            </>
          );

          return slug ? (
            <Link
              key={i}
              to={`/product/${slug}`}
              className="flex items-center gap-4 py-4 transition-colors hover:bg-secondary/40"
            >
              {content}
            </Link>
          ) : (
            <div key={i} className="flex items-center gap-4 py-4">
              {content}
            </div>
          );
        })}
      </div>

      <footer className="border-t border-border px-5 py-3.5">
        <button
          onClick={() => setShowBreakdown((v) => !v)}
          aria-expanded={showBreakdown}
          className="flex w-full items-center justify-between rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="text-xs font-medium text-text-secondary">
            {itemCount} item{itemCount !== 1 ? "s" : ""} · Price details
          </span>
          <ChevronDown
            size={15}
            className={`text-text-muted-2 transition-transform duration-200 ${
              showBreakdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {showBreakdown && (
          <div className="mt-4">
            <OrderTotals
              subtotal={order.subtotal}
              discount={order.discount}
              shipping={order.shipping}
              total={order.totalAmount}
              coupon={order.couponCode ? { code: order.couponCode } : null}
              itemCount={itemCount}
              showShippingProgress={false}
            />
          </div>
        )}
      </footer>
    </article>
  );
};

export default OrderCard;
