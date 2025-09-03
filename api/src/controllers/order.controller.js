import { Order } from "../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "fullname email");

    res.json({
      success: true,
      orders,
      totalRevenue: orders.reduce((acc, order) => acc + order.totalAmount, 0)
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
