import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCartPlus, FaShareAlt, FaHeart, FaRegHeart, FaBolt } from "react-icons/fa";
import { Star, Truck, RotateCcw, ShieldCheck, Minus, Plus } from "lucide-react";

import useCartStore from "@/store/useCartStore";
import useWishlistStore from "@/store/useWishlistStore";
import RelatedProducts from "@/components/RelatedProducts";
import ReviewsSection from "@/components/ReviewsSection";
import ProductGallery from "@/components/product/ProductGallery";
import Breadcrumb from "@/components/shop/Breadcrumb";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import ProductDetailSkeleton from "@/components/skeletons/ProductDetailSkeleton";

const assurances = [
  { icon: Truck, title: "Free delivery", copy: "On orders above ₹999" },
  { icon: RotateCcw, title: "7-day returns", copy: "Easy replacement policy" },
  { icon: ShieldCheck, title: "Secure payment", copy: "100% protected checkout" },
];

const SingleProduct = () => {
  const [product, setProduct] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { handleAddToCart } = useCartStore();
  const { isWishlisted, toggleWishlist } = useWishlistStore();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${slug}`);
      setProduct(response.data.product);
      setSelectedSize("");
      setSelectedColor("");
      setQuantity(1);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) return <ProductDetailSkeleton />;

  const hasVariants = product.variants?.length > 0;
  const availableSizes = hasVariants
    ? [...new Set(product.variants.map((v) => v.size))].filter(Boolean)
    : [];
  const availableColors = hasVariants
    ? [...new Set(product.variants.map((v) => v.color))].filter(Boolean)
    : [];
  const selectedVariant = hasVariants
    ? product.variants.find(
        (v) =>
          (!availableSizes.length || v.size === selectedSize) &&
          (!availableColors.length || v.color === selectedColor)
      )
    : null;
  const variantSelectionComplete =
    !hasVariants ||
    ((!availableSizes.length || selectedSize) && (!availableColors.length || selectedColor));
  const stockForDisplay = hasVariants ? (selectedVariant ? selectedVariant.stock : null) : product.stock;
  const outOfStock = hasVariants ? selectedVariant && selectedVariant.stock === 0 : product.stock === 0;
  const canAddToCart = hasVariants
    ? variantSelectionComplete && selectedVariant && selectedVariant.stock > 0
    : !outOfStock;
  const showMrp = product.mrp && Number(product.mrp) > Number(product.price);
  const wishlisted = isWishlisted(product._id);
  const images = product.images?.length ? product.images : [product.image];
  const savings = showMrp ? Number(product.mrp) - Number(product.price) : 0;
  const maxQuantity = stockForDisplay ?? 10;

  const addToCart = () => {
    handleAddToCart({ ...product, selectedVariant }, quantity);
    setQuantity(1);
    toast.success("Added to cart");
  };

  const buyNow = () => {
    if (!canAddToCart) return;
    addToCart();
    navigate("/cart");
  };

  const shareProduct = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      /* dismissed share sheet or clipboard blocked — nothing to report */
    }
  };

  const ctaLabel = outOfStock
    ? "Out of Stock"
    : hasVariants && !variantSelectionComplete
    ? "Select options"
    : "Add to Cart";

  const specs = [
    { label: "Brand", value: product.brand || "—" },
    { label: "Category", value: product.category?.name || "—" },
    { label: "Availability", value: product.totalStock > 0 ? "In stock" : "Out of stock" },
    { label: "Units available", value: product.totalStock ?? 0 },
  ];

  return (
    <PageContainer>
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Shop", path: "/shop" },
          ...(product.category
            ? [{ label: product.category.name, path: `/shop/${product.category.slug}` }]
            : []),
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery
            images={images}
            name={product.name}
            discountPercent={product.discountPercent}
          />
        </div>

        <div className="flex flex-col">
          {product.brand && (
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {product.brand}
            </span>
          )}

          <h1 className="mt-2 text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
            {product.name}
          </h1>

          {product.reviewCount > 0 ? (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={15}
                    className={i <= Math.round(product.rating) ? "fill-warning text-warning" : "text-border"}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-text-muted-2">
                ({product.reviewCount} review{product.reviewCount !== 1 ? "s" : ""})
              </span>
            </div>
          ) : (
            <p className="mt-3 text-sm text-text-muted-2">No reviews yet</p>
          )}

          <div className="mt-5 border-y border-border py-5">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-semibold tracking-tight text-foreground">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>
              {showMrp && (
                <>
                  <span className="text-lg text-text-muted-2 line-through">
                    ₹{Number(product.mrp).toLocaleString("en-IN")}
                  </span>
                  <span className="rounded-md bg-success-bg px-2 py-1 text-xs font-semibold text-success">
                    {product.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            {savings > 0 && (
              <p className="mt-1.5 text-sm text-success">
                You save ₹{savings.toLocaleString("en-IN")}
              </p>
            )}
            <p className="mt-1 text-xs text-text-muted-2">Inclusive of all taxes</p>
          </div>

          {product.description && (
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">{product.description}</p>
          )}

          {hasVariants && (
            <div className="mt-6 flex flex-col gap-5">
              {availableSizes.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-foreground">
                    Size{selectedSize && <span className="font-normal text-text-secondary">: {selectedSize}</span>}
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 min-w-12 rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-foreground hover:border-primary/50 hover:bg-secondary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {availableColors.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-foreground">
                    Color{selectedColor && <span className="font-normal text-text-secondary">: {selectedColor}</span>}
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`h-10 rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          selectedColor === color
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-foreground hover:border-primary/50 hover:bg-secondary"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {stockForDisplay !== null && stockForDisplay !== undefined && (
            <p
              className={`mt-5 text-sm font-medium ${
                stockForDisplay > 0 ? "text-success" : "text-danger"
              }`}
            >
              {stockForDisplay > 0
                ? stockForDisplay <= 5
                  ? `Hurry — only ${stockForDisplay} left in stock`
                  : "In stock, ready to ship"
                : "Currently out of stock"}
            </p>
          )}

          <div className="mt-5 flex items-center gap-4">
            <span className="text-sm font-semibold text-foreground">Quantity</span>
            <div className="flex h-10 items-center rounded-md border border-border">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="flex h-full w-10 items-center justify-center rounded-l-md text-text-secondary transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-medium text-foreground">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                disabled={quantity >= maxQuantity}
                aria-label="Increase quantity"
                className="flex h-full w-10 items-center justify-center rounded-r-md text-text-secondary transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" size="lg" disabled={!canAddToCart} onClick={addToCart}>
              <FaCartPlus size={16} />
              {ctaLabel}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              disabled={!canAddToCart}
              onClick={buyNow}
            >
              <FaBolt size={14} />
              Buy Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="sm:w-11 sm:px-0"
              onClick={() => toggleWishlist(product)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {wishlisted ? <FaHeart className="text-danger" size={16} /> : <FaRegHeart size={16} />}
              <span className="sm:hidden">{wishlisted ? "Saved" : "Save"}</span>
            </Button>
          </div>

          <button
            onClick={shareProduct}
            className="mt-4 flex items-center gap-2 self-start rounded-md text-sm text-text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <FaShareAlt size={13} />
            Share this product
          </button>

          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {assurances.map((item) => (
              <div key={item.title} className="flex items-center gap-3 bg-card px-4 py-3.5">
                <item.icon size={18} className="shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-text-muted-2">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Product Details</h2>
        <div className="mt-4 max-w-3xl overflow-hidden rounded-xl border border-border">
          {specs.map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between gap-6 px-4 py-3 text-sm ${
                i % 2 === 0 ? "bg-secondary" : "bg-card"
              }`}
            >
              <span className="text-text-secondary">{row.label}</span>
              <span className="text-right font-medium text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      </section>

      <ReviewsSection productId={product._id} />

      <section className="mt-16">
        <RelatedProducts productId={product._id} categoryId={product.category?._id} />
      </section>
    </PageContainer>
  );
};

export default SingleProduct;
