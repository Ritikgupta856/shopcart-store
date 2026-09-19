import { Product } from "../models/product.model.js";
import { Coupon } from "../models/coupon.model.js";

const FREE_SHIPPING_THRESHOLD = 999;
const FLAT_SHIPPING_FEE = 49;

// Recomputes cart totals from the database - never trusts client-sent prices.
// items: [{ productId, variantId, quantity }]
export const calculateCart = async (items, couponCode) => {
  const resolvedItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId).populate("category", "name slug");
    if (!product) {
      resolvedItems.push({ ...item, unavailable: true, reason: "Product no longer exists" });
      continue;
    }

    let variant = null;
    let availableStock = product.stock ?? 0;
    if (item.variantId) {
      variant = product.variants.id(item.variantId);
      if (!variant) {
        resolvedItems.push({ ...item, unavailable: true, reason: "Variant no longer available" });
        continue;
      }
      availableStock = variant.stock;
    }

    const quantity = Math.min(item.quantity, Math.max(availableStock, 0));

    resolvedItems.push({
      productId: product._id,
      variantId: variant?._id || null,
      name: product.name,
      image: product.image,
      price: Number(product.price),
      size: variant?.size || "",
      color: variant?.color || "",
      quantity,
      requestedQuantity: item.quantity,
      availableStock,
      unavailable: availableStock === 0,
      quantityAdjusted: quantity !== item.quantity,
    });
  }

  const subtotal = resolvedItems.reduce(
    (sum, i) => (i.unavailable ? sum : sum + i.price * i.quantity),
    0
  );

  let discount = 0;
  let couponResult = null;

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
    if (!coupon || !coupon.isActive) {
      couponResult = { valid: false, message: "Invalid or inactive coupon code" };
    } else if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      couponResult = { valid: false, message: "This coupon has expired" };
    } else if (subtotal < coupon.minOrderValue) {
      couponResult = {
        valid: false,
        message: `Minimum order value of ₹${coupon.minOrderValue} required for this coupon`,
      };
    } else {
      discount =
        coupon.discountType === "percentage"
          ? (subtotal * coupon.discountValue) / 100
          : coupon.discountValue;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
      discount = Math.min(discount, subtotal);
      couponResult = {
        valid: true,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        message: "Coupon applied",
      };
    }
  }

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const total = Math.max(subtotal - discount + shipping, 0);

  return {
    items: resolvedItems,
    subtotal: Math.round(subtotal),
    discount: Math.round(discount),
    shipping,
    total: Math.round(total),
    coupon: couponResult,
  };
};
