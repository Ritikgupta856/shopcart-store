import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import useWishlistStore from "@/store/useWishlistStore";

const CartItemRow = ({ item, calculatedItem }) => {
  const { handleRemoveFromCart, handleCartProductQuantity } = useCartStore();
  const { toggleWishlist } = useWishlistStore();

  const showMrp = item.mrp && Number(item.mrp) > Number(item.price);
  const availableStock = calculatedItem?.availableStock;
  const atMaxStock = availableStock !== undefined && item.quantity >= availableStock;
  const variantLabel = [item.selectedVariant?.size, item.selectedVariant?.color]
    .filter(Boolean)
    .join(" / ");
  const lineTotal = Number(item.price) * item.quantity;

  const saveForLater = () => {
    toggleWishlist(item);
    handleRemoveFromCart(item);
    toast.success("Saved to wishlist");
  };

  return (
    <div className="flex gap-4 py-5 first:pt-0 last:pb-0 sm:gap-5">
      <Link to={`/product/${item.slug}`} className="shrink-0">
        <div className="size-24 overflow-hidden rounded-lg border border-border bg-secondary p-2 sm:size-28">
          <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              to={`/product/${item.slug}`}
              className="line-clamp-2 text-sm font-medium leading-5 text-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>

            {variantLabel && <p className="mt-1 text-xs text-text-muted-2">{variantLabel}</p>}

            <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-medium text-foreground">
                ₹{Number(item.price).toLocaleString("en-IN")}
              </span>
              {showMrp && (
                <>
                  <span className="text-xs text-text-muted-2 line-through">
                    ₹{Number(item.mrp).toLocaleString("en-IN")}
                  </span>
                  {item.discountPercent > 0 && (
                    <span className="text-xs font-medium text-success">{item.discountPercent}% off</span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-base font-semibold text-foreground">
              ₹{lineTotal.toLocaleString("en-IN")}
            </p>
            {item.quantity > 1 && (
              <p className="mt-0.5 text-xs text-text-muted-2">
                {item.quantity} × ₹{Number(item.price).toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </div>

        {calculatedItem?.unavailable ? (
          <p className="mt-2 w-fit rounded-md bg-danger-bg px-2 py-1 text-xs font-medium text-danger">
            This product is currently unavailable
          </p>
        ) : (
          atMaxStock &&
          availableStock > 0 && (
            <p className="mt-2 w-fit rounded-md bg-warning-bg px-2 py-1 text-xs font-medium text-warning">
              Only {availableStock} left in stock
            </p>
          )
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <div className="flex h-9 items-center rounded-md border border-border">
            <button
              onClick={() => handleCartProductQuantity("dec", item)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-full w-9 items-center justify-center rounded-l-md text-text-secondary transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              <Minus size={13} />
            </button>
            <span className="w-9 text-center text-sm font-medium text-foreground">{item.quantity}</span>
            <button
              onClick={() => handleCartProductQuantity("inc", item)}
              disabled={atMaxStock}
              aria-label="Increase quantity"
              className="flex h-full w-9 items-center justify-center rounded-r-md text-text-secondary transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              <Plus size={13} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={saveForLater}
              className="flex items-center gap-1.5 rounded-md text-xs font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Heart size={13} />
              Save for later
            </button>
            <button
              onClick={() => handleRemoveFromCart(item)}
              className="flex items-center gap-1.5 rounded-md text-xs font-medium text-text-muted-2 transition-colors hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Trash2 size={13} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
