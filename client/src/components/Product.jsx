import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import useWishlistStore from "@/store/useWishlistStore";
import useCartStore from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

const Product = ({ data }) => {
  const { isWishlisted, toggleWishlist } = useWishlistStore();
  const { handleAddToCart } = useCartStore();
  const wishlisted = isWishlisted(data._id);
  const showMrp = data?.mrp && Number(data.mrp) > Number(data.price);
  const hasVariants = data?.variants?.length > 0;
  const outOfStock = data?.totalStock !== undefined && data.totalStock <= 0;

  const onAddToCart = (e) => {
    e.preventDefault();
    if (hasVariants) {
      toast("Select options on the product page to add this item", { icon: "🛒" });
      return;
    }
    handleAddToCart(data, 1);
    toast.success("Added to cart");
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-card">
      <Link to={`/product/${data.slug}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-secondary p-3">
          <img
            src={data?.image}
            alt={data?.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {outOfStock && (
            <span className="absolute inset-x-0 bottom-0 bg-foreground/80 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-white">
              Out of stock
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(data);
            }}
            className="absolute right-3 top-3 rounded-full bg-card p-2 shadow-soft transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlisted ? (
              <FaHeart className="text-danger" size={14} />
            ) : (
              <FaRegHeart className="text-text-muted-2" size={14} />
            )}
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <Link to={`/product/${data.slug}`} className="block">
          {data?.brand && (
            <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-text-muted-2">
              {data.brand}
            </p>
          )}
          <h3 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-foreground transition-colors group-hover:text-primary">
            {data?.name}
          </h3>
        </Link>

        {data?.reviewCount > 0 && (
          <div className="mt-1.5 flex items-center gap-1 text-xs">
            <Star size={12} className="fill-warning text-warning" />
            <span className="font-medium text-foreground">{data.rating}</span>
            <span className="text-text-muted-2">({data.reviewCount})</span>
          </div>
        )}

        <div className="mt-auto pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-base font-semibold leading-tight text-foreground">
              ₹{Number(data?.price).toLocaleString("en-IN")}
            </span>
            {showMrp && (
              <>
                <span className="text-xs text-text-muted-2 line-through">
                  ₹{Number(data.mrp).toLocaleString("en-IN")}
                </span>
                {data.discountPercent > 0 && (
                  <span className="text-xs font-semibold text-success">
                    {data.discountPercent}% off
                  </span>
                )}
              </>
            )}
          </div>

          <Button
            className="mt-3 w-full"
            size="sm"
            variant={outOfStock ? "secondary" : "default"}
            disabled={outOfStock}
            onClick={onAddToCart}
          >
            {outOfStock ? "Out of Stock" : hasVariants ? "Select Options" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
