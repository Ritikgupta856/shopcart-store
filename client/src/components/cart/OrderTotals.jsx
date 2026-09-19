const FREE_SHIPPING_THRESHOLD = 999;

const formatINR = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

const OrderTotals = ({
  subtotal,
  discount,
  shipping,
  total,
  coupon,
  itemCount,
  showShippingProgress = true,
}) => {
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const showProgress = showShippingProgress && subtotal > 0 && remainingForFreeShipping > 0;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div>
      <dl className="flex flex-col gap-2.5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-text-secondary">
            Subtotal
            {itemCount ? <span className="text-text-muted-2"> ({itemCount} item{itemCount !== 1 ? "s" : ""})</span> : null}
          </dt>
          <dd className="font-medium text-foreground">{formatINR(subtotal)}</dd>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <dt className="text-text-secondary">
              Discount
              {coupon?.code && <span className="ml-1 text-xs font-medium text-success">({coupon.code})</span>}
            </dt>
            <dd className="font-medium text-success">−{formatINR(discount)}</dd>
          </div>
        )}

        <div className="flex items-center justify-between">
          <dt className="text-text-secondary">Shipping</dt>
          <dd className={shipping === 0 ? "font-medium text-success" : "font-medium text-foreground"}>
            {shipping === 0 ? "FREE" : formatINR(shipping)}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
        <span className="text-base font-semibold text-foreground">Total</span>
        <span className="text-xl font-semibold tracking-tight text-foreground">{formatINR(total)}</span>
      </div>
      <p className="mt-1 text-xs text-text-muted-2">Inclusive of all taxes</p>

      {showProgress && (
        <div className="mt-4 rounded-lg bg-secondary p-3">
          <p className="text-xs text-text-secondary">
            Add <span className="font-semibold text-foreground">{formatINR(remainingForFreeShipping)}</span> more for free delivery
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {showShippingProgress && !showProgress && shipping === 0 && subtotal > 0 && (
        <p className="mt-3 rounded-lg bg-success-bg px-3 py-2 text-xs font-medium text-success">
          Your order qualifies for free delivery
        </p>
      )}
    </div>
  );
};

export default OrderTotals;
