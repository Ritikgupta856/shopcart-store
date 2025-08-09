import { Order } from "../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
    let orders = await Order.find({});
    let totalRevenue = 0;
    let paid_orders = await Order.find({ paid: true });
    paid_orders.forEach(order => {
      totalRevenue += order.totalAmount;
    });
    res.json({ orders, totalRevenue });
  } catch (error) {
    console.log("Error Fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
