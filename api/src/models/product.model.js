import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    size: { type: String, trim: true },
    color: { type: String, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    sku: { type: String, trim: true },
  },
  { _id: true }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    variants: {
      type: [variantSchema],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    brand: {
      type: String,
      default: "",
      trim: true,
    },
    mrp: {
      type: Number,
      default: null,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
