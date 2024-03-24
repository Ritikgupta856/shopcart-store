import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    products: {
      type: Object,
      required: true,
    },
    user: {
      type: String,
      required:true
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
