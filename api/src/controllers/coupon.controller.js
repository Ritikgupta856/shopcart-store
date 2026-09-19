import { Coupon } from "../models/coupon.model.js";

export const addCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrderValue, maxDiscount, expiryDate, isActive } = req.body;

    if (!code || !discountType || discountValue === undefined) {
      return res.status(400).json({ success: false, message: "Code, discount type, and value are required" });
    }
    if (!["percentage", "flat"].includes(discountType)) {
      return res.status(400).json({ success: false, message: "Invalid discount type" });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase().trim(),
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: minOrderValue ? Number(minOrderValue) : 0,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      expiryDate: expiryDate || null,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({ success: true, coupon });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "A coupon with this code already exists" });
    }
    console.error("Error adding coupon:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Coupon.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }
    res.json({ success: true, coupon: deleted });
  } catch (error) {
    console.error("Error removing coupon:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json({ success: true, coupons });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
