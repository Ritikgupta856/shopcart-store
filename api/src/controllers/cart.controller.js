import { calculateCart } from "../utills/cartCalculator.js";

export const calculateCartTotals = async (req, res) => {
  try {
    const { items, couponCode } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "items must be an array" });
    }

    const result = await calculateCart(items, couponCode);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("Error calculating cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
