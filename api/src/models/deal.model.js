import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bannerImage: { type: String, required: true },
    ctaUrl: { type: String, default: "/" },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Deal = mongoose.model("Deal", dealSchema);
