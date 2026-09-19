import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    bannerImage: { type: String, required: true },
    discount: { type: String, required: true },
    ctaText: { type: String, default: "Shop the Deal" },
    ctaUrl: { type: String, default: "/" },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Deal = mongoose.model("Deal", dealSchema);
