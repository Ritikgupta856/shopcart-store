import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: mongoose.Schema.Types.ObjectId, default: null },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, default: "" },
    color: { type: String, default: "" },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = mongoose.Schema(
  {
    products: {
      type: [orderItemSchema],
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    shipping: {
      type: Number,
      default: 0,
    },

    couponCode: {
      type: String,
      default: null,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
