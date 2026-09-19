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
    <div className="block w-full max-w-[300px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px] 2xl:max-w-full rounded-2xl border border-border bg-card shadow-soft overflow-hidden hover:shadow-card transition-shadow">
      <Link to={`/product/${data.slug}`} className="block">
        <div className="relative w-full h-56 sm:h-64 bg-secondary p-4 flex items-center justify-center">
          <img
            src={data?.image}
            alt={data?.name}
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
          />
          {data?.discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-danger text-white text-xs font-semibold px-2 py-1 rounded">
              {data.discountPercent}% OFF
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(data);
            }}
            className="absolute top-3 right-3 bg-card rounded-full p-2 shadow-soft hover:scale-110 transition-transform"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlisted ? (
              <FaHeart className="text-danger" size={14} />
            ) : (
              <FaRegHeart className="text-text-muted-2" size={14} />
            )}
          </button>
        </div>

        <div className="p-3 flex flex-col gap-1">
          {data?.brand && (
            <span className="text-xs uppercase tracking-wide text-text-muted-2">{data.brand}</span>
          )}
          <span className="truncate text-sm font-medium text-foreground">{data?.name}</span>
          {data?.reviewCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <Star size={12} className="fill-warning text-warning" />
              <span>{data.rating}</span>
              <span className="text-text-muted-2">({data.reviewCount})</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg text-foreground">₹{data?.price}</span>
            {showMrp && (
              <span className="text-sm text-text-muted-2 line-through">₹{data.mrp}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <Button className="w-full" size="sm" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Product;
