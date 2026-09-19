import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useCartStore from "@/store/useCartStore";
import useWishlistStore from "@/store/useWishlistStore";

const CartItemRow = ({ item, calculatedItem }) => {
  const { handleRemoveFromCart, handleCartProductQuantity } = useCartStore();
  const { toggleWishlist } = useWishlistStore();

  const showMrp = item.mrp && Number(item.mrp) > Number(item.price);
  const availableStock = calculatedItem?.availableStock;
  const atMaxStock = availableStock !== undefined && item.quantity >= availableStock;
  const variantLabel = [item.selectedVariant?.size, item.selectedVariant?.color].filter(Boolean).join(" / ");

  const saveForLater = () => {
    toggleWishlist(item);
    handleRemoveFromCart(item);
    toast.success("Saved to wishlist");
  };

  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-0">
      <Link to={`/product/${item.slug}`} className="shrink-0">
        <div className="w-24 h-24 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
        </div>
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link to={`/product/${item.slug}`} className="font-medium text-sm text-foreground hover:text-primary transition-colors line-clamp-1">
            {item.name}
          </Link>
          {variantLabel && <p className="text-xs text-text-muted-2 mt-0.5">{variantLabel}</p>}

          <div className="flex items-center gap-2 mt-1">
            <span className="font-semibold text-foreground">₹{item.price}</span>
            {showMrp && (
              <>
                <span className="text-xs text-text-muted-2 line-through">₹{item.mrp}</span>
                {item.discountPercent > 0 && (
                  <span className="text-xs font-medium text-success">{item.discountPercent}% OFF</span>
                )}
              </>
            )}
          </div>

          {calculatedItem?.unavailable && (
            <p className="text-xs text-danger mt-1">This product is currently unavailable.</p>
          )}
          {!calculatedItem?.unavailable && atMaxStock && availableStock > 0 && (
            <p className="text-xs text-warning mt-1">Only {availableStock} available.</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-border rounded-md">
            <button
              className="w-7 h-7 flex items-center justify-center text-text-secondary"
              onClick={() => handleCartProductQuantity("dec", item)}
            >
              −
            </button>
            <span className="w-8 text-center text-sm text-foreground">{item.quantity}</span>
            <button
              className="w-7 h-7 flex items-center justify-center text-text-secondary disabled:opacity-30"
              disabled={atMaxStock}
              onClick={() => handleCartProductQuantity("inc", item)}
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button onClick={saveForLater} className="text-text-secondary hover:text-primary transition-colors">
              ♡ Save for later
            </button>
            <button onClick={() => handleRemoveFromCart(item)} className="text-text-muted-2 hover:text-danger transition-colors">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
