import { Order } from "../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    const totalRevenue = await Order.aggregate([
      { $match: { paid: true } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({
      success: true,
      orders,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
