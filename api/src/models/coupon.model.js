import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ["percentage", "flat"], required: true },
    discountValue: { type: Number, required: true, min: 0 },
    minOrderValue: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: null },
    expiryDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model("Coupon", couponSchema);
