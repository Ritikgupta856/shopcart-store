import { FaCartPlus, FaShareAlt, FaHeart, FaRegHeart, FaBolt } from "react-icons/fa";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import useCartStore from "@/store/useCartStore";
import useWishlistStore from "@/store/useWishlistStore";
import RelatedProducts from "@/components/RelatedProducts";
import ReviewsSection from "@/components/ReviewsSection";
import Breadcrumb from "@/components/shop/Breadcrumb";
import { Button } from "@/components/ui/button";

const SingleProduct = () => {
  const [product, setProduct] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { handleAddToCart } = useCartStore();
  const { isWishlisted, toggleWishlist } = useWishlistStore();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products/${slug}`
      );
      setProduct(response.data.product);
      setSelectedSize("");
      setSelectedColor("");
    } catch (error) {
      console.log(error);
    }
  };

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };
  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };

  if (!product) return null;

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
    ((!availableSizes.length || selectedSize) &&
      (!availableColors.length || selectedColor));
  const stockForDisplay = hasVariants
    ? (selectedVariant ? selectedVariant.stock : null)
    : product.stock;
  const outOfStock = hasVariants
    ? selectedVariant && selectedVariant.stock === 0
    : product.stock === 0;
  const canAddToCart = hasVariants
    ? variantSelectionComplete && selectedVariant && selectedVariant.stock > 0
    : !outOfStock;
  const showMrp = product.mrp && Number(product.mrp) > Number(product.price);
  const wishlisted = isWishlisted(product._id);

  const addToCart = () => {
    handleAddToCart({ ...product, selectedVariant }, quantity);
    setQuantity(1);
    toast.success("Product added successfully");
  };

  const buyNow = () => {
    if (!canAddToCart) return;
    addToCart();
    navigate("/cart");
  };

  const specs = [
    { label: "Brand", value: product.brand || "-" },
    { label: "Category", value: product.category?.name || "-" },
    { label: "Price", value: `₹${product.price}` },
    { label: "Stock", value: product.hasVariants ? product.totalStock : product.stock },
  ];

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 mt-10 w-full">
      <div className="max-w-7xl mx-auto">
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

        <div className="flex flex-col md:flex-row w-full gap-10">
          <div className="bg-secondary flex w-full md:w-[480px] h-[420px] md:h-[480px] shrink-0 rounded-2xl p-6">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {product.brand && (
              <span className="text-xs font-semibold uppercase tracking-wide text-text-muted-2">
                {product.brand}
              </span>
            )}
            <span className="text-2xl sm:text-3xl font-semibold text-foreground">{product.name}</span>

            {product.reviewCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i <= Math.round(product.rating) ? "fill-warning text-warning" : "text-border"}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  {product.rating} ({product.reviewCount} review{product.reviewCount !== 1 ? "s" : ""})
                </span>
              </div>
            )}

            <p className="text-sm text-text-secondary">{product.description}</p>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-semibold text-foreground">₹{product.price}</span>
              {showMrp && (
                <>
                  <span className="text-base text-text-muted-2 line-through">₹{product.mrp}</span>
                  {product.discountPercent > 0 && (
                    <span className="text-xs font-semibold bg-success-bg text-success px-2 py-1 rounded">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

            {stockForDisplay !== null && stockForDisplay !== undefined && (
              <span className={`text-sm font-medium ${stockForDisplay > 0 ? "text-success" : "text-danger"}`}>
                {stockForDisplay > 0
                  ? stockForDisplay <= 5
                    ? `Only ${stockForDisplay} left in stock!`
                    : "In Stock"
                  : "Out of Stock"}
              </span>
            )}

            {hasVariants && (
              <div className="flex flex-col gap-4 mt-2">
                {availableSizes.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-foreground">Size</span>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border-2 rounded-md text-sm ${
                            selectedSize === size
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {availableColors.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-foreground">Color</span>
                    <div className="flex flex-wrap gap-2">
                      {availableColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border-2 rounded-md text-sm ${
                            selectedColor === color
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-foreground"
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

            <div className="flex flex-row gap-3 items-center mt-4">
              <div className="flex items-center border border-border rounded-md">
                <button className="px-4 py-2.5 text-foreground" onClick={decrement}>-</button>
                <span className="px-4 text-foreground">{quantity}</span>
                <button className="px-4 py-2.5 text-foreground" onClick={increment}>+</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                className="flex gap-2 items-center flex-1"
                disabled={!canAddToCart}
                onClick={addToCart}
              >
                <FaCartPlus size={16} />
                {outOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                className="flex gap-2 items-center flex-1"
                disabled={!canAddToCart}
                onClick={buyNow}
              >
                <FaBolt size={14} />
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleWishlist(product)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                {wishlisted ? <FaHeart className="text-danger" size={16} /> : <FaRegHeart size={16} />}
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-text-secondary mt-4">
              <FaShareAlt size={14} />
              <span>Share this product</span>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12 max-w-2xl">
          <h2 className="text-xl font-semibold text-foreground mb-4">Specifications</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            {specs.map((row, i) => (
              <div
                key={row.label}
                className={`flex justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-secondary" : "bg-card"}`}
              >
                <span className="text-text-secondary">{row.label}</span>
                <span className="font-medium text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <ReviewsSection productId={product._id} />

        <div className="mt-12">
          <RelatedProducts
            productId={product._id}
            categoryId={product.category._id}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
